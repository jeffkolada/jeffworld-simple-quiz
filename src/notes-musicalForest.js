export default class MusicalForrest extends BasePlugin {

    /** Plugin info */
    static get id()             { return 'musical-forrest' }
    static get name()           { return 'Musical Forrest' }
    static get description()    { return 'Attach music notes to objects.' }

    /** Instance ID */
    instanceID = Math.random().toString(36).substring(2)

    /** All loaded sound objects */
    soundObjects = []

    /** Called when the plugin is loaded */
    async onLoad() {

        /** Get user ID */
        this.userID = await this.user.getID()

        // Register component
        this.objects.registerComponent(MusicalComponent, {
            id: 'musical-forrest',
            name: 'Musical Forrest',
            description: 'Attach music notes to objects.',
            settings: [
//                { id: 'click', name: 'Play Sound On Click', type: 'checkbox', help: 'Play sound when a user click on the object.'},
                { id: 'proximity', name: 'Play Sound In Proxmity', type: 'number', help: 'Play sound when a user gets in the set range of the object.'},
                { id: 'sound', name: 'Select Sound', type: 'select', help: 'Select sound to play on user interaction.', 
                    values: [
                        'A0',
                        'Bb0',
                        'B0',
                        ]},
                { id: 'custom', name: 'Custom Sound', type: 'string', help: 'If specified, this sound is played instead of the one from the dropdown.'},
                { id: 'animation', name: 'Play Object Animation', type: 'checkbox', help: "If true, play the object's animations."},
                { id: 'animation-default', name: 'Default Animation', type: 'string', help: 'Enter the name for the idle animation for the object.', },
                { id: 'animation-active', name: 'Active Animation', type: 'string', help: 'Enter the name fot the active animation for the obect. The animation stays active for thie duration set seconds on activation.', },
                { id: 'duration', name: 'Active Duration', type: 'number', help: 'Ammount of seconds the active animation is active. Default is 2.'}
            ]
        })
    }

    /** Called when a remote message is received */
    async onMessage(msg) {

        // Ignore if from us
        if (msg.userID == this.userID || !this.userID)
            return

        let objectID = msg.objectID
        let object = null

        // Find the right component
        if (this.soundObjects?.length > 0) {
            this.soundObjects.forEach(comp => {
                if (comp.objectID == objectID)  {
                    object = comp
                } else {
                    return
                }

                if (msg.action === 'animation') {
                    object.sendMessage({fromUser: this.userID, action: 'animation'}, true)
                    return
                }

                if (msg.action === 'sound') {
                    object.sendMessage({fromUser: this.userID, action: 'sound'}, true)
                    return
                }
            });
        } 

        
    }
    
}

/**
 * Component that can be added to an object.
 */
    class MusicalComponent extends BaseComponent {

    /** Called when the component is loaded */
    async onLoad() {

        // Set timer to check the distance
        this.timer = setInterval(this.checkDistance.bind(this), 100)

        // Get the notes array
        this.getNotes()

        // Add this object to the list
        this.plugin.soundObjects.push(this)

        /** Get user ID */
        this.userID = await this.plugin.user.getID()

    }

    /** Called when the plugin is unloaded */
    onUnload() {

        // Stop timer
        clearInterval(this.timer)
        this.timer = null

    }

    /** Play the animation files */
    async playAnimations(msg) {

        if (this.animating) return

        this.animating = true
        // Play animation
        let activeAnimation = this.getField('animation-active') || []
        let defaultAnimation = this.getField('animation-default') || 'none'
        let duration = this.getField('duration') || 2
        duration = duration * 1000

        // Inform everyone else
        if (!msg) {
            this.plugin.messages.send({
                action: 'animation',
                instanceID: this.plugin.instanceID,
                userID: this.userID,
                duration: duration,
                objectID: this.objectID
            }, false)
        }
    

        this.plugin.objects.update(this.objectID, {
            animation: [
            {name: activeAnimation}
            ],
            dateModified: Date.now()
            }, true)

        //  let props = {}
        //  props.dateModified = Date.now()

        //  await this.plugin.objects.update(this.objectID, {dateModified: props.dateModified}, false)

            // stop animation after 2 seconds
            setTimeout(async e  => {
            this.plugin.objects.update(this.objectID, { 
                animation: [
                {name: defaultAnimation}
                ],
                dateModified: Date.now()
                }, true)
    
            //  let props = {}
            //  props.dateModified = Date.now()
    
            //  await this.plugin.objects.update(this.objectID, {dateModified: props.dateModified}, false)
                this.animating = false
            }, duration)
    }

    /** Preload the audio files */
    preloadAudio() {
        this.notes.forEach((n) => {
            this.plugin.audio.preload(this.plugin.paths.absolute(`${n}.mp3`))
            })

        // Preload custom audio
        let custom = this.getField('custom') || null
        if (custom) this.plugin.audio.preload(custom)

    }

//    /** Called when the user clicks on this object */
//    async onClick() {
//        if (this.getField('click')) this.playAudio()  
//    }

    /** Check the distance between the object and the user */
    async checkDistance() {
        let userPosition = await this.plugin.user.getPosition()
        let objPosition =  {x: this.fields.x, y: this.fields.height, z: this.fields.y}
        let distance = this.dist(objPosition.x,objPosition.y,objPosition.z,userPosition.x,userPosition.y,userPosition.z)
        let radius = parseFloat(this.getField('proximity')) || 1

        if (distance <= parseInt(radius)) {
            if (this.playing) return
            this.playing = true
            this.playAudio()
        } else {
            this.playing = false
        }

    }

    /** Playthe audio files */
    async playAudio(msg) {

        // Play Sound
        let custom = this.getField('custom') || null
        let sound = this.getField('sound') + '.mp3'
        let objectPosition = {x: this.fields.x, y: this.fields.height, z: this.fields.y}

        // Inform everyone else
        if (!msg) {
            this.plugin.messages.send({
                action: 'sound',
                position: objectPosition,
                instanceID: this.plugin.instanceID,
                userID: this.userID,
                objectID: this.objectID
            }, false)
        }

        this.audioID = await this.plugin.audio.play(custom ? custom : this.plugin.paths.absolute(sound) , { volume: 1, x: objectPosition.x, height: objectPosition.y, y: objectPosition.z})
        if (this.getField('animation')) this.playAnimations()
    }

    /** Gets the array of all the default notes */
    getNotes(){
        this.notes = [
            'A0',
            'Bb0',
            'B0',
            ];

        // Preload audio files
        this.preloadAudio()
    }

    /** Gets the distance between 2 vectors */
    dist(x0,y0,z0,x1,y1,z1){

        const deltaX = x1 - x0;
        const deltaY = y1 - y0;
        const deltaZ = z1 - z0;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
        
        return distance;
    }

    /** Called when a message is received */
    async onMessage(msg) {

        // Ignore if not from us
        if (msg.fromUser != this.userID || !this.userID)
            return

        // Check message
        if (msg.action == 'sound') {

            // Play audio
            this.playAudio(true)

        }

        if (msg.action == 'animation') {

            // Play animation
            this.playAnimations(true)

        }

    }

}
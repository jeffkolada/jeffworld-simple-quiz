
// JAVASCRIPT

// Send from JS
onTimer() {
    this.plugin.menus.postMessage({ action: 'are-you-alive'})
}

// Receive & Reply from HTML
window.addEventListener('message', function (e) {

    // Open Check
    if (e.data.action === 'are-you-alive') {
        parent.postMessage({ action: 'still-breathing-sir' }, '*')
    }

})


// Reaction from JS
if (data.action == 'still-breathing-sir') {
    this.editorResponseDate = Date.now()
}




>>>>>>   FROM PLANTING GARDEN   <<<<<<<<

PLUGIN

async onMessage(msg) {

    // Update image now if panel loaded
    if (msg.action === 'panel-closed') {
        this.menus.returnFocus()
        if (this.mounds?.length > 0) {
            this.mounds.forEach(comp => {
                comp.picking = false
            })
            return
        }
    }

    let userID = await this.user.getID()
    let object = null

    if (msg.action == 'panel-load') {
        // Update the images
        let message = this.getField('error_msg_component') || this.plugin.getField('error_msg') || null
        this.plugin.menus.postMessage({ action: 'load-vatoms', vatoms: this.vatomObjects, message })
    }
}

COMPONENT

async onMessage(msg) {

    // Ignore if not from us
    if (msg.fromUser != this.plugin.userID || !this.plugin.userID)
        return


    if (msg.action == 'panel-load') {
        // Update the images
        let message = this.getField('error_msg_component') || this.plugin.getField('error_msg') || null
        this.plugin.menus.postMessage({ action: 'load-vatoms', vatoms: this.vatomObjects, message })
    }

}

HTML
script

function clickButton(src) {

    parent.postMessage({ action: 'button-click', src: src}, '*')

}

 // Called when a message is received from the plugin
 window.addEventListener('message', function (e) {

    // Update the vatoms
    if (e.data.action === 'load-vatoms') {
        // load the vatoms
        vatoms = e.data.vatoms
        let loader = document.getElementById('loader')
        let vatomDiv = document.getElementById('vatomDiv')
        let grid = document.getElementById('grid')
        let message = e.data.message
        if (!grid) {
            grid = document.createElement("div")
            grid.id = "grid"
            grid.style = "padding: 16px;"
            grid.classList.add('container')
            vatomDiv.appendChild(grid)
        }
        grid.innerHTML = ''

        if (vatoms && vatoms.length > 0) {
            vatoms.forEach(vatom => {
            let item = document.createElement("div")
            let bg = document.createElement("img")
            let title = document.createElement("div")
            item.className = "item"
            item.style = "justify-content: center; align-items: center; flex-basis: fit-content; display: grid; padding: 10px; cursor: pointer; max-width: 200px"
            item.id = vatom.id
            item.onclick = () => {parent.postMessage({ action: 'picked', id: vatom.id }, '*')}
            bg.style = "width: 100%; height: 180px;"
            title.style = "width: 180px; color: white; font-size: 12px; font-family: sans-serif; text-align: center; padding: 6px"
            bg.src = vatom.image
            title.textContent = vatom.title
            item.appendChild(title)
            item.appendChild(bg)
            grid.appendChild(item)
            });
        } else {
            vatomDiv.innerText = message ? message : "No compatible vatoms found."
        }


        loader.style.display = 'none'

    }

})

// On load, ask the plugin to send us all messages
setTimeout(e => {
    parent.postMessage({ action: 'panel-load' }, '*')
}, 3000)

window.addEventListener('pagehide', e => {
    // On load, ask the plugin to send us all messages
    parent.postMessage({ action: 'panel-closed' }, '*')
});







// JAVASCRIPT REWORK JK 1

// Send JSON data to the HTML panel
this.plugin.menus.postMessage({ 
    action: 'update-quiz', 
    content: questions, 
    popupID: popupId
});



//HTML RECIEVE DATA

    // Event listener to update quiz with received JSON data
    window.addEventListener('message', function (e) {
            if (e.data.action === 'update-quiz') {
                load(e.data.content)
                const receivedQuestions = e.data.content                // Fill receivedQuestions with Array
                console.log('Received questions:', receivedQuestions)   // Console Log when received
                questions = receivedQuestions                           // Replace the questions content with the received data
                showQuestion()                                          // Show the first question of the updated quiz
            }
        });



// Event listener to update quiz with received JSON data
window.addEventListener('message', function (e) {
    if (e.data.action === 'update-quiz') {
        const receivedQuestions = e.data.content;
        console.log('Received questions:', receivedQuestions);
        load(receivedQuestions); // Call the load function with the received content
    }
});









// Example JSON Data

[
    {
        "question": "What does the acronym 'NFT' stand for?",
        "choices": ["Near-Field Teleport", "Non-Fungible Token", "New-Fangled Technology"],
        "correct": 1
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "choices": ["Venus", "Mars", "Jupiter"],
        "correct": 1
    },
    {
        "question": "Who wrote 'To Kill a Mockingbird'?",
        "choices": ["Harper Lee", "J.K. Rowling", "Stephen King"],
        "correct": 0
    }
]

[
    {
      "question": "How many answers are there?",
      "choices": [
        "One",
        "Two",
        "Three",
        "Four"
      ],
      "correct": 3
    },
    {
      "question": "Which number is higher?",
      "choices": [
        "69",
        "420"
      ],
      "correct": 1
    },
    {
      "question": "How many legs does a chicken have?",
      "choices": [
        "One",
        "Two",
        "Threee"
      ],
      "correct": 1
    }
  ]


// SINGLE QUESTION

[
    {
        "question": "What does the acronym 'NFT' stand for?",
        "choices": ["Near-Field Teleport", "Non-Fungible Token", "New-Fangled Technology"],
        "correct": 1
    }
]








// JAVASCRIPT FROM NPC

/** Called when a remote message is received */
async onMessage(msg) {

    let userID = await this.user.getID()
    let user = await this.user.getProperties()
    let npc = null
    let followNPC = null

    // Find the right component
    if (this.npcs?.length > 0) {
        this.npcs.forEach(comp => {
            if (comp.infoOverlayID) npc = comp
            if (comp.followID) followNPC = comp
        });
    } 

    // Update image now if panel loaded
    if (msg.action === 'panel-load') {
        npc.sendMessage({fromInstance: userID, action: 'panel-load'}, true)
        return
    }

    if (msg.action === 'follow') {
        followNPC.sendMessage({fromInstance: userID, action: 'follow'}, true)
        return
    }
}












// Import necessary modules
import { BasePlugin, BaseComponent } from 'vatom-spaces-plugins'


export default class MultipleChoiceQuizPlugin extends BasePlugin {

    /** Plugin info */
    static id = "multiple-choice-quiz";
    static name = "Multiple Choice Quiz Plugin";
    static description = "Creates a multiple-choice quiz when the component is clicked.";

    /** Called on load */
    onLoad() {
        // Register component as an attachable component
        this.objects.registerComponent(QuizComponent, {
            id: 'quiz-component',
            name: 'Quiz Component',
            description: 'Creates a multiple-choice quiz when the component is clicked.',
            settings: obj => [
                { id: 'questions', name: 'Questions', type: 'textarea', help: 'JSON string representing quiz questions and choices.' }
            ]
        });
    }
}

/**
 * Component that creates a multiple-choice quiz.
 */
class QuizComponent extends BaseComponent {

    /** Called when the component is clicked */
    async onClick() {
        try {
            // Get quiz settings
            const questionsJson = this.getField('questions');

            // Parse JSON string to array of questions
            const questions = JSON.parse(questionsJson);

            // Open popup with quiz questions and choices
            const popupId = await this.plugin.menus.displayPopup({
                title: 'Multiple Choice Quiz',
                panel: {
                    iframeURL: this.paths.absolute('./quiz-panel-v2.html'),
                    width: 600,
                    height: 500,
                    onClose: () => {
                        console.log("Popup closed");
                    },
                }
            });
            console.log('Popup ID:', popupId);
            console.log('Question Sent:', questions);

    }
}




















onLoad() {
    this.hooks.addHandler('controls.key.down', this.onKeyDown)
    this.hooks.addHandler('controls.key.up', this.onKeyUp)

    // Get current user identifier
    this.user.getID().then(uid => this.userID = uid)

    // Register overlay
    this.menus.register({
        id: this.menuID,
        section: 'overlay-top',
        panel: {
            iframeURL: this.paths.absolute('ui-build/panel/index.html'),
            pointerEvents: 'none',
        },
    })

    // Retrieve all available actions
    this.getActions().then(() => {

        // Use names as values
        const values = this.actions.map(act => act.name)

        // Register settings
        this.menus.register({
            id: 'radial-wheel-settings',
            section: 'plugin-settings',
            panel: {
                fields: [
                    { type: 'section', id: 'options', name: 'Options' },
                    { id: 'slot-1', name: 'Slot 1', type: 'two-stack', help: 'Action that will be assigned to the first slot.',
                        heightBetween: 5,
                        first: { type: 'select', values: values },
                        second: { type: 'bind-key', boundTo: this.assigned[1]?.key || '', onKeyBound: key => this.onKeyBound(key, 'slot-1') },
                    },
                    { id: 'slot-2', name: 'Slot 2', type: 'two-stack', help: 'Action that will be assigned to the second slot.',
                        heightBetween: 5,
                        first: { type: 'select', values: values },
                        second: { type: 'bind-key', boundTo: this.assigned[2]?.key || '', onKeyBound: key => this.onKeyBound(key, 'slot-2') },
                    },
                ]
            }
        })

    })
}



    /** Opens the radial wheel, if not already open */
    open() {
        // Do not open if already opened
        if (this.isOpen) {
            return
        }

        // Open wheel
        this.isOpen = true
        this.menus.update(this.menuID, { panel: { pointerEvents: 'auto' } })
        this.menus.postMessage({ action: 'create-wheel' })
    }



// ON LOAD

     // Register overlay
     this.menus.register({
        id: this.menuID,
        section: 'overlay-top',
        panel: {
            iframeURL: this.paths.absolute('ui-build/panel/index.html'),
            pointerEvents: 'none',
        },
    })


    open() {
        // Do not open if already opened
        if (this.isOpen) {
            return
        }

        this.menus.update(this.menuID, { 
            panel: { 
                pointerEvents: 'auto' 
            } 
        })
    }











/**
 * Saves a string to storage.
 *
 * @param key The key to fetch.
 * @param value The value to store.
 */
export async function saveString(key: string, value: string): Promise<boolean> {
    try {
      // await AsyncStorage.setItem(key, value)
      storage.set(key, value)
      return true
    } catch {
      // return false
      throw new Error('Unable to save to local storage')
    }
  }



/**
  * Loads a string from storage.
  *
  * @param key The key to fetch.
  */
 export async function loadString(key: string): Promise<string | null> {
   try {
     const str = storage.getString(key)
     return str === undefined ? null : Promise.resolve(str)
   } catch {
     // not sure why this would fail... even reading the RN docs I'm unclear
     return null
   }
 }









    async onMessage(data) {
        let userID = await this.plugin.user.getID()

        if (userID == data.fromInstance) {

            if (data.action == 'update-name') {
                let props = {}
                props.npcName = data.value
                
                await this.plugin.objects.update(this.objectID, props, true)
            
            }

            if (data.action == 'editor-load') {

                // Get data
                let name = this.fields.npcName || null
                let radius = this.fields.npcRadius || null

                // Load script
                let script = this.loadScript()
                this.plugin.menus.postMessage({ action: 'load-script', src: script, name: name, radius: radius })

                // Load animations
                this.loadAnimations()
            }
        }
    }


    loadScript(){
        let script = "[]"

        if (this.fields.script) {
            script = JSON.stringify(this.fields.script)
        }
        
        return script
    }

    async saveScript(data){

        if (data.list) {

            let props = {}
            
            props.script = JSON.parse(data.list);

            this.closePopup()

            this.plugin.menus.postMessage({ action: 'close-popup' })

            this.visible = false
            this.settingsOpen = false
            this.editUser = null
            this.step = 0
            this.scriptItem = null
            this.waitingClick = false
            this.waitingPopupClick = false
            this.waitingButtonClick = false
            this.popupOpen = false
            this.infoOverlayID = null
            this.clickedPopup = false
            this.clickedButton = false
            this.npcPosition = {x: this.fields.x, y: this.fields.height, z: this.fields.y}
            this.scriptStarted = false
            this.killScript = true

            await this.plugin.updateComponent(this.objectID, props, this.fields.components)
            this.playScript(this.fields.script, this.step)

        }
    }

    async updateScript(data){

        if (data.list) {
            
            this.latestScript = data

        }
    }



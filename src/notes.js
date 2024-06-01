
// JAVASCRIPT

// 1. Plugin Send Message
onTimer() {
    this.plugin.menus.postMessage({ action: 'are-you-alive'})
}


// 2. HTML Receive & Reply
window.addEventListener('message', function (e) {

    // Open Check
    if (e.data.action === 'are-you-alive') {
        parent.postMessage({ action: 'still-breathing-sir' }, '*')
    }

})


// 3. Javascript Reaction (Base Plugin)

async onMessage(data) {
    let userID = await this.plugin.user.getID()

if (data.action == 'still-breathing-sir') {
    this.editorResponseDate = Date.now()
}

}


// Javascript Reaction (Component)
async onMessage(msg) {

    if (msg.action === 'still-breathing-sir') {
        npc.sendMessage({fromInstance: userID, action: 'still-breathing-sir'}, true)
        return
    }


}









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





//   GROUP GARDEN PLUGIN                        -  GROUP GARDEN PLUGIN                        -  GROUP GARDEN PLUGIN
//   GROUP GARDEN PLUGIN                        -  GROUP GARDEN PLUGIN                        -  GROUP GARDEN PLUGIN
//   GROUP GARDEN PLUGIN                        -  GROUP GARDEN PLUGIN                        -  GROUP GARDEN PLUGIN
//   GROUP GARDEN PLUGIN                        -  GROUP GARDEN PLUGIN                        -  GROUP GARDEN PLUGIN

// GARDEN COMPONENT POPUP WINDOW SCRIPT

            let vatoms = null
            function clickButton(src) {

                parent.postMessage({ action: 'button-click', src: src}, '*')

            }

            // Called when a message is received from the plugin
            window.addEventListener('message', function (e) {

                // Update the vatoms
                if (e.data.action === 'load-vatoms') {

                    // load the vatoms
                    vatoms = e.data.vatoms
                    let message = e.data.message
                    
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



// GARDEN PLUGIN JAVASCRIPT

export default class GroupGarden extends BasePlugin {
    async onMessage(msg) {

        // Update image now if panel loaded
        if (msg.action === 'panel-closed') {
            this.menus.returnFocus()
        }

        let userID = await this.user.getID()
        let object = null

        if (!object) return

        // Update image now if panel loaded
        if (msg.action === 'panel-load') {
            object.sendMessage({fromUser: userID, action: 'panel-load'}, true)
            return
        }
    }
}

class GardenComponent extends BaseComponent {

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

}




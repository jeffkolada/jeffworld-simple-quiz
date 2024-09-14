// Import necessary modules
import { BasePlugin, BaseComponent } from 'vatom-spaces-plugins'


export default class LiveQuizExtension extends BasePlugin {

    /** Called when the plugin is loaded */
    async onLoad() {

        // Register button
        this.menus.register({
            id: 'simple-quiz-live-button',
            text: 'Live Quiz',
            section: 'admin-panel',
            adminOnly: true,
            icon: 'icon.png',
            action: this.onQuizAdminPress.bind(this)
        })

    }

    /** Called when the user presses the System Alert button */
    async onQuizAdminPress() {

        // Ask user for message
        const msg = await this.menus.prompt({
            title: 'Message Everyone',
            text: 'Enter a message. This message will be displayed to everyone in the space currently.'
        })

        // No message to send
        if (!msg) {
            return
        }

        // Send message
        this.messages.send({ action: 'show-msg', text: msg }, true)

    }

    /** Called when a message is received */
    onMessage(msg, fromUserID) {

        // Check message type
        if (msg.action == 'show-msg')
            this.onShowLiveQuiz(msg, fromUserID)

    }

    /** Called when we receive a message to display text */
    onShowLiveQuiz(msg, fromUserID) {

        // Show toast
        console.debug('[System Alert] Displaying message from ' + fromUserID + ': ' + msg.text)
        const toastID = this.menus.toast({ 
            text: msg.text,
            buttonText: 'Take Quiz',
            buttonAction: () => { 
                console.log('Accepted Quiz') 
                openQuizPanel()
            },
            buttonCancelText: 'Close',
            buttonCancelAction: () => { 
                console.log('Cancelled Quiz'),
                this.menus.toast({ 
                    text: 'Quiz Cancelled',
                    duration: 2000
                })
            }, 
            duration: 10000
        })

        openQuizPanel = () => {
            const popupId = this.plugin.menus.displayPopup({
                title: 'Multiple Choice Quiz',
                panel: {
                    iframeURL: this.paths.absolute('./quiz-panel.html'),
                    width: 600,
                    height: 650,
                    onClose: () => {
                        console.log("Popup closed");
                        this.isPopupOpen = false; // Reset the flag when the popup is closed
                    },
                }
            });
        }

        console.log('Toast ID: ' + toastID)

    }



}
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
                { id: 'quizTitle', name: 'Quiz Title', type: 'text', help: 'Title of the quiz.' },  
                { id: 'questions', name: 'Questions', type: 'textarea', help: 'JSON string representing quiz questions and choices.' },
                { id: 'analyticsKey', name: 'Analytics Key', type: 'text', help: 'Key for the analytics event.' } 
            ]
        });
    }

    // When quiz is finished, send Analytics event with Results
    async onMessage(msg) {
        let analyticsKey = this.getField('analyticsKey'); // Retrieve the analytics key

            // Ignore if not from us
        if (msg.fromUser != this.userID || !this.userID)
            return

        if (msg.action == 'send-results') {
            console.log('Plugin: Message Received from panel!');
            let result = await msg.result;
            console.log('Plugin: Send Analytics Values: ', analyticsKey, ' : ', result);
            this.user.sendAnalytics(analyticsKey, result);
        }
    }

}

/**
 * Component that creates a multiple-choice quiz.
 */
class QuizComponent extends BaseComponent {



    /** Called when the component is clicked */
    async onClick() {
        let analyticsKey = this.getField('analyticsKey'); // Retrieve the analytics key

        try {
            const questionsJson = this.getField('questions');
            const questions = JSON.parse(questionsJson); // Parse JSON string to array of questions
            const quizTitle = this.getField('quizTitle'); // Retrieve the quiz title
    
            const popupId = await this.plugin.menus.displayPopup({
                title: 'Multiple Choice Quiz',
                panel: {
                    iframeURL: this.paths.absolute('./quiz-panel-v2.html'),
                    width: 600,
                    height: 600,
                    onClose: () => {
                        console.log("Popup closed");
                    },
                }
            });
    
        // Send the quiz data to the panel
            setTimeout(() => {
                console.log('Component Analytics Key Sent:', analyticsKey);
                this.plugin.menus.postMessage({
                    action: 'update-quiz',
                    content: questions,  // Send already parsed object
                    analytics: analyticsKey, // Send analytics key
                    quizTitle: quizTitle,  // Include the quiz title in the message
                    popupID: popupId
                });
            }, 600); // Delaying the message to ensure the iframe is fully loaded
    
            console.log('Component Popup ID:', popupId);
            console.log('Component Question Sent:', questions);
        } catch (error) {
            console.error('Error parsing questions:', error);
        }
    }
        
    
    
}


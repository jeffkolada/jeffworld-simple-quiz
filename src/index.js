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
                { id: 'quizTitle', name: 'Quiz Title', type: 'text', help: 'Title of the quiz.', default: 'Multiple Choice Quiz' },  
                { id: 'questions', name: 'Questions', type: 'textarea', help: 'JSON string representing quiz questions and choices.' },
                { id: 'section-end-message', name: 'Timer Settings', type: 'section' },
                { id: 'endMessageWin', name: 'Game Over Win', type: 'textarea', help: 'Message to display at the end when user gets all the answers correct.', default: 'Congratulations! You answered all questions correctly!' },
                { id: 'endMessageLose', name: 'Game Over Lose', type: 'textarea', help: 'Message to display at the end when user gets any answers wrong.', default: 'Keep practicing to improve your score.' },
                { id: 'section-analytics', name: 'Analytics Setup', type: 'section', help: 'Send an Analytics Event with the custom Name and a Value equal to the number of correct answers.' },
                { id: 'analyticsKey', name: 'Analytics Name', type: 'text', help: 'Name for the analytics event.' },
                { id: 'section-timer', name: 'Timer Settings', type: 'section' },
                { id: 'timerOn', name: 'Timer Enabled', type: 'checkbox', help: 'Enable or Disable the Timer feature.', default: false},
                { id: 'timerDuration', name: 'Timer Duration', type: 'number', help: 'Time in seconds for each question.', default: 10} 
            ]
        });
    }

    // When quiz is finished, send Analytics event with Results
    async onMessage(msg) {
        let analyticsKey = this.getField('analyticsKey'); // Retrieve the analytics key
//        console.log('Plugin onMessage Analytics Key: ', analyticsKey);                              // Console Log (7)

        if (msg.action == 'send-results') {
//            console.log('Plugin: Message Received from panel!');                                    // Console Log (8)
            let analyticsKey = await msg.analytics;
            let result = await msg.result;
//            console.log('Plugin: Send Analytics Values: ', analyticsKey, ' : ', result);            // Console Log (9)
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
        if (this.isPopupOpen) {
            console.log('Popup is already open'); // Prevent opening another popup
            return;
        }

        let analyticsKey = this.getField('analyticsKey'); // Retrieve the analytics key
        try {
            const questionsJson = this.getField('questions');
            const questions = JSON.parse(questionsJson); // Parse JSON string to array of questions
            const quizTitle = this.getField('quizTitle'); // Retrieve the quiz title
            const endMessageWin = this.getField('endMessageWin') || 'Congratulations! You answered all questions correctly!'; // Default win message
            const endMessageLose = this.getField('endMessageLose') || 'Keep practicing to improve your score.'; // Default lose message
            const timerOn = this.getField('timerOn'); // Retrieve the timer status
            const timerDuration = this.getField('timerDuration'); // Retrieve the timer duration
            console.log('Panel Opened');                                                                  // Console Log ()
            
            this.isPopupOpen = true; // Set the flag to true

            const popupId = await this.plugin.menus.displayPopup({
                title: 'Multiple Choice Quiz',
                panel: {
                    iframeURL: this.paths.absolute('./quiz-panel-v2.html'),
                    width: 600,
                    height: 650,
                    onClose: () => {
                        console.log("Popup closed");
                        this.isPopupOpen = false; // Reset the flag when the popup is closed
                    },
                }
            });
    
        // Send the quiz data to the panel
            setTimeout(() => {
//                console.log('Component Analytics Key Sent:', analyticsKey);                         // Console Log (3)
                this.plugin.menus.postMessage({
                    action: 'update-quiz',
                    content: questions,  // Send already parsed object
                    analytics: analyticsKey, // Send analytics key
                    quizTitle: quizTitle,  // Include the quiz title in the message
                    endMessageWin: endMessageWin, // Include the win message in the message
                    endMessageLose: endMessageLose, // Include the lose message in the message
                    timerOn: timerOn, // Include the timer status in the message
                    timerDuration: timerDuration, // Include the timer duration in the message
                    popupID: popupId
                });
            }, 600); // Delaying the message to ensure the iframe is fully loaded
    
//            console.log('Component Popup ID:', popupId);                                            // Console Log (1)
//            console.log('Component Question Sent:', questions);                                     // Console Log (2)
        } catch (error) {
            console.error('Error parsing questions:', error);
            this.isPopupOpen = false; // Reset the flag in case of an error
        }
    }
        
    
    
}


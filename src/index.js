// Import necessary modules
import { BasePlugin, BaseComponent } from 'vatom-spaces-plugins'


export default class MultipleChoiceQuizPlugin extends BasePlugin {

    /** Plugin info */
    static id = "multiple-choice-quiz";
    static name = "Multiple Choice Quiz Plugin";
    static description = "Creates a multiple-choice quiz when the component is clicked.";

    /** Called on load */
    onLoad() {
        // Register Multiple Question Quiz component as an attachable component
        this.objects.registerComponent(QuizComponent, {
            id: 'quiz-component',
            name: 'Quiz Multiple Questions',
            description: 'Creates a multiple-choice quiz when the object is clicked.',
            settings: obj => [
                { id: 'quizTitle', name: 'Quiz Title', type: 'text', help: 'Title of the quiz.', default: 'Multiple Choice Quiz' },  
                { id: 'questions', name: 'Questions', type: 'textarea', help: 'JSON string representing quiz questions and choices.' },
            { id: 'section-end-message', name: 'Game Over Messages', type: 'section' },
                { id: 'endMessageWin', name: 'Game Over Win', type: 'textarea', help: 'Message to display at the end when user gets all the answers correct.', default: 'Congratulations! You answered all questions correctly!' },
                { id: 'endMessageLose', name: 'Game Over Lose', type: 'textarea', help: 'Message to display at the end when user gets any answers wrong.', default: 'Keep practicing to improve your score.' },
            { id: 'section-analytics', name: 'Analytics Setup', type: 'section', },
                { id: 'analyticsKey', name: 'Analytics Name', type: 'text', help: 'Name for the analytics event. The value sent will be equal to the number of correct answers.' },
                { id: 'limitResponse', name: 'Limit Replay', type: 'select', values: ['None', 'Any Finish', 'All Correct'], help: 'When an option is selected, the quiz cannot be re-taken once after the selected quiz result.', default: 'None' },
            { id: 'section-timer', name: 'Timer Settings', type: 'section' },
                { id: 'timerOn', name: 'Timer Enabled', type: 'checkbox', help: 'Enable or Disable the Timer feature.', default: false},
                { id: 'timerDuration', name: 'Timer Duration', type: 'number', help: 'Time in seconds for each question.', default: 10} 
            ]
        });

        // Register Multiple Question Quiz component as an attachable component
        this.objects.registerComponent(SingleQuizComponent, {
            id: 'single-quiz-component',
            name: 'Quiz Single Question',
            description: 'Creates a single question multiple-choice quiz when the object is clicked. If multiple questions are provided, the question can be randomized.',
            settings: obj => [
                { id: 'quizTitle', name: 'Quiz Title', type: 'text', help: 'Title of the quiz.', default: 'Pop Quiz' },  
                { id: 'questions', name: 'Question', type: 'textarea', help: 'JSON string representing quiz question and choices. By default the single question quiz will use the first question provided.' },
                { id: 'question-random', name: 'Randomize Question', type: 'checkbox', help: 'If multiple questions are provided, this will randomize the single question that appears.', default: false },
            { id: 'section-end-message', name: 'Game Over Messages', type: 'section' },
                { id: 'endMessageWin', name: 'Game Over Win', type: 'textarea', help: 'Message to display at the end when user gets all the answers correct.', default: 'Congratulations! You answered correctly!' },
                { id: 'endMessageLose', name: 'Game Over Lose', type: 'textarea', help: 'Message to display at the end when user gets any answers wrong.', default: 'Try again next time.' },
            { id: 'section-analytics', name: 'Analytics Setup', type: 'section', },
                { id: 'analyticsKey', name: 'Analytics Name', type: 'text', help: 'Name for the analytics event. The value sent will be equal to the number of correct answers.' },
                { id: 'limitResponse', name: 'Limit Replay', type: 'select', values: ['None', 'Any Finish', 'All Correct'], help: 'When an option is selected, the quiz cannot be re-taken once after the selected quiz result.', default: 'None' },
            { id: 'section-timer', name: 'Timer Settings', type: 'section' },
                { id: 'timerOn', name: 'Timer Enabled', type: 'checkbox', help: 'Enable or Disable the Timer feature.', default: false},
                { id: 'timerDuration', name: 'Timer Duration', type: 'number', help: 'Time in seconds for each question.', default: 10} 
            ]
        });
    }

    // When quiz is finished, send Analytics event with Results
    async onMessage(msg) {
        if (msg.action == 'send-results') {
            let analyticsKey = await msg.analytics;
            let result = await msg.result;
            let allCorrect = await msg.allCorrect;
            let limitResponse = await msg.limitResponse;
            this.user.sendAnalytics(analyticsKey, result);

            // Mark the quiz as completed
            let quizTakenName = 'quiz' + analyticsKey;
            if (limitResponse === 'Any Finish' || (limitResponse === 'All Correct' && allCorrect)) {
                await this.user.setProperties({ [quizTakenName]: true });
            }
        }
    }

}

/**
 * Component that creates a Multiple Question multiple-choice quiz.
 */
class QuizComponent extends BaseComponent {

    /** Called when the component is clicked */
    async onClick() {
        // Check if the user has already completed the quiz
        let limitResponse = this.getField('limitResponse');  // Retrieve the limitResponse setting
        let quizTakenName = 'quiz' + this.getField('analyticsKey'); 
        let properties = await this.plugin.user.getProperty('', quizTakenName);

        // If property is undefined, set it to false and retry
        if (properties === undefined) {
            await this.plugin.user.setProperties({ [quizTakenName]: false });
            properties = await this.plugin.user.getProperty('', quizTakenName);
        }

        if ((limitResponse === 'Any Finish' || limitResponse === 'All Correct') && properties === true) {
            console.log('User has already completed the quiz');
            this.plugin.menus.toast({
                text: 'You have already taken this quiz.',
                duration: 5000
            });
            return;
        }

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

            let propertyTaken = await this.plugin.user.getProperty('', 'quiz' + analyticsKey);
            console.log('Property Taken:', propertyTaken);

            const popupId = await this.plugin.menus.displayPopup({
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
    
        // Send the quiz data to the panel
            setTimeout(() => {
                this.plugin.menus.postMessage({
                    action: 'update-quiz',
                    content: questions,  // Send already parsed object
                    analytics: analyticsKey, // Send analytics key
                    limitResponse: limitResponse, // Send limit response setting
                    quizTitle: quizTitle,  // Include the quiz title in the message
                    endMessageWin: endMessageWin, // Include the win message in the message
                    endMessageLose: endMessageLose, // Include the lose message in the message
                    timerOn: timerOn, // Include the timer status in the message
                    timerDuration: timerDuration, // Include the timer duration in the message
                    popupID: popupId
                });
            }, 600); // Delaying the message to ensure the iframe is fully loaded
    
        } catch (error) {
            console.error('Error parsing questions:', error);
            this.isPopupOpen = false; // Reset the flag in case of an error
        }
    }
        
    
    
}

/**
 * Component that creates a Multiple Question multiple-choice quiz.
 */
class SingleQuizComponent extends BaseComponent {

    /** Called when the component is clicked */
    async onClick() {
        // Check if the user has already completed the quiz
        let limitResponse = this.getField('limitResponse');  // Retrieve the limitResponse setting
        let quizTakenName = 'quiz' + this.getField('analyticsKey'); 
        let properties = await this.plugin.user.getProperty('', quizTakenName);

        // If property is undefined, set it to false and retry
        if (properties === undefined) {
            await this.plugin.user.setProperties({ [quizTakenName]: false });
            properties = await this.plugin.user.getProperty('', quizTakenName);
        }

        if ((limitResponse === 'Any Finish' || limitResponse === 'All Correct') && properties === true) {
            console.log('User has already completed the quiz');
            this.plugin.menus.toast({
                text: 'You have already taken this quiz.',
                duration: 5000
            });
            return;
        }

        if (this.isPopupOpen) {
            console.log('Popup is already open'); // Prevent opening another popup
            return;
        }

        let analyticsKey = this.getField('analyticsKey'); // Retrieve the analytics key
        try {
            const questionsJson = this.getField('questions');
            const questions = JSON.parse(questionsJson); // Parse JSON string to array of questions
            const randomQuestion = this.getField('question-random'); // Retrieve the random question status
            const quizTitle = this.getField('quizTitle'); // Retrieve the quiz title
            const endMessageWin = this.getField('endMessageWin') || 'Congratulations! You answered correctly!'; // Default win message
            const endMessageLose = this.getField('endMessageLose') || 'Try again next time'; // Default lose message
            const timerOn = this.getField('timerOn'); // Retrieve the timer status
            const timerDuration = this.getField('timerDuration'); // Retrieve the timer duration
            const limitResponse = this.getField('limitResponse');  // Retrieve the limitResponse setting
            console.log('Quiz Panel Opened');                                                                  // Console Log ()
            
            this.isPopupOpen = true; // Set the flag to true

            const popupId = await this.plugin.menus.displayPopup({
                title: 'Popup Quiz',
                panel: {
                    iframeURL: this.paths.absolute('./quiz-panel-singlequestion.html'),
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
                this.plugin.menus.postMessage({
                    action: 'update-quiz',
                    content: questions,  // Send already parsed object
                    randomQuestion: randomQuestion, // Send random question status
                    analytics: analyticsKey, // Send analytics key
                    limitResponse: limitResponse, // Send limit response setting
                    quizTitle: quizTitle,  // Include the quiz title in the message
                    endMessageWin: endMessageWin, // Include the win message in the message
                    endMessageLose: endMessageLose, // Include the lose message in the message
                    timerOn: timerOn, // Include the timer status in the message
                    timerDuration: timerDuration, // Include the timer duration in the message
                    popupID: popupId
                });
            }, 600); // Delaying the message to ensure the iframe is fully loaded
    
        } catch (error) {
            console.error('Error parsing questions:', error);
            this.isPopupOpen = false; // Reset the flag in case of an error
        }
    }
        
    
    
}


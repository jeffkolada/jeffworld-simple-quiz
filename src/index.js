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
            { id: 'section-end-message', name: 'Quiz Game Over Messages', type: 'section' },
                { id: 'endMessageWin', name: 'Game Over Win', type: 'textarea', help: 'Message to display at the end when user gets all the answers correct.', default: 'Congratulations! You answered all questions correctly!' },
                { id: 'endMessageLose', name: 'Game Over Lose', type: 'textarea', help: 'Message to display at the end when user gets any answers wrong.', default: 'Keep practicing to improve your score.' },
                { id: 'gameOverModal', name: 'Quiz Aready Taken', type: 'textarea', help: 'If the quiz cannot be retaken, this message appears once completed.', default: 'You have already taken this quiz.' },
            { id: 'section-analytics', name: 'Quiz Analytics & Action Setup', type: 'section', },
                { id: 'action-id', name: 'Trigger Action ID', type: 'text', help: 'Trigger an action when the quiz has been completed successfully, based on a unique ID.', default: 'none' },
                { id: 'analyticsKey', name: 'Analytics Name', type: 'text', help: 'Name for the analytics event. The value sent will be equal to the number of correct answers.' },
                { id: 'limitResponse', name: 'Limit Replay After:', type: 'select', values: ['None', 'Any Finish', 'All Correct'], help: 'When an option is selected, the quiz cannot be re-taken after the finishing the quiz or after answering all correctly. "Quiz Taken" state is tracked by Analytics Name.', default: 'None' },
            { id: 'section-timer', name: 'Quiz Timer Settings', type: 'section' },
                { id: 'timerOn', name: 'Timer Enabled', type: 'checkbox', help: 'Enable or Disable the Timer feature.', default: false},
                { id: 'timerDuration', name: 'Timer Duration', type: 'number', help: 'Time in seconds for each question.', default: 10}, 
                { id: 'section-helpguide', name: 'Quiz Creator Help Guide', type: 'section' },
                { id: 'helpGuide', name: 'Help Guide', type: 'button', help: 'Provide instructions or a guide for the quiz' }
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
            { id: 'section-end-message', name: 'Quiz Game Over Messages', type: 'section' },
                { id: 'endMessageWin', name: 'Game Over Win', type: 'textarea', help: 'Message to display at the end when user gets all the answers correct.', default: 'Congratulations! You answered correctly!' },
                { id: 'endMessageLose', name: 'Game Over Lose', type: 'textarea', help: 'Message to display at the end when user gets any answers wrong.', default: 'Try again next time.' },
                { id: 'gameOverModal', name: 'Quiz Aready Taken', type: 'textarea', help: 'If the quiz cannot be retaken, this message appears once completed.', default: 'You have already taken this quiz.' },
            { id: 'section-analytics', name: 'Quiz Analytics & Action Setup', type: 'section', },
                { id: 'action-id', name: 'Trigger Action ID', type: 'text', help: 'Trigger an action when the quiz has been completed successfully, based on a unique ID.', default: 'none' },
                { id: 'analyticsKey', name: 'Analytics Name', type: 'text', help: 'Name for the analytics event. The value sent will be equal to the number of correct answers.' },
                { id: 'limitResponse', name: 'Limit Replay After:', type: 'select', values: ['None', 'Any Finish', 'All Correct'], help: 'When an option is selected, the quiz cannot be re-taken after the finishing the quiz or after answering all correctly. "Quiz Taken" state is tracked by Analytics Name.', default: 'None' },
            { id: 'section-timer', name: 'Quiz Timer Settings', type: 'section' },
                { id: 'timerOn', name: 'Timer Enabled', type: 'checkbox', help: 'Enable or Disable the Timer feature.', default: false },
                { id: 'timerDuration', name: 'Timer Duration', type: 'number', help: 'Time in seconds for each question.', default: 10 }, 
            { id: 'section-helpguide', name: 'Quiz Creator Help Guide', type: 'section' },
                { id: 'helpGuide', name: 'Help Guide', type: 'button', help: 'Provide instructions or a guide for the quiz' }
            ]
        });

        this.objects.registerComponent(SingleQuizActivityComponent, {
            id: 'activity-simplequiz',
            name: 'Activity: Simple Quiz',
            description: 'A single question Quiz'
        })
    }


    // When quiz is finished, send Analytics event with Results
    async onMessage(msg) {
      console.log('[QUIZ BASEPLUGIN] onMessage : ', msg);
      const { action, result, response, correctAnswer, analytics, allCorrect, limitResponse, actionID, popupID, IS_ACTIVITY, adminUser, zoneId, options} = msg; 
      if (msg.action == 'request-quiz') {
        
      }

      if (msg.action == 'send-results') {
            // ACTIVITY COMPONENT
            if (msg.isActivityComponent) {
                const respondingUserId = await this.user.getID();
                options.response = response;
                options.correctAnswer = correctAnswer;

                const payload = {
                    activityType    : 'quiz',
                    activityID      : actionID,
                    adminUser       : adminUser,
                    zoneId          : zoneId        || null,
                    options         : options       || {},
                    respondingUserId,
                    result          : msg.result,
                    response        : response,
                    correctAnswer   : correctAnswer,
                }
                this.hooks.trigger('activity-response', payload);

                // Optionally close the popup quickly (to match original behavior)
                if (msg.popupID) setTimeout(() => this.menus.closePopup(msg.popupID), 3000);

                return; // ← IMPORTANT: do NOT run the old analytics
            }

            // STANDARD QUIZ
            let analyticsKey = await msg.analytics;
            let result = await msg.result;
            let allCorrect = await msg.allCorrect;
            let limitResponse = await msg.limitResponse;
            let quizActionID = await msg.actionID;
            let userID = await this.user.getID();
            let popupID = await msg.popupID;

            this.user.sendAnalytics(analyticsKey, result);

            if (allCorrect === true){
                this.hooks.trigger('jeffworld.actions.play', { actionID: quizActionID, userID: userID, allCorrect: allCorrect });
                };

            // Mark the quiz as completed
            let quizTakenName = 'quiz' + analyticsKey;
            if (limitResponse === 'Any Finish' || (limitResponse === 'All Correct' && allCorrect)) {
                await this.user.setProperties({ [quizTakenName]: true })
            };
//            console.log('Quiz Completed:', quizTakenName, "Closing Popup:", popupID);
            setTimeout(() => {
                this.menus.closePopup(popupID);
              }, 3000);
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
        let gameOverModal = this.getField('gameOverModal');

        // If property is undefined, set it to false and retry
        if (properties === undefined) {
            await this.plugin.user.setProperties({ [quizTakenName]: false });
            properties = await this.plugin.user.getProperty('', quizTakenName);
        }

        if ((limitResponse === 'Any Finish' || limitResponse === 'All Correct') && properties === true) {
//            console.log('User has already completed the quiz');
            this.plugin.menus.toast({
                text: gameOverModal || 'You have already taken this quiz.',
                duration: 3000
            });
            return;
        }

        if (this.isPopupOpen) {
//            console.log('[QUIZ ACTIVITY] Popup is already open'); // Prevent opening another popup
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
            const actionID = this.getField('action-id'); // Retrieve the action ID
//            console.log('[QUIZ ACTIVITY] Panel Opened');                                                                  // Console Log ()
            
            this.isPopupOpen = true; // Set the flag to true

            let propertyTaken = await this.plugin.user.getProperty('', 'quiz' + analyticsKey);
//            console.log('[QUIZ ACTIVITY] Property Taken:', propertyTaken);

            const popupID = await this.plugin.menus.displayPopup({
                title: 'Multiple Choice Quiz',
                panel: {
                    iframeURL: this.paths.absolute('./quiz-panel.html'),
                    width: 500,
                    height: 500,
                    onClose: () => {
//                        console.log("Popup closed");
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
                    timerOn: true, // Include the timer status in the message
                    timerDuration: timerDuration, // Include the timer duration in the message
                    popupID: popupID,
                    actionID: actionID
                });
            }, 1250); // Delaying the message to ensure the iframe is fully loaded
    
        } catch (error) {
            console.error('Error parsing questions:', error);
            this.isPopupOpen = false; // Reset the flag in case of an error
        }
    }
        
    async onAction(id) {
        if (id == 'helpGuide') {
//        console.log('Open the Help Guide');
        await this.plugin.menus.displayPopup({
            title: 'Quiz Creator Help Guide',
            panel: {
                iframeURL: this.paths.absolute('./help-panel.html'),
                width: 720,
                height: 640,
                onClose: () => {
//                    console.log("Help Guide closed");
                },
            }
        });
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
        let gameOverModal = this.getField('gameOverModal');
        let options = {};

        // If property is undefined, set it to false and retry
        if (properties === undefined) {
            await this.plugin.user.setProperties({ [quizTakenName]: false });
            properties = await this.plugin.user.getProperty('', quizTakenName);
        }

        if ((limitResponse === 'Any Finish' || limitResponse === 'All Correct') && properties === true) {
//            console.log('User has already completed the quiz');
            this.plugin.menus.toast({
                text: gameOverModal || 'You have already taken this quiz.',
                duration: 3000
            });
            return;
        }

        if (this.isPopupOpen) {
//            console.log('Popup is already open'); // Prevent opening another popup
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
            const actionID = this.getField('action-id'); // Retrieve the action ID
//            console.log('Quiz Panel Opened');                                                                  // Console Log ()
            
            this.isPopupOpen = true; // Set the flag to true

            const popupID = await this.plugin.menus.displayPopup({
                title: 'Popup Quiz',
                panel: {
                    iframeURL: this.paths.absolute('./quiz-panel-singlequestion.html'),
                    width: 500,
                    height: 500,
                    onClose: () => {
//                        console.log("Popup closed");
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
                    options: options,
                    popupID: popupID,
                    actionID: actionID
                });
            }, 1250); // Delaying the message to ensure the iframe is fully loaded
    
        } catch (error) {
            console.error('Error parsing questions:', error);
            this.isPopupOpen = false; // Reset the flag in case of an error
        }
    }
        
    async onAction(id) {
        if (id == 'helpGuide') {
//        console.log('Open the Help Guide');
        this.plugin.menus.displayPopup({
            title: 'Quiz Creator Help Guide',
            panel: {
                iframeURL: this.paths.absolute('./help-panel.html'),
                width: 720,
                height: 640,
                onClose: () => {
//                    console.log("Help Guide closed");
                },
            }
        });
        }
    }
}





class SingleQuizActivityComponent extends BaseComponent {

    // Unprefixed: the platform prepends your plugin ID when attached to a zone
    static id = 'activity-simplequiz'
    static name = 'Simple Quiz'

    myUserID = null

    activityDescribe = (payload = {}) => {
        const cid = payload && payload.componentID;
        if (cid && !cid.endsWith(`:${this.constructor.id}`)) return null;
        if (payload?.zoneId && payload.zoneId !== this.objectID) return null;

        console.log('[QUIZ ACTIVITY] describe called on', this.objectID || '(no object)', 'returns type=alertness');
        return {
        // REQUIRED
        type: 'simplequiz',
        title: 'Which answer is correct?',
        shortTitle: 'Quiz',
        description: 'A simple multiple-choice quiz',
        icon: this.paths.absolute('icons/quiz.svg'),   // put an icon file if you have one
        supportsDuration: true,
        optionsSchema: {
            type: 'object',
            properties: {
                title: { type: 'string', title: 'Question', default: 'Which is the Correct Answer?' },
                answerChoices: {
                    ui: 'group',
                    type: 'object',
                    title: 'Answer Choices',
                    order: ['A','B','C','D'], // render order
                    properties: {
                        A: { type: 'string', default: '',   placeholder: 'Option A' },
                        B: { type: 'string', default: '', placeholder: 'Option B' },
                        C: { type: 'string', default: '',    placeholder: 'Option C (optional)' },
                        D: { type: 'string', default: '',           placeholder: 'Option D (optional)' }
                    }
                    },
                correctAnswer: { enum: ['A', 'B', 'C', 'D' ], title: 'Correct Answer', default: 'A' },
                duration: { type: 'number', title: 'Duration (ms)', default: 10000, minimum: 1000 }
            }
        },

        componentID: `${this.plugin.constructor.id}:${this.constructor.id}`,
        zoneId: this.objectID || null,
        vendor: (this.plugin && this.plugin.constructor && this.plugin.constructor.id) || null
        }
    }

    buildQuestionsFromOptions(options = {}) {
        const q = String(options.question || options.title || 'Untitled question');

        // 1) Collect raw choices from preferred/new keys, then legacy keys
        let base = Array.isArray(options.answers) ? options.answers
                : Array.isArray(options.answerChoices) ? options.answerChoices
                : [options.optionA, options.optionB, options.optionC, options.optionD];

        base = Array.isArray(base) ? base : [];
        // Keep original indices so we can remap the "correct" answer after filtering blanks
        let entries = base
            .map((v, i) => ({ text: (v == null ? '' : String(v).trim()), i }))
            .filter(e => e.text.length > 0);            // <-- drop empty choices

        // 2) Determine the originally selected "correct" index (before filtering)
        const letterMap = { A:0, B:1, C:2, D:3 };
        let selectedOriginalIndex = 0;
        if (typeof options.correct === 'number' && Number.isFinite(options.correct)) {
            selectedOriginalIndex = options.correct;
        } else if (options.correctAnswer != null) {   // supports your schema's 'correctAnswer'
            const k = String(options.correctAnswer).trim().toUpperCase();
            selectedOriginalIndex = letterMap[k] ?? 0;
        } else if (options.correctChoice != null) {   // and 'correctChoice' if used elsewhere
            const k = String(options.correctChoice).trim().toUpperCase();
            selectedOriginalIndex = letterMap[k] ?? 0;
        }

        // 3) Remap "correct" to the new index after filtering out empties
        let correct = 0;
        const remapped = entries.findIndex(e => e.i === selectedOriginalIndex);
        correct = remapped >= 0 ? remapped : 0;

        // 4) Ensure at least two choices; pad with sensible defaults if needed
        if (entries.length < 2) {
            const defaults = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
            for (let j = 0; entries.length < 2 && j < defaults.length; j++) {
            entries.push({ text: defaults[j], i: 100 + j });
            }
            // If original correct vanished and we padded, keep correct at 0
            if (correct >= entries.length) correct = 0;
        }

        const choices = entries.map(e => e.text);

        return [{
            question: q,
            choices,     // no empty strings included
            correct      // index aligned to filtered choices
        }];
    }

    // Start handler (arrow fn keeps `this`)
    activityStart = async (payload) => {
        console.log('[QUIZ ACTIVITY] ActivityStart ', payload);
        // ACTIVITY FILTERS & REQUIRED DATA
        const myID = this.myUserID || await this.plugin.user.getID();
        const byType = payload?.type === 'simplequiz';
        const byID   = typeof payload?.componentID === 'string' && payload.componentID.endsWith(':activity-simplequiz');
        if (!(byType || byID)) return false;
        if (payload?.targetUserId && payload.targetUserId !== myID) return false; // user filter
        if (payload?.zoneId && payload.zoneId !== this.objectID) return false;    // zone filter
        // END ACTIVITY DATA

        const { activityID, adminUser, zoneId, options = {} } = payload;

        // The quiz plugin’s own action/trigger id (unchanged semantics)
        console.log('[QUIZ ACTIVITY] Started with options:', options);

        // Build the quiz content from Manager options
        const content = this.buildQuestionsFromOptions(options);
        const durationMs     = Math.max(1, Number(options.duration || 6000));
        const timerOn        = true;                 // panel expects a boolean; we turn it on when duration is provided
        const timerDuration  = (durationMs/1000);
        const randomQuestion = false;
        const limitResponse  = false;
        const quizTitle      = String(options.title || 'Quiz');
        const endMessageWin  = 'Congratulations! You answered correctly!';
        const endMessageLose = `Sorry, that's incorrect.`;
        const actionID       = activityID;
        const isActivityComponent = true;


        // Open the panel and pass data (replaces getField()-based config)
        const popupID = await this.plugin.menus.displayPopup({
            title: quizTitle,
            panel: {
            iframeURL: this.paths.absolute('./quiz-panel-singlequestion.html'),
            width: 500,
            height: 500,
            onClose: () => { this.isPopupOpen = false; }
            }
        });
        this.isPopupOpen = true;

        const panelContent = {
            content, randomQuestion, 
            limitResponse, quizTitle, 
            endMessageWin, endMessageLose, 
            timerOn, timerDuration,
            popupID, actionID, activityID,
            isActivityComponent, adminUser, 
            zoneId, options
        }
        setTimeout(() => {this.updatePanelContent(panelContent)}, 1250)

        return true;
    };

    async updatePanelContent(data) {
        const {content, randomQuestion, limitResponse, quizTitle, endMessageWin, endMessageLose, timerOn,
            timerDuration, popupID, actionID, activityID, isActivityComponent, adminUser, zoneId, options} = data; 
            
        this.plugin.menus.postMessage({
            action: 'update-quiz',
            content,                 // ← [{ question, choices, correct }]
            randomQuestion,
            limitResponse,
            quizTitle,
            endMessageWin,
            endMessageLose,
            timerOn,
            timerDuration,
            popupID,
            actionID,
            activityID,
            isActivityComponent: true,
            adminUser,
            zoneId,
            options
            });
        console.log('[QUIZ ACTIVITY] Update Panel Content: ', data);
    }

    async sendResponse(payload, response) {
        const { activityID, adminUser, zoneId, options = {} } = payload;
        const myID = this.myUserID || await this.plugin.user.getID();

        this.plugin.messages.send({
            action: 'activity-response',
            global: true,
            payload: {
            activityType: 'quiz',
            activityID,
            zoneId,
            options: { ...options, respondingUserId: myID },
            respondingUserId: myID,
            response
            }
        }, true, adminUser);
    }

    async onMessage(msg) {
    console.log('[QUIZ ACTIVITY] Message received in Quiz Activity Component: ', msg);
        if (msg?.action !== 'send-results') {

            const actionID = String(msg.actionID || '');

            if (!actionID.startsWith('quiz-')) {        // Only re-route if this quiz was launched by the Activity Manager:
                return false; 
            }

            const zoneId     = msg.zoneId || this.objectID || null;
            const options    = msg.options || {}; 
            const result = msg.result || {};
            const response = {
                ...result,
                allCorrect: !!msg.allCorrect
            };

            // Emit the standard Activities response (updates counts, archive, etc.)
            await this.sendResponse(
                { activityID, adminUser: null, zoneId, options },
                response
            );

            // Close the popup (mirrors the third-party plugin behavior)
            if (msg.popupID) {
                setTimeout(() => this.plugin.menus.closePopup(msg.popupID), 2000);
            }

        }

        if (msg.action === 'request-quiz') {
            this.updatePanelContent(msg)
        }
    return true;
    }


    async onLoad() {
    this.myUserID = await this.plugin.user.getID();

    // Register on the plugin’s hook bus (from a component use `this.plugin.hooks`)
    this.plugin.hooks.addHandler('vatom-activities-start', this.activityStart);
    this.plugin.hooks.addHandler('vatom-activities-info',  this.activityDescribe);

    const objId = this.objectID || '(no object id)'
    console.log('[QUIZ ACTIVITY] Loaded on', objId, 'user', this.myUserID)
    console.log('[QUIZ ACTIVITY] onLoad → handlers registered. objectID=', this.objectID || '(no object)')
    }

    async onUnload() {
    this.plugin.hooks.removeHandler('vatom-activities-start', this.activityStart)
    this.plugin.hooks.removeHandler('vatom-activities-info',  this.activityDescribe)
    }

}

export const components = [ SingleQuizActivityComponent ]
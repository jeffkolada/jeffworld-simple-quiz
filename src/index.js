import { BasePlugin, BaseComponent } from 'vatom-spaces-plugins'

export default class MultipleChoiceQuizPlugin extends BasePlugin {

    static id = "multiple-choice-quiz";
    static name = "Multiple Choice Quiz Plugin";
    static description = "Creates a multiple-choice quiz when the component is clicked.";

    _pendingQuizData = null;

    onLoad() {
        this.objects.registerComponent(QuizComponent, {
            id: 'quiz-component',
            name: 'Quiz Multiple Questions',
            description: 'Creates a multiple-choice quiz when the object is clicked.',
            settings: obj => [
                { id: 'quizTitle', name: 'Quiz Title', type: 'text', help: 'Title of the quiz.', default: 'Multiple Choice Quiz' },
                { id: 'questions', name: 'Questions', type: 'textarea', help: 'JSON array of question objects. Each object needs "question", "choices", and "correct" (0-based index). Optional: "explanation".' },
                ...buildSharedSettings({
                    endMessageWin:  'Congratulations! You answered all questions correctly!',
                    endMessageLose: 'Keep practicing to improve your score.'
                })
            ]
        });

        this.objects.registerComponent(SingleQuizComponent, {
            id: 'single-quiz-component',
            name: 'Quiz Single Question',
            description: 'Creates a single question multiple-choice quiz when the object is clicked. If multiple questions are provided, the question can be randomized.',
            settings: obj => [
                { id: 'quizTitle', name: 'Quiz Title', type: 'text', help: 'Title of the quiz.', default: 'Pop Quiz' },
                { id: 'questions', name: 'Question', type: 'textarea', help: 'JSON array of question objects. By default the first question is used. Each object needs "question", "choices", and "correct" (0-based index). Optional: "explanation".' },
                { id: 'question-random', name: 'Randomize Question', type: 'checkbox', help: 'If multiple questions are provided, this will randomize the single question that appears.', default: false },
                ...buildSharedSettings({
                    endMessageWin:  'Congratulations! You answered correctly!',
                    endMessageLose: 'Try again next time.'
                })
            ]
        });

        this.objects.registerComponent(SingleQuizActivityComponent, {
            id: 'activity-simplequiz',
            name: 'Activity: Simple Quiz',
            description: 'A single question Quiz'
        });
    }

    async onMessage(msg) {
        console.log('[QUIZ BASEPLUGIN] onMessage : ', msg);
        const { actionID, adminUser, allCorrect, analytics, correctAnswer, isActivityComponent, limitResponse, options, popupID, response, result, zoneId } = msg;

        if (msg.action === 'request-quiz') {
            if (this._pendingQuizData) this.menus.postMessage(this._pendingQuizData);
            return;
        }

        if (msg.action === 'send-results') {
            if (isActivityComponent) {
                const respondingUserId = await this.user.getID();
                const respondingUserName = await this.user.getDisplayName();
                options.correctAnswer = correctAnswer;

                const payload = {
                    activityType : 'simplequiz',
                    activityID   : actionID,
                    adminUser,
                    zoneId       : zoneId || null,
                    options      : options || {},
                    respondingUserId,
                    respondingUserName,
                    responseTime : new Date().toISOString(),
                    result,
                    response,
                    correctAnswer,
                };
                this.hooks.trigger('activity-response', payload);

                if (popupID) setTimeout(() => this.menus.closePopup(popupID), 3000);
                return;
            }

            // STANDARD QUIZ
            const userID = await this.user.getID();

            if (analytics) this.user.sendAnalytics(analytics, result);

            if (allCorrect === true) {
                this.hooks.trigger('jeffworld.actions.play', { actionID, userID, allCorrect });
            }

            const quizTakenName = analytics ? 'quiz' + analytics : null;
            if (quizTakenName && (limitResponse === 'Any Finish' || (limitResponse === 'All Correct' && allCorrect))) {
                await this.user.setProperties({ [quizTakenName]: true });
            }

            setTimeout(() => this.menus.closePopup(popupID), 3000);
        }
    }
}

// Returns the settings entries shared by both quiz component types.
// End-message defaults differ per component so are passed as arguments.
function buildSharedSettings({ endMessageWin, endMessageLose }) {
    return [
        { id: 'section-end-message', name: 'Quiz Game Over Messages', type: 'section' },
        { id: 'endMessageWin',  name: 'Game Over Win',        type: 'textarea', help: 'Message to display when the user answers correctly.',        default: endMessageWin },
        { id: 'endMessageLose', name: 'Game Over Lose',       type: 'textarea', help: 'Message to display when the user answers incorrectly.',      default: endMessageLose },
        { id: 'gameOverModal',  name: 'Quiz Already Taken',   type: 'textarea', help: 'If the quiz cannot be retaken, this message appears once completed.', default: 'You have already taken this quiz.' },
        { id: 'section-analytics', name: 'Quiz Analytics & Action Setup', type: 'section' },
        { id: 'action-id',     name: 'Trigger Action ID', type: 'text',     help: 'Trigger an action when the quiz has been completed successfully, based on a unique ID.', default: 'none' },
        { id: 'analyticsKey',  name: 'Analytics Name',    type: 'text',     help: 'Name for the analytics event. The value sent will be equal to the number of correct answers.' },
        { id: 'limitResponse', name: 'Limit Replay After:', type: 'select', values: ['None', 'Any Finish', 'All Correct'], help: 'When an option is selected, the quiz cannot be re-taken after finishing or after answering all correctly. State is tracked by Analytics Name.', default: 'None' },
        { id: 'section-timer', name: 'Quiz Timer Settings', type: 'section' },
        { id: 'timerOn',       name: 'Timer Enabled',   type: 'checkbox', help: 'Enable or Disable the Timer feature.',               default: false },
        { id: 'timerDuration', name: 'Timer Duration',  type: 'number',   help: 'Time in seconds for each question.',                 default: 10 },
        { id: 'section-helpguide', name: 'Quiz Creator Help Guide', type: 'section' },
        { id: 'helpGuide',     name: 'Help Guide',      type: 'button',   help: 'Provide instructions or a guide for the quiz' }
    ];
}

/**
 * Shared base for QuizComponent and SingleQuizComponent.
 * Handles the limit-check, popup lifecycle, caching, and error toast
 * so each subclass only needs to supply a panel URL and a data builder.
 */
class QuizBaseComponent extends BaseComponent {

    async _checkAndOpenQuiz({ panelURL, buildQuizData }) {
        const limitResponse  = this.getField('limitResponse');
        const analyticsKey   = this.getField('analyticsKey') || '';
        const quizTakenName  = analyticsKey ? 'quiz' + analyticsKey : null;
        const gameOverModal  = this.getField('gameOverModal');
        let properties = quizTakenName ? await this.plugin.user.getProperty('', quizTakenName) : null;

        if (quizTakenName && properties === undefined) {
            await this.plugin.user.setProperties({ [quizTakenName]: false });
            properties = await this.plugin.user.getProperty('', quizTakenName);
        }

        if ((limitResponse === 'Any Finish' || limitResponse === 'All Correct') && properties === true) {
            this.plugin.menus.toast({ text: gameOverModal || 'You have already taken this quiz.', duration: 3000 });
            return;
        }

        if (this.isPopupOpen) return;

        // Parse fields before opening the popup so a bad JSON config shows an
        // error immediately without leaving an empty popup on screen.
        let quizData;
        try {
            quizData = buildQuizData({ analyticsKey, limitResponse });
        } catch (error) {
            console.error('Error parsing questions:', error);
            this.plugin.menus.toast({
                text: 'Quiz: invalid JSON in the Questions field — please check the configuration.',
                duration: 5000
            });
            return;
        }

        this.isPopupOpen = true;
        const popupID = await this.plugin.menus.displayPopup({
            title: quizData.quizTitle || 'Quiz',
            panel: {
                iframeURL: this.paths.absolute(panelURL),
                width: 500,
                height: 500,
                onClose: () => { this.isPopupOpen = false; },
            }
        });

        const fullData = { action: 'update-quiz', ...quizData, popupID };
        setTimeout(() => {
            this.plugin._pendingQuizData = fullData;
            this.plugin.menus.postMessage(fullData);
        }, 1250);
    }

    async onAction(id) {
        if (id === 'helpGuide') {
            await this.plugin.menus.displayPopup({
                title: 'Quiz Creator Help Guide',
                panel: {
                    iframeURL: this.paths.absolute('./help-panel.html'),
                    width: 720,
                    height: 640,
                    onClose: () => {},
                }
            });
        }
    }
}

class QuizComponent extends QuizBaseComponent {

    async onClick() {
        await this._checkAndOpenQuiz({
            panelURL: './quiz-panel.html',
            buildQuizData: ({ analyticsKey, limitResponse }) => ({
                content:        JSON.parse(this.getField('questions')),
                analytics:      analyticsKey,
                limitResponse,
                quizTitle:      this.getField('quizTitle'),
                endMessageWin:  this.getField('endMessageWin')  || 'Congratulations! You answered all questions correctly!',
                endMessageLose: this.getField('endMessageLose') || 'Keep practicing to improve your score.',
                timerOn:        this.getField('timerOn'),
                timerDuration:  this.getField('timerDuration'),
                actionID:       this.getField('action-id'),
            })
        });
    }
}

class SingleQuizComponent extends QuizBaseComponent {

    async onClick() {
        await this._checkAndOpenQuiz({
            panelURL: './quiz-panel-singlequestion.html',
            buildQuizData: ({ analyticsKey, limitResponse }) => ({
                content:        JSON.parse(this.getField('questions')),
                randomQuestion: this.getField('question-random'),
                analytics:      analyticsKey,
                limitResponse,
                quizTitle:      this.getField('quizTitle'),
                endMessageWin:  this.getField('endMessageWin')  || 'Congratulations! You answered correctly!',
                endMessageLose: this.getField('endMessageLose') || 'Try again next time',
                timerOn:        this.getField('timerOn'),
                timerDuration:  this.getField('timerDuration'),
                options:        {},
                actionID:       this.getField('action-id'),
            })
        });
    }
}

class SingleQuizActivityComponent extends BaseComponent {

    static id = 'activity-simplequiz'
    static name = 'Simple Quiz'

    myUserID = null
    myUserName = null

    activityDescribe = (payload = {}) => {
        const cid = payload && payload.componentID;
        if (cid && !cid.endsWith(`:${this.constructor.id}`)) return null;
        if (payload?.zoneId && payload.zoneId !== this.objectID) return null;

        console.log('[QUIZ ACTIVITY] describe called on', this.objectID || '(no object)');
        return {
            type: 'simplequiz',
            title: 'Which answer is correct?',
            shortTitle: 'Quiz',
            description: 'A simple multiple-choice quiz',
            icon: this.paths.absolute('icon-quiz.png'),
            supportsDuration: true,
            optionsSchema: {
                type: 'object',
                properties: {
                    title: { type: 'string', title: 'Question', default: 'Which is the Correct Answer?', validate: { required: true, minLength: 3 } },
                    answerChoices: {
                        ui: 'group',
                        type: 'object',
                        title: 'Answer Choices',
                        order: ['A', 'B', 'C', 'D'],
                        validate: { minNonEmpty: 2 },
                        properties: {
                            A: { type: 'string', default: '', placeholder: 'Option A' },
                            B: { type: 'string', default: '', placeholder: 'Option B' },
                            C: { type: 'string', default: '', placeholder: 'Option C (optional)' },
                            D: { type: 'string', default: '', placeholder: 'Option D (optional)' }
                        }
                    },
                    correctAnswer: { enum: ['A', 'B', 'C', 'D'], title: 'Correct Answer', default: 'A', validate: { inLettersFrom: 'answerChoices' } },
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

        let base = Array.isArray(options.answerChoices) ? options.answerChoices
                 : [options.optionA, options.optionB, options.optionC, options.optionD];

        base = Array.isArray(base) ? base : [];
        let entries = base
            .map((v, i) => ({ text: (v == null ? '' : String(v).trim()), i }))
            .filter(e => e.text.length > 0);

        const letterMap = { A: 0, B: 1, C: 2, D: 3 };
        let selectedOriginalIndex = 0;
        if (typeof options.correct === 'number' && Number.isFinite(options.correct)) {
            selectedOriginalIndex = options.correct;
        } else if (options.correctAnswer != null) {
            const k = String(options.correctAnswer).trim().toUpperCase();
            selectedOriginalIndex = letterMap[k] ?? 0;
        } else if (options.correctChoice != null) {
            const k = String(options.correctChoice).trim().toUpperCase();
            selectedOriginalIndex = letterMap[k] ?? 0;
        }

        let correct = 0;
        const remapped = entries.findIndex(e => e.i === selectedOriginalIndex);
        correct = remapped >= 0 ? remapped : 0;

        if (entries.length < 2) {
            const defaults = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
            for (let j = 0; entries.length < 2 && j < defaults.length; j++) {
                entries.push({ text: defaults[j], i: 100 + j });
            }
            if (correct >= entries.length) correct = 0;
        }

        return [{ question: q, choices: entries.map(e => e.text), correct }];
    }

    activityStart = async (payload) => {
        const { activityID, activityType, adminUser, options, targetUserId, zoneId } = payload;
        const myID      = this.myUserID   || await this.plugin.user.getID();
        const myUserName = this.myUserName || await this.plugin.user.getDisplayName();
        const byType = payload?.activityType === 'simplequiz';
        const byID   = typeof payload?.componentID === 'string' && payload.componentID.endsWith(':activity-simplequiz');
        if (!(byType || byID)) return false;
        if (payload?.targetUserId && payload.targetUserId !== myID) return false;
        if (payload?.zoneId && payload.zoneId !== this.objectID) return false;

        console.log('[QUIZ ACTIVITY] ActivityStart ', payload);
        console.log('[QUIZ ACTIVITY] Started with options:', options);

        const content        = this.buildQuestionsFromOptions(options);
        const durationMs     = Math.max(1, Number(options.duration || 6000));
        const timerOn        = true;
        const timerDuration  = durationMs / 1000;
        const randomQuestion = false;
        const limitResponse  = false;
        const quizTitle      = String(options.title || 'Quiz');
        const endMessageWin  = 'Congratulations! You answered correctly!';
        const endMessageLose = `Sorry, that's incorrect.`;
        const actionID       = activityID;
        const isActivityComponent = true;

        if (this.isPopupOpen) return false;
        this.isPopupOpen = true;

        const popupID = await this.plugin.menus.displayPopup({
            title: quizTitle,
            panel: {
                iframeURL: this.paths.absolute('./quiz-panel-singlequestion.html'),
                width: 500,
                height: 500,
                onClose: () => { this.isPopupOpen = false; }
            }
        });

        const panelContent = {
            content, randomQuestion,
            limitResponse, quizTitle,
            endMessageWin, endMessageLose,
            timerOn, timerDuration,
            popupID, actionID, activityID, activityType,
            isActivityComponent, adminUser,
            zoneId, options
        };
        setTimeout(() => { this.updatePanelContent(panelContent); }, 1250);

        return true;
    };

    async updatePanelContent(data) {
        const { content, randomQuestion, limitResponse, quizTitle, endMessageWin, endMessageLose, timerOn,
            timerDuration, popupID, actionID, activityID, isActivityComponent, adminUser, zoneId, options } = data;

        const quizData = {
            action: 'update-quiz',
            content,
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
        };
        this.plugin._pendingQuizData = quizData;
        this.plugin.menus.postMessage(quizData);
        console.log('[QUIZ ACTIVITY] Update Panel Content: ', data);
    }

    async onLoad() {
        this.myUserID   = await this.plugin.user.getID();
        this.myUserName = await this.plugin.user.getDisplayName();

        this.plugin.hooks.addHandler('vatom-activities-start', this.activityStart);
        this.plugin.hooks.addHandler('vatom-activities-info',  this.activityDescribe);

        console.log('[QUIZ ACTIVITY] Loaded on', this.objectID || '(no object id)', 'user', this.myUserName);
        console.log('[QUIZ ACTIVITY] onLoad → handlers registered. objectID=', this.objectID || '(no object)');
    }

    async onUnload() {
        this.plugin.hooks.removeHandler('vatom-activities-start', this.activityStart);
        this.plugin.hooks.removeHandler('vatom-activities-info',  this.activityDescribe);
    }
}

export const components = [ SingleQuizActivityComponent ]

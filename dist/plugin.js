(()=>{var e={930:e=>{"undefined"!=typeof BasePlugin&&(e.exports.v=BasePlugin),"undefined"!=typeof BaseComponent&&(e.exports.H=BaseComponent)}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};(()=>{"use strict";n.d(i,{default:()=>m});var e=n(930);function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function r(e,t,n,i,r,o,s){try{var a=e[o](s),u=a.value}catch(e){return void n(e)}a.done?t(u):Promise.resolve(u).then(i,r)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(i,o){var s=e.apply(t,n);function a(e){r(s,i,o,a,u,"next",e)}function u(e){r(s,i,o,a,u,"throw",e)}a(void 0)}))}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function u(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t)}function c(e,t){return c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},c(e,t)}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=h(e);if(t){var r=h(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return d(this,n)}}function d(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(e){l(i,e);var t,n=p(i);function i(){return s(this,i),n.apply(this,arguments)}return u(i,[{key:"onLoad",value:function(){this.objects.registerComponent(y,{id:"quiz-component",name:"Quiz Multiple Questions",description:"Creates a multiple-choice quiz when the object is clicked.",settings:function(e){return[{id:"quizTitle",name:"Quiz Title",type:"text",help:"Title of the quiz.",default:"Multiple Choice Quiz"},{id:"questions",name:"Questions",type:"textarea",help:"JSON string representing quiz questions and choices."},{id:"section-end-message",name:"Game Over Messages",type:"section"},{id:"endMessageWin",name:"Game Over Win",type:"textarea",help:"Message to display at the end when user gets all the answers correct.",default:"Congratulations! You answered all questions correctly!"},{id:"endMessageLose",name:"Game Over Lose",type:"textarea",help:"Message to display at the end when user gets any answers wrong.",default:"Keep practicing to improve your score."},{id:"gameOverModal",name:"Quiz Aready Taken",type:"textarea",help:"If the quiz cannot be retaken, this message appears once completed.",default:"You have already taken this quiz."},{id:"section-analytics",name:"Analytics & Action Setup",type:"section"},{id:"action-id",name:"Action ID",type:"text",help:"Unique identifier for the action.",default:"none"},{id:"analyticsKey",name:"Analytics Name",type:"text",help:"Name for the analytics event. The value sent will be equal to the number of correct answers."},{id:"limitResponse",name:"Limit Replay After:",type:"select",values:["None","Any Finish","All Correct"],help:'When an option is selected, the quiz cannot be re-taken after the finishing the quiz or after answering all correctly. "Quiz Taken" state is tracked by Analytics Name.',default:"None"},{id:"section-timer",name:"Timer Settings",type:"section"},{id:"timerOn",name:"Timer Enabled",type:"checkbox",help:"Enable or Disable the Timer feature.",default:!1},{id:"timerDuration",name:"Timer Duration",type:"number",help:"Time in seconds for each question.",default:10},{id:"section-helpguide",name:"Quiz Creator Help Guide",type:"section"},{id:"helpGuide",name:"Help Guide",type:"button",help:"Provide instructions or a guide for the quiz"}]}}),this.objects.registerComponent(g,{id:"single-quiz-component",name:"Quiz Single Question",description:"Creates a single question multiple-choice quiz when the object is clicked. If multiple questions are provided, the question can be randomized.",settings:function(e){return[{id:"quizTitle",name:"Quiz Title",type:"text",help:"Title of the quiz.",default:"Pop Quiz"},{id:"questions",name:"Question",type:"textarea",help:"JSON string representing quiz question and choices. By default the single question quiz will use the first question provided."},{id:"question-random",name:"Randomize Question",type:"checkbox",help:"If multiple questions are provided, this will randomize the single question that appears.",default:!1},{id:"section-end-message",name:"Game Over Messages",type:"section"},{id:"endMessageWin",name:"Game Over Win",type:"textarea",help:"Message to display at the end when user gets all the answers correct.",default:"Congratulations! You answered correctly!"},{id:"endMessageLose",name:"Game Over Lose",type:"textarea",help:"Message to display at the end when user gets any answers wrong.",default:"Try again next time."},{id:"gameOverModal",name:"Quiz Aready Taken",type:"textarea",help:"If the quiz cannot be retaken, this message appears once completed.",default:"You have already taken this quiz."},{id:"section-analytics",name:"Analytics & Action Setup",type:"section"},{id:"action-id",name:"Action ID",type:"text",help:"Trigger an action based on a unique ID.",default:"none"},{id:"analyticsKey",name:"Analytics Name",type:"text",help:"Name for the analytics event. The value sent will be equal to the number of correct answers."},{id:"limitResponse",name:"Limit Replay After:",type:"select",values:["None","Any Finish","All Correct"],help:'When an option is selected, the quiz cannot be re-taken after the finishing the quiz or after answering all correctly. "Quiz Taken" state is tracked by Analytics Name.',default:"None"},{id:"section-timer",name:"Timer Settings",type:"section"},{id:"timerOn",name:"Timer Enabled",type:"checkbox",help:"Enable or Disable the Timer feature.",default:!1},{id:"timerDuration",name:"Timer Duration",type:"number",help:"Time in seconds for each question.",default:10},{id:"section-helpguide",name:"Quiz Creator Help Guide",type:"section"},{id:"helpGuide",name:"Help Guide",type:"button",help:"Provide instructions or a guide for the quiz"}]}})}},{key:"onMessage",value:(t=o(regeneratorRuntime.mark((function e(t){var n,i,r,o,s,a,u;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("send-results"!=t.action){e.next=26;break}return console.log("Message received in Quiz plugin: ",t),e.next=4,t.analytics;case 4:return n=e.sent,e.next=7,t.result;case 7:return i=e.sent,e.next=10,t.allCorrect;case 10:return r=e.sent,e.next=13,t.limitResponse;case 13:return o=e.sent,e.next=16,t.actionID;case 16:return s=e.sent,e.next=19,this.user.getID();case 19:if(a=e.sent,this.user.sendAnalytics(n,i),!0===r&&this.hooks.trigger("jeffworld.actions.play",{actionID:s,userID:a,allCorrect:r}),u="quiz"+n,!("Any Finish"===o||"All Correct"===o&&r)){e.next=26;break}return e.next=26,this.user.setProperties(f({},u,!0));case 26:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})}]),i}(e.v);f(m,"id","multiple-choice-quiz"),f(m,"name","Multiple Choice Quiz Plugin"),f(m,"description","Creates a multiple-choice quiz when the component is clicked.");var y=function(e){l(r,e);var t,n,i=p(r);function r(){return s(this,r),i.apply(this,arguments)}return u(r,[{key:"onClick",value:(n=o(regeneratorRuntime.mark((function e(){var t,n,i,r,o,s,a,u,l,c,p,d,h,m,y,g=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.getField("limitResponse"),n="quiz"+this.getField("analyticsKey"),e.next=4,this.plugin.user.getProperty("",n);case 4:if(i=e.sent,r=this.getField("gameOverModal"),void 0!==i){e.next=12;break}return e.next=9,this.plugin.user.setProperties(f({},n,!1));case 9:return e.next=11,this.plugin.user.getProperty("",n);case 11:i=e.sent;case 12:if("Any Finish"!==t&&"All Correct"!==t||!0!==i){e.next=16;break}return console.log("User has already completed the quiz"),this.plugin.menus.toast({text:r||"You have already taken this quiz.",duration:3e3}),e.abrupt("return");case 16:if(!this.isPopupOpen){e.next=19;break}return console.log("Popup is already open"),e.abrupt("return");case 19:return o=this.getField("analyticsKey"),e.prev=20,s=this.getField("questions"),a=JSON.parse(s),u=this.getField("quizTitle"),l=this.getField("endMessageWin")||"Congratulations! You answered all questions correctly!",c=this.getField("endMessageLose")||"Keep practicing to improve your score.",p=this.getField("timerOn"),d=this.getField("timerDuration"),h=this.getField("action-id"),console.log("Panel Opened"),this.isPopupOpen=!0,e.next=33,this.plugin.user.getProperty("","quiz"+o);case 33:return m=e.sent,console.log("Property Taken:",m),e.next=37,this.plugin.menus.displayPopup({title:"Multiple Choice Quiz",panel:{iframeURL:this.paths.absolute("./quiz-panel.html"),width:600,height:650,onClose:function(){console.log("Popup closed"),g.isPopupOpen=!1}}});case 37:y=e.sent,setTimeout((function(){g.plugin.menus.postMessage({action:"update-quiz",content:a,analytics:o,limitResponse:t,quizTitle:u,endMessageWin:l,endMessageLose:c,timerOn:p,timerDuration:d,popupID:y,actionID:h})}),600),e.next=45;break;case 41:e.prev=41,e.t0=e.catch(20),console.error("Error parsing questions:",e.t0),this.isPopupOpen=!1;case 45:case"end":return e.stop()}}),e,this,[[20,41]])}))),function(){return n.apply(this,arguments)})},{key:"onAction",value:(t=o(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("helpGuide"!=t){e.next=4;break}return console.log("Open the Help Guide"),e.next=4,this.plugin.menus.displayPopup({title:"Quiz Creator Help Guide",panel:{iframeURL:this.paths.absolute("./help-panel.html"),width:720,height:640,onClose:function(){console.log("Help Guide closed")}}});case 4:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})}]),r}(e.H),g=function(e){l(r,e);var t,n,i=p(r);function r(){return s(this,r),i.apply(this,arguments)}return u(r,[{key:"onClick",value:(n=o(regeneratorRuntime.mark((function e(){var t,n,i,r,o,s,a,u,l,c,p,d,h,m,y,g,b=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.getField("limitResponse"),n="quiz"+this.getField("analyticsKey"),e.next=4,this.plugin.user.getProperty("",n);case 4:if(i=e.sent,r=this.getField("gameOverModal"),void 0!==i){e.next=12;break}return e.next=9,this.plugin.user.setProperties(f({},n,!1));case 9:return e.next=11,this.plugin.user.getProperty("",n);case 11:i=e.sent;case 12:if("Any Finish"!==t&&"All Correct"!==t||!0!==i){e.next=16;break}return console.log("User has already completed the quiz"),this.plugin.menus.toast({text:r||"You have already taken this quiz.",duration:3e3}),e.abrupt("return");case 16:if(!this.isPopupOpen){e.next=19;break}return console.log("Popup is already open"),e.abrupt("return");case 19:return o=this.getField("analyticsKey"),e.prev=20,s=this.getField("questions"),a=JSON.parse(s),u=this.getField("question-random"),l=this.getField("quizTitle"),c=this.getField("endMessageWin")||"Congratulations! You answered correctly!",p=this.getField("endMessageLose")||"Try again next time",d=this.getField("timerOn"),h=this.getField("timerDuration"),m=this.getField("limitResponse"),y=this.getField("action-id"),console.log("Quiz Panel Opened"),this.isPopupOpen=!0,e.next=35,this.plugin.menus.displayPopup({title:"Popup Quiz",panel:{iframeURL:this.paths.absolute("./quiz-panel-singlequestion.html"),width:600,height:650,onClose:function(){console.log("Popup closed"),b.isPopupOpen=!1}}});case 35:g=e.sent,setTimeout((function(){b.plugin.menus.postMessage({action:"update-quiz",content:a,randomQuestion:u,analytics:o,limitResponse:m,quizTitle:l,endMessageWin:c,endMessageLose:p,timerOn:d,timerDuration:h,popupID:g,actionID:y})}),600),e.next=43;break;case 39:e.prev=39,e.t0=e.catch(20),console.error("Error parsing questions:",e.t0),this.isPopupOpen=!1;case 43:case"end":return e.stop()}}),e,this,[[20,39]])}))),function(){return n.apply(this,arguments)})},{key:"onAction",value:(t=o(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:"helpGuide"==t&&(console.log("Open the Help Guide"),this.plugin.menus.displayPopup({title:"Quiz Creator Help Guide",panel:{iframeURL:this.paths.absolute("./help-panel.html"),width:720,height:640,onClose:function(){console.log("Help Guide closed")}}}));case 1:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})}]),r}(e.H)})(),module.exports=i.default})();
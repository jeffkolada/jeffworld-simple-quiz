(()=>{var e={930:e=>{"undefined"!=typeof BasePlugin&&(e.exports.v=BasePlugin),"undefined"!=typeof BaseComponent&&(e.exports.H=BaseComponent)}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var r=t[i]={exports:{}};return e[i](r,r.exports,n),r.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};(()=>{"use strict";n.d(i,{default:()=>m});var e=n(930);function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function o(e,t,n,i,o,r,s){try{var a=e[r](s),u=a.value}catch(e){return void n(e)}a.done?t(u):Promise.resolve(u).then(i,o)}function r(e){return function(){var t=this,n=arguments;return new Promise((function(i,r){var s=e.apply(t,n);function a(e){o(s,i,r,a,u,"next",e)}function u(e){o(s,i,r,a,u,"throw",e)}a(void 0)}))}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function u(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t)}function c(e,t){return c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},c(e,t)}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=h(e);if(t){var o=h(this).constructor;n=Reflect.construct(i,arguments,o)}else n=i.apply(this,arguments);return d(this,n)}}function d(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=function(e){l(i,e);var t,n=p(i);function i(){return s(this,i),n.apply(this,arguments)}return u(i,[{key:"onLoad",value:function(){this.objects.registerComponent(y,{id:"quiz-component",name:"Quiz Multiple Questions",description:"Creates a multiple-choice quiz when the object is clicked.",settings:function(e){return[{id:"quizTitle",name:"Quiz Title",type:"text",help:"Title of the quiz.",default:"Multiple Choice Quiz"},{id:"questions",name:"Questions",type:"textarea",help:"JSON string representing quiz questions and choices.",default:'[{"question": "What does the acronym NFT stand for?", "choices": ["Near-Field Teleport", "Non-Fungible Token", "New-Fangled Technology"], "correct": 1}, {"question": "What is the capital of France?", "choices": ["Paris", "London", "Berlin"], "correct": 0}, {"question": "What is the fastest land animal?", "choices": ["Lion", "Cheetah", "Gazelle"], "correct": 1}]'},{id:"section-end-message",name:"Game Over Messages",type:"section"},{id:"endMessageWin",name:"Game Over Win",type:"textarea",help:"Message to display at the end when user gets all the answers correct.",default:"Congratulations! You answered all questions correctly!"},{id:"endMessageLose",name:"Game Over Lose",type:"textarea",help:"Message to display at the end when user gets any answers wrong.",default:"Keep practicing to improve your score."},{id:"section-analytics",name:"Analytics Setup",type:"section"},{id:"analyticsKey",name:"Analytics Name",type:"text",help:"Name for the analytics event. The value sent will be equal to the number of correct answers."},{id:"section-timer",name:"Timer Settings",type:"section"},{id:"timerOn",name:"Timer Enabled",type:"checkbox",help:"Enable or Disable the Timer feature.",default:!1},{id:"timerDuration",name:"Timer Duration",type:"number",help:"Time in seconds for each question.",default:10}]}}),this.objects.registerComponent(g,{id:"single-quiz-component",name:"Quiz Single Question",description:"Creates a single question multiple-choice quiz when the object is clicked. If multiple questions are provided, the question can be randomized.",settings:function(e){return[{id:"quizTitle",name:"Quiz Title",type:"text",help:"Title of the quiz.",default:"Multiple Choice Quiz"},{id:"question",name:"Question",type:"textarea",help:"JSON string representing quiz question and choices. By default the single question quiz will use the first question provided.",default:'[{"question": "What does the acronym NFT stand for?", "choices": ["Near-Field Teleport", "Non-Fungible Token", "New-Fangled Technology"], "correct": 1}]'},{id:"question-random",name:"Randomize Question",type:"checkbox",help:"If multiple questions are provided, this will randomize the single question that appears.",default:!1},{id:"section-end-message",name:"Game Over Messages",type:"section"},{id:"endMessageWin",name:"Game Over Win",type:"textarea",help:"Message to display at the end when user gets all the answers correct.",default:"Congratulations! You answered correctly!"},{id:"endMessageLose",name:"Game Over Lose",type:"textarea",help:"Message to display at the end when user gets any answers wrong.",default:"Try again next time."},{id:"section-analytics",name:"Analytics Setup",type:"section"},{id:"analyticsKey",name:"Analytics Name",type:"text",help:"Name for the analytics event. The value sent will be equal to the number of correct answers."},{id:"section-timer",name:"Timer Settings",type:"section"},{id:"timerOn",name:"Timer Enabled",type:"checkbox",help:"Enable or Disable the Timer feature.",default:!1},{id:"timerDuration",name:"Timer Duration",type:"number",help:"Time in seconds for each question.",default:10}]}})}},{key:"onMessage",value:(t=r(regeneratorRuntime.mark((function e(t){var n,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.getField("analyticsKey"),"send-results"!=t.action){e.next=10;break}return e.next=4,t.analytics;case 4:return n=e.sent,e.next=7,t.result;case 7:i=e.sent,console.log("Plugin: Send Analytics Values: ",i),this.user.sendAnalytics(n,i);case 10:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})}]),i}(e.v);f(m,"id","multiple-choice-quiz"),f(m,"name","Multiple Choice Quiz Plugin"),f(m,"description","Creates a multiple-choice quiz when the component is clicked.");var y=function(e){l(i,e);var t,n=p(i);function i(){return s(this,i),n.apply(this,arguments)}return u(i,[{key:"onClick",value:(t=r(regeneratorRuntime.mark((function e(){var t,n,i,o,r,s,a,u,l,c=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.isPopupOpen){e.next=3;break}return console.log("Popup is already open"),e.abrupt("return");case 3:return t=this.getField("analyticsKey"),e.prev=4,n=this.getField("questions"),i=JSON.parse(n),o=this.getField("quizTitle"),r=this.getField("endMessageWin")||"Congratulations! You answered all questions correctly!",s=this.getField("endMessageLose")||"Keep practicing to improve your score.",a=this.getField("timerOn"),u=this.getField("timerDuration"),console.log("Panel Opened"),this.isPopupOpen=!0,e.next=16,this.plugin.menus.displayPopup({title:"Multiple Choice Quiz",panel:{iframeURL:this.paths.absolute("./quiz-panel.html"),width:600,height:650,onClose:function(){console.log("Popup closed"),c.isPopupOpen=!1}}});case 16:l=e.sent,setTimeout((function(){c.plugin.menus.postMessage({action:"update-quiz",content:i,analytics:t,quizTitle:o,endMessageWin:r,endMessageLose:s,timerOn:a,timerDuration:u,popupID:l})}),600),e.next=24;break;case 20:e.prev=20,e.t0=e.catch(4),console.error("Error parsing questions:",e.t0),this.isPopupOpen=!1;case 24:case"end":return e.stop()}}),e,this,[[4,20]])}))),function(){return t.apply(this,arguments)})}]),i}(e.H),g=function(e){l(i,e);var t,n=p(i);function i(){return s(this,i),n.apply(this,arguments)}return u(i,[{key:"onClick",value:(t=r(regeneratorRuntime.mark((function e(){var t,n,i,o,r,s,a,u,l,c,p=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.isPopupOpen){e.next=3;break}return console.log("Popup is already open"),e.abrupt("return");case 3:return t=this.getField("analyticsKey"),e.prev=4,n=this.getField("question"),i=JSON.parse(n),o=this.getField("question-random"),r=this.getField("quizTitle"),s=this.getField("endMessageWin")||"Congratulations! You answered correctly!",a=this.getField("endMessageLose")||"Try again next time",u=this.getField("timerOn"),l=this.getField("timerDuration"),console.log("Panel Opened"),this.isPopupOpen=!0,e.next=17,this.plugin.menus.displayPopup({title:"Popup Quiz",panel:{iframeURL:this.paths.absolute("./quiz-panel-singlequestion.html"),width:600,height:650,onClose:function(){console.log("Popup closed"),p.isPopupOpen=!1}}});case 17:c=e.sent,setTimeout((function(){p.plugin.menus.postMessage({action:"update-quiz",content:i,randomQuestion:o,analytics:t,quizTitle:r,endMessageWin:s,endMessageLose:a,timerOn:u,timerDuration:l,popupID:c})}),600),e.next=25;break;case 21:e.prev=21,e.t0=e.catch(4),console.error("Error parsing questions:",e.t0),this.isPopupOpen=!1;case 25:case"end":return e.stop()}}),e,this,[[4,21]])}))),function(){return t.apply(this,arguments)})}]),i}(e.H)})(),module.exports=i.default})();
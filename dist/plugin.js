(()=>{var e={930:e=>{"undefined"!=typeof BasePlugin&&(e.exports.v=BasePlugin),"undefined"!=typeof BaseComponent&&(e.exports.H=BaseComponent)}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var o=t[i]={exports:{}};return e[i](o,o.exports,n),o.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};(()=>{"use strict";n.d(i,{default:()=>y});var e=n(930);function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function r(e,t,n,i,r,o,s){try{var a=e[o](s),u=a.value}catch(e){return void n(e)}a.done?t(u):Promise.resolve(u).then(i,r)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(i,o){var s=e.apply(t,n);function a(e){r(s,i,o,a,u,"next",e)}function u(e){r(s,i,o,a,u,"throw",e)}a(void 0)}))}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function u(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&c(e,t)}function c(e,t){return c=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},c(e,t)}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,i=h(e);if(t){var r=h(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return d(this,n)}}function d(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var y=function(e){l(i,e);var t,n=p(i);function i(){return s(this,i),n.apply(this,arguments)}return u(i,[{key:"onLoad",value:function(){this.objects.registerComponent(m,{id:"quiz-component",name:"Quiz Multiple Questions",description:"Creates a multiple-choice quiz when the object is clicked.",settings:function(e){return[{id:"quizTitle",name:"Quiz Title",type:"text",help:"Title of the quiz.",default:"Multiple Choice Quiz"},{id:"questions",name:"Questions",type:"textarea",help:"JSON string representing quiz questions and choices."},{id:"section-end-message",name:"Game Over Messages",type:"section"},{id:"endMessageWin",name:"Game Over Win",type:"textarea",help:"Message to display at the end when user gets all the answers correct.",default:"Congratulations! You answered all questions correctly!"},{id:"endMessageLose",name:"Game Over Lose",type:"textarea",help:"Message to display at the end when user gets any answers wrong.",default:"Keep practicing to improve your score."},{id:"section-analytics",name:"Analytics Setup",type:"section"},{id:"analyticsKey",name:"Analytics Name",type:"text",help:"Name for the analytics event. The value sent will be equal to the number of correct answers."},{id:"oneTry",name:"One Try",type:"checkbox",help:"If checked, the quiz can only be taken once.",default:!1},{id:"section-timer",name:"Timer Settings",type:"section"},{id:"timerOn",name:"Timer Enabled",type:"checkbox",help:"Enable or Disable the Timer feature.",default:!1},{id:"timerDuration",name:"Timer Duration",type:"number",help:"Time in seconds for each question.",default:10}]}}),this.objects.registerComponent(g,{id:"single-quiz-component",name:"Quiz Single Question",description:"Creates a single question multiple-choice quiz when the object is clicked. If multiple questions are provided, the question can be randomized.",settings:function(e){return[{id:"quizTitle",name:"Quiz Title",type:"text",help:"Title of the quiz.",default:"Pop Quiz"},{id:"question",name:"Question",type:"textarea",help:"JSON string representing quiz question and choices. By default the single question quiz will use the first question provided."},{id:"question-random",name:"Randomize Question",type:"checkbox",help:"If multiple questions are provided, this will randomize the single question that appears.",default:!1},{id:"section-end-message",name:"Game Over Messages",type:"section"},{id:"endMessageWin",name:"Game Over Win",type:"textarea",help:"Message to display at the end when user gets all the answers correct.",default:"Congratulations! You answered correctly!"},{id:"endMessageLose",name:"Game Over Lose",type:"textarea",help:"Message to display at the end when user gets any answers wrong.",default:"Try again next time."},{id:"section-analytics",name:"Analytics Setup",type:"section"},{id:"analyticsKey",name:"Analytics Name",type:"text",help:"Name for the analytics event. The value sent will be equal to the number of correct answers."},{id:"oneTry",name:"One Try",type:"checkbox",help:"If checked, the quiz can only be taken once.",default:!1},{id:"section-timer",name:"Timer Settings",type:"section"},{id:"timerOn",name:"Timer Enabled",type:"checkbox",help:"Enable or Disable the Timer feature.",default:!1},{id:"timerDuration",name:"Timer Duration",type:"number",help:"Time in seconds for each question.",default:10}]}})}},{key:"onMessage",value:(t=o(regeneratorRuntime.mark((function e(t){var n,i,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("send-results"!=t.action){e.next=13;break}return e.next=3,t.analytics;case 3:return n=e.sent,e.next=6,t.result;case 6:return i=e.sent,console.log("Plugin: Send Analytics Values: ",i),this.user.sendAnalytics(n,i),r="quiz"+n,e.next=12,this.user.setProperties(f({},r,!0));case 12:console.log("QuizTaken set to True:",r);case 13:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})}]),i}(e.v);f(y,"id","multiple-choice-quiz"),f(y,"name","Multiple Choice Quiz Plugin"),f(y,"description","Creates a multiple-choice quiz when the component is clicked.");var m=function(e){l(i,e);var t,n=p(i);function i(){return s(this,i),n.apply(this,arguments)}return u(i,[{key:"onClick",value:(t=o(regeneratorRuntime.mark((function e(){var t,n,i,r,o,s,a,u,l,c,p,d,h,y=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.getField("oneTry"),this.getField("allCorrectCheck"),n="quiz"+this.getField("analyticsKey"),e.next=5,this.plugin.user.getProperty("",n);case 5:if(i=e.sent,console.log("Properties:",i),void 0!==i){e.next=13;break}return e.next=10,this.plugin.user.setProperties(f({},n,!1));case 10:return e.next=12,this.plugin.user.getProperty("",n);case 12:i=e.sent;case 13:if(!t||!0!==i){e.next=17;break}return console.log("User has already completed the quiz"),this.plugin.menus.toast({text:"You have already taken this quiz.",duration:5e3}),e.abrupt("return");case 17:if(!this.isPopupOpen){e.next=20;break}return console.log("Popup is already open"),e.abrupt("return");case 20:return r=this.getField("analyticsKey"),e.prev=21,o=this.getField("questions"),s=JSON.parse(o),a=this.getField("quizTitle"),u=this.getField("endMessageWin")||"Congratulations! You answered all questions correctly!",l=this.getField("endMessageLose")||"Keep practicing to improve your score.",c=this.getField("timerOn"),p=this.getField("timerDuration"),console.log("Panel Opened"),this.isPopupOpen=!0,e.next=33,this.plugin.user.setProperties({quizTakenName:!1});case 33:return console.log("Quiz set to False:",n),console.log("Properties updated:",i),e.next=37,this.plugin.user.getProperty("","quiz"+r);case 37:return d=e.sent,console.log("Property Taken:",d),e.next=41,this.plugin.menus.displayPopup({title:"Multiple Choice Quiz",panel:{iframeURL:this.paths.absolute("./quiz-panel.html"),width:600,height:650,onClose:function(){console.log("Popup closed"),y.isPopupOpen=!1}}});case 41:h=e.sent,setTimeout((function(){y.plugin.menus.postMessage({action:"update-quiz",content:s,analytics:r,quizTitle:a,endMessageWin:u,endMessageLose:l,timerOn:c,timerDuration:p,popupID:h})}),600),e.next=49;break;case 45:e.prev=45,e.t0=e.catch(21),console.error("Error parsing questions:",e.t0),this.isPopupOpen=!1;case 49:case"end":return e.stop()}}),e,this,[[21,45]])}))),function(){return t.apply(this,arguments)})}]),i}(e.H),g=function(e){l(i,e);var t,n=p(i);function i(){return s(this,i),n.apply(this,arguments)}return u(i,[{key:"onClick",value:(t=o(regeneratorRuntime.mark((function e(){var t,n,i,r,o,s,a,u,l,c,p,d,h,y=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.getField("oneTry"),n="quiz"+this.getField("analyticsKey"),e.next=4,this.plugin.user.getProperty("",n);case 4:if(i=e.sent,console.log("Properties:",i),void 0!==i){e.next=12;break}return e.next=9,this.plugin.user.setProperties(f({},n,!1));case 9:return e.next=11,this.plugin.user.getProperty("",n);case 11:i=e.sent;case 12:if(!t||!0!==i){e.next=16;break}return console.log("User has already completed the quiz"),this.plugin.menus.toast({text:"You have already taken this quiz.",duration:5e3}),e.abrupt("return");case 16:return r=this.getField("analyticsKey"),e.prev=17,o=this.getField("question"),s=JSON.parse(o),a=this.getField("question-random"),u=this.getField("quizTitle"),l=this.getField("endMessageWin")||"Congratulations! You answered correctly!",c=this.getField("endMessageLose")||"Try again next time",p=this.getField("timerOn"),d=this.getField("timerDuration"),console.log("Panel Opened"),this.isPopupOpen=!0,e.next=30,this.plugin.menus.displayPopup({title:"Popup Quiz",panel:{iframeURL:this.paths.absolute("./quiz-panel-singlequestion.html"),width:600,height:650,onClose:function(){console.log("Popup closed"),y.isPopupOpen=!1}}});case 30:h=e.sent,setTimeout((function(){y.plugin.menus.postMessage({action:"update-quiz",content:s,randomQuestion:a,analytics:r,quizTitle:u,endMessageWin:l,endMessageLose:c,timerOn:p,timerDuration:d,popupID:h})}),600),e.next=38;break;case 34:e.prev=34,e.t0=e.catch(17),console.error("Error parsing questions:",e.t0),this.isPopupOpen=!1;case 38:case"end":return e.stop()}}),e,this,[[17,34]])}))),function(){return t.apply(this,arguments)})}]),i}(e.H)})(),module.exports=i.default})();
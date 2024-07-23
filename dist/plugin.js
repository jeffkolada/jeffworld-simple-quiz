(()=>{var e={930:e=>{"undefined"!=typeof BasePlugin&&(e.exports.v=BasePlugin),"undefined"!=typeof BaseComponent&&(e.exports.H=BaseComponent)}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};(()=>{"use strict";n.d(r,{default:()=>d});var e=n(930);function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},t(e)}function o(e,t,n,r,o,i,u){try{var a=e[i](u),c=a.value}catch(e){return void n(e)}a.done?t(c):Promise.resolve(c).then(r,o)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(r,i){var u=e.apply(t,n);function a(e){o(u,r,i,a,c,"next",e)}function c(e){o(u,r,i,a,c,"throw",e)}a(void 0)}))}}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function c(e,t,n){return t&&a(e.prototype,t),n&&a(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&l(e,t)}function l(e,t){return l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},l(e,t)}function p(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=y(e);if(t){var o=y(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f(this,n)}}function f(e,n){if(n&&("object"===t(n)||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function y(e){return y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},y(e)}function h(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var d=function(e){s(r,e);var t,n=p(r);function r(){return u(this,r),n.apply(this,arguments)}return c(r,[{key:"onLoad",value:function(){this.objects.registerComponent(m,{id:"quiz-component",name:"Quiz Component",description:"Creates a multiple-choice quiz when the component is clicked.",settings:function(e){return[{id:"quizTitle",name:"Quiz Title",type:"text",help:"Title of the quiz."},{id:"questions",name:"Questions",type:"textarea",help:"JSON string representing quiz questions and choices."},{id:"analyticsKey",name:"Analytics Key",type:"text",help:"Key for the analytics event."},{id:"timerOn",name:"Timer Enabled",type:"checkbox",help:"Enable or Disable the Timer feature.",default:!1},{id:"timerDuration",name:"Timer Duration",type:"number",help:"Time in seconds for each question.",default:10}]}})}},{key:"onMessage",value:(t=i(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.getField("analyticsKey"),"send-results"!=t.action){e.next=9;break}return e.next=4,t.analytics;case 4:return n=e.sent,e.next=7,t.result;case 7:r=e.sent,this.user.sendAnalytics(n,r);case 9:case"end":return e.stop()}}),e,this)}))),function(e){return t.apply(this,arguments)})}]),r}(e.v);h(d,"id","multiple-choice-quiz"),h(d,"name","Multiple Choice Quiz Plugin"),h(d,"description","Creates a multiple-choice quiz when the component is clicked.");var m=function(e){s(r,e);var t,n=p(r);function r(){return u(this,r),n.apply(this,arguments)}return c(r,[{key:"onClick",value:(t=i(regeneratorRuntime.mark((function e(){var t,n,r,o,i,u,a,c=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.getField("analyticsKey"),e.prev=1,n=this.getField("questions"),r=JSON.parse(n),o=this.getField("quizTitle"),i=this.getField("timerOn"),u=this.getField("timerDuration"),console.log("Panel Opened"),e.next=10,this.plugin.menus.displayPopup({title:"Multiple Choice Quiz",panel:{iframeURL:this.paths.absolute("./quiz-panel-v2.html"),width:600,height:600,onClose:function(){console.log("Popup closed")}}});case 10:a=e.sent,setTimeout((function(){c.plugin.menus.postMessage({action:"update-quiz",content:r,analytics:t,quizTitle:o,timerOn:i,timerDuration:u,popupID:a})}),600),e.next=17;break;case 14:e.prev=14,e.t0=e.catch(1),console.error("Error parsing questions:",e.t0);case 17:case"end":return e.stop()}}),e,this,[[1,14]])}))),function(){return t.apply(this,arguments)})}]),r}(e.H)})(),module.exports=r.default})();
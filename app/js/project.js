"use strict";function ownKeys(e,t){var r=Object.keys(e);return Object.getOwnPropertySymbols&&r.push.apply(r,Object.getOwnPropertySymbols(e)),t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(r,!0).forEach(function(t){_defineProperty(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):ownKeys(r).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function _defineProperty(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}arrows.length>0&&animateArrows({realPixelsBtn:!0}),arrowsRev.length>0&&animateReverseArrows({smBackBtn:!0}),ScrollReveal().reveal(".c-thanks",_objectSpread({},styles,{viewFactor:.9}));var overlay=document.querySelector(".js-slider__overlay"),handle=document.querySelector(".js-slider__handle"),separator=document.querySelector(".js-slider__separator"),slider=document.querySelector(".js-slider"),leftOffset=slider.getBoundingClientRect().left,sliderWidth=slider.getBoundingClientRect().width,getPos=function(e){return e.pageX-leftOffset};function slide(e,t){if(e<sliderWidth){var r=e/sliderWidth*100;overlay.style.clipPath="\n            polygon(0% 0%, ".concat(r,"% 0%, ").concat(r,"% 100%, 0% 100%)\n        "),separator.style.left="".concat(r,"%"),handle.style.left="".concat(r,"%"),overlay.style.transition=t,separator.style.transition=t,handle.style.transition=t}}handle.addEventListener("mousedown",function(e){e.preventDefault(),slider.addEventListener("mousemove",function e(t){if(t.preventDefault(),0===t.buttons)return slider.style.cursor="pointer",void slider.removeEventListener("mousemove",e);slider.style.cursor="ew-resize",slide(getPos(t),"")})}),handle.addEventListener("touchstart",function(e){function t(e){e.preventDefault(),slide(getPos(e.touches[0]),"")}e.preventDefault();slider.addEventListener("touchmove",t),slider.addEventListener("touchend",function e(){slider.removeEventListener("touchmove",t),slider.removeEventListener("touchend",e)})}),slider.addEventListener("click",function(e){(e.preventDefault(),e.target!==handle)&&slide(getPos(e),"0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)")}),window.addEventListener("resize",function(){leftOffset=slider.getBoundingClientRect().left,sliderWidth=slider.getBoundingClientRect().width});
"use strict";addOnLoad(function(){arrows.length>0&&animateArrows({realPixelsBtn:!0}),arrowsRev.length>0&&animateReverseArrows({smBackBtn:!0})});var overlay=document.querySelector(".js-slider__overlay"),handle=document.querySelector(".js-slider__handle"),slider=document.querySelector(".js-slider"),leftOffset=slider.getBoundingClientRect().left,sliderWidth=slider.getBoundingClientRect().width,getPos=function(e){return e.pageX-leftOffset};function slide(e,t){if(e<sliderWidth){var n=e/sliderWidth*100;overlay.style.width="".concat(n,"%"),overlay.style.transition=t}}handle.addEventListener("mousedown",function(){slider.addEventListener("mousemove",function e(t){if(0===t.buttons)return slider.style.cursor="pointer",void slider.removeEventListener("mousemove",e);slider.style.cursor="ew-resize",slide(getPos(t),"")})}),handle.addEventListener("touchstart",function(){function e(e){slide(getPos(e.touches[0]),"")}slider.addEventListener("touchmove",e),slider.addEventListener("touchend",function t(){slider.removeEventListener("touchmove",e),slider.removeEventListener("touchend",t)})}),slider.addEventListener("click",function(e){(e.preventDefault(),e.target!==handle)&&slide(getPos(e),"0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)")}),window.addEventListener("resize",function(){leftOffset=slider.getBoundingClientRect().left,sliderWidth=slider.getBoundingClientRect().width});
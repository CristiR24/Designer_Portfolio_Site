"use strict";function addOnLoad(t){window.addEventListener?window.addEventListener("load",t,!1):window.attachEvent&&window.attachEvent("onload",t)}var arrows=document.querySelectorAll(".c-arrow"),animateArrowLinks=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};[].forEach.call(arrows,function(e){var o=e.parentNode,n=e.firstChild.firstChild,r=n.firstChild;o.onmouseenter=function(){n.style.stroke="#cacaca",!0===t.medArrow?r.setAttribute("d","M32.5,6 L161.327257,6 M155.948328,2 L162,5.9959254 L155.948328,10"):r.setAttribute("d","M0,6 L161.327257,6 M155.948328,2 L162,5.9959254 L155.948328,10")},o.onmouseleave=function(){n.style.stroke="#2e2e2e",r.setAttribute("d","M123,6 L161.327257,6 M155.948328,2 L162,5.9959254 L155.948328,10")}})};addOnLoad(function(){document.querySelector("body").classList.remove("u-transitions-on-load")});
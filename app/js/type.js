"use strict";var TxtType=function(t,i,e){this.toRotate=i,this.el=t,this.loopNum=0,this.period=parseInt(e,10)||2e3,this.txt="",this.tick(),this.isDeleting=!1};TxtType.prototype.tick=function(){var t=this.loopNum%this.toRotate.length,i=this.toRotate[t];this.isDeleting?";"!==i[this.txt.length]?this.txt=i.substring(0,this.txt.length-1):this.txt=i.substring(0,this.txt.length-6):"&"!==i[this.txt.length]?this.txt=i.substring(0,this.txt.length+1):this.txt=i.substring(0,this.txt.length+6),this.el.innerHTML='<span class="type-wrap">'+this.txt+"</span>";var e=this,s=180-100*Math.random();if(this.isDeleting&&(s/=1.6),this.isDeleting||this.txt!==i)this.isDeleting&&""===this.txt&&(this.isDeleting=!1,this.loopNum++,s=500);else{s=2*this.period,this.isDeleting=!0;var n=this.el.parentNode.childNodes;[].forEach.call(n,function(t){"type-cursor"===t.className&&(t.style.animation="blink .7s infinite linear alternate",setTimeout(function(){t.style.animation=""},s))})}setTimeout(function(){e.tick()},s)},addOnload(function(){var t=document.getElementsByClassName("type-write");[].forEach.call(t,function(t){var i=t.getAttribute("data-type"),e=t.getAttribute("data-period");i&&new TxtType(t,JSON.parse(i),e)})});
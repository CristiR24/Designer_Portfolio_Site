var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="type-wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 180 - Math.random() * 100;

    if (this.isDeleting) { delta /= 1.6; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period * 2;
        this.isDeleting = true;
        var siblings = this.el.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            if (siblings[i].className === 'type-cursor') {
                siblings[i].style.animation = 'blink .7s infinite linear alternate';
                setTimeout(function () {
                    siblings[i].style.animation = '';
                }, delta)
            }
        }
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('type-write');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
};
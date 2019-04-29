let TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    let i = this.loopNum % this.toRotate.length;
    let fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        // on delete the ';' signals the '&shy;' escape symbol in html
        // if it is met, delete directly past it's opening '&'
        if (fullTxt[ this.txt.length ] !== ';') {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length - 6);
        }
    } else {
        // when typing the '&' signals the '&shy;' escape symbol in html
        // if it is met, type directly after it's closing ';'
        if (fullTxt[ this.txt.length ] !== '&') {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 6);
        }
    }

    this.el.innerHTML = '<span class="type-wrap">' + this.txt + '</span>';

    let that = this;
    let delta = 180 - Math.random() * 100;

    if (this.isDeleting) { delta /= 1.6; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period * 2;
        this.isDeleting = true;
        // animate the cursor when not typing nor deleting
        let siblings = this.el.parentNode.childNodes;
        [].forEach.call( siblings, sibling => {
            if (sibling.className === 'type-cursor') {
                sibling.style.animation = 'blink .7s infinite linear alternate';
                setTimeout(() => {
                    sibling.style.animation = '';
                }, delta)
            }
        });
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(() => {
        that.tick();
    }, delta);
};

addOnload(() => {
    const typeElements = document.getElementsByClassName('type-write');
    [].forEach.call( typeElements, typeElement => {
        let toRotate = typeElement.getAttribute('data-type');
        let typePeriod = typeElement.getAttribute('data-period');
        if (toRotate) {
            new TxtType(typeElement, JSON.parse(toRotate), typePeriod);
        }
    })
});
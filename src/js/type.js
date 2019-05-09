let TxtType = function(el, toRotate, period, speed = 180) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.speed = speed;
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
        // it means: if the previous character is different from ';'
        if (fullTxt[ this.txt.length - 2 ] !== ';') {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length - 6);
        }
    } else {
        // when typing the '&' signals the '&shy;' escape symbol in html
        // if it is met, type directly after it's closing ';'
        // it means: if the next character is different from '&'
        if (fullTxt[ this.txt.length ] !== '&') {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 6);
        }
    }

    this.el.innerHTML = '<span class="o-type__wrap">' + this.txt + '</span>';

    let that = this;
    let delta = this.speed - Math.random() * 100;

    if (this.isDeleting) { delta /= 1.6; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period * 2;
        this.isDeleting = true;
        // animate the cursor when not typing nor deleting
        let siblings = this.el.parentNode.childNodes;
        for ( let i = 0; i < siblings.length; i++) {
            let sibling = siblings[i];
            // check if the iterable element has classes
            if ( sibling.classList ) {
                if (sibling.classList.contains('o-type__cursor')) {
                    sibling.style.animation = 'blink .7s infinite linear alternate';
                    setTimeout(() => {
                        sibling.style.animation = '';
                    }, delta)
                }
            }
        }
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(() => {
        that.tick();
    }, delta);
};

const initTypeAnimation = (typeSpeed) => {
    const typeElements = document.getElementsByClassName('o-type__write');
    [].forEach.call( typeElements, typeElement => {
        let toRotate = typeElement.getAttribute('data-type');
        let typePeriod = typeElement.getAttribute('data-period');
        if (toRotate) {
            new TxtType(typeElement, JSON.parse(toRotate), typePeriod, typeSpeed);
        }
    })
};
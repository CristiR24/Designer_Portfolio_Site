const TxtType = function TxtType(el, toRotate, period, speed = 180) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.speed = speed;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function tick() {
    const i = this.loopNum % this.toRotate.length;
    const fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        // on delete the ';' signals the '&shy;' escape symbol in html
        // if it is met, delete directly past it's opening '&'
        // it means: if the previous character is different from ';'
        if (fullTxt[this.txt.length - 2] !== ';') {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length - 6);
        }
    } else {
        // when typing the '&' signals the '&shy;' escape symbol in html
        // if it is met, type directly after it's closing ';'
        // it means: if the next character is different from '&'
        // eslint-disable-next-line no-lonely-if
        if (fullTxt[this.txt.length] !== '&') {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 6);
        }
    }

    this.el.innerHTML = `<span class="o-type__wrap">${this.txt}</span>`;

    const that = this;
    let delta = this.speed - Math.random() * 100;

    if (this.isDeleting) { delta /= 1.6; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period * 2;
        this.isDeleting = true;
        // animate the cursor when not typing nor deleting
        const siblings = this.el.parentNode.childNodes;
        for (let j = 0; j < siblings.length; j++) {
            const sibling = siblings[j];
            // check if the iterable element has classes
            if (sibling.classList) {
                if (sibling.classList.contains('o-type__cursor')) {
                    sibling.style.animation = 'blink .7s infinite linear alternate';
                    setTimeout(() => {
                        sibling.style.animation = '';
                    }, delta);
                }
            }
        }
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum += 1;
        delta = 500;
    }

    setTimeout(() => {
        that.tick();
    }, delta);
};

// eslint-disable-next-line no-unused-vars
const initTypeAnimation = (typeSpeed) => {
    const typeElements = document.getElementsByClassName('o-type__write');
    // eslint-disable-next-line consistent-return
    [].forEach.call(typeElements, (typeElement) => {
        const toRotate = typeElement.getAttribute('data-type');
        const typePeriod = typeElement.getAttribute('data-period');
        if (toRotate) {
            return new TxtType(typeElement,
                JSON.parse(toRotate), typePeriod, typeSpeed);
        }
    });
};

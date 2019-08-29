const toAnimate = document.querySelectorAll('.js-animate');
let animated = 0;

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const { top } = entry.boundingClientRect;
        if (entry.intersectionRatio > 0) {
            if (top > 0) {
                entry.target.classList.add('o-appear');
            } else {
                entry.target.classList.add('o-reveal');
            }
            observer.unobserve(entry.target);
            animated += 1;
            if (animated === toAnimate.length) {
                observer.disconnect();
                console.log('disconnected');
            }
        }
    });
});

toAnimate.forEach((elem) => {
    observer.observe(elem);
});

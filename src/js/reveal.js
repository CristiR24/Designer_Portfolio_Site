const toAnimate = document.querySelectorAll('.js-animate');
let animated = 0;

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const { top } = entry.boundingClientRect;
        if (entry.intersectionRatio > 0) {
            if (top > 0) {
                if (entry.target.classList.contains('js-animate-left')) {
                    entry.target.classList.add('o-appear', 'o-appear--left');
                } else if (entry.target.classList.contains('js-animate-mixed')) {
                    entry.target.classList.add('o-appear', 'o-appear--mixed');
                } else {
                    entry.target.classList.add('o-appear', 'o-appear--bottom');
                }
            } else {
                entry.target.classList.add('o-reveal');
            }
            observer.unobserve(entry.target);
            animated += 1;
            if (animated === toAnimate.length) {
                observer.disconnect();
            }
        }
    });
});

toAnimate.forEach((elem) => {
    observer.observe(elem);
});

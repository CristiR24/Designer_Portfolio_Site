const toAnimate = document.querySelectorAll('.js-animate');

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
            } else if (!entry.target.classList.contains('o-appear')) {
                entry.target.classList.add('o-reveal');
            }
            observer.unobserve(entry.target);
        }
        if (entry.intersectionRatio === 0) {
            entry.target.classList.remove(
                'o-appear', 'o-appear--left', 'o-appear--mixed',
                'o-appear--bottom', 'o-reveal',
            );
        }
    });
}, { threshold: 0 });

toAnimate.forEach((elem) => {
    observer.observe(elem);
});

/* global ScrollReveal */

const styles = {
    opacity: 0,
    distance: '50%',
    origin: 'bottom',
    easing: 'ease-out',
};

ScrollReveal().reveal('.js-animate', {
    ...styles,
    viewFactor: 0.2,
    beforeReveal: (el) => {
        const rect = el.getBoundingClientRect();
        // if it appears in the viewport from the bottom
        if (rect.top < 0) {
            ScrollReveal().clean(el);
            el.style.visibility = 'hidden';
            ScrollReveal().reveal(el, { easing: 'ease-out' });
        }
    },
});

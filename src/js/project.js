/* global Modernizr arrows arrowsRev animateArrows animateReverseArrows */

if (arrows.length > 0) {
    animateArrows({ realPixelsBtn: true });
}
if (arrowsRev.length > 0) {
    animateReverseArrows({ smBackBtn: true });
}

const overlay = document.querySelector('.js-slider__overlay');
const handle = document.querySelector('.js-slider__handle');
const separator = document.querySelector('.js-slider__separator');
const slider = document.querySelector('.js-slider');
let leftOffset = slider.getBoundingClientRect().left;
let sliderWidth = slider.getBoundingClientRect().width;

const getPos = event => event.pageX - leftOffset;

function slide(pos, transition) {
    if (pos > 0 && pos < sliderWidth) {
        const percent = pos / sliderWidth * 100;
        const path = `
            polygon(0% 0%, ${percent}% 0%, ${percent}% 100%, 0% 100%)
        `;
        overlay.style.clipPath = path;
        overlay.style['-webkit-clip-path'] = path;
        separator.style.left = `${percent}%`;
        handle.style.left = `${percent}%`;

        overlay.style.transition = transition;
        separator.style.transition = transition;
        handle.style.transition = transition;
    }
}

handle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    function updateSlider(event) {
        event.preventDefault();
        if (event.buttons === 0) {
            slider.style.cursor = 'pointer';
            slider.removeEventListener('mousemove', updateSlider);
            return;
        }
        slider.style.cursor = 'ew-resize';
        const pos = getPos(event);
        slide(pos, '');
    }
    slider.addEventListener('mousemove', updateSlider);
});

handle.addEventListener('touchstart', (e) => {
    e.preventDefault();
    function updateSlider(event) {
        event.preventDefault();
        const pos = getPos(event.touches[0]);
        slide(pos, '');
    }
    const end = () => {
        slider.removeEventListener('touchmove', updateSlider);
        slider.removeEventListener('touchend', end);
    };
    slider.addEventListener('touchmove', updateSlider,
        Modernizr.passiveeventlisteners ? { passive: true } : false);
    slider.addEventListener('touchend', end);
}, Modernizr.passiveeventlisteners ? { passive: true } : false);

slider.addEventListener('click', (event) => {
    event.preventDefault();
    // if the user clicked outside the slider handle(thumb)
    if (event.target !== handle) {
        const pos = getPos(event);
        slide(pos, '0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000)');
    }
});

window.addEventListener('resize', () => {
    leftOffset = slider.getBoundingClientRect().left;
    sliderWidth = slider.getBoundingClientRect().width;
});

/* global addOnLoad arrows arrowsRev animateArrows animateReverseArrows */

addOnLoad(() => {
    if (arrows.length > 0) {
        animateArrows({ realPixelsBtn: true });
    }
    if (arrowsRev.length > 0) {
        animateReverseArrows({ smBackBtn: true });
    }
});

const overlay = document.querySelector('.js-slider__overlay');
const handle = document.querySelector('.js-slider__handle');
const slider = document.querySelector('.js-slider');
let leftOffset = slider.getBoundingClientRect().left;
let sliderWidth = slider.getBoundingClientRect().width;

const getPos = event => event.pageX - leftOffset;

function slide(pos, transition) {
    if (pos < sliderWidth) {
        const percent = pos / sliderWidth * 100;
        overlay.style.width = `${percent}%`;
        overlay.style.transition = transition;
    }
}

handle.addEventListener('mousedown', () => {
    function updateSlider(event) {
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

handle.addEventListener('touchstart', () => {
    function updateSlider(event) {
        const pos = getPos(event.touches[0]);
        slide(pos, '');
    }
    const end = () => {
        slider.removeEventListener('touchmove', updateSlider);
        slider.removeEventListener('touchend', end);
    };
    slider.addEventListener('touchmove', updateSlider);
    slider.addEventListener('touchend', end);
});

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

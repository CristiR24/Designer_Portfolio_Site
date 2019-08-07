/* global addOnLoad arrows arrowsRev animateArrows animateReverseArrows */

addOnLoad(() => {
    if (arrows.length > 0) {
        animateArrows({ medSize: true });
    }
    if (arrowsRev.length > 0) {
        animateReverseArrows({ medSize: true });
    }
});

const overlay = document.querySelector('.c-slider__overlay');
const handle = document.querySelector('.c-slider__handle');
const slider = document.querySelector('.c-slider');
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
            slider.removeEventListener('mousemove', updateSlider);
            return;
        }
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
    const pos = getPos(event);
    slide(pos, '0.5s cubic-bezier(0.390, 0.575, 0.565, 1.000) all');
});

window.addEventListener('resize', () => {
    leftOffset = slider.getBoundingClientRect().left;
    sliderWidth = slider.getBoundingClientRect().width;
});

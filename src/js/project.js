/* global addOnLoad arrows arrowsRev animateArrows animateReverseArrows */

addOnLoad(() => {
    if (arrows.length > 0) {
        animateArrows({ medSize: true });
    }
    if (arrowsRev.length > 0) {
        animateReverseArrows({ medSize: true });
    }
});

const slider = document.querySelector('.js-slider');
const sliderStyle = slider.appendChild(document.createElement('style'));
let sliderRect = slider.getBoundingClientRect();

const handle = document.querySelector('.js-slider__handle');
const sliderImg1 = document.getElementsByClassName('js-slider__img')[0];
const sliderImg2 = document.getElementsByClassName('js-slider__img')[1];

const imgRatio = 0.629;

sliderImg1.style.height = `${sliderRect.width * imgRatio}px`;
sliderImg2.style.height = `${sliderRect.width * imgRatio}px`;
window.addEventListener('resize', () => {
    const newSliderRect = slider.getBoundingClientRect();
    sliderRect = newSliderRect;
    sliderImg1.style.height = `${sliderRect.width * imgRatio}px`;
    sliderImg2.style.height = `${sliderRect.width * imgRatio}px`;
});
// prevent the dragging of images
slider.addEventListener('drag', e => e.preventDefault());
sliderImg1.addEventListener('drag', e => e.preventDefault());
sliderImg2.addEventListener('drag', e => e.preventDefault());

function slide(event, transition) {
    const sliderPos = event.pageX - sliderRect.left;

    sliderStyle.innerHTML = `
        .c-slider::before{
            left:${sliderPos}px;
            transition: ${transition};
        }`;

    handle.style.left = `${sliderPos}px`;
    handle.style.transition = transition;

    sliderImg1.style.width = `${sliderPos}px`;
    sliderImg1.style.transition = transition;

    sliderImg2.style.width = `calc(100% - ${sliderPos}px)`;
    sliderImg2.style.transition = transition;
}

slider.addEventListener('click', event => slide(event, '0.2s ease-in-out'));

handle.addEventListener('mousedown', () => {
    function moveSlider(event) {
        event.preventDefault();
        if (event.buttons === 0) {
            slider.removeEventListener('mousemove', moveSlider);
        }
        const sliderPos = event.pageX - sliderRect.left;
        if (sliderPos > 0 && sliderPos < sliderRect.width) {
            slide(event);
        }
    }
    slider.addEventListener('mousemove', moveSlider);
});
handle.addEventListener('touchstart', () => {
    function moveSlider(event) {
        event.preventDefault();
        const sliderPos = event.touches[0].pageX - sliderRect.left;
        if (sliderPos > 0 && sliderPos < sliderRect.width) {
            slide(event.touches[0]);
        }
    }
    const end = () => {
        slider.removeEventListener('touchmove', moveSlider);
        slider.removeEventListener('touchend', end);
    };
    slider.addEventListener('touchmove', moveSlider);
    slider.addEventListener('touchend', end);
});

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
const sliderStyle = document.querySelector('.js-slider__style');
let sliderRect = slider.getBoundingClientRect();
let previousPos = sliderRect.width / 2;

const handle = document.querySelector('.js-slider__handle');

const getPos = (event, rect) => event.pageX - rect.left;

const imgRatio = 0.629;
function updateSlider(pos, rect, transition) {
    sliderStyle.innerHTML = `
        .c-slider::before{
            left: ${pos}px;
            transition: ${transition};
        }
        .c-slider .c-slider__handle {
            left: ${pos}px;
            transition: ${transition};
        }
        .c-slider .c-slider__img {
            height: ${rect.width * imgRatio}px;
        }
        .c-slider .c-slider__img:first-of-type {
            width: ${pos}px;
            transition: ${transition};
        }
        .c-slider .c-slider__img:last-of-type {
            width: calc(100% - ${pos}px);
            transition: ${transition};
        }
    `;
    previousPos = pos;
}
updateSlider(previousPos, sliderRect, '');

window.addEventListener('resize', () => {
    const newSliderRect = slider.getBoundingClientRect();
    sliderRect = newSliderRect;
    updateSlider(previousPos, sliderRect, '');
});

// slider.addEventListener('click', (event) => {
//     const sliderPos = getPos(event, sliderRect);
//     updateSlider(sliderPos, sliderRect, '0.3s ease-in');
// });

// handle.addEventListener('mousedown', () => {
//     function moveSlider(event) {
//         event.preventDefault();
//         event.stopPropagation();
//         if (event.buttons === 0) {
//             slider.removeEventListener('mousemove', moveSlider);
//         }
//         const sliderPos = getPos(event, sliderRect);
//         if (sliderPos > 0 && sliderPos < sliderRect.width) {
//             updateSlider(sliderPos, sliderRect, '');
//         }
//     }
//     slider.addEventListener('mousemove', moveSlider);
// });
// handle.addEventListener('touchstart', () => {
//     function moveSlider(event) {
//         event.preventDefault();
//         event.stopPropagation();
//         const sliderPos = getPos(event.touches[0], sliderRect);
//         if (sliderPos > 0 && sliderPos < sliderRect.width) {
//             updateSlider(sliderPos, sliderRect, '');
//         }
//     }
//     const end = () => {
//         slider.removeEventListener('touchmove', moveSlider);
//         slider.removeEventListener('touchend', end);
//     };
//     slider.addEventListener('touchmove', moveSlider);
//     slider.addEventListener('touchend', end);
// });

const sliderImages = document.getElementsByClassName('c-slider__img');
// prevent the dragging of images
slider.addEventListener('drag', e => e.preventDefault());
for (const img of sliderImages) {
    img.addEventListener('drag', e => e.preventDefault());
}

const range = document.querySelector('.js-slider__range');
// compensate the thumb width
range.setAttribute('max', `${sliderRect.width - 13}`);
range.setAttribute('value', `${sliderRect.width / 2}`);

slider.addEventListener('click', (event) => {
    const sliderPos = getPos(event, sliderRect);
    if (sliderPos > 0 && sliderPos < sliderRect.width) {
        updateSlider(sliderPos, sliderRect, '.2s ease-in');
        range.value = sliderPos;
    }
});
range.addEventListener('input', () => updateSlider(range.value, sliderRect, ''));
range.addEventListener('change', () => updateSlider(range.value, sliderRect, ''));

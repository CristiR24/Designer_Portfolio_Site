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

const range = document.querySelector('.js-slider__range');
// compensate the thumb width
range.max = sliderRect.width - 13;
range.value = Math.round(sliderRect.width / 2);

// slider.addEventListener('click', (event) => {
//     const sliderPos = getPos(event, sliderRect);
//     if (sliderPos > range.min && sliderPos < range.max) {
//         updateSlider(sliderPos, sliderRect, '1s linear');
//         range.value = sliderPos;
//     } else if (sliderPos < range.min) {
//         updateSlider(range.min, sliderRect, '1s linear');
//         range.value = range.min;
//     } else {
//         updateSlider(range.max, sliderRect, '1s linear');
//         range.value = range.max;
//     }
// });
range.addEventListener('input', (event) => {
    event.stopPropagation();
    updateSlider(range.value, sliderRect, '');
});
range.addEventListener('change', (event) => {
    event.stopPropagation();
    updateSlider(range.value, sliderRect, '');
});

window.addEventListener('resize', () => {
    const rangeRatio = range.value / range.max;

    const newSliderRect = slider.getBoundingClientRect();
    sliderRect = newSliderRect;

    range.max = sliderRect.width - 13;
    range.value = Math.round(range.max * rangeRatio);
    updateSlider(range.value, sliderRect, '');
});

window.addEventListener('load', () => {
    const mailLink = document.querySelector('.c-contact__mail');
    if (mailLink) {
        mailLink.style.transition = '0.2s ease-out';
    }
});

const arrows = document.querySelectorAll('.c-arrow:not(.c-arrow--reverse)');
const arrowsRev = document.querySelectorAll('.c-arrow.c-arrow--reverse');

// eslint-disable-next-line no-unused-vars
const animateArrows = (options = {}) => {
    [].forEach.call(arrows, (arrow) => {
        const arrowLink = arrow.parentNode;
        const arrowLine = arrow.firstChild.firstChild;
        const arrowPath = arrowLine.firstChild;

        arrowLink.onmouseover = () => {
            // change the color
            arrowLine.style.stroke = '#cacaca';
            // change the arrow length
            if (options.realPixelsBtn) {
                arrowPath.setAttribute('d', 'M13.5,6 L171.327257,6 M165.948328,2 L172,5.9959254 L165.948328,10');
            } else if (options.liveBtn) {
                arrowPath.setAttribute('d', 'M34.5,6 L171.327257,6 M165.948328,2 L172,5.9959254 L165.948328,10');
            } else {
                arrowPath.setAttribute('d', 'M0,6 L171.327257,6 M165.948328,2 L172,5.9959254 L165.948328,10');
            }
        };
        arrowLink.onmouseout = () => {
            // change the color
            arrowLine.style.stroke = '#2e2e2e';
            // change the arrow length
            arrowPath.setAttribute('d', 'M133,6 L171.327257,6 M165.948328,2 L172,5.9959254 L165.948328,10');
            // reset the link text color on mouse out
            arrowLink.style.color = '#2e2e2e';
        };
        arrowLink.addEventListener('mousedown', () => {
            arrowLink.style.color = '#cacaca';
            arrowLine.style.stroke = '#2e2e2e';
        });
    });
};
// eslint-disable-next-line no-unused-vars
const animateReverseArrows = (options = {}) => {
    [].forEach.call(arrowsRev, (arrowRev) => {
        const arrowLink = arrowRev.parentNode;
        const arrowLine = arrowRev.firstChild.firstChild;
        const arrowPath = arrowLine.firstChild;

        arrowLink.onmouseover = () => {
            // change the color
            arrowLine.style.stroke = '#cacaca';
            // change the arrow length
            if (options.smBackBtn) {
                arrowPath.setAttribute('d', 'M3,6 L185.5,6 M8.051672,2 L2,5.9959254 L8.051672,10');
            } else {
                arrowPath.setAttribute('d', 'M3,6 L240.327257,6 M8.051672,2 L2,5.9959254 L8.051672,10');
            }
        };
        arrowLink.onmouseout = () => {
            // change the color
            arrowLine.style.stroke = '#2e2e2e';
            // change the arrow length
            arrowPath.setAttribute('d', 'M3,6 L43.327257,6 M8.051672,2 L2,5.9959254 L8.051672,10');
            // reset the link text color on mouse out
            arrowLink.style.color = '#2e2e2e';
        };
        arrowLink.addEventListener('mousedown', () => {
            arrowLink.style.color = '#cacaca';
            arrowLine.style.stroke = '#2e2e2e';
        });
    });
};

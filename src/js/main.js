// this is a cross browser function to add a function on page load
function addOnLoad(myfunc) {
    if (window.addEventListener) {
        window.addEventListener('load', myfunc, false);
    } else if (window.attachEvent) {
        window.attachEvent('onload', myfunc);
    }
}

const arrows = document.querySelectorAll('.c-arrow');

// eslint-disable-next-line no-unused-vars
const animateArrowLinks = (options = {}) => {
    [].forEach.call(arrows, (arrow) => {
        const arrowLink = arrow.parentNode;
        const arrowLine = arrow.firstChild.firstChild;
        const arrowPath = arrowLine.firstChild;

        arrowLink.onmouseover = () => {
            // change the color
            arrowLine.style.stroke = '#cacaca';
            // change the arrow length
            if (options.reverseLg) {
                arrowPath.setAttribute('d', 'M3,6 L240.327257,6 M8.051672,2 L2,5.9959254 L8.051672,10');
            } else if (options.medSize) {
                arrowPath.setAttribute('d', 'M32.5,6 L171.327257,6 M165.948328,2 L172,5.9959254 L165.948328,10');
            } else {
                arrowPath.setAttribute('d', 'M0,6 L171.327257,6 M165.948328,2 L172,5.9959254 L165.948328,10');
            }
        };
        arrowLink.onmouseout = () => {
            // change the color
            arrowLine.style.stroke = '#2e2e2e';
            // change the arrow length
            if (options.reverseLg) {
                arrowPath.setAttribute('d', 'M3,6 L43.327257,6 M8.051672,2 L2,5.9959254 L8.051672,10');
            } else {
                arrowPath.setAttribute('d', 'M133,6 L171.327257,6 M165.948328,2 L172,5.9959254 L165.948328,10');
            }
            // reset the link text color on mouse out
            arrowLink.style.color = '#2e2e2e';
        };
        arrowLink.addEventListener('mousedown', () => {
            arrowLink.style.color = '#cacaca';
            arrowLine.style.stroke = '#2e2e2e';
        });
    });
};

addOnLoad(() => {
    const body = document.querySelector('body');
    body.classList.remove('u-transitions-on-load');
});

// this is a cross browser function to add a function on page load
function addOnLoad(myfunc) {
    if(window.addEventListener)
        window.addEventListener('load', myfunc, false);
    else if(window.attachEvent)
        window.attachEvent('onload', myfunc);
}

const arrows = document.querySelectorAll(".c-arrow");

const animateArrowLinks = (options = {}) => {

    [].forEach.call(arrows, arrow => {
        const arrowLink = arrow.parentNode;
        const arrowLine = arrow.firstChild.firstChild;
        const arrowPath = arrowLine.firstChild;

        arrowLink.onmouseenter = () => {
            // change the color
            arrowLine.style.stroke = '#cacaca';
            // change the arrow length
            if ( options.medArrow === true ) {
                arrowPath.setAttribute('d', 'M32.5,6 L161.327257,6 M155.948328,2 L162,5.9959254 L155.948328,10');
            } else {
                arrowPath.setAttribute('d', 'M0,6 L161.327257,6 M155.948328,2 L162,5.9959254 L155.948328,10');
            }
        };
        arrowLink.onmouseleave = () => {
            // change the color
            arrowLine.style.stroke = '#2e2e2e';
            // change the arrow length
            arrowPath.setAttribute('d', 'M123,6 L161.327257,6 M155.948328,2 L162,5.9959254 L155.948328,10');
        }
    });
};

addOnLoad(() => {
    const body = document.querySelector("body");
    body.classList.remove("u-transitions-on-load");
});
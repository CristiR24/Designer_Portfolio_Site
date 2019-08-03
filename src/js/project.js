/* global addOnLoad arrows arrowsRev animateArrows animateReverseArrows */

addOnLoad(() => {
    if (arrows.length > 0) {
        animateArrows({ medSize: true });
    }
    if (arrowsRev.length > 0) {
        animateReverseArrows({ medSize: true });
    }
});

/* global addOnLoad arrowsRev animateReverseArrows */

addOnLoad(() => {
    if (arrowsRev.length > 0) {
        animateReverseArrows({ medSize: true });
    }
});

/* global addOnLoad arrows animateArrows initTypeAnimation */

addOnLoad(() => {
    initTypeAnimation();
    if (arrows.length > 0) { animateArrows(); }
});

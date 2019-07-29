/* global addOnLoad arrows animateArrowLinks initTypeAnimation */

addOnLoad(() => {
    initTypeAnimation();
    if (arrows.length > 0) { animateArrowLinks(); }
});

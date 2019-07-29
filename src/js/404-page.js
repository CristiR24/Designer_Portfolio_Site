/* global addOnLoad arrows animateArrowLinks */

addOnLoad(() => {
    if (arrows.length > 0) {
        animateArrowLinks({
            reverseLg: true,
        });
    }
});

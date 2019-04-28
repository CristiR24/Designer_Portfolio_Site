// this is a cross browser function to add a function on page load
function addOnload(myfunc) {
    if(window.addEventListener)
        window.addEventListener('load', myfunc, false);
    else if(window.attachEvent)
        window.attachEvent('onload', myfunc);
}

addOnload(() => {
    const body = document.querySelector("body");
    body.classList.remove("u-transitions-on-load");
});
const navbarMobile = document.getElementById('navbar-mobile');
const overlayBackground = document.getElementById('overlay');

const hideNavbar = () => {
    navbarMobile.style.width = '0';
    overlayBackground.classList.remove("overlay--show");
}

function openNavbar() {
    navbarMobile.style.width = '70%';
    overlayBackground.classList.add("overlay--show");

    overlayBackground.addEventListener('click', (event) => {
        hideNavbar();
    });
}


function closeNavbar() {
    hideNavbar();
}
// Menu Fixo
const header = document.getElementById('js-header');

function fixedMenu() {
    if(window.pageYOffset > 80) {
        header.classList.add('fixed-menu');
    } else {
        header.classList.remove('fixed-menu');
    }
}

document.addEventListener('scroll', fixedMenu);
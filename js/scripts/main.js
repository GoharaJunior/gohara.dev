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

// AOS Animation
AOS.init({
    duration: 1000
});


const swiper = new Swiper('.swiper', {
    slidesPerView: 2,
    speed: 8000,
    allowTouchMove: false,
    loop: true,
    autoplay: {
        delay: 1,
    },
    // Configurações iniciais para dispositivos móveis
    breakpoints: {
        // Quando a largura da tela for igual ou maior que 640px
        640: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        // Quando a largura da tela for igual ou maior que 768px
        768: {
            slidesPerView: '10',
            spaceBetween: 40
        }
        // E assim por diante para tamanhos de tela maiores
    }
});
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

// Swiper Brands
var swiper = new Swiper('.slide-brands.swiper', {
    slidesPerView: 3,
    speed: 8000,
    allowTouchMove: false,
    loop: true,
    autoplay: {
        delay: 1,
    },
    // Configurações iniciais para dispositivos móveis
    breakpoints: {
        // Quando a largura da tela for igual ou maior que 640px
        600: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        // Quando a largura da tela for igual ou maior que 768px
        768: {
            slidesPerView: 5,
            spaceBetween: 40
        },
        992: {
            slidesPerView: 7,
            spaceBetween: 40
        },
        1248: {
            slidesPerView: 10,
            spaceBetween: 40
        }
        // E assim por diante para tamanhos de tela maiores
    }
});

// Swiper depoimentos
var swiper = new Swiper(".slide-depoimentos", {
    slidesPerView: 3,
    spaceBetween: 32,
    grabCursor: true,
    pagination: {
        el: ".s-depoimentos .top .swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        320: {
            slidesPerView: 1.3,
            spaceBetween: 16,
        },
        600: {
            slidesPerView: 2.3,
            spaceBetween: 15,
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 32,
        }
    }
});


// Atualizar automaticamente o ano atual
const currentYear = new Date().getFullYear();

jQuery('.s-footer .container').append(`
    <p>© Copyright ${currentYear} - Todos os direitos reservados</p>
`)


// Menu hamburger mobile
const btnMobile = document.getElementById('btn-mobile');

function toggleMenu(event) {
    if (event.type === 'touchstart') event.preventDefault();
        const nav = document.getElementById('nav');
        nav.classList.toggle('active');
        const active = nav.classList.contains('active');
        event.currentTarget.setAttribute('aria-expanded', active);
        if (active) {
            event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
        } else {
            event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
        }
}

btnMobile.addEventListener('click', toggleMenu);
btnMobile.addEventListener('touchstart', toggleMenu);
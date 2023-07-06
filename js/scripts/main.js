document.addEventListener("DOMContentLoaded", function() {
    // AOS Animation
    AOS.init({
        duration: 1000
    });

    // Link ancora
    const menuItems = document.querySelectorAll('header nav a[href^="#"]');

    menuItems.forEach(item => {
        item.addEventListener('click', scrollToIdOnClick);
    })

    function getScrollTopByHref(element) {
        const id = element.getAttribute('href');
        return document.querySelector(id).offsetTop;
    }

    function scrollToIdOnClick(event) {
        event.preventDefault()
        const to = getScrollTopByHref(event.target) - 75;

        scrollToPosition(to)
    }

    function scrollToPosition(to) {
        window.scroll({
            top: to,
            behavior: "smooth"
        });

        // smoothScrollTo(0, to)
    }

    /**
     * Smooth scroll animation - (Funciona em todos os navegadores)
     * @param {int} endX: destination x coordinate
     * @param {int} endY: destination y coordinate
     * @param {int} duration: animation duration in ms
     */

    function smoothScrollTo(endX, endY, duration) {
        const startX = window.scrollX || window.pageXOffset;
        const startY = window.scrollY || window.pageYOffset;
        const distanceX = endX - startX;
        const distanceY = endY - startY;
        const startTime = new Date().getTime();

        duration = typeof duration !== 'undefined' ? duration : 400;

        // Easing function
        const easeInOutQuart = (time, from, distance, duration) => {
            if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
            return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
        };

        const timer = setInterval(() => {
            const time = new Date().getTime() - startTime;
            const newX = easeInOutQuart(time, startX, distanceX, duration);
            const newY = easeInOutQuart(time, startY, distanceY, duration);

            if (time >= duration) {
                clearInterval(timer);
            }

            window.scroll(newX, newY);
        }, 1000 / 60); // 60 fps
    };

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
    var swiper = new Swiper(".slide-reviews", {
        slidesPerView: 3.5,
        spaceBetween: 32,
        grabCursor: true,
        pagination: {
            el: ".s-reviews .top .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1.5,
                spaceBetween: 16,
            },
            600: {
                slidesPerView: 2.5,
                spaceBetween: 15,
            },
            1200: {
                slidesPerView: 3.5,
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
    const closeMenuByClickingLinks = document.querySelectorAll('.menu-mobile ul li');

    closeMenuByClickingLinks.forEach(function(item) {
        const nav = document.getElementById('nav')

        item.addEventListener("click", function() {
            nav.classList.remove('active');
            document.documentElement.classList.toggle('menu-opened');
        });
    });

    function toggleMenu(event) {
        if (event.type === 'touchstart') event.preventDefault();

        const nav = document.getElementById('nav');
        nav.classList.toggle('active');


        const active = nav.classList.contains('active')
        event.currentTarget.setAttribute('aria-expanded', active);

        if (active) {
            event.currentTarget.setAttribute('aria-label', 'Fechar Menu')
            document.documentElement.classList.add('menu-opened');
        } else {
            event.currentTarget.setAttribute('aria-label', 'Abrir Menu')
            document.documentElement.classList.remove('menu-opened');
        }
    }

    btnMobile.addEventListener('click', toggleMenu);
    btnMobile.addEventListener('touchstart', toggleMenu);
});
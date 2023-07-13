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

    // Bloquear o botão direito do mouse
    if (document.addEventListener) {
        document.addEventListener("contextmenu", function(e) {
            e.preventDefault();
            return false;
        });
    } else { //Versões antigas do IE
        document.attachEvent("oncontextmenu", function(e) {
            e = e || window.event;
            e.returnValue = false;
            return false;
        });
    }

    // Bloquear Ctrl+U e Ctrl+S
    if (document.addEventListener) {
        document.addEventListener("keydown", bloquearSource);
    } else { //Versões antigas do IE
        document.attachEvent("onkeydown", bloquearSource);
    }
    
    function bloquearSource(e) {
        e = e || window.event;
    
        var code = e.which || e.keyCode;
    
        if (
            e.ctrlKey &&
            (code == 83 || code == 85) //83 = S, 85 = U
        ) {
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
    
            return false;
        }
    }

    /*==================== ACCORDION ====================*/ 
    let openedButton = null;

    document.querySelectorAll('.accordion-button').forEach(button => {
        button.addEventListener('click', () => {
            const accordionContent = button.nextElementSibling;
        
            if (openedButton && openedButton !== button) {
                openedButton.classList.remove('accordion-button-active');
                openedButton.nextElementSibling.style.maxHeight = 0;
            }
        
            button.classList.toggle('accordion-button-active');
        
            if (button.classList.contains('accordion-button-active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = 0;
            }
        
            openedButton = button;
        });
    });


    // Clarity
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "hxlbyrur51");


    // Countdown
    const daysEl = document.getElementById('days')
    const hoursEl = document.getElementById('hours')
    const minsEl = document.getElementById('mins')
    const secondsEl = document.getElementById('seconds')

    const newYears = "1 Jan 2024";

    function countdown() {
        const newYearsDate = new Date(newYears);
        const currentDate = new Date();
        
        const totalSeconds = (newYearsDate - currentDate) / 1000;

        const days = Math.floor(totalSeconds / 3600 / 24);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const mins = Math.floor(totalSeconds / 60) % 60;
        const seconds = Math.floor(totalSeconds) % 60;

        daysEl.innerHTML = days;
        hoursEl.innerHTML = formatTime(hours);
        minsEl.innerHTML = formatTime(mins);
        secondsEl.innerHTML = formatTime(seconds);
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    countdown();
    setInterval(countdown, 1000);


    /*=== modal ===*/
    const btnModal = $('.js-open-modal');
    const btnCloseModal = $('.js-close-modal');
    const modal = $('#js-modal');
    const overlay = $('.overlay');

    setTimeout(() => { 
        modal.addClass('active');
    }, 1000);

    $('.close-modal').click(function() {
        $(modal).removeClass('active');
    })

    $(overlay).click(function() {
        $(modal).removeClass('active');
    })
    /*=== End modal ===*/
});
(function () {
    window.theme = {
        ...window.theme,

        menuHamburgerMobile: function() {
            /*=== Menu hamburger mobile ===*/
            const btnMobile = document.getElementById('js-btn-mobile');
            const closeMenuByClickingLinks = document.querySelectorAll('.menu-mobile ul li');
        
            btnMobile.addEventListener('click', () => {
                btnMobile.classList.toggle('is-active');
                document.documentElement.classList.toggle('menu-opened')
            })
        
            closeMenuByClickingLinks.forEach(function(item) {
                item.addEventListener("click", function() {
                    btnMobile.classList.toggle('is-active');
                    document.documentElement.classList.toggle('menu-opened');
                });
            });
        },

        updateYear: function() {
            const currentYear = new Date().getFullYear();
            const container = document.querySelector('.s-footer .container');
            const pElement = document.createElement('p');
    
            pElement.textContent = `© Copyright ${currentYear} - Todos os direitos reservados`;
            container.appendChild(pElement);
        },

        menuFixed: function() {
            const header = document.getElementById('js-header');
        
            function fixedMenu() {
                if(window.pageYOffset > 80) {
                    header.classList.add('fixed-menu');
                } else {
                    header.classList.remove('fixed-menu');
                }
            }
            
            document.addEventListener('scroll', fixedMenu);
        },

        LinkMenuAncora: function() {
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
            }
        },

        scrollToTopSmoothly: function() {
            const logo = document.getElementById("logo");
    
            logo.addEventListener("click", (event) => {
            event.preventDefault();
    
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
            });
        },

        reviewsSlides: function() {
            const swiper = new Swiper(".slide-reviews", {
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
        },

        brandsSlides: function() {
            var swiper = new Swiper('.slide-brands.swiper', {
                loop: true,
                slidesPerView: 3,
                speed: 8000,
                loopedSlidesLimit: false,
                allowTouchMove: false,
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
        },

        openAccordion: function() {
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
        },

        fakeCount: function() {
            function random(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            
            function countViewer(min, max, elementID) {
                var initial = random(min, max);
                var count = initial;
            
                setInterval(function () {
                    var variation = random(-2, 2);
            
                    count += variation;
                    if (count < min) {
                    count = min;
                    } else if (count > max) {
                    count = max;
                    }
            
                    $(elementID).text(count);
                }, 3000);
            }
            
            countViewer(10,30, '#count-viewer')
        }
    };

    // Execução de Funções após o carregamento do documento
    window.addEventListener('DOMContentLoaded', function () {
        const htmlElement = document.querySelector('html');

        if (htmlElement.classList.contains('page-home')) {
            // AOS Animation
            AOS.init({
                duration: 1000
            });

            theme.menuHamburgerMobile();
            theme.updateYear();
            theme.menuFixed();
            theme.LinkMenuAncora();
            theme.scrollToTopSmoothly();
            theme.reviewsSlides();
            theme.brandsSlides();
            theme.fakeCount();
            theme.openAccordion();
        }
    });
})();
import "../../css/global.css";
import "../../css/home.css";
import "../../css/header.css";
import "../../css/footer.css";
import "../../css/menu-mobile.css";
import "../../css/componentes.css";
import "../../css/obrigado.css";

// Adicione esta linha com as outras importações
import ScrollToSection from '../modules/ScrollToSection.js';
import MenuMobile from '../modules/menu-mobile.js';
import HeaderManager from '../modules/HeaderManager.js';
import HeaderScroll from '../modules/header-scroll.js';
import FormHandler from '../modules/formHandler.js';
import { initPageOpenAnimations, initScrollAnimations, initTypewriterAnimations } from '../modules/animations.js';
import SwiperClinicaSlider from '../modules/SwiperClinicaSlider.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado.");

    // 1. INICIALIZE O HEADER MANAGER PRIMEIRO
    const headerManager = new HeaderManager('.header');
    
    // 2. DEPOIS INICIALIZE O HEADER SCROLL
    const headerEl = document.querySelector('.header');
    if (headerEl) {
        const headerScroll = new HeaderScroll('.header');
        headerScroll.init();
    }

    // 3. MENU MOBILE
    const menuMobile = new MenuMobile(
        '[data-menu="logo"]',
        '[data-menu="button"]',
        '[data-menu="list"]',
        '[data-menu="contato-mobile"]',
        '[data-menu="whatsapp"]',
        '[data-menu="instagram"]',
        '.header_acoes'
    );
    if (menuMobile) {
        console.log('MenuMobile initialized successfully');
        menuMobile.init();
    }

    // 4. SCROLL SUAVE PARA ÂNCORAS (NOVO CÓDIGO)
    const scrollToSection = new ScrollToSection('a[href^="#"]', 60); // 80px de offset para o header
    scrollToSection.init();

    // Para links específicos com offset diferente (como o botão de agendamento)
    const scrollContact = new ScrollToSection('.btn-agendar', 80);
    scrollContact.init();

    // 5. DESTAQUE DO MENU ATIVO (OPCIONAL)
    class ActiveMenu {
        constructor() {
            this.sections = document.querySelectorAll('section[id]');
            this.menuLinks = document.querySelectorAll('.menu a[href^="#"]');
            this.currentSection = '';
            this.init();
        }

        init() {
            window.addEventListener('scroll', () => this.highlightMenu());
            this.highlightMenu();
        }

        highlightMenu() {
            let scrollPosition = window.scrollY + 100;

            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    const id = section.getAttribute('id');
                    this.currentSection = id;
                }
            });

            this.menuLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${this.currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Inicialize o destaque do menu ativo
    new ActiveMenu();

    // Restante do seu código existente...
    initPageOpenAnimations();
    initScrollAnimations();
    initTypewriterAnimations();
    new FormHandler();

    const swiperEl = document.querySelector('.agents-swiper');
    if (swiperEl) {
        new SwiperClinicaSlider();
    }
});
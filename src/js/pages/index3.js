import "../../css/global.css";
import "../../css/home-3.css";
import "../../css/header.css";
import "../../css/footer.css";
import "../../css/menu-mobile.css";
import "../../css/componentes.css";
import "../../css/formulario-contato.css";

import MenuMobile from '../modules/menu-mobile.js';
import HeaderManager from '../modules/HeaderManager.js'; // Já está importado
import HeaderScroll from '../modules/header-scroll.js';
import FormHandler from '../modules/formHandler.js';
import { initPageOpenAnimations, initScrollAnimations } from '../modules/animations.js';
import SwiperAgentsSlider from '../modules/SwiperAgentsSlider.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado.");

    // 1. INICIALIZE O HEADER MANAGER PRIMEIRO (novo código)
    const headerManager = new HeaderManager('.header');
    
    // 2. DEPOIS INICIALIZE O HEADER SCROLL (código existente)
    const headerEl = document.querySelector('.header');
    if (headerEl) {
        const headerScroll = new HeaderScroll('.header');
        headerScroll.init();
    }

    // 3. MENU MOBILE (código existente)
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

    // Restante do seu código existente...
    initPageOpenAnimations();
    initScrollAnimations();
    new FormHandler();

    const swiperEl = document.querySelector('.agents-swiper');
    if (swiperEl) {
        new SwiperAgentsSlider();
    }
});
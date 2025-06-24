import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { TextPlugin } from "gsap/TextPlugin.js"; // Importe do pacote principal


// Registre os plugins necessários
gsap.registerPlugin(ScrollTrigger, TextPlugin);

export const initPageOpenAnimations = () => {
  // 1. Configurações iniciais
  gsap.set("[data-menu='logo'], [data-menu='button'], #menu > li > a, #menu > li > span, .header_acoes a, .intro-text *, .page-open-animate, svg", {
    opacity: 0,
    visibility: "hidden"
  });

  gsap.set(".page-open-animate", {
    y: 30
  });

  gsap.set("svg", {
    scale: 0.95
  });


  const introducao = document.querySelector(".intro");
  if (introducao) {
      gsap.fromTo(introducao,  {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          opacity: 0
      }, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => introducao.style.clipPath = 'none'
      });
  }

  // Traçado: configura o strokeDash para animação de "desenho"
  const tracadoPaths = document.querySelectorAll("path.tracado");
  tracadoPaths.forEach(path => {
    const length = path.getTotalLength();

    path.style.stroke = "#7a6a5d";
    path.style.fill = "none";
    path.style.strokeWidth = 1;
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
  });

  // Preenchimento: invisível com blur
  const preenchimentoPaths = document.querySelectorAll(".preenchimento");
  gsap.set(preenchimentoPaths, {
    opacity: 0,
    filter: "blur(10px)"
  });

  // 2. Timeline principal
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Menu (sem mudanças)
tl.set("[data-menu='logo']", { visibility: "visible" })
.to("[data-menu='logo']", { opacity: 1, duration: 0.8 })

.set("[data-menu='button']", { visibility: "visible" })
.to("[data-menu='button']", { opacity: 1, duration: 0.6 }, ">0.2")

.set("#menu > li > a, #menu > li > span", { visibility: "visible" })
.to("#menu > li > a, #menu > li > span", {
  opacity: 1,
  stagger: 0.1,
  duration: 0.5
}, ">0.1")

.set(".header_acoes a", { visibility: "visible" })
.to(".header_acoes a", {
  opacity: 1,
  stagger: 0.15,
  duration: 0.5
}, ">0.1");

// SVG - ANTECIPADO (começa junto com os botões do header)
tl.set("svg", { visibility: "visible" })
.to("svg", {
  opacity: 1,
  scale: 1,
  duration: 0.5
}, "<-0.4") // <- antecipa em relação ao item anterior

.to(tracadoPaths, {
  strokeDashoffset: 0,
  duration: 2,
  stagger: 0.1,
  ease: "power1.inOut"
}, ">0.2")

.to(preenchimentoPaths, {
  opacity: 1,
  filter: "blur(0px)",
  duration: 0.6,
  stagger: 0.05,
  ease: "power1.inOut"
}, ">-0.6");

// INTRO TEXT - ANTECIPADO (entra quase junto com SVG)
tl.set(".intro-text h1", { visibility: "visible" })
.fromTo(".intro-text h1",
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }, "<-1.5")

.set(".intro-text p", { visibility: "visible" })
.fromTo(".intro-text p",
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }, ">0.1")

.set(".intro-text .btn-saiba-mais", { visibility: "visible" })
.fromTo(".intro-text .btn-saiba-mais",
  { opacity: 0, y: 30 },
  { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }, ">0.1");

 
  // Elementos da seção
  document.querySelectorAll('.page-open-animate').forEach((el, i) => {
    const rect = el.getBoundingClientRect();
    const isAboveFold = rect.top < window.innerHeight;

    if (isAboveFold) {
      gsap.fromTo(el,
        { visibility: "visible", opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 2.5 + (i * 0.1),
          ease: "back.out(1.4)"
        }
      );
    } else {
      gsap.set(el, { opacity: 1, visibility: "visible" });
    }
  });

  return tl;

};


export function initScrollAnimations() {
  console.log("initScrollAnimations() chamada!");
  

  const elements = document.querySelectorAll(".animate-me");
  console.log("Elementos encontrados:", elements);

  elements.forEach((el, index) => {
    console.log(`Registrando ScrollTrigger para o elemento ${index}`, el);

    // Definir os valores padrão
    let animationVars = {
      opacity: 0,
      duration: 1.4,
      ease: "power2.out"
    };

    // Detectar direção baseada na classe
    if (el.classList.contains("animate-up")) {
      animationVars.y = 50; // de baixo para cima
    } else if (el.classList.contains("animate-left")) {
      animationVars.x = -50; // da esquerda para a direita
    } else if (el.classList.contains("animate-right")) {
      animationVars.x = 50; // da direita para a esquerda
    } else if (el.classList.contains("animate-fade")) {
      // Nada além da opacidade (sem deslocamento)
    } else {
      // Se nenhuma direção for definida, usar y por padrão
      animationVars.y = 50;
    }

    // Aplicar GSAP com ScrollTrigger
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
        markers: false,
      },
      ...animationVars
    });
  });
}


export function initTypewriterAnimations() {
  const typeElements = document.querySelectorAll('.sobre-text p'); // Agora direcionando os parágrafos
  
  typeElements.forEach(paragraph => {
    const conteudo = paragraph.textContent;
    paragraph.textContent = '';
    
    // Cria um span vazio para a animação
    const typeSpan = document.createElement('span');
    paragraph.appendChild(typeSpan);
    
    // Remove o cursor quando a animação terminar
    const onComplete = () => {
      paragraph.parentElement.classList.remove('typing-active');
    };

    gsap.to(typeSpan, {
      scrollTrigger: {
        trigger: paragraph,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      duration: conteudo.length * 0.05,
      text: {
        value: conteudo,
        delimiter: ""
      },
      ease: "none",
      onStart: () => {
        paragraph.parentElement.classList.add('typing-active');
      },
      onComplete: onComplete
    });
  });
}
export default class ScrollToSection {
  constructor(triggerSelector, offset = 50) {
    this.triggers = document.querySelectorAll(triggerSelector);
    this.offset = offset;
    this.handleClick = this.handleClick.bind(this);
  }

  init() {
    if (!this.triggers.length) return;
    this.triggers.forEach((trigger) =>
      trigger.addEventListener("click", this.handleClick)
    );
  }

  handleClick(event) {
    event.preventDefault();

    const button = event.currentTarget;
    const targetSelector = button.getAttribute("href"); // Pega apenas o href
    
    // Verifica se é um link âncora válido
    if (!targetSelector || !targetSelector.startsWith('#')) {
      return; // Ignora links que não são âncoras
    }

    const target = document.querySelector(targetSelector);
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = targetPosition - this.offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }
}
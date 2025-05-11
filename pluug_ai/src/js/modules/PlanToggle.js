export default class PlanToggle {
  constructor() {
    this.toggle = document.querySelector('#planToggle');
    this.prices = document.querySelectorAll('.plan-price');

    if (this.toggle && this.prices.length > 0) {
      this.init();
    }
  }

  init() {
    this.updatePrices(); // exibe o preço correto ao carregar
    this.toggle.addEventListener('change', () => this.updatePrices());
  }

  updatePrices() {
    const isAnnual = this.toggle.checked;

    this.prices.forEach(price => {
      const rawValue = isAnnual
        ? price.getAttribute('data-annual')
        : price.getAttribute('data-monthly');

      const match = rawValue.match(/^(.+?)(\/.+)$/); // divide em [valor, /mês|/ano]

      if (match) {
        const [, amount, suffix] = match;
        price.innerHTML = `${amount}<span class="price-suffix">${suffix}</span>`;
      } else {
        price.textContent = rawValue;
      }
    });
  }
}

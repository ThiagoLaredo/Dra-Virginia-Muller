export default class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll("form[data-netlify]");
    this.init();
  }

  init() {
    if (!this.forms.length) return;
    this.forms.forEach((form) => this.bind(form));
  }

  bind(form) {
    const wrapper = form.parentElement;
    const successEl = wrapper.querySelector(".form-success");
    const errorEl = wrapper.querySelector(".form-error");

    if (successEl) successEl.style.display = "none";
    if (errorEl) errorEl.style.display = "none";

    form.addEventListener("submit", async (e) => {
      e.preventDefault(); // ✋ impede comportamento padrão Netlify

      if (successEl) successEl.style.display = "none";
      if (errorEl) errorEl.style.display = "none";

      const data = new FormData(form);
      if (!data.has("form-name")) {
        data.append("form-name", form.getAttribute("name") || "contato");
      }

      // Envia para o endpoint do Netlify usando fetch (AJAX)
      try {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(data).toString(),
        });

        if (response.status === 200 || response.status === 204) {
          form.reset();
          if (successEl) successEl.style.display = "block";
        } else {
          throw new Error(`Erro: ${response.status}`);
        }
      } catch (err) {
        if (errorEl) errorEl.style.display = "block";
        console.error("Erro no envio do formulário:", err);
      }
    });
  }
}

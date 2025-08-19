export default class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll("form[data-netlify]");
    this.init();
  }

  init() {
    if (!this.forms.length) return;
    this.forms.forEach((form) => this.handleForm(form));
  }

  handleForm(form) {
    const successEl = form.parentElement.querySelector(".form-success");
    const errorEl = form.parentElement.querySelector(".form-error");

    // Esconde mensagens no início
    successEl.style.display = "none";
    errorEl.style.display = "none";

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // feedback inicial
      successEl.style.display = "none";
      errorEl.style.display = "none";

      const formData = new FormData(form);

      try {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
          form.reset();
          successEl.style.display = "block";
          errorEl.style.display = "none";
        } else {
          throw new Error("Erro no envio");
        }
      } catch (error) {
        successEl.style.display = "none";
        errorEl.style.display = "block";
      }
    });
  }
}
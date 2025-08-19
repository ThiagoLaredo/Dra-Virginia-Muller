export default class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll("form[netlify]");
    this.init();
  }

  init() {
    if (!this.forms.length) return;
    this.forms.forEach((form) => this.handleForm(form));
  }

  handleForm(form) {
    const messageEl = form.querySelector(".form-message");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      messageEl.textContent = "Enviando...";
      messageEl.style.color = "#333";

      try {
        const formData = new FormData(form);

        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        });

        if (response.ok) {
          form.reset();
          messageEl.textContent = "✅ Obrigado! Sua mensagem foi enviada.";
          messageEl.style.color = "green";
        } else {
          throw new Error("Erro na resposta do servidor");
        }
      } catch (error) {
        messageEl.textContent =
          "❌ Ocorreu um erro. Tente novamente mais tarde.";
        messageEl.style.color = "red";
      }
    });
  }
}
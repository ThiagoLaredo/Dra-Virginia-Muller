export default class FormHandler {
    constructor(formSelector, successSelector, errorSelector) {
      this.form = document.querySelector(formSelector);
      this.successMessage = document.querySelector(successSelector);
      this.errorMessage = document.querySelector(errorSelector);
    }
  
    init() {
      if (!this.form) return;
  
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  
    async handleSubmit() {
      const formData = new FormData(this.form);
  
      try {
        const response = await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        });
  
        if (response.ok) {
          this.showSuccess();
        } else {
          this.showError("Houve um problema ao enviar. Tente novamente.");
        }
      } catch (error) {
        this.showError("Erro de conexão. Verifique sua internet e tente de novo.");
      }
    }
  
    showSuccess() {
      this.form.style.display = "none";
      if (this.successMessage) {
        this.successMessage.style.display = "block";
      }
    }
  
    showError(msg) {
      if (this.errorMessage) {
        this.errorMessage.textContent = msg; // permite customizar
        this.errorMessage.style.display = "block";
      } else {
        alert(msg); // fallback
      }
    }
  }
  
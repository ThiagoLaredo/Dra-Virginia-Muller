export default class FormHandler {
    constructor() {
        // Referência ao formulário de contato
        this.contactForm = document.getElementById('contactForm'); 
  
        this.web3ApiKey = 'a936ac9d-2155-46dc-8ab2-0d46ae112c69'; // Web3Forms para o contato
  
        this.init();
    }
  
    init() {
        if (this.contactForm) {
            this.contactForm.addEventListener('submit', (e) => this.handleSubmitWeb3Forms(e));
        }
  
        if (window.location.pathname.includes('obrigado.html')) {
            this.showThankYouMessage();
        }
    }
  
    // ==============================================
    // ENVIO PARA WEB3FORMS (CONTATO)
    // ==============================================
    handleSubmitWeb3Forms(event) {
        event.preventDefault();
  
        const form = event.target;
        const formData = new FormData(form);
        formData.append('apikey', this.web3ApiKey);
  
        // Salvando o tipo de formulário no localStorage
        localStorage.setItem('formType', 'contato');
  
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = 'obrigado.html'; // Redireciona para a página de agradecimento
            } else {
                alert('Erro ao enviar o formulário. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Houve um erro ao enviar o formulário. Tente novamente.');
        });
    }
  
    // ==============================================
    // MENSAGEM DE AGRADECIMENTO NA PÁGINA OBRIGADO
    // ==============================================
    showThankYouMessage() {
        const formType = localStorage.getItem('formType');
        const contactMessage = document.getElementById('contactThankYouMessage');
  
        if (formType === 'contato' && contactMessage) {
            contactMessage.style.display = 'flex';
        }
  
        // Limpa o localStorage após exibir a mensagem
        localStorage.removeItem('formType');
    }
  }
  
export default class HeaderManager {
    constructor(headerSelector, cssVarName = '--header-height') {
      this.header = document.querySelector(headerSelector);
      this.cssVarName = cssVarName;
      
      if (!this.header) {
        console.warn(`Header não encontrado: ${headerSelector}`);
        return;
      }
  
      this.init();
    }
  
    init() {
      this.updateHeight();
      
      // Observa mudanças no header (resize, conteúdo dinâmico)
      this.resizeObserver = new ResizeObserver(this.debounce(() => {
        this.updateHeight();
      }, 100));
  
      this.resizeObserver.observe(this.header);
  
      // Atualiza em eventos comuns
      window.addEventListener('load', () => this.updateHeight());
      window.addEventListener('orientationchange', () => {
        setTimeout(() => this.updateHeight(), 100);
      });
    }
  
    updateHeight() {
      const height = this.header.offsetHeight;
      document.documentElement.style.setProperty(
        this.cssVarName, 
        `${height}px`
      );
      return height;
    }
  
    debounce(func, wait) {
      let timeout;
      return () => {
        clearTimeout(timeout);
        timeout = setTimeout(func, wait);
      };
    }
  }
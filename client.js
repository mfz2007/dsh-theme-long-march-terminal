window.__ModuleLoader__.load({
  id: 'dsh-theme-long-march-terminal',
  factory() {
    return {
      apply(ctx) {
        if (typeof document === 'undefined') return;
        const styleTag = document.createElement('style');
        styleTag.innerHTML = `
          body { background: #00FF00 !important; }
          #app, .chat-container { border: 10px solid red !important; }
        `;
        document.head.appendChild(styleTag);
      }
    }
  }
});

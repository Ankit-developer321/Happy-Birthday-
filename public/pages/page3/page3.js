(() => {
  window.BirthdayPages = window.BirthdayPages || {};
  window.BirthdayPages.page3 = {
    name: 'memory',
    enhance(screen) {
      return screen?.classList.contains('memory-screen') ? screen : null;
    }
  };
})();

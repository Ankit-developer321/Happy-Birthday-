(() => {
  window.BirthdayPages = window.BirthdayPages || {};
  window.BirthdayPages.page6 = {
    name: 'final',
    enhance(screen) {
      return screen?.classList.contains('final-screen') ? screen : null;
    }
  };
})();

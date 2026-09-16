(() => {
  window.BirthdayPages = window.BirthdayPages || {};
  window.BirthdayPages.page2 = {
    name: 'tease',
    enhance(screen) {
      return screen?.classList.contains('tease-page') ? screen : null;
    }
  };
})();

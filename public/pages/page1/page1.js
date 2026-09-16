(() => {
  window.BirthdayPages = window.BirthdayPages || {};
  window.BirthdayPages.page1 = {
    name: 'welcome',
    enhance(screen) {
      return screen?.classList.contains('welcome') ? screen : null;
    }
  };
})();

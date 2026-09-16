(() => {
  window.BirthdayPages = window.BirthdayPages || {};

  function renderPage6(screen) {
    if (!screen || !screen.classList.contains('final-screen')) return;

    const letter = String(window.BIRTHDAY_CONTENT?.letter || '');
    const signatureMatch = letter.match(/\n\s*(AB❤️)\s*$/);
    const letterBody = signatureMatch ? letter.slice(0, signatureMatch.index).trim() : letter;
    const signature = signatureMatch ? signatureMatch[1] : '';

    const tiny = screen.querySelector('.tiny');
    if (tiny) {
      tiny.innerHTML = letterBody.replace(/\n/g, '<br><br>') + (signature ? `<span class="final-signature">${signature}</span>` : '');
    }
  }

  window.BirthdayPages.page6 = {
    name: 'final',
    render: renderPage6,
    enhance: renderPage6
  };
})();

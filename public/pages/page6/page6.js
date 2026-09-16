(() => {
  window.BirthdayPages = window.BirthdayPages || {};
  function renderPage6(screen) {
    if (!screen || !screen.classList.contains('final-screen')) return;
    const letter = String(window.BIRTHDAY_CONTENT?.letter || '');
    const signatureMatch = letter.match(/\n\s*(AB❤️)\s*$/);
    const letterBody = signatureMatch ? letter.slice(0, signatureMatch.index).trim() : letter;
    const signature = signatureMatch ? signatureMatch[1] : '';
    const tiny = screen.querySelector('.tiny');
    if (tiny) tiny.innerHTML = letterBody.replace(/\n/g, '<br><br>') + (signature ? `<span class="final-signature">${signature}</span>` : '');
  }
  function softReveal(screen) {
    if (!screen || !screen.classList.contains('final-screen')) return;
    screen.classList.add('final-reveal');
    ['💗','✨','💕'].forEach((symbol, i) => {
      const heart = document.createElement('span');
      heart.className = 'final-soft-heart'; heart.textContent = symbol;
      heart.style.setProperty('--dx', `${(i - 1) * 72}px`);
      heart.style.animationDelay = `${i * 0.18}s`;
      document.body.appendChild(heart); setTimeout(() => heart.remove(), 3000);
    });
  }
  window.BirthdayPages.page6 = {name:'final',render:renderPage6,enhance:renderPage6,softReveal};
  document.addEventListener('click', e => {
    const gift = e.target.closest?.('#finalGift');
    if (!gift) return;
    e.stopImmediatePropagation();
    const screen = document.querySelector('.final-screen');
    softReveal(screen);
    screen?.querySelector('#finalArea')?.classList.add('hidden');
    screen?.querySelector('#countdown')?.classList.add('hidden');
    screen?.querySelector('#finalText')?.classList.remove('hidden');
  });
})();

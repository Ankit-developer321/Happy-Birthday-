(() => {
  window.BirthdayTransitions = window.BirthdayTransitions || {};
  window.BirthdayTransitions.page4ToPage5 = function () {
    if (window.__page4Transitioning) return;
    window.__page4Transitioning = true;
    const screen = document.querySelector('.love-screen');
    const overlay = document.createElement('div');
    overlay.className = 'page4-to-page5';
    overlay.innerHTML = '<div class="p45-copy">The miles are real…</div><div class="p45-heart">❤️</div><div class="p45-line"></div><div class="p45-copy second">But they never changed us. ✨</div>';
    document.body.appendChild(overlay); screen?.classList.add('story-leave');
    requestAnimationFrame(() => overlay.classList.add('show'));
    setTimeout(() => {
      if (typeof window.__page4BaseNext === 'function') window.__page4BaseNext();
      setTimeout(() => { overlay.remove(); window.__page4Transitioning = false; }, 900);
    }, 2300);
  };
})();

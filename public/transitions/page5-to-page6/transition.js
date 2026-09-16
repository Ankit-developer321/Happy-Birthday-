(() => {
  window.BirthdayTransitions = window.BirthdayTransitions || {};
  window.BirthdayTransitions.page5ToPage6 = function () {
    if (window.__page5Transitioning) return;
    window.__page5Transitioning = true;
    const screen = document.querySelector('.distance-screen');
    const overlay = document.createElement('div');
    overlay.className = 'page5-to-page6';
    overlay.innerHTML = '<div class="p56-copy">One last little surprise…</div><div class="p56-heart">🎁</div><div class="p56-copy second">Just for you. ❤️</div>';
    document.body.appendChild(overlay);
    screen?.classList.add('story-leave');
    requestAnimationFrame(() => overlay.classList.add('show'));
    setTimeout(() => {
      if (typeof window.__birthdayAdvance === 'function') window.__birthdayAdvance();
      setTimeout(() => { overlay.remove(); window.__page5Transitioning = false; }, 1000);
    }, 1900);
  };
})();

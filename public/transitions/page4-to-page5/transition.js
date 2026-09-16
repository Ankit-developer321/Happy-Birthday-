(() => {
  window.BirthdayTransitions = window.BirthdayTransitions || {};

  window.BirthdayTransitions.page4ToPage5 = function () {
    if (window.BirthdayStory?.isTransitioning()) return;

    window.BirthdayStory?.beginTransition();

    const source = document.querySelector('.love-screen');
    const overlay = document.createElement('div');
    overlay.className = 'page4-to-page5';
    overlay.innerHTML = '<div class="p45-copy">The miles are real…</div><div class="p45-heart">❤️</div><div class="p45-line"></div><div class="p45-copy second">But they never changed us. ✨</div>';

    document.body.appendChild(overlay);
    source?.classList.add('story-leave');

    requestAnimationFrame(() => overlay.classList.add('show'));

    // The Page 5 handoff happens during the transition, so the new page is
    // already ready underneath the final fade instead of appearing late.
    setTimeout(() => {
      if (window.BirthdayStory?.advanceTo) {
        window.BirthdayStory.advanceTo(4);
      }
    }, 2300);

    setTimeout(() => {
      overlay.remove();
      window.BirthdayStory?.endTransition();
    }, 3500);
  };
})();

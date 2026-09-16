(() => {
  window.BirthdayTransitions = window.BirthdayTransitions || {};
  window.BirthdayTransitions.page3ToPage4 = function (advance) {
    if (document.querySelector('.page3-transition-prelude')) return;
    const overlay = document.createElement('div');
    overlay.className = 'page3-transition-prelude';
    overlay.innerHTML = '<div class="p3-prelude-glow"></div><div class="p3-prelude-heart">❤️</div><div class="p3-prelude-copy">One more little piece of us…</div><div class="p3-prelude-sparkles">✦　·　♥　·　✦</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('show'));
    setTimeout(() => { if (typeof advance === 'function') advance(); }, 1550);
    setTimeout(() => overlay.classList.add('fade'), 2350);
    setTimeout(() => overlay.remove(), 3450);
  };
})();

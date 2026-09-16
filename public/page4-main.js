(() => {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest?.('#nextMemory');
    if (!btn) return;
    const memories = window.BIRTHDAY_CONTENT?.memories || [];
    const current = window.__page3MemoryIndex ?? 0;
    if (current >= memories.length - 1) {
      e.preventDefault();
      e.stopImmediatePropagation();
      if (typeof window.romanticNext === 'function') window.romanticNext();
    }
  }, true);

  const baseRender = window.render;
  if (typeof baseRender !== 'function') return;

  window.render = function () {
    baseRender();
    const screen = document.querySelector('.love-screen');
    if (!screen) return;

    screen.innerHTML = `
      <div class="stars"></div>
      <div class="content">
        <span class="kicker">A LITTLE SECRET 💌</span>
        <h2>Tap a heart.</h2>
        <p class="subtitle">There are five little things I don't always say out loud.</p>
        <div class="heart-field">
          <button class="heart-bubble" data-i="0" aria-label="Hidden feeling one">💗</button>
          <button class="heart-bubble" data-i="1" aria-label="Hidden feeling two">🎧</button>
          <button class="heart-bubble" data-i="2" aria-label="Hidden feeling three">🫶</button>
          <button class="heart-bubble" data-i="3" aria-label="Hidden feeling four">🥹</button>
          <button class="heart-bubble" data-i="4" aria-label="Hidden feeling five">🌍</button>
        </div>
        <div id="loveMessage" class="love-message"></div>
        <div class="love-hint" id="loveHint">Find all five ✨</div>
        <div class="love-complete" id="loveComplete">Okay… now you know. ❤️</div>
      </div>`;

    const love = window.BIRTHDAY_CONTENT?.love || [];
    const message = screen.querySelector('#loveMessage');
    const hint = screen.querySelector('#loveHint');
    const complete = screen.querySelector('#loveComplete');
    const found = new Set();

    screen.querySelectorAll('.heart-bubble').forEach((button) => {
      button.addEventListener('click', () => {
        const i = Number(button.dataset.i);
        found.add(i);
        screen.querySelectorAll('.heart-bubble').forEach(x => x.classList.remove('active'));
        button.classList.add('active', 'found');
        message.textContent = love[i]?.[1] || '';
        message.classList.remove('show');
        requestAnimationFrame(() => message.classList.add('show'));
        hint.textContent = found.size < 5 ? `${found.size} of 5 discovered ✨` : '';
        if (found.size === 5) {
          setTimeout(() => complete.classList.add('show'), 500);
          setTimeout(() => { hint.textContent = 'But there’s one thing distance keeps reminding me…'; }, 1100);
        }
      });
    });
  };
})();

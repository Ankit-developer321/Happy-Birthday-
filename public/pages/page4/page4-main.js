(() => {
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
        <button class="primary love-next" id="loveNext" type="button">Continue… ✨</button>
      </div>`;

    const love = window.BIRTHDAY_CONTENT?.love || [];
    const message = screen.querySelector('#loveMessage');
    const hint = screen.querySelector('#loveHint');
    const complete = screen.querySelector('#loveComplete');
    const next = screen.querySelector('#loveNext');
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
          setTimeout(() => {
            hint.textContent = 'But there’s one thing distance keeps reminding me…';
            next.classList.add('show');
          }, 1100);
        }
      });
    });

    next.addEventListener('click', () => {
      if (found.size < 5 || window.__page4Transitioning) return;
      window.__page4Transitioning = true;
      const overlay = document.createElement('div');
      overlay.className = 'page4-to-page5';
      overlay.innerHTML = '<div class="p45-copy">The miles are real…</div><div class="p45-heart">❤️</div><div class="p45-line"></div><div class="p45-copy second">But they never changed us. ✨</div>';
      document.body.appendChild(overlay);
      screen.classList.add('story-leave');
      requestAnimationFrame(() => overlay.classList.add('show'));
      setTimeout(() => {
        // Advance the base story only after the Page 4 cinematic beat.
        if (typeof window.__page4BaseNext === 'function') window.__page4BaseNext();
        setTimeout(() => {
          overlay.remove();
          window.__page4Transitioning = false;
        }, 900);
      }, 2300);
    });
  };

  const originalRomanticNext = window.romanticNext;
  if (typeof originalRomanticNext !== 'function') return;
  window.__page4BaseNext = originalRomanticNext;

  // Give the Page 3 -> Page 4 handoff a little more breathing room.
  window.romanticNext = function () {
    if (document.querySelector('.love-screen')) {
      const next = document.querySelector('#loveNext');
      if (next && !window.__page4Transitioning) next.click();
      return;
    }
    if (!document.querySelector('.memory-screen')) {
      originalRomanticNext();
      return;
    }

    const existing = document.querySelector('.page3-transition-prelude');
    if (existing) return;

    const style = document.createElement('style');
    style.className = 'page3-transition-prelude-style';
    style.textContent = `
      .page3-transition-prelude{
        position:fixed;inset:0;z-index:400;pointer-events:none;display:grid;place-items:center;
        overflow:hidden;opacity:0;background:radial-gradient(circle at 50% 56%,rgba(92,47,82,.97) 0%,rgba(29,21,42,.98) 48%,rgba(7,8,19,1) 100%);
      }
      .page3-transition-prelude.show{animation:p3PreludeIn 1.15s ease forwards}
      .page3-transition-prelude.fade{animation:p3PreludeOut 1.05s ease forwards}
      .p3-prelude-glow{position:absolute;width:58vw;height:58vw;max-width:560px;max-height:560px;border-radius:50%;background:radial-gradient(circle,rgba(235,126,168,.38),rgba(133,73,137,.20) 42%,transparent 72%);filter:blur(22px);transform:scale(.48);opacity:0}
      .page3-transition-prelude.show .p3-prelude-glow{animation:p3PreludeGlow 2.65s ease forwards}
      .p3-prelude-heart{position:relative;z-index:2;font-size:clamp(4.2rem,18vw,8.5rem);opacity:0;transform:scale(.48);filter:drop-shadow(0 0 30px rgba(255,130,177,.7))}
      .page3-transition-prelude.show .p3-prelude-heart{animation:p3PreludeHeart 2.65s cubic-bezier(.18,.82,.25,1) forwards}
      .p3-prelude-copy{position:absolute;top:22%;z-index:3;font-family:Georgia,serif;font-size:clamp(1.15rem,4.8vw,2rem);color:#f8dce8;text-align:center;opacity:0;transform:translateY(12px)}
      .page3-transition-prelude.show .p3-prelude-copy{animation:p3PreludeCopy 2.65s ease forwards}
      .p3-prelude-sparkles{position:absolute;bottom:21%;z-index:3;color:#f5a7c4;font-size:clamp(1rem,4vw,1.7rem);letter-spacing:.75rem;opacity:0}
      .page3-transition-prelude.show .p3-prelude-sparkles{animation:p3PreludeSparkles 2.65s ease forwards}
      @keyframes p3PreludeIn{0%{opacity:0}28%{opacity:1}100%{opacity:1}}
      @keyframes p3PreludeOut{0%{opacity:1}100%{opacity:0}}
      @keyframes p3PreludeGlow{0%{opacity:0;transform:scale(.48)}28%{opacity:1;transform:scale(.9)}58%{opacity:.9;transform:scale(1)}82%{opacity:.55;transform:scale(1.12)}100%{opacity:.05;transform:scale(1.24)}}
      @keyframes p3PreludeHeart{0%{opacity:0;transform:scale(.48)}28%{opacity:1;transform:scale(1.04)}45%{transform:scale(.96)}58%{transform:scale(1)}82%{opacity:.9;transform:scale(1.08)}100%{opacity:.15;transform:scale(1.22)}}
      @keyframes p3PreludeCopy{0%,18%{opacity:0;transform:translateY(12px)}34%{opacity:1;transform:translateY(0)}74%{opacity:1}100%{opacity:0;transform:translateY(-5px)}}
      @keyframes p3PreludeSparkles{0%,24%{opacity:0;transform:translateY(8px)}38%{opacity:.85;transform:translateY(0)}72%{opacity:.65}100%{opacity:0;transform:translateY(-8px)}}
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.className = 'page3-transition-prelude';
    overlay.innerHTML = '<div class="p3-prelude-glow"></div><div class="p3-prelude-heart">❤️</div><div class="p3-prelude-copy">One more little piece of us…</div><div class="p3-prelude-sparkles">✦　·　♥　·　✦</div>';
    document.body.appendChild(overlay);
    requestAnimationFrame(() => overlay.classList.add('show'));

    setTimeout(() => originalRomanticNext(), 1550);
    setTimeout(() => {
      overlay.classList.remove('show');
      overlay.classList.add('fade');
    }, 2350);
    setTimeout(() => {
      overlay.remove();
      style.remove();
    }, 3450);
  };
})();
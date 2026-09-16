(() => {
  const originalRender = window.render;
  if (typeof originalRender !== 'function') return;

  window.render = function () {
    originalRender();
    if (typeof window.step !== 'undefined' && window.step !== 4) return;
    const screen = document.querySelector('.distance-screen');
    if (!screen) return;

    screen.innerHTML = `
      <div class="distance-stars"></div>
      <div class="content">
        <span class="kicker">THE LONG-DISTANCE PART 🌍</span>
        <h2>Different places.<br>One heart.</h2>
        <div class="distance-stage">
          <div class="distance-person you">🫵</div>
          <div class="distance-person her">💗</div>
          <div class="distance-label you">me</div><div class="distance-label her">you</div>
          <div class="distance-thread"><span class="distance-dot"></span></div>
        </div>
        <p class="distance-copy" id="distanceCopy">Sometimes I wish distance had an off button.</p>
        <p class="distance-sub">Tap the little heart when you're ready to bring us a little closer.</p>
        <button class="primary distance-next" id="distanceNext">One last surprise 🎁</button>
      </div>`;

    const copy = screen.querySelector('#distanceCopy');
    const sub = screen.querySelector('.distance-sub');
    const next = screen.querySelector('#distanceNext');
    const her = screen.querySelector('.distance-person.her');
    if (her) her.addEventListener('click', () => {
      if (her.dataset.opened) return;
      her.dataset.opened = '1';
      her.style.animation = 'none';
      her.style.transform = 'translateY(-50%) scale(1.18)';
      setTimeout(() => {
        copy.classList.add('fade');
        setTimeout(() => {
          copy.textContent = 'I wish your birthday hug didn’t have to wait.';
          copy.classList.remove('fade');
          sub.textContent = 'The miles are real… but they never got to decide how close you are to me.';
          setTimeout(() => {
            copy.classList.add('fade');
            setTimeout(() => {
              copy.textContent = 'But distance hasn’t changed one thing…';
              copy.classList.remove('fade');
              setTimeout(() => {
                copy.classList.add('fade');
                setTimeout(() => {
                  copy.textContent = 'You are still my person. ❤️';
                  copy.classList.remove('fade');
                  next.classList.add('show');
                }, 550);
              }, 1700);
            }, 500);
          }, 2200);
        }, 500);
      }, 350);
    });
  };

  // Page 5 owns only its exit to Page 6. Page 4 -> Page 5 is handled by page4-main.js.
  const oldNext = window.romanticNext;
  window.romanticNext = function () {
    if (window.__page5Transitioning) return;
    const screen = document.querySelector('.distance-screen');
    if (!screen) return oldNext?.();
    window.__page5Transitioning = true;
    const overlay = document.createElement('div');
    overlay.className = 'page5-to-page6';
    overlay.innerHTML = '<div class="p56-copy">One last little surprise…</div><div class="p56-heart">🎁</div><div class="p56-copy second">Just for you. ❤️</div>';
    document.body.appendChild(overlay);
    screen.classList.add('story-leave');
    requestAnimationFrame(() => overlay.classList.add('show'));
    setTimeout(() => {
      if (typeof oldNext === 'function') oldNext();
      setTimeout(() => {
        overlay.remove();
        window.__page5Transitioning = false;
      }, 900);
    }, 1900);
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest?.('#distanceNext')) window.romanticNext();
  });
})();
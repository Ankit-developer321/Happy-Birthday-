(() => {
  window.BirthdayPages = window.BirthdayPages || {};

  function renderPage5(screen) {
    if (!screen || !screen.classList.contains('distance-screen')) return;
    screen.innerHTML = `<div class="distance-stars"></div><div class="content"><span class="kicker">THE LONG-DISTANCE PART 🌍</span><h2>Different places.<br>One heart.</h2><div class="distance-stage"><div class="distance-person you">🫵</div><div class="distance-person her">💗</div><div class="distance-label you">me</div><div class="distance-label her">you</div><div class="distance-thread"><span class="distance-dot"></span></div></div><p class="distance-copy" id="distanceCopy">Sometimes I wish distance had an off button.</p><p class="distance-sub">Tap the little heart when you're ready to bring us a little closer.</p><button class="primary distance-next" id="distanceNext">One last surprise 🎁</button></div>`;
    const copy = screen.querySelector('#distanceCopy');
    const sub = screen.querySelector('.distance-sub');
    const next = screen.querySelector('#distanceNext');
    const her = screen.querySelector('.distance-person.her');
    her?.addEventListener('click', () => {
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
    next.addEventListener('click', () => {
      if (!next.classList.contains('show')) return;
      window.BirthdayTransitions?.page5ToPage6?.();
    });
  }

  window.BirthdayPages.page5 = { render: renderPage5 };
})();

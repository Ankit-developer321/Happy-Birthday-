(() => {
  window.BirthdayPages = window.BirthdayPages || {};

  function renderPage5(screen) {
    if (!screen || !screen.classList.contains('distance-screen')) return;
    screen.innerHTML = `<div class="distance-stars"></div><div class="content"><span class="kicker">THE LONG-DISTANCE PART 🌍</span><h2>Different places.<br>One heart.</h2><div class="distance-stage"><div class="distance-person you">🫵</div><div class="distance-person her">💗</div><div class="distance-label you">me</div><div class="distance-label her">you</div><div class="distance-thread"><span class="distance-dot"></span></div></div><p class="distance-copy" id="distanceCopy">Sometimes I wish distance had an off button.</p><p class="distance-sub">Tap the little heart when you're ready to bring us a little closer.</p><button class="primary distance-next" id="distanceNext">One last surprise 🎁</button></div>`;
    const stage = screen.querySelector('.distance-stage');
    const copy = screen.querySelector('#distanceCopy');
    const sub = screen.querySelector('.distance-sub');
    const next = screen.querySelector('#distanceNext');
    const her = screen.querySelector('.distance-person.her');

    her?.addEventListener('click', () => {
      if (her.dataset.opened) return;
      her.dataset.opened = '1';
      stage?.classList.add('closer');
      her.classList.add('chosen');
      setTimeout(() => {
        copy.classList.add('fade');
        setTimeout(() => {
          copy.textContent = 'I just wish your birthday hug didn’t have to wait… I really want to be there and hold you tight. ❤️🥺';
          copy.classList.remove('fade');
          sub.textContent = 'Distance can measure the miles between us, but it could never measure the place you have in my heart. ✨❤️';
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
                  stage?.classList.add('final-close');
                  next.classList.add('show');
                }, 550);
              }, 1700);
            }, 500);
          }, 2600);
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

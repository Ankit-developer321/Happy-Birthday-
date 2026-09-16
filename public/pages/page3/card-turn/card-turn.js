(() => {
  let lastButton = null;
  let busy = false;

  function enhance() {
    const btn = document.querySelector('#nextMemory');
    if (!btn || btn === lastButton) return;
    lastButton = btn;
    btn.classList.add('page3-turn-trigger');
    btn.innerHTML = '<span aria-hidden="true">♡</span><b>turn the page…</b><i aria-hidden="true">→</i>';

    btn.addEventListener('click', (e) => {
      const memories = window.BIRTHDAY_CONTENT?.memories || [];
      if (window.__page3MemoryIndex == null) window.__page3MemoryIndex = 0;
      const current = window.__page3MemoryIndex;

      // On the final memory, do NOT intercept the click. Let the main
      // story handler receive it and run the Page 3 → Page 4 transition.
      if (current >= memories.length - 1) return;

      if (btn.dataset.turnBypass === '1') {
        delete btn.dataset.turnBypass;
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      if (busy) return;

      const next = current + 1;
      busy = true;
      const currentPhoto = `photos/page3/${current + 1}.jpg`;
      const nextPhoto = `photos/page3/${next + 1}.jpg`;
      const overlay = document.createElement('div');
      overlay.className = 'page3-card-turn-overlay';
      overlay.innerHTML = `<div class="page3-card-turn-stage">
        <div class="page3-card-turn-face front"><div class="page3-card-turn-photo" style="background-image:url('${currentPhoto}')"></div></div>
        <div class="page3-card-turn-face back"><div class="page3-card-turn-photo" style="background-image:url('${nextPhoto}')"></div></div>
        <div class="page3-card-turn-note">another little memory… ♡</div>
      </div>`;
      document.body.appendChild(overlay);
      requestAnimationFrame(() => overlay.classList.add('show'));

      setTimeout(() => {
        window.__page3MemoryIndex = next;
        overlay.classList.add('done');
        setTimeout(() => {
          overlay.classList.remove('show');
          setTimeout(() => {
            overlay.remove();
            busy = false;

            // The final card-turn must hand off directly to the Page 3 → Page 4
            // transition. The story's `memory` variable is intentionally not
            // advanced here because Page 4 is the next destination.
            if (next >= memories.length - 1) {
              window.BirthdayTransitions?.page3ToPage4?.();
              return;
            }

            const realBtn = document.querySelector('#nextMemory');
            if (realBtn) {
              realBtn.dataset.turnBypass = '1';
              realBtn.click();
            }
          }, 350);
        }, 250);
      }, 900);
    }, true);
  }

  document.addEventListener('click', (e) => {
    const card = e.target.closest?.('#page3Photo');
    if (!card || !card.classList.contains('revealed') || busy) return;
    const memories = window.BIRTHDAY_CONTENT?.memories || [];
    const current = window.__page3MemoryIndex || 0;
    if (current >= memories.length - 1) return;
    const btn = document.querySelector('#nextMemory');
    if (btn) btn.click();
  });

  new MutationObserver(enhance).observe(document.body, { childList: true, subtree: true });
  enhance();
})();
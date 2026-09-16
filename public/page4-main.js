(() => {
  // Page 3's card-turn enhancement owns the first memory turns. On the
  // final memory, this handler deliberately takes over so Page 3 can never
  // get stuck behind the locked Page 4 standalone page.
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
    if (typeof window.step === 'undefined' && window.location) {
      // no-op; the main script keeps its state privately.
    }
  };
})();

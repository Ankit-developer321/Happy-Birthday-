// Transition owner: Page 2 → Page 3.
// The existing page2LightTransition() remains in script.js during this safe refactor pass.
window.BirthdayTransitions = window.BirthdayTransitions || {};
window.BirthdayTransitions.page2ToPage3 = () => window.page2LightTransition?.();

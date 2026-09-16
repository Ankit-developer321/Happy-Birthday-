// Transition owner: Page 1 → Page 2.
// The existing handTransition() remains in script.js during this safe refactor pass.
// This module is the documented ownership boundary for the next extraction pass.
window.BirthdayTransitions = window.BirthdayTransitions || {};
window.BirthdayTransitions.page1ToPage2 = () => window.handTransition?.();

# Page modules

Each page keeps its own page-specific code and styling. Shared application bootstrapping remains in `public/script.js` and shared content remains in `public/content.js`.

Page modules must not own another page's transition logic.

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  // Use Vite's preprocessor
  preprocess: vitePreprocess(),
  compilerOptions: {
    // Enable custom element mode for web components
    customElement: true
  }
};

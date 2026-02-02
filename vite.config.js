import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        // Build as custom elements (web components)
        customElement: true
      }
    })
  ],
  build: {
    // Output to js/dist for HubSpot
    outDir: 'js/dist',
    emptyOutDir: true,
    target: 'es2020',
    minify: 'terser',
    sourcemap: true,
    lib: {
      entry: {
        'header-nav': resolve(__dirname, 'src/components/HeaderNav.svelte'),
        'hero-banner': resolve(__dirname, 'src/components/HeroBanner.svelte'),
        'appointment-scheduler': resolve(__dirname, 'src/components/AppointmentScheduler.svelte'),
      },
      formats: ['es'], // ESM format for HubSpot
      fileName: (format, entryName) => `${entryName}.js`
    },
    rollupOptions: {
      output: {
        // Don't hash filenames - HubSpot needs predictable paths
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  }
});

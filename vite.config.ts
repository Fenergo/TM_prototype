import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/TM_prototype/',          // important for project page
  build: {
    outDir: 'docs',                // publishable folder
    emptyOutDir: true
  },
  plugins: [react()]
});
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { cpSync } from 'node:fs';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'copy-legacy-asset-paths',
      closeBundle() {
        cpSync(resolve(__dirname, 'src/assets'), resolve(__dirname, 'dist/src/assets'), {
          recursive: true
        });
      }
    }
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});

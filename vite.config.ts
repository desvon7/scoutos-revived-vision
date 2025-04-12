
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import lovableTagger from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    lovableTagger(), // Add the Lovable component tagger plugin
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080
  }
});

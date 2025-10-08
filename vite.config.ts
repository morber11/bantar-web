import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite config
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: process.env.VITE_APP_ENV === 'prod'
      ? { '/api': 'http://161.35.45.14:8080' }
      : { '/api': 'http://localhost:8080' },
  },
});

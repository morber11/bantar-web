import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: process.env.VITE_APP_ENV === 'prod'
      ? { '/api': 'http://161.35.45.14:8080' }
      : {},
  },
});

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite config
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const prodProxy = { '/api': 'http://161.35.45.14:8080' };
  const devProxy = { '/api': 'http://localhost:8080' };

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: env.VITE_APP_ENV === 'prod' ? prodProxy : devProxy,
    },
  };
});

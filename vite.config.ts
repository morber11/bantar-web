import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite config
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const prodProxy = { '/api': 'http://161.35.45.14:8080' };
  const devProxy = { '/api': 'http://localhost:8080' };

  const port = Number(env.VITE_PORT) || 5173;
  const allowedHosts = env.VITE_ALLOWED_HOSTS
    ? env.VITE_ALLOWED_HOSTS.split(',').map((h) => h.trim()).filter(Boolean)
    : [];

  if (port && !allowedHosts.includes(`localhost:${port}`)) {
    allowedHosts.push(`localhost:${port}`);
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: env.VITE_APP_ENV === 'prod' ? prodProxy : devProxy,
      allowedHosts,
      hmr: false,
    },
  };
});

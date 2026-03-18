import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Vite config
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const devProxy = { '/api': 'http://localhost:8080' };
    const prodProxyTarget = env.VITE_API_URL;
    const prodProxy = prodProxyTarget ? { '/api': prodProxyTarget } : undefined;

    if (env.VITE_APP_ENV === 'prod') {
        if (!prodProxyTarget) {
            throw new Error('VITE_API_URL is required when VITE_APP_ENV=prod. Set VITE_API_URL in your environment.');
        }
    }

    const port = Number(env.VITE_PORT) || 5173;
    const allowedHosts = env.VITE_ALLOWED_HOSTS
        ? env.VITE_ALLOWED_HOSTS.split(',').map((h) => h.trim()).filter(Boolean)
        : [];

    if (env.VITE_APP_ENV === 'prod') {
        if (allowedHosts.length === 0) {
            throw new Error('VITE_ALLOWED_HOSTS is required when VITE_APP_ENV=prod. Set VITE_ALLOWED_HOSTS in your environment.');
        }
    } else {
        // during dev ensure localhost:port is allowed for the dev server
        if (port && !allowedHosts.includes(`localhost:${port}`)) {
            allowedHosts.push(`localhost:${port}`);
        }
    }

    return {
        plugins: [
            react(),
            tailwindcss(),
        ],
        server: {
            proxy: env.VITE_APP_ENV === 'prod' ? (prodProxy ?? devProxy) : devProxy,
            allowedHosts,
            hmr: false,
        },
    };
});

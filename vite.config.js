import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const SKINPORT_TARGET = env.VITE_SKINPORT_TARGET || 'https://api.skinport.com';
  const SKINPORT_REWRITE = env.VITE_SKINPORT_REWRITE || '/v1/items';

  return {

    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
    },
    server: {
      proxy: {
        '/api/skinport': {
          target: SKINPORT_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace('/api/skinport', SKINPORT_REWRITE),
        },
      },
    },
  };
});

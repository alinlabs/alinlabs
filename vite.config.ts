import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  return {
    // Base '/' ensures assets are loaded from the root, preventing 404s on nested routes
    base: '/',
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: true as const,
    },
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      assetsInlineLimit: 4096,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'motion-vendor': ['motion'],
            'lottie-vendor': ['@lottiefiles/dotlottie-react', 'lottie-web'],
            'icons-vendor': ['lucide-react'],
          },
        },
      },
    },
  };
});

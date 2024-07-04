import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development or production)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server:
      mode === 'development'
        ? {
            proxy: {
              '/api': {
                target: env.VITE_API_URL,
                changeOrigin: true,
                secure: false,
                ws: true,
              },
            },
          }
        : {},
    build: {
      outDir: 'dist',
      minify: 'terser',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [
              'react',
              'react-dom',
              'react-router-dom',
              '@reduxjs/toolkit',
              'react-redux',
            ],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    optimizeDeps: {
      include: [
        '@hookform/error-message',
        '@paypal/react-paypal-js',
        'react-toastify',
      ],
    },
  };
});

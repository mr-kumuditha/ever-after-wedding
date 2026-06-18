import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('react-dom') || id.includes('react-router-dom')) return 'vendor';
          if (id.includes('framer-motion')) return 'framer';
          if (id.includes('@supabase')) return 'supabase';
          if (id.includes('recharts')) return 'charts';
          if (id.includes('node_modules/react')) return 'vendor';
        },
      },
    },
  },
});

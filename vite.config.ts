import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 5173
  },
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, '/');

          if (normalized.includes('/node_modules/three/')) {
            return 'three-core';
          }

          if (
            normalized.includes('/node_modules/@react-three/') ||
            normalized.includes('/node_modules/maath/') ||
            normalized.includes('/node_modules/troika-') ||
            normalized.includes('/node_modules/three-stdlib/')
          ) {
            return 'three-react';
          }

          if (normalized.includes('/node_modules/framer-motion/')) {
            return 'motion';
          }

          if (normalized.includes('/node_modules/gsap/')) {
            return 'gsap';
          }

          if (normalized.includes('/node_modules/lucide-react/')) {
            return 'icons';
          }

          if (normalized.includes('/node_modules/lenis/')) {
            return 'scroll';
          }
        }
      }
    }
  }
});

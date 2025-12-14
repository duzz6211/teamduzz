import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages 배포 대응
 * - dev: /
 * - prod(GitHub Pages repo pages): /teamduzz/
 */
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/teamduzz/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
}))

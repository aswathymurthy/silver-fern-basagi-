import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8000',
      '/storage': 'http://localhost:8000'
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
// Two pages: the current site, and archived past versions under /v1/ etc.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        v1: fileURLToPath(new URL('./v1/index.html', import.meta.url)),
      },
    },
  },
})

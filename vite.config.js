import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  base: command === 'build' ? './' : '/',
  server: {
    port: 5174,
    proxy: {
      '/odata': {
        target: 'http://localhost:4004',
        changeOrigin: true,
      }
    }
  }
}))

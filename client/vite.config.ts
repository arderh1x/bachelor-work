import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Усі запити, що починаються з /api, будуть перенаправлені на сервер
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      }
    }
  }
})
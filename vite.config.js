import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3001,
    proxy: {
      '/api/movies': {
        target: 'http://localhost:5000/movies',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/movies/, ''),
      },
      '/api/mycart': {
        target: 'http://localhost:5009/mycart',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/mycart/, ''),
      },
    },
  },
  plugins: [react()],
})

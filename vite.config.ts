import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change the default port (from 5173 to 3000)
    proxy: {
      '/device': 'http://localhost:8080', // Proxy API requests to a backend server
    }
  }
})

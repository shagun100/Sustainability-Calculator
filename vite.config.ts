import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Your frontend runs on port 3000
    proxy: {
      '/device': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/account': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/emission': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/device/upload-excel': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/data-centers': {  
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/device-models': {  // ✅ Added proxy for device models
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      },
      '/device-types': {  // ✅ Added proxy for device types
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})

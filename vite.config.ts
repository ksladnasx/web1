import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy: {
      '/api': {
        target: 'https://jy8b5cnnmg.hzh.sealos.run',
        changeOrigin: true,
        
      }
    }
  }
})

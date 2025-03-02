import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.uomg.com', // 目标服务器地址
        changeOrigin: true, // 修改请求头中的 Origin 字段
        rewrite: (path) => path.replace(/^\/api/, ''), // 路径重写，去掉 '/api' 前缀
      },
    },
  },
})

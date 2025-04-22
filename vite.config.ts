import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
  Components({
    resolvers: [ElementPlusResolver()],
  })],
  server: {
    
    // allowedHosts: ["'https://jy8b5cnnmg.hzh.sealos.run'"],
    proxy: {
      '/api': {
        target: 'http://192.168.1.107:1234',
        changeOrigin: true,
        secure: false,       // 关闭 SSL 验证
        // rewrite: (path) => path.replace(/^\/api/, '') // 去掉路径前缀/api（可选）
      },
      
    }
  }
})

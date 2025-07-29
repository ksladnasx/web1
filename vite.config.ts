import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()], // 自动导入Vue API及Element Plus组件
    }),
    Components({
      resolvers: [ElementPlusResolver()], // 自动注册组件
    }), 
  Components({
    resolvers: [ElementPlusResolver()],
  })],
  server: {
    
    // allowedHosts: ["'https://jy8b5cnnmg.hzh.sealos.run'"],
    proxy: {
      '/dev':{
        target: "https://jy8b5cnnmg.hzh.sealos.run",
        changeOrigin: true,
        secure: false,       // 关闭 SSL 验证
        rewrite: (path) => path.replace('\dev', '') // 去掉路径前缀/api（可选）
      }
      
    }
  }
})

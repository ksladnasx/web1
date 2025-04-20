<!-- components/Sidebar.vue -->
<script setup lang="ts">
import { ElMenu, ElMenuItem } from 'element-plus'
import { ref } from 'vue'

const activeIndex = ref('1')
</script>

<template>
  <el-menu
    class="sidebar-menu"
    :default-active="activeIndex"
    background-color="#1c212f"
    text-color="#fff"
    active-text-color="#c3ff00"
    router
  >
    <el-menu-item index="/">
      <span>🏠 主页</span>
    </el-menu-item>
    
    <el-menu-item index="/homepage">
      <span>🔍 主页</span>
    </el-menu-item>
    
    <el-menu-item index="/music">
      <span>🎵 音乐</span>
    </el-menu-item>

    <el-menu-item index="/star-map">
      <span>⭐ 学习星图</span>
    </el-menu-item>

    <el-menu-item index="/submit">
      <span>🙋‍♂️ 自定义网站</span>
    </el-menu-item>

    <el-menu-item index="/profile">
      <span>👤 个人中心</span>
    </el-menu-item>

    <el-menu-item index="/about">
      <span>🎈 关于</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.sidebar-menu {
  width: 200px;
  height: 100vh;
  border-right: 1px solid rgba(255,255,255,0.1);
}

.el-menu-item {
  transition: all 0.3s !important;
  &:hover {
    transform: scale(1.05);
    background-color: rgba(255,255,255,0.05) !important;
  }
}

.el-menu-item.is-active {
  background-color: rgba(195, 255, 0, 0.1) !important;
}
</style>
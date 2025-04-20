<!-- ShortcutGrid.vue -->
<template>
    <div class="shortcut-container">
      <div class="app-grid">
        <div 
          v-for="(item, index) in shortcuts" 
          :key="index"
          class="app-item"
          @click="openLink(item.url)"
        >
          <!-- 优化后的图标容器 -->
          <div class="icon-wrapper">
            <img 
              v-if="item.iconType === 'url'"
              :src="item.icon"
              alt="网站图标"
            />
            <component
              v-else
              :is="resolveIconType(item.iconType)"
              :class="item.icon"
              :style="{ color: item.color }"
            />
          </div>
          <span class="app-name">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
 interface ShortcutConfig {
  name: string
  url: string
  icon?: string  // 仅用于组件图标
  iconType: 'element' | 'svg' | 'url' // 新增url类型
  color?: string
}

const props = defineProps({
  shortcuts: {
    type: Array as () => ShortcutConfig[],
    default: () => [
      {
        name: 'Google',
        url: 'https://google.com',
        iconType: 'url' // 使用网站图标
      },
      {
        name: 'Gmail',
        url: 'https://mail.google.com',
        iconType: 'url'
      }
    ]
  }
})

// 使用Google Favicon API获取图标
const getFaviconUrl = (url: string) => {
  const domain = new URL(url).hostname
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}
  
  const resolveIconType = (type: string) => {
    const components = {
      element: 'el-icon',
      svg: 'svg-icon',
      custom: 'i'
    }
    return components[type as keyof typeof components] || 'el-icon'
  }
  
  const openLink = (url: string) => {
    window.open(url, '_blank')
  }
  </script>
  
  <style scoped>
  .shortcut-container {
    margin-top: 2rem;
    width: 80%;
    max-width: 1200px;
  }
  
  .app-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 2rem;
    justify-content: center;
  }
  
  .app-item {
    cursor: pointer;
    transition: transform 0.2s ease;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    border-radius: 12px;
    /* background: rgba(255, 255, 255, 0.1); */
    
    &:hover {
      transform: translateY(-5px) scale(1.05);
      background: rgba(255, 255, 255, 0.2);
      
      .app-name {
        color: #8ab4f8;
      }
    }
  }
  
  .icon-wrapper {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    /* margin-bottom: 12px; */
    background-color: #7a92ba;
    
    :deep(svg) {
      width: 60%;
      height: 60%;
      fill: currentColor;
    }
  }
  
  .app-name {
    color: #e8eaed;
    font-size: 14px;
    text-align: center;
    transition: color 0.2s ease;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    .app-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;
    }
    
    .icon-wrapper {
      width: 56px;
      height: 56px;
    }
  }

  /* 新增图片样式 */
img{
  width: 70%;
  height: 70%;
  border-radius: 50%;
  transition: all 0.2s ease;
}

img:hover{
  transform:scale(1.25) ;
  /* transition: all 0.5s ease; */

}
  </style>
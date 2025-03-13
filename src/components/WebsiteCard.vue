<!-- 这个用于个人中心页的网站卡片展示 -->
<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { Website } from '../types/types'
import axios from 'axios';
import { ref } from 'vue';

const props = defineProps<{
  website: Website
}>()

const router = useRouter()
let imgSrc: any = ref(props.website.logo)

const goToDetail = () => {
  router.push(`/website/${props.website.id}`)
}

let count = ref(0)
async function handleimgError(name: string) {
  // console.log(localStorage.getItem(name))
  count.value += 1
  try {
    if (localStorage.getItem(name)) {
      imgSrc.value = localStorage.getItem(name)
    } else {
      if (count.value == 2) {
        imgSrc.value = "https://tse4-mm.cn.bing.net/th/id/OIP-C.6UPoB06C1fT3bDl2WMNvYAHaHa?rs=1&pid=ImgDetMain";
        localStorage.setItem(name, "https://tse4-mm.cn.bing.net/th/id/OIP-C.6UPoB06C1fT3bDl2WMNvYAHaHa?rs=1&pid=ImgDetMain")
        console.error("图片加载失败，已切换到备用图片");  // 也可以记录错误日志
      } else {
        // 当图片加载失败时执行的逻辑
        const res = await axios.get(`https://v2.xxapi.cn/api/ico?url=${props.website.url}`)
        localStorage.setItem(name, res.data.data)
        imgSrc.value = res.data.data  // 替换为备用图片
        console.log(localStorage.getItem(name))
        // console.log(res.data.data)
        // console.error("图片加载失败，已切换到备用图片");                                      
        // 可以执行其他操作，如记录错误日志等
      }

    }
  } catch (e) {
    console.error("请求失败，使用备用图片：", e);
    imgSrc.value = "https://tse4-mm.cn.bing.net/th/id/OIP-C.6UPoB06C1fT3bDl2WMNvYAHaHa?rs=1&pid=ImgDetMain";
  }
}
</script>

<template>
  <!-- 图片部分 -->
  <div @click="goToDetail" class="website-card group">
    <img :src="imgSrc" :alt="website.name" @error="handleimgError(website.name)" />
    <div class="content">
      <h3>{{ website.name }}</h3>
      <span v-for="tag in website.tags.slice(0, 2)" :key="tag"
        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
        {{ tag }}
      </span>

      <!-- 内容部分 -->
      <div class="flex items-center space-x-1">
        <span class="text-yellow-400">⭐</span>
        <span>{{ website.rating.toFixed(1) }}</span>
      </div>
      <div class="flex items-center space-x-1">
        <span class="text-blue-400">👁️</span>
        <span>{{ website.views.toLocaleString() }}</span>
      </div>
      <div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.content {
  position: relative;
  bottom: 1em;
  /* left: 1em; */
  text-align: center;
}

.website-card {
  background-color: #1c212f;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(255, 255, 255, 0.1);
  cursor: pointer;
  
  /* overflow: hidden; */
}  

.website-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  background: #4d5e70;
}

.website-card:hover img {
  transform: scale(1.05);
  filter: brightness(1.1);
}

img {
  width: 10%;
  object-fit: cover;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}



.delete-btn {
  background: rgba(239, 68, 68, 0.9);
  position: relative;
  left: 40%;
  bottom: 6em;
  /* border-radius: 100%; */
  transition: all 0.2s ease;
  transform: translateY(-10px);
}

.delete-btn:hover {
  background: rgba(220, 38, 38, 0.9);
  transform: scale(1.1);
}



.website-card:hover .delete-btn {
  opacity: 1;
  transform: translateY(0);
}
</style>
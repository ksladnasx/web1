import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';
import axios from 'axios';

export interface Website {
  id: string;
  name: string;
  url: string;
  logo: string;
  description: string;
  category: string;
  tags: string[];
  rating: number;
  views: number;
  isPaid: boolean;
  language: string[];
  accessSpeed: string;
}

export const useWebsiteStore = defineStore('website', () => {
  let websites = ref<Website[]>([]);
  const categories = ref([
    { id: 'learning', name: '学习资源', icon: '📚' },
    { id: 'research', name: '科研工具', icon: '🔬' },
    { id: 'career', name: '职业发展', icon: '💼' },
    { id: 'life', name: '生活服务', icon: '🏡' },
    { id: 'productivity', name: '效率工具', icon: '⚡' }
  ]);

  const apiUrl = 'https://jy8b5cnnmg.hzh.sealos.run/getWebList';

  // 使用 axios 从 API 获取数据
  const fetchWebsites = async () => {
    try {
      const response = await axios.get(apiUrl);
      const apiResponse = response.data; // 获取 API 返回的数据

      // 检查返回的结构是否正确
      if (apiResponse.code === 200 && Array.isArray(apiResponse.data)) {
        websites.value = apiResponse.data; // 将返回的网站数据存储到 websites 中
      } else {
        console.warn('Invalid API response:', apiResponse);
      }
    } catch (error) {
      console.error('Error fetching websites:', error);
    }
  };

  // 在组件挂载时获取数据
  onMounted(fetchWebsites);

  const getWebsitesByCategory = (categoryId: string) => {
    return websites.value.filter(site => site.category === categoryId);
  };

  const getPopularWebsites = () => {
    return [...websites.value].sort((a, b) => b.views - a.views).slice(0, 10);
  };

  return {
    websites,
    categories,
    getWebsitesByCategory,
    getPopularWebsites
  };
});
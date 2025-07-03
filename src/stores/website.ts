import { defineStore } from 'pinia';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import axiosInstance from '../untils/req';
import axios from 'axios';
import { Website } from '../types/types';



export const useWebsiteStore = defineStore('website', () => {
  let websites = ref<Website[]>([{
    "id": "sci-hub",
    "name": "Sci-Hub",
    "url": "https://sci-hub.se ",
    "logo": "https://sci-hub.se/favicon.ico ",
    "description": "提供免费的学术论文获取服务。",
    "category": "research",
    "tags": ["学术", "论文", "免费"],
    "rating": 4.9,
    "views": 12000,
    "isPaid": false,
    "language": ["English"],
    "accessSpeed": "需要科学上网",
    _id: '67b16d8ede2aa1f4dcd6773b'
  },
  {
    "id": "google-scholar",
    "name": "Google Scholar",
    "url": "https://scholar.google.com ",
    "logo": "https://tse4-mm.cn.bing.net/th/id/OIP-C.6eJ9QJxJu2XxfjqeCVPYjgHaHa?w=179&h=184&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    "description": "Google Scholar 是一个广受欢迎的免费学术搜索引擎，它索引了数百万篇学术文章，包括期刊论文、学位论文、书籍、预印本和报告等。这个平台特别适合研究人员、学生和教育工作者，他们可以利用这个工具来获取最新的研究成果和历史文献。此外，Google Scholar 还提供了引文功能，用户可以查看某篇文章被引用了多少次，以及被哪些文章引用，这对于文献综述和研究的深度分析非常有帮助。",
    "category": "research",
    "tags": ["学术", "文献", "搜索"],
    "rating": 4.8,
    "views": 15000,
    "isPaid": false,
    "language": ["English"],
    "accessSpeed": "快速",
    _id: '67b16d8ede2aa1f4dcd6773c'
  },
  {
    "id": "kaggle",
    "name": "Kaggle",
    "url": "https://kaggle.com ",
    "logo": "https://kaggle.com/favicon.ico ",
    "description": "Kaggle 是一个数据科学竞赛平台，它提供了一个丰富的数据库，包含多个学科的数据集，供研究人员和数据科学家使用。这个平台特别适合那些需要进行数据分析、机器学习和人工智能项目的人。Kaggle 的数据集覆盖了从经济学到天文学的各个领域，用户可以自由下载和使用这些数据集，进行研究和开发。此外，Kaggle 还提供了一个活跃的社区，用户可以在社区中讨论问题、分享经验和协作项目。",
    "category": "research",
    "tags": ["数据科学", "竞赛", "分析"],
    "rating": 4.7,
    "views": 13000,
    "isPaid": false,
    "language": ["English"],
    "accessSpeed": "快速",
    _id: '67b16d8ede2aa1f4dcd6773d'
  }]);
  const categories = ref([
    { id: 'learning', name: '学习资源', icon: '📚' },
    { id: 'research', name: '科研工具', icon: '🔬' },
    { id: 'career', name: '职业发展', icon: '💼' },
    { id: 'life', name: '生活服务', icon: '🏡' },
    { id: 'productivity', name: '效率工具', icon: '⚡' }
  ]);

  const apiUrl = '/getWebList';

  // 使用 axios 从 API 获取数据
  // 在组件中定义 AbortController
  const abortController = new AbortController();

  const getWebsites = async () => {
    try {
      const response = await axiosInstance.get(apiUrl, {
        signal: abortController.signal // 绑定取消信号
      });
      const apiResponse = response.data;

      if (apiResponse.code === 200 && Array.isArray(apiResponse.data)) {
        websites.value = apiResponse.data;
      } else {
        console.warn('Invalid API response:', apiResponse);
        websites.value = []; // 确保回退默认值
      }
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        console.error('Error fetching websites:', error);
        // websites.value = []; // 错误时重置数据
      }
    }
  };
onMounted(()=>{
  getWebsites()
})
  // 在组件卸载时取消请求
  onBeforeUnmount(() => {
    abortController.abort();
  });

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




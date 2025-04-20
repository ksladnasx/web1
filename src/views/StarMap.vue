<script setup lang="ts">
import { ref, onMounted } from 'vue';


interface Star {
  id: number;
  name: string;
  description: string;
  url: string;
  x: number;
  y: number;
  category: string;
}

interface Category {
  name: string;
  title: string;
  x: number;
  y: number;
}

// 定义类别及其标题位置
const categories: Category[] = [
  { name: 'framework', title: '前端框架', x: 15, y: 15 },
  { name: 'ui', title: 'UI 框架', x: 35, y: 15 },
  { name: 'documentation', title: '文档与学习', x: 60, y: 15 },
  { name: 'language', title: '编程语言', x: 20, y: 45 },
  { name: 'tools', title: '开发工具', x: 40, y: 45 },
  { name: 'build', title: '构建工具', x: 60, y: 45 },
  { name: 'testing', title: '测试工具', x: 20, y: 75 },
  { name: 'state', title: '状态管理', x: 40, y: 75 },
  { name: 'api', title: 'API 工具', x: 60, y: 75 },
  { name: 'cloud', title: '云服务', x: 80, y: 15 },
  { name: 'clouds', title: '云服务', x: 80, y: 15 },
];

// 将网站按照类别分组，确保相关网站的坐标较近
const stars: Star[] = [
  // 前端框架
  {
    id: 1,
    name: 'Vue.js',
    description: '渐进式 JavaScript 框架，易学易用，性能出色，适用场景丰富',
    url: 'https://vuejs.org',
    x: 20,
    y: 20,
    category: 'framework'
  },
  {
    id: 2,
    name: 'React',
    description: '用于构建用户界面的 JavaScript 库，组件化开发的先驱',
    url: 'https://reactjs.org',
    x: 25,
    y: 25,
    category: 'framework'
  },
  {
    id: 3,
    name: 'Angular',
    description: '现代 Web 开发平台，完整的开发框架',
    url: 'https://angular.io',
    x: 15,
    y: 25,
    category: 'framework'
  },
  {
    id: 4,
    name: 'Svelte',
    description: '革命性的前端框架，无虚拟 DOM，编译时优化',
    url: 'https://svelte.dev',
    x: 20,
    y: 30,
    category: 'framework'
  },

  // UI 框架
  {
    id: 5,
    name: 'Element Plus',
    description: '基于 Vue 3 的组件库，优雅美观，功能丰富',
    url: 'https://element-plus.org',
    x: 35,
    y: 20,
    category: 'ui'
  },
  {
    id: 6,
    name: 'Ant Design',
    description: '企业级 UI 设计语言和 React 组件库',
    url: 'https://ant.design',
    x: 40,
    y: 25,
    category: 'ui'
  },
  {
    id: 7,
    name: 'Tailwind CSS',
    description: '功能类优先的 CSS 框架，高度可定制',
    url: 'https://tailwindcss.com',
    x: 45,
    y: 20,
    category: 'ui'
  },

  // 文档与学习
  {
    id: 8,
    name: 'MDN',
    description: '最全面的 Web 开发文档和学习资源',
    url: 'https://developer.mozilla.org',
    x: 60,
    y: 20,
    category: 'documentation'
  },
  {
    id: 9,
    name: 'W3Schools',
    description: '适合初学者的 Web 技术学习平台',
    url: 'https://www.w3schools.com',
    x: 65,
    y: 25,
    category: 'documentation'
  },
  {
    id: 10,
    name: 'CSS-Tricks',
    description: 'CSS 技巧和前端开发资源的宝库',
    url: 'https://css-tricks.com',
    x: 70,
    y: 20,
    category: 'documentation'
  },

  // 编程语言
  {
    id: 11,
    name: 'TypeScript',
    description: 'JavaScript 的超集，添加了类型系统',
    url: 'https://www.typescriptlang.org',
    x: 20,
    y: 50,
    category: 'language'
  },
  {
    id: 12,
    name: 'Node.js',
    description: '基于 Chrome V8 引擎的 JavaScript 运行时',
    url: 'https://nodejs.org',
    x: 25,
    y: 55,
    category: 'language'
  },
  {
    id: 13,
    name: 'Python',
    description: '简单易学且功能强大的编程语言',
    url: 'https://www.python.org',
    x: 30,
    y: 50,
    category: 'language'
  },

  // 开发工具
  {
    id: 14,
    name: 'VS Code',
    description: '强大的代码编辑器，插件丰富',
    url: 'https://code.visualstudio.com',
    x: 40,
    y: 50,
    category: 'tools'
  },
  {
    id: 15,
    name: 'GitHub',
    description: '代码托管和开发协作平台',
    url: 'https://github.com',
    x: 45,
    y: 55,
    category: 'tools'
  },
  {
    id: 16,
    name: 'GitLab',
    description: '完整的 DevOps 平台',
    url: 'https://gitlab.com',
    x: 50,
    y: 50,
    category: 'tools'
  },

  // 构建工具
  {
    id: 17,
    name: 'Vite',
    description: '下一代前端构建工具，快速的开发体验',
    url: 'https://vitejs.dev',
    x: 60,
    y: 50,
    category: 'build'
  },
  {
    id: 18,
    name: 'Webpack',
    description: '强大的静态模块打包工具',
    url: 'https://webpack.js.org',
    x: 65,
    y: 55,
    category: 'build'
  },
  {
    id: 19,
    name: 'Rollup',
    description: '高效的 JavaScript 模块打包器',
    url: 'https://rollupjs.org',
    x: 70,
    y: 50,
    category: 'build'
  },

  // 测试工具
  {
    id: 20,
    name: 'Jest',
    description: '令人愉快的 JavaScript 测试框架',
    url: 'https://jestjs.io',
    x: 20,
    y: 80,
    category: 'testing'
  },
  {
    id: 21,
    name: 'Vitest',
    description: '基于 Vite 的单元测试框架',
    url: 'https://vitest.dev',
    x: 25,
    y: 85,
    category: 'testing'
  },
  {
    id: 22,
    name: 'Cypress',
    description: '现代化的端到端测试工具',
    url: 'https://www.cypress.io',
    x: 30,
    y: 80,
    category: 'testing'
  },

  // 状态管理
  {
    id: 23,
    name: 'Vuex',
    description: 'Vue.js 的状态管理模式和库',
    url: 'https://vuex.vuejs.org',
    x: 40,
    y: 80,
    category: 'state'
  },
  {
    id: 24,
    name: 'Pinia',
    description: 'Vue 的直观状态管理库',
    url: 'https://pinia.vuejs.org',
    x: 45,
    y: 85,
    category: 'state'
  },
  {
    id: 25,
    name: 'Redux',
    description: 'JavaScript 应用的可预测状态容器',
    url: 'https://redux.js.org',
    x: 50,
    y: 80,
    category: 'state'
  },

  // API 工具
  {
    id: 26,
    name: 'Postman',
    description: 'API 开发协作平台',
    url: 'https://www.postman.com',
    x: 60,
    y: 80,
    category: 'api'
  },
  {
    id: 27,
    name: 'Swagger',
    description: 'API 开发工具，设计、构建、文档一体化',
    url: 'https://swagger.io',
    x: 65,
    y: 85,
    category: 'api'
  },
  {
    id: 28,
    name: 'GraphQL',
    description: 'API 查询语言和运行时',
    url: 'https://graphql.org',
    x: 70,
    y: 80,
    category: 'api'
  },

  // 云服务
  {
    id: 29,
    name: 'Vercel',
    description: '面向前端开发的云平台',
    url: 'https://vercel.com',
    x: 80,
    y: 20,
    category: 'cloud'
  },
  {
    id: 30,
    name: 'Netlify',
    description: '现代化的 Web 项目托管平台',
    url: 'https://www.netlify.com',
    x: 85,
    y: 25,
    category: 'cloud'
  }
];

const activeStarId = ref<number | null>(null);
const isInfoCardHovered = ref(false);

const setActiveStar = (id: number | null) => {
  if (!isInfoCardHovered.value) {
    activeStarId.value = id;
  }
};

const onInfoCardMouseEnter = () => {
  isInfoCardHovered.value = true;
};

const onInfoCardMouseLeave = () => {
  isInfoCardHovered.value = false;
  activeStarId.value = null;
};

// 创建有意义的连接
const connections = ref<{ from: Star; to: Star }[]>([]);

onMounted(() => {
  // 根据类别创建连接
  stars.forEach((star1, index) => {
    // 只连接同一类别中相邻的星星
    const sameCategory = stars.filter(s => s.category === star1.category);
    const currentIndex = sameCategory.findIndex(s => s.id === star1.id);
    
    if (currentIndex < sameCategory.length - 1) {
      connections.value.push({
        from: star1,
        to: sameCategory[currentIndex + 1]
      });
    }

    // 添加跨类别的重要连接
    stars.slice(index + 1).forEach(star2 => {
      // 只连接有直接关联的类别
      if (
        // 前端框架与对应的UI库
        (star1.name === 'Vue.js' && star2.name === 'Element Plus') ||
        (star1.name === 'React' && star2.name === 'Ant Design') ||
        // 框架与对应的状态管理
        (star1.name === 'Vue.js' && (star2.name === 'Vuex' || star2.name === 'Pinia')) ||
        (star1.name === 'React' && star2.name === 'Redux') ||
        // 构建工具与测试工具
        (star1.name === 'Vite' && star2.name === 'Vitest')
      ) {
        connections.value.push({ from: star1, to: star2 });
      }
    });
  });
});
</script>

<template>
    <div class="app-container">
        <h1>Learning Resources Star Map</h1>
    <div>
      ------------------------------------------------------------------------------------------------------------------------------
    </div>
  <div class="star-map">
    <!-- 类别标题 -->
    <div
      v-for="category in categories"
      :key="category.name"
      class="category-title"
      :style="{ left: category.x + '%', top: category.y + '%' }"
    >
      {{ category.title }}
    </div>

    <!-- 连接线 -->
    <svg class="connections" width="100%" height="100%">
      <line
        v-for="(connection, index) in connections"
        :key="index"
        :x1="connection.from.x + '%'"
        :y1="connection.from.y + '%'"
        :x2="connection.to.x + '%'"
        :y2="connection.to.y + '%'"
        :class="{ active: activeStarId === connection.from.id || activeStarId === connection.to.id }"
      />
    </svg>
    
    <!-- 星星 -->
    <div
      v-for="star in stars"
      :key="star.id"
      class="star"
      :style="{ left: star.x + '%', top: star.y + '%' }"
      @mouseenter="setActiveStar(star.id)"
      @mouseleave="setActiveStar(null)"
    >
      <div class="star-content">
        <div class="star-icon" :class="{ active: activeStarId === star.id }">⚪</div>
        <div 
          class="star-info" 
          :class="{ active: activeStarId === star.id }"
          @mouseenter="onInfoCardMouseEnter"
          @mouseleave="onInfoCardMouseLeave"
        >
          <h3>{{ star.name }}</h3>
          <p>{{ star.description }}</p>
          <a :href="star.url" target="_blank">访问网站</a>
        </div>
      </div>
    </div>
  </div> 
  </div>
 
</template>

<style scoped>
.app-container {
  width:100%;                    
  max-width:1280px;
  height: 200%;
  margin: 0 auto;
  /* padding: 2rem; */
  text-align: center;
}

h1 {
  color: #f0ebb9;
  margin-bottom: 2rem;
}


.star-map {
  width: 100%;
  height: 100vh;
  position: relative;
  background: transparent;
  overflow: hidden;
  border-radius: 12px;
}

.category-title {
  position: absolute;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.2em;
  font-weight: 500;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  pointer-events: none;
}

.connections {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
}

.connections line {
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 1;
  transition: stroke 0.3s ease;
}

.connections line.active {
  stroke: rgba(255, 255, 255, 0.4);
}

.star {
  position: absolute;
  transform: translate(-50%, -50%);
}

.star-content {
  position: relative;
}

.star-icon {
  font-size: 0.5em;
  color: #8e8383;
  cursor: pointer;
  transition: all 0.3s ease;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
}

.star-icon.active {
  color: #ffd700;

  transform: scale(1.2);
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
}

.star-info {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) scale(0.9);
  background: rgba(255, 255, 255, 0.95);
  padding: 1em;
  border-radius: 8px;
  width: 200px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  pointer-events: auto;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.star-info.active {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1);
}

.star-info h3 {
  margin: 0 0 0.5em;
  color: #1a1a2e;
  font-size: 1.2em;
}

.star-info p {
  margin: 0 0 0.8em;
  color: #666;
  font-size: 0.9em;
}

.star-info a {
  display: inline-block;
  padding: 0.4em 1em;
  background: #1a1a2e;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 0.9em;
  transition: background 0.3s ease;
}

.star-info a:hover {
  background: #2a2a4e;
}
</style>
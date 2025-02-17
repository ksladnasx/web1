<script setup lang="ts">
import { ref } from 'vue'
// import { useWebsiteStore } from '../stores/website'
import { useFavoritesStore } from '../stores/favorites'
import WebsiteCard from '../components/WebsiteCard.vue'
import { useAuthStore } from '../stores/authStore';
import { usesubmitstore } from '../stores/submitStore';

// const store = useWebsiteStore()
const favoritesStore = useFavoritesStore()
const activeTab = ref('favorites')
const store = useAuthStore();
const submitStore = usesubmitstore()



// 获取当前用户名
let usernames: any = store.user// 获取元素的文本内容




//更新当前收藏
const handlefavorites = () => {
  try {
    favoritesStore.updateFavorites(usernames)
  } catch (e) {
    console.error(e);
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      你好!
      <div ref="username">
        {{ store.user }}
      </div>

      <!-- 头部 -->
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex">
          <button v-for="tab in [
            { id: 'favorites', name: '收藏夹' },
            { id: 'submissions', name: '提交记录' },
            { id: 'settings', name: '基础设置' }
          ]" :key="tab.id" @click="activeTab = tab.id" :class="[
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm'
          ]">
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- 分割线 -->
      <div>
        -----------------------------------------------------------------------------------------------------------------------
      </div>

      <!-- 基础设置功能实现 -->

      <!-- 收藏夹功能实现 -->
      <div class="p-6">
        <div v-if="activeTab === 'favorites'">
          <div v-if="favoritesStore.favorites.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">🤍</div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">暂无收藏的网站</h3>
            <p class="text-gray-600">
              浏览网站时点击心形图标即可收藏喜欢的网站
            </p>
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="submission-card">
              <WebsiteCard v-for="website in favoritesStore.favorites" :key="website.id" :website="website" />
            </div>

          </div>
          <button @click="handlefavorites">保存</button>
        </div>

        <!-- 提交记录功能实现 -->

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="p-6">
              <!-- 提交记录功能实现 -->
              <div v-if="activeTab === 'submissions'">
                <!-- 暂无提交记录 -->
                <div v-if="submitStore.submissions.length === 0" class="text-center py-12">
                  <div class="text-6xl mb-4">📝</div>
                  <h3 class="text-xl font-medium text-gray-900 mb-2">暂无提交记录</h3>
                  <p class="text-gray-600">
                    还没有提交过网站？
                    <router-link to="/submit" class="text-blue-600 hover:text-blue-800">
                      去提交
                    </router-link>
                  </p>
                </div>
                <!-- 显示提交记录 -->
                <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div v-for="submission in submitStore.submissions" :key="submission.name" class="submission-card">
                    <h4 class="submission-title">{{ submission.name }}</h4>
                    <p class="submission-description">{{ submission.description }}</p>
                    <p class="submission-category">分类: {{ submission.category }}</p>
                    <p class="submission-reason">推荐理由: {{ submission.reason }}</p>
                    <a :href="submission.url" target="_blank" class="submission-link">访问网站</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        <!-- 基础设置功能实现 -->
        <div v-if="activeTab === 'settings'" class="max-w-md mx-auto">
          <div class="submission-card">
            <form class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700">
                  邮箱
                </label>
                <input type="email" id="email"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700">
                  修改密码
                </label>
                <input type="password" id="password"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
              </div>

              <button type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                保存设置
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 基础样式 */
.submission-card {
  background-color: #222;
  /* 深色背景 */
  border-radius: 12px;
  /* 更圆润的边角 */
  box-shadow: 0 8px 16px rgba(150, 146, 146, 0.1);
  /* 更强的阴影效果 */
  padding: 1.5rem;
  /* 更多的内边距 */
  color: #f3f4f6;
  /* 文字颜色 */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  /* 动画过渡效果 */
  margin-bottom: 1.5rem;
  /* 卡片之间的间隔 */
}

/* 鼠标悬停时的动效 */
.submission-card:hover {
  transform: translateY(-10px);
  /* 向上移动 */
  box-shadow: 0 12px 24px rgba(225, 222, 222, 0.2);
  /* 更强的阴影 */
}

/* 标题样式 */
.submission-title {
  font-size: 1.5rem;
  /* 更大的字体 */
  font-weight: 700;
  /* 更粗的字体 */
  margin-bottom: 1rem;
  /* 更大的间距 */
}

/* 描述样式 */
.submission-description {
  font-size: 1rem;
  /* 标准字体大小 */
  color: #e5e7eb;
  /* 灰色文字 */
  margin-bottom: 1rem;
  /* 间距 */
}

/* 分类和推荐理由样式 */
.submission-category,
.submission-reason {
  font-size: 0.9rem;
  /* 小字体 */
  color: #9ca3af;
  /* 灰色文字 */
  margin-bottom: 1rem;
  /* 间距 */
}

/* 链接样式 */
.submission-link {
  color: #3b82f6;
  /* 蓝色链接 */
  text-decoration: none;
  font-weight: 600;
  /* 粗体 */
  transition: color 0.3s ease;
  /* 颜色过渡效果 */
}

.submission-link:hover {
  color: #1d4ed8;
  /* 悬停时更深的蓝色 */
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.submission-card {
  animation: fadeIn 0.5s ease forwards;
  /* 使用淡入动画 */
}


.bg-white {
  background-color: #222;
}

.text-gray-900 {
  color: aliceblue;
}

.text-gray-600 {
  color: #999;
}

.text-gray-500 {
  color: #888;
}

.hover\:text-gray-700:hover {
  color: #ccc;
}

.border-gray-200 {
  border-color: #444;
}

.text-blue-600 {
  color: #60a5fa;
}

.border-blue-500 {
  border-color: #3b82f6;
}

.bg-blue-600 {
  background-color: #2563eb;
}

.hover\:bg-blue-700:hover {
  background-color: #1d4ed8;
}

input {
  background-color: #444;
  color: white;
  border-color: #555;
}

input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
</style>
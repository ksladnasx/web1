<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useFavoritesStore } from '../stores/favorites'
import profliewebCard from '../components/profliewebCard.vue';
import { useAuthStore } from '../stores/authStore';
import { usesubmitstore } from '../stores/submitStore';
import { useProfileStore } from '../stores/profileStore'
import axios from 'axios';

// 状态初始化
const AuthStore = useAuthStore()
const profileStore = useProfileStore()
const favoritesStore = useFavoritesStore()
const submitStore = usesubmitstore()
const user = localStorage.getItem('user')

const userid = ref("")
if(user){
   userid.value = JSON.parse(user).userid
}
// 响应式数据
const activeTab = ref('settings')
const isedict = ref(false)
const avatarPreview = ref( "https://tse3-mm.cn.bing.net/th/id/OIP-C.g5M-iZUiocFCi9YAzojtRAAAAA?rs=1&pid=ImgDetMain")
const avatarFile = ref<File | null>(null)

// 表单数据
const form = ref({
  username: AuthStore.user?.username || '',
  password: "****************",
  birthdate: '2024-12-29'
})

// 初始化加载
onMounted(()=>{
  // 调用函数传用户名来更新提交记录
  submitStore.fetchSubmissions(AuthStore.user?.username )
  
})


// 标签切换监听
watch(activeTab, async (newTab) => {
  if (newTab === 'favorites') {
    await favoritesStore.fetchFavorites(AuthStore.user?.username)
  }
})

// 头像上传处理
const handleAvatarUpload = (e: Event) => {
  const input = e.target as HTMLInputElement
  if (input.files?.length) {
    const file = input.files[0]
    avatarFile.value = file
    avatarPreview.value = URL.createObjectURL(file)
    localStorage.setItem("avatar", avatarPreview.value)
  }
}

// 保存收藏
const handlefavorites = async () => {
  try {
    if (!AuthStore.user?.username) return
    await favoritesStore.updateFavorites(AuthStore.user.username)
    alert('收藏已保存')
  } catch (e) {
    console.error(e)
    alert('保存失败')
  }
}

// 提交表单
const handleSubmits = async () => {
  if (!AuthStore.user) {
    alert('请先登录')
    return
  }

  try {
    const res = await axios.post('https://jy8b5cnnmg.hzh.sealos.run/updateuser', {
      userid: userid.value,
      username: form.value.username,
      password: form.value.password
    })

    if (res.data.code !== 200) {
      alert(res.data.message)
      return
    }

    localStorage.setItem('user', JSON.stringify({
      userid: userid.value,
      username: form.value.username
    }))
    alert("更改成功")
    AuthStore.$state.user = {username: form.value.username}
    isedict.value = false
  } catch (e) {
    console.error(e)
    alert('更新失败:'+e)
  }
}
</script>

<template>
  <div class="proflie-container">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      你好!
      <div ref="username">
        {{ AuthStore.$state.user }}
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


      <!-- 基础设置功能实现 -->

      <!-- 收藏夹功能实现 -->
      <div class="p-6">
        <div v-if="activeTab === 'favorites'">
          <div v-if="favoritesStore.favorites.length=== 0" class="text-center py-12">
            <div class="text-6xl mb-4">🤍</div>
            <h3 class="text-xl font-medium text-gray-900 mb-2">暂无收藏的网站</h3>
            <p class="text-gray-600">
              浏览网站时点击心形图标即可收藏喜欢的网站
            </p>
          </div>
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="submission-card">
              <profliewebCard v-for="website in favoritesStore.favorites" :key="website.id" :website="website"
                @remove="favoritesStore.removeFavorite(website.id)" />

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
                    <div>
                      <h4 class="submission-title" style="position: relative;right: 15em;">{{ submission.name }}</h4>
                    </div>
                    <p class="submission-description">{{ submission.description }}</p>
                    <p class="submission-category">分类: {{ submission.category }}</p>
                    <p class="submission-reason">推荐理由: {{ submission.reason }}</p>
                    <p><a :href="submission.url" target="_blank" class="submission-link">访问网站</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>




        <!-- 基础设置功能实现 -->
        <!-- 修改设置部分 -->
        <div v-if="activeTab === 'settings'" class="max-w-md mx-auto">
          <div class="submission-card">
            <form  class="space-y-6">
              <!-- 头像上传 -->
              <div class="avatar-container">
                <div class="shrink-0">
                  <!-- 使用 label 包裹图片，并关联到 input -->
                  <label for="avatar-upload" class="cursor-pointer">
                    <img :src="avatarPreview" class="avatar-preview" alt="头像">
                  </label>
                  <!-- 隐藏 input -->
                  <input id="avatar-upload" type="file" accept="image/*" @change="handleAvatarUpload" class="hidden" />
                </div>
              </div>

              <!-- 用户名 -->
              <div class="items">
                <label for="username" class="form-label">用户名</label>
                <span v-if="!isedict">{{ AuthStore.$state.user }}</span>
                <input v-if="isedict" v-model="form.username" type="text" id="username" class="form-input" />
              </div>

              <!-- 邮箱 -->
              <div class="items">
                <label for="password" class="form-label">密码</label>
                <span v-if="!isedict">********</span>
                <input v-if="isedict" v-model="form.password" type="password" id="password" class="form-input" />
              </div>

              <!-- 出生日期 -->
              <div class="items">
                <label for="birthdate" class="form-label">出生日期</label>
                <span v-if="!isedict">2024年12月29日</span>
                <input v-if="isedict" v-model="form.birthdate" type="date" id="birthdate" class="form-input" />
              </div>

              <div v-if="!isedict" class="items">
                <button @click="() => { isedict = !isedict }" class="submit-button">
                  编辑
                </button>
              </div>

              <div v-if="isedict" class="items">
                <button type="submit" class="submit-button" @click="handleSubmits">
                  保存设置
                </button>
                <button @click="() => { isedict = !isedict }" class="submit-button">
                  取消
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.proflie-container {
  width: 80%;
  text-align: center;
  position: relative;
  left: 10%;
  font-size: larger;
}


/* 基础样式 */
.submission-card {
  background-color: #334579;
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
  background-color: #1c212f;
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
  display: flex;
  justify-content: center;

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

/* 外联样式表 */


.submission-card {
  height: auto;
  background-color: #1c212f;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* 头像样式 */
.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.hidden {
  display: none;
}

.cursor-pointer {
  cursor: pointer;
}

.avatar-preview {
  height: 20vh;
  width: 20vh;
  border-radius: 50%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.avatar-preview:hover {
  transform: scale(1.05);
}

.xz {
  display: block;
  position: relative;
  font-size: larger;
}

/* 文件上传按钮样式 */


.file-input:hover {
  background-color: #3477bd;
}

/* 表单标签样式 */
.form-label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #a0a0a0;
}

/* 输入框样式 */
.form-input {
  display: block;
  width: 40vh;
  padding: 1vh;
  font-size: 16px;
  color: #e0e0e0;
  background-color: #2a2a2a;
  border: 1px solid #3a3a3a;
  border-radius: 8px;
  transition: border-color 0.3s ease;
}

.items {
  padding-bottom: 3em;
  justify-items: center;
  align-items: center;

}

.form-input:focus {
  border-color: #4a90e2;
  outline: none;
}

/* 提交按钮样式 */
.submit-button {
  display: block;
  margin-top: 1em;
  width: 20vh;
  /* padding: 12px; */
  font-size: 16px;
  font-weight: 500;
  color: #e0e0e0;
  background-color: #4a90e2;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}



.submit-button:hover {
  background-color: #3477bd;
}
</style>
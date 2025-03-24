<script setup lang="ts">
import { ref } from 'vue'
import { useFavoritesStore } from '../stores/favorites'
import profliewebCard from '../components/profliewebCard.vue';
import { useAuthStore } from '../stores/authStore';
import { usesubmitstore } from '../stores/submitStore';
import axios from 'axios';

// 状态初始化
const AuthStore = useAuthStore()
const favoritesStore = useFavoritesStore()
const submitStore = usesubmitstore()
const user = localStorage.getItem('user')

const userid = ref("")
if (user) {
  userid.value = JSON.parse(user).userid
}
// 响应式数据
const activeTab = ref('settings')
const isedict = ref(false)
const avatarPreview = ref("https://tse3-mm.cn.bing.net/th/id/OIP-C.g5M-iZUiocFCi9YAzojtRAAAAA?rs=1&pid=ImgDetMain")
const avatarFile = ref<File | null>(null)

// 表单数据
const form = ref({
  username: AuthStore.user,
  password: "",
  birthdate: '2024-12-29'
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
    console.log("favorites", AuthStore.user)
    if (!AuthStore.user) return
    await favoritesStore.updateFavorites(AuthStore.user)
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
    AuthStore.$state.user = form.value.username
    isedict.value = false
  } catch (e) {
    console.error(e)
    alert('更新失败:' + e)
  }
}
</script>

<template>
  <div class="proflie-container">
    <div class="bg-white">



      <!-- 头部 -->
      <div class=" border-gray-200">
        <nav class="-mb-px flex">
          <button v-for="tab in [
            { id: 'settings', name: '基础设置' },
            { id: 'favorites', name: '收藏夹' },
            { id: 'submissions', name: '提交记录' },
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

      <!-- 基础设置功能实现 -->
      <div v-if="activeTab === 'settings'">
        <div class="submission-card">
          <form class="space-y-6">
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

      <!-- 收藏夹功能实现 -->

      <div v-if="activeTab === 'favorites'">
        <div v-if="favoritesStore.favorites.length === 0">
          <div>🤍</div>
          <h3 class=" text-gray-900 ">暂无收藏的网站</h3>
          <p class="text-gray-600">
            浏览网站时点击心形图标即可收藏喜欢的网站
          </p>
        </div>
        <div v-else>
          <div >
            <profliewebCard v-for="website in favoritesStore.favorites" :key="website.id" :website="website"
              @remove="favoritesStore.removeFavorite(website.id)" />

          </div>
        </div>
        <div style="padding-top: 5vh;">        
          <button @click="handlefavorites" >保存</button>
        </div>

      </div>


      <!-- 提交记录功能实现 -->
      <div v-if="activeTab === 'submissions'">
        <!-- 暂无提交记录 -->
        <div v-if="submitStore.submissions.length === 0">
          <div>📝</div>
          <h3 class=" text-gray-900">暂无提交记录</h3>
          <p class="text-gray-600">
            还没有提交过网站？
            <router-link to="/submit" class="text-blue-600 ">
              去提交
            </router-link>
          </p>
        </div>
        <!-- 显示提交记录 -->
        <div v-else>
          <div v-for="submission in submitStore.submissions" :key="submission.name" class="submission-cards">
            <div class="icon-content">
              <span class="icon icon-wrapper">
                <img :src="submission.logo" class="icons " alt="网页logo">
              </span>

              <span class="title-content">
                <h4 class="submission-title">{{ submission.name }}</h4>
              </span>
            </div>
            <div class="content" style="">
              <p class="submission-category ">分类: {{ submission.category }}</p>
              <p class="submission-description ">描述：{{ submission.description }}</p>
              <p class="submission-reason ">推荐理由: {{ submission.reason }}</p>
              <p class="action-link">
                <a :href="submission.url" target="_blank" class="submission-link">
                  访问网站
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<style scoped>
.title-content {
  max-width: 10vh;
  display: inline-block;
}

.icon-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 50vh;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 74%;
  padding-top: 10vh;
  padding-bottom: 1vh;
}

/* 新增卡片布局类 */
.submission-cards {
  display: flex;
  flex-direction: row;
  gap: 12px;
  box-shadow: 0 12px 24px rgba(225, 222, 222, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.submission-cards:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(115, 165, 240, 0.972);
}

/* 标题文本处理 */
.submission-title {
  display: inline;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 图标容器 */
.icon-wrapper {
  flex-shrink: 0;
  margin-left: 16px;
}

/* 底部链接定位 */
.action-link {
  margin-top: auto;
}

.icon {
  width: 13vh;
  height: 13vh;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.icons {
  width: 13vh;
  height: 13vh;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

img:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

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
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(150, 146, 146, 0.1);
  padding: 1.5rem;
  color: #f3f4f6;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 1.5rem;
}

/* 鼠标悬停时的动效 */
.submission-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(225, 222, 222, 0.2);
}

/* 标题样式 */
.submission-title {
  font-size: 3vh;
  font-weight: 700;
  display: inline-flexbox;
  align-items: center;
  justify-content: center;
}

/* 描述样式 */
.submission-description {
  font-size: 1.2vb;
  max-width: 60vh;
  color: #e5e7eb;
  margin-bottom: 1rem;
}

.submission-category {
  font-size: 3vh;
  font-weight: 700;
  color: #abc9ee;
  display: inline-flexbox;
  align-items: center;
  justify-content: center;
}

/* 分类和推荐理由样式 */
.submission-reason {
  font-size: 1vh;
  max-width: 60vh;
  color: #9ca3af;
  margin-bottom: 1rem;
}

/* 链接样式 */
.submission-link {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.submission-link:hover {
  color: #1d4ed8;
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
}

.bg-white {
  padding-top: 2vh;
  max-width: 120vh;
  position: relative;
  left: 10%;
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

.border-gray-200 {
  padding-bottom: 2.5vh;
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

input {
  background-color: #444;
  color: white;
  border-color: #555;
}

input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

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
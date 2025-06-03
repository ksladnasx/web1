<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useWebsiteStore } from '../stores/website'
import { useAuthStore } from '../stores/authStore'
import { usesubmitstore } from '../stores/submitStore'
import axios from 'axios';

// 获取 Authstore 和 store 实例
const submitStores = usesubmitstore()
const Authstore = useAuthStore()
const store = useWebsiteStore()
const router = useRouter()

const form = ref({
  name: '',
  url: '',
  logo: "",
  description: '',
  category: '',
  reason: ''
})

const submitWebsite = () => {
  // 检查用户是否登录
  if (!Authstore.$state.isAuthenticated) {
    const isConfirmed = confirm("请先登录，确认跳转到登录页面？");
    if (isConfirmed) {
      window.location.href = '/login'; // 原生跳转
      // 或前端路由：this.$router.push('/login');
    }
    return;
  } else {
    if (form.value.logo == "") {
      alert("请点击获取网站头像logo");
      return;
    }
    // 获取表单数据
    const formData = form.value; // 获取绑定的表单数据
    console.log("提交的表单数据：", formData);
    const userinfo = localStorage.getItem('user')
    let username1 = ref("")// 获取元素的文本内容
    if (userinfo) {
      username1.value = JSON.parse(userinfo).username
    }
    // 向后端提交数据,直接根据现有的数据封装传给函数
    submitStores.addsubmits({ username: username1.value, submit: formData });
    // 在这里可以将 formData 发送到后端
    // 示例：使用 axios 发送数据

    //半秒后 调用函数传用户名来更新自定义网站
    setTimeout(() => submitStores.fetchSubmissions(username1.value), 500);



    // 模拟成功提交
    alert("感谢您的提交，我们会在一周内审核并返回结果到您的邮箱");
    router.push('/home');
  }
};


// 获取网站图标
const geticon = async () => {
  const url = form.value.url
  if (!url) {
    alert('请输入网站地址')
    return
  }
  const Myres = await axios.get(`https://v2.xxapi.cn/api/ico?url=${url}`)
  if (Myres.data.data == "") {
    alert('无法获取网站头像，请检查网站是否存在或已关闭(已使用默认头像)')
    form.value.logo = "https://www.logosc.cn/uploads/icon/2019/07/05/66941bf2-931c-4641-817f-9002d21d89e3.png"
    return
  }
  // console.log(Myres.data.data)
  form.value.logo = Myres.data.data

}

</script>

<template>
  <div class="form-container">

    <div class="form-card">
      <img :src="form.logo" alt="网站图标" class="img-icon" />
      <button class="get-icon-btn" @click="geticon">预览网站图标</button>
      <h1 class="form-title">网站自定义</h1>
      <div>
        --------------------------------------------------------------------------------------------------------------------
      </div>
      <br>
      <form @submit.prevent="submitWebsite" class="form-content">
        <div class="form-group">
          <label for="name">网站名称</label>
          <input type="text" id="name" v-model="form.name" required class="form-input" />
        </div>

        <div class="form-group">
          <label for="url">网站地址</label>
          <input type="url" id="url" v-model="form.url" required class="form-input" />
        </div>
        <div class="form-group">
          <label for="category">分类</label>
          <select id="category" v-model="form.category" required class="form-select">
            <option value="">请选择分类</option>
            <option v-for="category in store.categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label for="description">简短描述</label>
          <textarea id="description" v-model="form.description" rows="3" required class="form-textarea"></textarea>
        </div>

        <div class="form-group">
          <label for="reason">推荐理由</label>
          <textarea id="reason" v-model="form.reason" rows="4" required maxlength="200"
            class="form-textarea"></textarea>
          <p class="form-hint">最多200字</p>
        </div>

        <div class="form-notice">
          <p>提交说明：</p>
          <p>• 网站将在24小时内完成审核</p>
          <p>• 请确保网站内容合法、无害</p>
          <p>• 优先收录免费、高质量的学术资源</p>
        </div>

        <button type="submit" class="submit-btn">
          提交网站
        </button>
      </form>

    </div>
  </div>
</template>

<style scoped>
/* 网站图标样式 */
.get-icon-btn {
  display: inline-block flex;
  position: relative;
  left: 43%;
  bottom: 9%;
}

.img-icon {
  display: inline-block flex;
  position: relative;
  bottom: 2%;
  /* right: 400px; */
  height: 80px;
  width: 80px;
  border-radius: 50%;
}


.form-container {
  width: 80%;
  min-height: 100vh;
  padding: 2rem 1rem;
  /* 弹性布局 */
  display: flex;
  text-align: center;
  justify-content: center;
  margin: 0 auto;
}

.form-card {
  background: #1f2937;
  border-radius: 0.75rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-title {
  /* display: flex; */
  color: #f3f4f6;
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  bottom: 3%;
  /* padding-left: 1.25rem; */
}

.form-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 1.5rem;
  background: #3b82f6;
  border-radius: 2px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  color: #e5e7eb;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.form-input,
.form-select,
.form-textarea {
  width: 100%;
  background: #374151;
  border: 1px solid #4b5563;
  border-radius: 0.5rem;
  padding: 0.75rem 0;
  color: #f3f4f6;
  font-size: 0.875rem;
  transition: all 0.2s ease;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.form-select {
  appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%239CA3AF" width="18" height="18"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 1rem center;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-hint {
  color: #9ca3af;
  font-size: 0.75rem;
  margin-top: 0.5rem;
}

.form-notice {
  background: rgba(59, 130, 246, 0.1);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1.5rem 0;
  color: #93c5fd;
  font-size: 0.875rem;
  line-height: 1.5;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

@media (max-width: 640px) {
  .form-container {
    padding: 1rem;
  }

  .form-card {
    padding: 1.5rem;
  }

  .form-title {
    font-size: 1.5rem;
    padding-left: 1rem;
  }

  .form-title::before {
    left: -0.5rem;
  }
}
</style>
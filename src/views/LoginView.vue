<template>
  <div class="login-container">
    <center><h2>Login</h2></center>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="login">
        <button type="submit">Login</button>
      </div>
    </form>
    <div class="register-link">
      <router-link to="/register">没有账号？注册</router-link>
    </div>
  </div>
  <!-- 分割线 -->
  <div style="padding-top: 600px;">
    -----------------------------------------------------------------------------------------------------------------------
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';
import { useFavoritesStore } from '../stores/favorites';
import { usesubmitstore } from '../stores/submitStore';
const store = useAuthStore();
const favoritesstore = useFavoritesStore();
const submitstore = usesubmitstore();
const router = useRouter();
const username = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    // 登录
    await store.login({ username: username.value, password: password.value });

    // 登录成功后更新收藏夹
    await favoritesstore.fetchFavorites(username.value);

    //登录成功后更新提交记录
    await submitstore.fetchSubmissions(username.value);

    alert('登录成功'); // 登录成功后弹出提示
    router.push('/home'); // 登录成功后跳转到主页
  } catch (error) {
    alert('登录失败，请检查你的账号密码');
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
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
    alert('登录成功'); // 登录成功后弹出提示



    router.push('/profile'); // 登录成功后跳转到主页


  } catch (error) {
    // alert(error)
    console.log(error)
    alert('登录失败，请检查你的账号密码');
  }// 登录成功后更新收藏夹
  await favoritesstore.fetchFavorites(username.value);

  //登录成功后更新自定义网站
  await submitstore.fetchSubmissions(username.value);
};
</script>


<template>
  <div class="login-container">
    <h2>Login</h2>
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
        
        <button type="submit" >Login</button>
        
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
<style scoped>
.login{
  display: flex;
  justify-content: center;
  align-items: center;
}
/* HTML: <div class="loader"></div> */
.loader {
  width: 40px;
  aspect-ratio: 1.154;
  --_g: no-repeat radial-gradient(farthest-side,#000 90%,#0000);
  background: 
    var(--_g) 50%  0,
    var(--_g) 0    100%,
    var(--_g) 100% 100%;
  background-size: 35% calc(35%*1.154);
  animation: l16 1s infinite;
}
@keyframes l16{ 
    50%,100% {background-position: 100% 100%,50% 0,0 100%} 
}
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
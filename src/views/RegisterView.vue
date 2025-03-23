  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/authStore';
  
  const store = useAuthStore();
  const router = useRouter();
  const username = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match.');
      return;
    }
  
    try {
      await store.register({ username: username.value, password: password.value });
      alert('注册成功请登录');
      router.push('/login'); // 注册成功后跳转到登录页面
    } catch (error) {
      alert(error)
    }
  };
  </script>
  <template>
  
    <div class="register-container">
     <h2>Register</h2>
      
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" v-model="username" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" required />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" v-model="confirmPassword" required />
        </div>
        <div class="register">
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  </template>
  <style scoped>
  .register-container {
    max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  height: 100%;
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
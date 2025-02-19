// src/stores/authStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import { User, Credentials } from '../types/types';


export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as User | null
  }),
  actions: {
    async login(credentials: Credentials) {
      try {
        // 发送登录请求到后端
        const response = await axios.post('https://jy8b5cnnmg.hzh.sealos.run/login', credentials);
        // console.log(response)
        // 返回的用户名是存在data.user.username中的
        // 如果登录成功，更新状态
        this.isAuthenticated = true;
        this.user = response.data.user.username;

        // 可选：保存用户信息到 localStorage 或其他存储
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        // 如果登录失败，抛出错误
        throw new Error('Login failed. Please check your credentials.');
      }
    },

    //添加一个 register action，用于处理注册逻辑。
    async register(credentials: Credentials) {
      try {
        const response = await axios.post('https://jy8b5cnnmg.hzh.sealos.run/adduser', credentials);
        // console.log(response)
        if (response.data.code == 401 || response.data.code == 400) {
          throw new Error('注册失败,用户名已存在');
        } else {
          this.isAuthenticated = true;
          this.user = response.data;
          localStorage.setItem('user', JSON.stringify(response.data));
        }

      } catch (error) {
        throw new Error('注册失败,用户名已存在');
      }
    },

    // 处理退出登录逻辑
    logout() {
      // 登出逻辑
      this.isAuthenticated = false;
      this.user = null;
      // 可选：清除用户信息
      localStorage.removeItem('user');
    }
  }
});
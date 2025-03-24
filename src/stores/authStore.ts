// src/stores/authStore.ts
import { defineStore } from 'pinia';
import axios from 'axios';
import { Credentials } from '../types/types';
import { useFavoritesStore } from './favorites';
import { usesubmitstore } from './submitStore';
import { ref } from 'vue';



export const useAuthStore = defineStore('auth', {

  // state中的数据都是默认响应式的
  state: () => ({
    isAuthenticated: false,
    user: "",
    url: ""
  }),
  actions: {
    setUser(name: string) {
      const user = localStorage.getItem('user')
      const userid = ref("")
      if (user) {
        userid.value = JSON.parse(user).userid
      }
      
      this.user = name
      localStorage.setItem('user', JSON.stringify({
        userid:userid.value ,
        username: name
      }))
    },
    async login(credentials: Credentials) {
      console.log(credentials)
      //测试账户
      if (credentials.username == 'doctor@126.com' && credentials.password == 'password') {
        this.$state.isAuthenticated = true;
        this.$state.user = credentials.username;
        localStorage.setItem('user', JSON.stringify({
          userid: "response.data.userid",
          username: credentials.username
        }));

        return
      }

      try {
        // 发送登录请求到后端
        const response = await axios.post('https://jy8b5cnnmg.hzh.sealos.run/login', credentials);
        console.log(credentials)
        // console.log(response)
        // 返回的用户名是存在data.user.username中的
        // 如果登录成功，更新状态
        this.user = response.data.user.username
        this.isAuthenticated = true;
        this.url = response.data
        console.log(response.data)
        localStorage.setItem('user', JSON.stringify({
          userid: response.data.user.userid,
          username: credentials.username
        }));

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
          throw new Error('注册失败');
        } else {
          this.isAuthenticated = true;
          this.user = response.data.data.username;
          localStorage.setItem('user', JSON.stringify({
            userid: response.data.data.userid,
            username: credentials.username
          }));
        }

      } catch (error) {
        console.log(error)
        throw new Error('注册失败');
      }
    },
    // 初始化用户
    initUser() {
      // 从缓存中获取用户信息
      const userStr = localStorage.getItem('user');
      // 如果存在则设置为当前用户
      if (userStr) {
        this.user = JSON.parse(userStr).username;
        this.isAuthenticated = true;
        const favoritesStore = useFavoritesStore();
        const submitstore = usesubmitstore();
        favoritesStore.fetchFavorites(this.user);
        submitstore.fetchSubmissions(this.user);
      }
    },

    // 处理退出登录逻辑
    logout() {
      // 登出逻辑
      this.isAuthenticated = false;
      this.user = "";
      // 可选：清除用户信息
      localStorage.removeItem('user');
      //清除缓存
      localStorage.clear();

    }
  }
});
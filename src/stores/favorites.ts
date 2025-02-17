import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Website } from '../types/types'
import axios from 'axios'
import {lovedata} from '../types/types'

export const useFavoritesStore = defineStore('favorites', () => {
  let favorites = ref<Website[]>([])
  const addFavorite = (website: Website) => {
    if (!favorites.value.find(f => f.id === website.id)) {
      favorites.value.push(website)
    }
  }

  const removeFavorite = (websiteId: string) => {
    favorites.value = favorites.value.filter(f => f.id !== websiteId)
  }

  const isFavorite = (websiteId: string) => {
    return favorites.value.some(f => f.id === websiteId)
  }

  const updateFavorites = async (username:string) => {
    
    // 构造发送到后端的数据
    let data:lovedata ={
      username:username,
      love:favorites.value  //传递的是包含喜爱网站的对象数组因为定义就是const favorites = ref<Website[]>([])
    }
    console.log(data)

    try {
      // 发送 POST 请求
      const response = await axios.post('https://jy8b5cnnmg.hzh.sealos.run/addlove', data, {
        headers: {
          'Content-Type': 'application/json'
        }       
      });
  
      // 更新 favorites 的值
      // favorites.value = response.data;
  
      console.log('Favorites updated successfully:', response.data);
    } catch (error:any) {
      // 错误处理
      console.error('Error updating favorites:', error);
  
      if (error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
        console.warn(
          `Failed to update favorites. Server responded with status: ${error.response.status}`
        );
      } else if (error.request) {
        // 请求已发出，但没有收到响应
        console.warn('No response received from the server.');
      } else {
        // 在设置请求时触发了错误
        console.warn('Error setting up the request:', error.message);
      }
    }
  };
  
  
  const fetchFavorites = async (username:any) =>{
  try {
    const response = await axios.post<any>(
      'https://jy8b5cnnmg.hzh.sealos.run/getlove', // 替换为你的 API 地址
      { username }
    );
    // console.log(response.data)
    // 喜爱的网站的对象数组是存在返回的reponse的data这个json对象的love属性里面的
    favorites.value = response.data.love;
  } catch (error) {
    console.error('Error fetching favorites:', error);
    throw error;
  }
}

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    updateFavorites,
    fetchFavorites
  }
})
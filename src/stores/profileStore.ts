import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  const username = ref('')
  const avatar = ref('')
  const birthdate = ref('')
  const email = ref('')
  const profile = ref({
    username: 'John Doe',
    avatar: 'https://example.com/images/user.jpg',
    birthdate: '1990-01-01',
    email: 'johndoe@example.com'
  })

//   模拟更新到服务器的异步操作
  const updateProfile = async (newProfile: any) => {
    // 这里添加实际API调用
    console.log('Updating profile to server:', newProfile)
    Object.assign(profile, newProfile)
  }

  return {
    username,
    avatar,
    birthdate,
    email,
    updateProfile
  }
})
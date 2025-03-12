<template>
    <div class="avatar-uploader">
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        @change="handleFile"
        hidden
      />
      <div
        class="avatar-wrapper"
        :class="{ 'dragover': isDragging }"
        @click="triggerUpload"
        @dragover.prevent="handleDragOver"
        @dragleave="handleDragLeave"
        @drop.prevent="handleDrop"
      >
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt="头像预览"
          class="avatar-preview"
        />
        <div v-else class="upload-prompt">
          <span>点击上传</span>
          <span>或拖拽文件至此</span>
        </div>
        <transition name="fade">
          <div v-if="isUploading" class="upload-status">
            <div class="progress-bar" :style="{ width: progress + '%' }"></div>
            <span>{{ progress }}%</span>
          </div>
        </transition>
      </div>
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import axios from 'axios'
  
  interface UploadResponse {
    code: number
    message: string
    data?: {
      avatarUrl: string
      storagePath: string
    }
  }
  
  // 响应式状态
  const fileInput = ref<HTMLInputElement>()
  const isUploading = ref(false)
  const progress = ref(0)
  const previewUrl = ref('')
  const error = ref('')
  const isDragging = ref(false)
  
  // 触发文件选择
  const triggerUpload = () => {
    fileInput.value?.click()
  }
  
  // 处理文件选择
  const handleFile = async (e: Event) => {
    const input = e.target as HTMLInputElement
    const file = input.files?.[0]
    if (file) await processFile(file)
  }
  
  // 处理拖拽上传
  const handleDrop = (e: DragEvent) => {
    isDragging.value = false
    const file = e.dataTransfer?.files[0]
    if (file) processFile(file)
  }
  
  // 通用文件处理
  const processFile = async (file: File) => {
    try {
      // 1. 重置状态
      error.value = ''
      isUploading.value = true
      
      // 2. 前端验证
      if (!validateFile(file)) return
  
      // 3. 生成预览
      previewUrl.value = URL.createObjectURL(file)
  
      // 4. 创建FormData
      const formData = new FormData()
      formData.append('avatar', file)
      formData.append('userId', 'current-user-id') // 替换实际用户ID
  
      // 5. 发送请求
      const response = await axios.post<UploadResponse>(
        '/api/upload/avatar',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              progress.value = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              )
            }
          }
        }
      )
  
      // 6. 处理响应
      if (response.data.code === 200) {
        // 更新全局用户状态或重新获取用户信息
        console.log('新头像地址:', response.data.data?.avatarUrl)
      } else {
        error.value = response.data.message || '上传失败'
      }
    } catch (err) {
      error.value = '上传过程中发生错误'
      console.error('上传错误:', err)
    } finally {
      isUploading.value = false
      progress.value = 0
      if (fileInput.value) fileInput.value.value = ''
    }
  }
  
  // 文件验证
  const validateFile = (file: File): boolean => {
    const MAX_SIZE = 5 * 1024 * 1024 // 5MB
    const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
  
    if (!ALLOWED_TYPES.includes(file.type)) {
      error.value = '仅支持 JPG/PNG/WEBP 格式'
      return false
    }
  
    if (file.size > MAX_SIZE) {
      error.value = '文件大小不能超过5MB'
      return false
    }
  
    return true
  }
  
  // 拖拽状态处理
  const handleDragOver = () => {
    isDragging.value = true
  }
  
  const handleDragLeave = () => {
    isDragging.value = false
  }
  </script>
  
  <style scoped>
  .avatar-uploader {
    max-width: 200px;
  }
  
  .avatar-wrapper {
    position: relative;
    width: 150px;
    height: 150px;
    border: 2px dashed #ccc;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    transition: border-color 0.3s;
  }
  
  .avatar-wrapper.dragover {
    border-color: #409eff;
  }
  
  .avatar-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .upload-prompt {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #666;
  }
  
  .upload-status {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 8px;
    text-align: center;
  }
  
  .progress-bar {
    height: 3px;
    background: #409eff;    
    transition: width 0.3s ease;
  }
  
  .error-message {
    color: #ff4444;
    margin-top: 8px;
    font-size: 0.9em;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
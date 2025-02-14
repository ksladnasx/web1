<script setup lang="ts">
import { useRouter } from 'vue-router'
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline'

const props = defineProps<{
  modelValue: string
}>()

// const emit = defineEmits<{
//   (e: 'update:modelValue', value: string): void
// }>()

const router = useRouter()

const handleSearch = () => {
  if (props.modelValue.trim()) {
    router.push({
      path: '/search',
      query: { q: props.modelValue.trim() }
    })
  }
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    handleSearch()
  }
}
</script>

<template>
  <div class="search-container">
    <div class="search-wrapper">
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @keypress="handleKeyPress"
        placeholder="搜索网站、工具、资源..."
        class="search-input"
      />
      <button class="search-button" @click="handleSearch">
        <MagnifyingGlassIcon class="search-icon" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.search-container {
  width: 100%;
  max-width: 600px; /* 根据需要调整最大宽度 */
  margin: 0 auto;
}

.search-wrapper {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 25px;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease; /* 添加过渡效果 */
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
  background-color: transparent;
  transition: background-color 0.3s ease; /* 添加过渡效果 */
}

.search-input:focus {
  background-color: #fff; /* 选中时背景颜色 */
}

.search-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none; /* 移除点击时产生的边框 */
  padding: 0 12px;
}

.search-icon {
  width: 20px;
  height: 20px;
  color: #999;
  transition: color 0.3s ease; /* 添加过渡效果 */
}

.search-button:hover .search-icon,
.search-input:focus + .search-button .search-icon {
  color: #4a90e2; /* 鼠标悬停或输入框聚焦时图标颜色 */
}
.search-input:focus + .search-button {
  background-color: #f9f9f9; /* 输入框聚焦时按钮背景颜色 */
  border: none;
}

.search-wrapper:hover {
  border-color: #4a90e2; /* 鼠标悬停时边框颜色 */
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.5); /* 鼠标悬停时阴影效果 */
}
</style>
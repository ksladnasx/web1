<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{
  categories: Array<{
    id: string
    name: string
    icon: string
  }>
}>()

const router = useRouter()

const navigateToCategory = (categoryId: string) => {
  router.push(`/category/${categoryId}`)
}
</script>

<template>
  <div class="main-content">
    <span v-for="category in categories" :key="category.id" class="btnss">
      <button @click="navigateToCategory(category.id)" class="btn">
        <span class="text-3xl mb-2 block">{{ category.icon }}</span>
        <h3 >{{ category.name }}</h3>
      </button></span>
  </div>
</template>

<style scoped>
.main-content {
  background-color:  rgb(28, 33, 47);
}
.btn{
  background-color: rgb(23, 52, 92);
}
.btn:hover {
  background-color: rgb(36, 114, 216);
  color: #76dee9;
}
.btnss {
  display: inline-flexbox;
  align-items: center;
  padding:0 2vh;

}
</style>
<script setup lang="ts">
import { useRouter } from 'vue-router'

const props = defineProps<{
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
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    <button
      v-for="category in categories"
      :key="category.id"
      @click="navigateToCategory(category.id)"
      class="p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow text-center"
    >
      <span class="text-3xl mb-2 block">{{ category.icon }}</span>
      <h3 class="font-medium">{{ category.name }}</h3>
    </button>
  </div>
</template>
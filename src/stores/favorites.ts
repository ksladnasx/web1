import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Website } from './website'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref<Website[]>([])

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

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }
})
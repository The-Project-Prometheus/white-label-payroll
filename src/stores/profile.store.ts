import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<Record<string, unknown> | null>(null)

  const fetchProfile = async () => {
    // Mock — no-op until backend is ready
  }

  const uploadProfilePicture = async (_file: unknown): Promise<{ success: boolean; errors: Array<{ messages: string[] }> | null }> => {
    // Mock — no-op until backend is ready
    return { success: true, errors: null }
  }

  return { profile, fetchProfile, uploadProfilePicture }
})

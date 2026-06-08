import { useFetch } from '@vueuse/core'
import { useAuthStore } from '@/stores/auth.store.ts'

/**
 * @description Make an HTTP request to an endpoint.
 * Wrapper for VueUse's useFetch composable.
 *
 * @example
 * const { data, statusCode } = await useApiCall('employees').get().json()
 * if (statusCode.value === 200) {
 *   console.log(data.value)
 * }
 *
 * @see https://vueuse.org/core/useFetch/
 */
export const useApiCall = (uri: string, authToken: string | null = null) => {
  const baseUrl = import.meta.env.VITE_API_ROOT_URL

  // Remove leading slash
  if (uri.charAt(0) === '/') uri = uri.substring(1)

  return useFetch(`${baseUrl}/${uri}`, {
    async beforeFetch({ url, options }) {
      if (!authToken) return { url, options }

      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${authToken}`,
      }

      return { options, url }
    },
    onFetchError(ctx) {
      const authStore = useAuthStore()
      const token = authStore.authenticationToken

      if (token && ctx?.response?.status === 401) {
        if (authStore.authenticatedUser !== null) authStore.authExpired = true
      }

      return ctx
    },
    updateDataOnError: true,
  })
}

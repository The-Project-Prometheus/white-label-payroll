import { useApiCall } from './network'
import { useAuthStore } from '@/stores/auth.store.ts'

export const useLoansApi = () => {
  const authStore = useAuthStore()
  const token = authStore.authenticationToken

  const list = (params?: { employee_id?: number; status?: string }) => {
    const query = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : ''
    return useApiCall(`loans${query}`, token).get().json()
  }

  const create = (data: Record<string, unknown>) => useApiCall('loans', token).post(data).json()

  const getSchedule = (loanId: number) => useApiCall(`loans/${loanId}/schedule`, token).get().json()

  const getBalance = (loanId: number) => useApiCall(`loans/${loanId}/balance`, token).get().json()

  return { list, create, getSchedule, getBalance }
}

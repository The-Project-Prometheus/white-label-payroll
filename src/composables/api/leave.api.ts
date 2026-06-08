import { useApiCall } from './network'
import { useAuthStore } from '@/stores/auth.store.ts'

export const useLeaveApi = () => {
  const authStore = useAuthStore()
  const token = authStore.authenticationToken

  const listRequests = (params?: { status?: string; employee_id?: number }) => {
    const query = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : ''
    return useApiCall(`leave/requests${query}`, token).get().json()
  }

  const fileRequest = (data: Record<string, unknown>) => useApiCall('leave/requests', token).post(data).json()

  const approve = (requestId: number) => useApiCall(`leave/requests/${requestId}/approve`, token).post().json()

  const reject = (requestId: number, reason: string) =>
    useApiCall(`leave/requests/${requestId}/reject`, token).post({ reason }).json()

  const getBalance = (employeeId: number) => useApiCall(`employees/${employeeId}/leave-balance`, token).get().json()

  const monetize = (employeeId: number, days: number) =>
    useApiCall(`employees/${employeeId}/leave/monetize`, token).post({ days }).json()

  return { listRequests, fileRequest, approve, reject, getBalance, monetize }
}

import { useApiCall } from './network'
import { useAuthStore } from '@/stores/auth.store.ts'

export const useAllowancesApi = () => {
  const authStore = useAuthStore()
  const token = authStore.authenticationToken

  const listTypes = () => useApiCall('allowances/types', token).get().json()

  const createType = (data: Record<string, unknown>) => useApiCall('allowances/types', token).post(data).json()

  const updateType = (id: number, data: Record<string, unknown>) =>
    useApiCall(`allowances/types/${id}`, token).patch(data).json()

  const assignToEmployee = (employeeId: number, data: Record<string, unknown>) =>
    useApiCall(`employees/${employeeId}/allowances`, token).post(data).json()

  return { listTypes, createType, updateType, assignToEmployee }
}

import { useApiCall } from './network'
import { useAuthStore } from '@/stores/auth.store.ts'

export const useSystemApi = () => {
  const authStore = useAuthStore()
  const token = authStore.authenticationToken

  const listUsers = () => useApiCall('users', token).get().json()
  const createUser = (data: Record<string, unknown>) => useApiCall('users', token).post(data).json()
  const updateUser = (id: number, data: Record<string, unknown>) => useApiCall(`users/${id}`, token).patch(data).json()
  const listRoles = () => useApiCall('users/roles', token).get().json()

  const getConfig = () => useApiCall('system/config', token).get().json()
  const updateConfig = (key: string, value: string) => useApiCall('system/config', token).patch({ key, value }).json()

  const backup = () => useApiCall('system/backup', token).post().json()
  const listBackups = () => useApiCall('system/backups', token).get().json()
  const restore = (backupId: number) => useApiCall(`system/backups/${backupId}/restore`, token).post().json()

  const getAuditLog = (params?: { entity_type?: string; action?: string; page?: number }) => {
    const query = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : ''
    return useApiCall(`audit${query}`, token).get().json()
  }

  return { listUsers, createUser, updateUser, listRoles, getConfig, updateConfig, backup, listBackups, restore, getAuditLog }
}

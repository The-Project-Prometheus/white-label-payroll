import { useApiCall } from './network'
import { useAuthStore } from '@/stores/auth.store.ts'

export interface EmployeeFilter {
  department_id?: number
  employment_type?: string
  employment_status?: string
  search?: string
  page?: number
  page_size?: number
}

export const useEmployeesApi = () => {
  const authStore = useAuthStore()
  const token = authStore.authenticationToken

  const list = (filters: EmployeeFilter = {}) => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, String(value))
    })
    const query = params.toString() ? `?${params.toString()}` : ''
    return useApiCall(`employees${query}`, token).get().json()
  }

  const get = (id: number) => useApiCall(`employees/${id}`, token).get().json()

  const create = (data: Record<string, unknown>) => useApiCall('employees', token).post(data).json()

  const update = (id: number, data: Record<string, unknown>) => useApiCall(`employees/${id}`, token).patch(data).json()

  const separate = (id: number, data: { separation_date: string; reason: string }) =>
    useApiCall(`employees/${id}/separate`, token).post(data).json()

  const updateSalaryGrade = (
    id: number,
    data: { salary_grade: number; step: number; effective_date: string; reason: string },
  ) => useApiCall(`employees/${id}/salary-grade`, token).post(data).json()

  const getSalaryGradeHistory = (id: number) => useApiCall(`employees/${id}/salary-grade/history`, token).get().json()

  return { list, get, create, update, separate, updateSalaryGrade, getSalaryGradeHistory }
}

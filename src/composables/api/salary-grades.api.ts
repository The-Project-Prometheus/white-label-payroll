import { useApiCall } from './network'
import { useAuthStore } from '@/stores/auth.store.ts'

export const useSalaryGradesApi = () => {
  const authStore = useAuthStore()
  const token = authStore.authenticationToken

  const getTable = (tranche?: number) => {
    const query = tranche ? `?tranche=${tranche}` : ''
    return useApiCall(`salary-grades/table${query}`, token).get().json()
  }

  const lookup = (grade: number, step: number) =>
    useApiCall(`salary-grades/lookup?grade=${grade}&step=${step}`, token).get().json()

  return { getTable, lookup }
}

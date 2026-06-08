import { useApiCall } from './network'
import { useAuthStore } from '@/stores/auth.store.ts'

export const usePayrollApi = () => {
  const authStore = useAuthStore()
  const token = authStore.authenticationToken

  const run = (payPeriodId: number) => useApiCall('payroll/run', token).post({ pay_period_id: payPeriodId }).json()

  const preview = (payPeriodId: number) => useApiCall(`payroll/preview/${payPeriodId}`, token).get().json()

  const getRegister = (runId: number) => useApiCall(`payroll/runs/${runId}/register`, token).get().json()

  const submitForReview = (runId: number) => useApiCall(`payroll/runs/${runId}/submit`, token).post().json()

  const approve = (runId: number) => useApiCall(`payroll/runs/${runId}/approve`, token).post().json()

  const reject = (runId: number, comments: string) =>
    useApiCall(`payroll/runs/${runId}/reject`, token).post({ comments }).json()

  const lockPeriod = (periodId: number) => useApiCall(`payroll/periods/${periodId}/lock`, token).post().json()

  const listRuns = (params?: { page?: number; page_size?: number }) => {
    const query = params ? `?${new URLSearchParams(params as Record<string, string>).toString()}` : ''
    return useApiCall(`payroll/runs${query}`, token).get().json()
  }

  const listPeriods = (year?: number) => {
    const query = year ? `?year=${year}` : ''
    return useApiCall(`payroll/periods${query}`, token).get().json()
  }

  return { run, preview, getRegister, submitForReview, approve, reject, lockPeriod, listRuns, listPeriods }
}

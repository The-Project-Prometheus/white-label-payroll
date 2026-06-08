import { useApiCall } from './network'
import { useAuthStore } from '@/stores/auth.store.ts'

export const useReportsApi = () => {
  const authStore = useAuthStore()
  const token = authStore.authenticationToken

  const generatePayslip = (employeeId: number, periodId: number) =>
    useApiCall(`reports/payslip/${employeeId}/${periodId}`, token).get().blob()

  const generateRegister = (runId: number, format: string) =>
    useApiCall(`reports/register/${runId}?format=${format}`, token).get().blob()

  const generateRemittance = (periodId: number, agency: string, format: string) =>
    useApiCall(`reports/remittance/${periodId}?agency=${agency}&format=${format}`, token).get().blob()

  const generateBIR1601C = (periodId: number) => useApiCall(`reports/bir/1601c/${periodId}`, token).get().blob()

  const generateBIR2316 = (employeeId: number, year: number) =>
    useApiCall(`reports/bir/2316/${employeeId}/${year}`, token).get().blob()

  return { generatePayslip, generateRegister, generateRemittance, generateBIR1601C, generateBIR2316 }
}

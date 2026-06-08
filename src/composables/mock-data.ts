/**
 * Mock Data — White Label Payroll System
 * Generic company payroll data (no government-specific references).
 */

// ============ SALARY RATES TABLE ============
// Company pay grades (Grade 1-15, Step 1-5)
export const SG_TABLE: Record<number, number[]> = {
  1: [18000, 18360, 18727, 19102, 19484],
  2: [20000, 20400, 20808, 21224, 21649],
  3: [23000, 23460, 23929, 24408, 24896],
  4: [26500, 27030, 27571, 28122, 28684],
  5: [30000, 30600, 31212, 31836, 32473],
  6: [34000, 34680, 35374, 36081, 36803],
  7: [38500, 39270, 40055, 40856, 41674],
  8: [43500, 44370, 45257, 46163, 47086],
  9: [49000, 49980, 50980, 51999, 53039],
  10: [55000, 56100, 57222, 58366, 59534],
  11: [62000, 63240, 64505, 65795, 67111],
  12: [70000, 71400, 72828, 74285, 75770],
  13: [80000, 81600, 83232, 84897, 86595],
  14: [92000, 93840, 95717, 97631, 99584],
  15: [108000, 110160, 112363, 114610, 116903],
}

export interface MockEmployee {
  id: number
  number: string
  name: string
  department: string
  position: string
  sg: number
  step: number
  type: string
  status: string
  gender: string
  civilStatus: string
  dateHired: string
}

export const MOCK_EMPLOYEES: MockEmployee[] = [
  { id: 1, number: 'EMP-2021-001', name: 'Sarah Chen', department: 'Finance', position: 'Finance Director', sg: 14, step: 4, type: 'Regular', status: 'Active', gender: 'Female', civilStatus: 'Married', dateHired: '2021-02-15' },
  { id: 2, number: 'EMP-2021-002', name: 'Marcus Rivera', department: 'Engineering', position: 'Senior Developer', sg: 11, step: 3, type: 'Regular', status: 'Active', gender: 'Male', civilStatus: 'Single', dateHired: '2021-06-01' },
  { id: 3, number: 'EMP-2022-003', name: 'Priya Sharma', department: 'Human Resources', position: 'HR Manager', sg: 12, step: 2, type: 'Regular', status: 'Active', gender: 'Female', civilStatus: 'Married', dateHired: '2022-01-10' },
  { id: 4, number: 'EMP-2022-004', name: 'James Tan', department: 'Operations', position: 'Operations Lead', sg: 10, step: 3, type: 'Regular', status: 'Active', gender: 'Male', civilStatus: 'Married', dateHired: '2022-03-20' },
  { id: 5, number: 'EMP-2023-005', name: 'Lisa Nakamura', department: 'Marketing', position: 'Marketing Specialist', sg: 8, step: 2, type: 'Regular', status: 'Active', gender: 'Female', civilStatus: 'Single', dateHired: '2023-04-01' },
  { id: 6, number: 'EMP-2023-006', name: 'David Kim', department: 'Engineering', position: 'Junior Developer', sg: 6, step: 1, type: 'Regular', status: 'Active', gender: 'Male', civilStatus: 'Single', dateHired: '2023-08-15' },
  { id: 7, number: 'EMP-2024-007', name: 'Ana Santos', department: 'Finance', position: 'Accounting Clerk', sg: 5, step: 1, type: 'Regular', status: 'Active', gender: 'Female', civilStatus: 'Married', dateHired: '2024-01-03' },
  { id: 8, number: 'EMP-2024-008', name: 'Ryan Gomez', department: 'Operations', position: 'Warehouse Staff', sg: 3, step: 1, type: 'Contractual', status: 'Active', gender: 'Male', civilStatus: 'Single', dateHired: '2024-06-01' },
  { id: 9, number: 'EMP-2025-009', name: 'Michelle Lim', department: 'Human Resources', position: 'HR Assistant', sg: 4, step: 1, type: 'Probationary', status: 'Active', gender: 'Female', civilStatus: 'Single', dateHired: '2025-02-01' },
  { id: 10, number: 'EMP-2025-010', name: 'Carlos Reyes', department: 'Engineering', position: 'QA Engineer', sg: 9, step: 1, type: 'Regular', status: 'Active', gender: 'Male', civilStatus: 'Married', dateHired: '2025-03-15' },
]

export const MOCK_LOANS = [
  { id: 1, employee: 'Sarah Chen', number: 'EMP-2021-001', type: 'SSS Salary Loan', principal: 50000, rate: '10%', term: 24, monthly: 2304, balance: 32000, status: 'Active', startDate: '2024-06-01' },
  { id: 2, employee: 'Marcus Rivera', number: 'EMP-2021-002', type: 'Pag-IBIG MPL', principal: 80000, rate: '10.5%', term: 24, monthly: 3721, balance: 56000, status: 'Active', startDate: '2025-01-15' },
  { id: 3, employee: 'James Tan', number: 'EMP-2022-004', type: 'Company Loan', principal: 100000, rate: '6%', term: 36, monthly: 3042, balance: 72000, status: 'Active', startDate: '2025-03-01' },
  { id: 4, employee: 'Lisa Nakamura', number: 'EMP-2023-005', type: 'SSS Calamity Loan', principal: 20000, rate: '10%', term: 24, monthly: 921, balance: 14000, status: 'Active', startDate: '2025-09-01' },
  { id: 5, employee: 'Priya Sharma', number: 'EMP-2022-003', type: 'Pag-IBIG Housing', principal: 1500000, rate: '6.5%', term: 360, monthly: 9480, balance: 1420000, status: 'Active', startDate: '2023-01-15' },
]

export const MOCK_PAYROLL_RUNS = [
  { id: 1, period: 'May 2026 - 2nd Half', date: '2026-05-31', status: 'Approved', employees: 10, grossPay: 520000, netPay: 412000, approvedBy: 'Finance Director' },
  { id: 2, period: 'May 2026 - 1st Half', date: '2026-05-15', status: 'Locked', employees: 10, grossPay: 520000, netPay: 412000, approvedBy: 'Finance Director' },
  { id: 3, period: 'April 2026 - 2nd Half', date: '2026-04-30', status: 'Locked', employees: 10, grossPay: 515000, netPay: 408000, approvedBy: 'Finance Director' },
]

export const MOCK_LEAVE_REQUESTS = [
  { id: 1, employee: 'Marcus Rivera', type: 'VL', dates: 'May 25–27, 2026', days: 3, status: 'Pending', filed: 'May 18, 2026' },
  { id: 2, employee: 'Lisa Nakamura', type: 'SL', dates: 'May 20, 2026', days: 1, status: 'Approved', filed: 'May 20, 2026' },
  { id: 3, employee: 'James Tan', type: 'VL', dates: 'Jun 2–6, 2026', days: 5, status: 'Pending', filed: 'May 19, 2026' },
  { id: 4, employee: 'Ana Santos', type: 'EL', dates: 'May 22, 2026', days: 1, status: 'Approved', filed: 'May 15, 2026' },
  { id: 5, employee: 'David Kim', type: 'VL', dates: 'May 12–13, 2026', days: 2, status: 'Rejected', filed: 'May 8, 2026' },
]

export const MOCK_AUDIT_LOG = [
  { id: 1, timestamp: '2026-05-20 10:15:32', user: 'priya.sharma', action: 'Update', entity: 'Employee', entityId: 'EMP-2023-006', description: 'Salary grade updated: Grade 5 Step 1 → Grade 6 Step 1', ip: '192.168.1.45' },
  { id: 2, timestamp: '2026-05-20 09:45:10', user: 'sarah.chen', action: 'Create', entity: 'PayrollRun', entityId: 'PR-2026-05-2', description: 'Payroll run created for May 2026 2nd Half', ip: '192.168.1.32' },
  { id: 3, timestamp: '2026-05-20 09:30:05', user: 'admin', action: 'Update', entity: 'SystemConfig', entityId: 'TAX_TABLE', description: 'Tax table updated for 2026 rates', ip: '192.168.1.10' },
  { id: 4, timestamp: '2026-05-19 16:20:44', user: 'priya.sharma', action: 'Create', entity: 'Employee', entityId: 'EMP-2025-010', description: 'New employee: Carlos Reyes (QA Engineer)', ip: '192.168.1.45' },
  { id: 5, timestamp: '2026-05-19 15:10:22', user: 'sarah.chen', action: 'StatusChange', entity: 'PayrollRun', entityId: 'PR-2026-05-1', description: 'Payroll status: Pending → Approved', ip: '192.168.1.55' },
  { id: 6, timestamp: '2026-05-19 14:55:18', user: 'sarah.chen', action: 'Update', entity: 'Allowance', entityId: '12', description: 'Performance bonus added: ₱15,000 for EMP-2021-002', ip: '192.168.1.32' },
  { id: 7, timestamp: '2026-05-19 11:30:00', user: 'admin', action: 'LoginSuccess', entity: 'Session', entityId: 'admin', description: 'Successful login', ip: '192.168.1.10' },
  { id: 8, timestamp: '2026-05-19 11:28:45', user: 'unknown', action: 'LoginFailed', entity: 'Session', entityId: 'admin', description: 'Failed login attempt (wrong password)', ip: '192.168.1.99' },
]

export const MOCK_USERS = [
  { id: 1, username: 'admin', fullName: 'System Administrator', role: 'Administrator', mfa: true, active: true, lastLogin: '2026-05-20 09:15' },
  { id: 2, username: 'sarah.chen', fullName: 'Sarah Chen', role: 'Payroll Manager', mfa: true, active: true, lastLogin: '2026-05-20 08:30' },
  { id: 3, username: 'priya.sharma', fullName: 'Priya Sharma', role: 'HR Manager', mfa: false, active: true, lastLogin: '2026-05-19 16:45' },
  { id: 4, username: 'marcus.rivera', fullName: 'Marcus Rivera', role: 'Viewer', mfa: false, active: true, lastLogin: '2026-05-18 14:20' },
]

export const MOCK_ALLOWANCE_TYPES = [
  { id: 1, code: 'TRANS', name: 'Transportation Allowance', amount: 3000, frequency: 'Monthly', taxable: false, basis: 'Company Policy', eligibleTypes: ['Regular', 'Probationary'], excludedTypes: ['Contractual'] },
  { id: 2, code: 'MEAL', name: 'Meal Allowance', amount: 2500, frequency: 'Monthly', taxable: false, basis: 'Company Policy', eligibleTypes: ['Regular', 'Probationary', 'Contractual'], excludedTypes: [] },
  { id: 3, code: 'RICE', name: 'Rice Subsidy', amount: 2000, frequency: 'Monthly', taxable: false, basis: 'De Minimis (BIR RR 29-2025)', eligibleTypes: ['Regular', 'Probationary'], excludedTypes: ['Contractual'] },
  { id: 4, code: 'CLOTH', name: 'Clothing/Uniform Allowance', amount: 6000, frequency: 'Annual', taxable: false, basis: 'De Minimis (BIR RR 29-2025)', eligibleTypes: ['Regular', 'Probationary'], excludedTypes: ['Contractual'] },
  { id: 5, code: 'MED', name: 'Medical Allowance', amount: 10000, frequency: 'Annual', taxable: false, basis: 'De Minimis (BIR RR 29-2025)', eligibleTypes: ['Regular'], excludedTypes: ['Contractual', 'Probationary'] },
  { id: 6, code: 'COMM', name: 'Communication Allowance', amount: 1500, frequency: 'Monthly', taxable: false, basis: 'De Minimis — Telecom (BIR RR 29-2025)', eligibleTypes: ['Regular', 'Probationary'], excludedTypes: ['Contractual'] },
  { id: 7, code: 'PERF', name: 'Performance Bonus', amount: 0, frequency: 'Annual', taxable: true, basis: 'Company Policy — Merit-based', eligibleTypes: ['Regular'], excludedTypes: ['Contractual', 'Probationary'] },
  { id: 8, code: '13TH', name: '13th Month Pay', amount: 0, frequency: 'Annual', taxable: false, basis: 'PD 851 (Mandatory)', eligibleTypes: ['Regular', 'Probationary', 'Contractual'], excludedTypes: [] },
]

/** Utility: format peso amount */
export function formatPeso(amount: number): string {
  return '₱' + amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })
}

/** Utility: get salary from grade table */
export function getSalary(sg: number, step: number): number {
  const grades = SG_TABLE[sg]
  if (!grades) return 0
  return grades[Math.min(step - 1, 4)] || grades[0]
}

/** Compute payroll for a single employee */
export function computePayroll(emp: MockEmployee) {
  const basic = getSalary(emp.sg, emp.step)
  const isContractual = emp.type === 'Contractual'

  // Allowances
  const transpo = isContractual ? 0 : 3000
  const meal = 2500
  const rice = isContractual ? 0 : 2000
  const comm = isContractual ? 0 : 1500
  const gross = basic + transpo + meal + rice + comm

  // Deductions
  const sss = Math.min(Math.round(basic * 0.045), 1350) // SSS EE share ~4.5%, max ₱1,350
  const philhealth = Math.min(Math.round(basic * 0.025), 2500) // PhilHealth 2.5%
  const pagibig = 200 // Fixed ₱200

  // Tax (simplified Philippine TRAIN Law brackets)
  const annualTaxable = (basic - sss - philhealth - pagibig) * 12
  let annualTax = 0
  if (annualTaxable > 8000000) annualTax = 2202500 + (annualTaxable - 8000000) * 0.35
  else if (annualTaxable > 2000000) annualTax = 402500 + (annualTaxable - 2000000) * 0.30
  else if (annualTaxable > 800000) annualTax = 102500 + (annualTaxable - 800000) * 0.25
  else if (annualTaxable > 400000) annualTax = 22500 + (annualTaxable - 400000) * 0.20
  else if (annualTaxable > 250000) annualTax = (annualTaxable - 250000) * 0.15
  const tax = Math.round(annualTax / 12)

  const totalDeductions = sss + philhealth + pagibig + tax
  const netPay = gross - totalDeductions

  return {
    basic,
    transpo,
    meal,
    rice,
    comm,
    gross,
    sss,
    philhealth,
    pagibig,
    tax,
    totalDeductions,
    netPay,
    // Aliases for pages that reference original field names
    pera: transpo,
    rata: comm,
    grocery: meal,
    transport: rice,
    gsis: sss,
  }
}

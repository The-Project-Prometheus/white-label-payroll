/** Employee */
export type Employee = {
  id: number
  employee_number: string
  first_name: string
  middle_name: string | null
  last_name: string
  suffix: string | null
  department_id: number
  department_name: string
  position_title: string
  employment_type: 'regular' | 'contractual' | 'casual' | 'coterminous'
  employment_status: 'active' | 'separated' | 'on_leave' | 'suspended'
  salary_grade: number
  step: number
  monthly_salary: number
  date_hired: string
  separation_date: string | null
  created_at: string
  updated_at: string
}

/** Pay Period */
export type PayPeriod = {
  id: number
  year: number
  month: number
  period_number: 1 | 2
  start_date: string
  end_date: string
  is_locked: boolean
  created_at: string
}

/** Payroll Run */
export type PayrollRun = {
  id: number
  pay_period_id: number
  pay_period: PayPeriod
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'posted'
  total_gross: number
  total_deductions: number
  total_net: number
  employee_count: number
  run_by: string
  run_at: string
  approved_by: string | null
  approved_at: string | null
  comments: string | null
}

/** Payslip Line Item */
export type PayslipItem = {
  id: number
  employee_id: number
  employee: Employee
  pay_period_id: number
  basic_pay: number
  pera: number
  allowances: number
  overtime_pay: number
  gross_pay: number
  withholding_tax: number
  gsis_ps: number
  gsis_gs: number
  philhealth_ps: number
  philhealth_gs: number
  pagibig_ps: number
  pagibig_gs: number
  loan_deductions: number
  other_deductions: number
  total_deductions: number
  net_pay: number
}

/** Allowance Type */
export type AllowanceType = {
  id: number
  code: string
  name: string
  description: string | null
  is_taxable: boolean
  is_fixed: boolean
  default_amount: number | null
  frequency: 'monthly' | 'semi_monthly' | 'annual' | 'one_time'
  is_active: boolean
}

/** Employee Allowance */
export type EmployeeAllowance = {
  id: number
  employee_id: number
  allowance_type_id: number
  allowance_type: AllowanceType
  amount: number
  effective_date: string
  end_date: string | null
  is_active: boolean
}

/** Loan */
export type Loan = {
  id: number
  employee_id: number
  employee: Employee
  loan_type: 'gsis_conso' | 'gsis_policy' | 'gsis_emergency' | 'pagibig_mpl' | 'pagibig_calamity' | 'other'
  loan_type_label: string
  principal_amount: number
  monthly_amortization: number
  total_paid: number
  remaining_balance: number
  start_date: string
  end_date: string
  status: 'active' | 'fully_paid' | 'cancelled'
}

/** Leave Request */
export type LeaveRequest = {
  id: number
  employee_id: number
  employee: Employee
  leave_type: 'vacation' | 'sick' | 'maternity' | 'paternity' | 'special' | 'mandatory_forced'
  start_date: string
  end_date: string
  days_requested: number
  reason: string | null
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  approved_by: string | null
  approved_at: string | null
  created_at: string
}

/** Leave Balance */
export type LeaveBalance = {
  employee_id: number
  vacation_leave: number
  sick_leave: number
  special_leave: number
  forced_leave: number
  total_earned: number
  total_used: number
}

/** Salary Grade Table Entry */
export type SalaryGradeEntry = {
  grade: number
  step: number
  amount: number
  tranche: number
}

/** Audit Log Entry */
export type AuditLogEntry = {
  id: number
  user_id: number
  username: string
  action: string
  entity_type: string
  entity_id: number | null
  details: string | null
  ip_address: string
  created_at: string
}

/** System User */
export type SystemUser = {
  id: number
  username: string
  email: string
  full_name: string
  role: string
  is_active: boolean
  last_login: string | null
  created_at: string
}

/** User Response from Auth */
export type UserResponse = {
  id: number
  username: string
  email: string
  full_name: string
  roles: Array<{ name: string }>
  email_verified_at: string | null
  user_profile: {
    full_name: string
    profile_picture_url?: string | null
    address?: {
      home_address?: string
      barangay?: { name: string }
      city?: { name: string }
      province?: { name: string }
      region?: { name: string }
    }
  } | null
}

/** Department */
export type Department = {
  id: number
  code: string
  name: string
  head_employee_id: number | null
}

/** Role Response */
export type RoleResponse = {
  id: number
  name: string
  description: string
  permissions: string[]
}

/** Settings Response */
export type SettingsResponse = {
  name: string
  value: string | number | boolean
}

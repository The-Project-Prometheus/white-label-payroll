export const enum AuthType {
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated',
  OPEN = 'open',
  MFA = 'mfa',
}

export const enum AuthRole {
  PAYROLL_ADMIN = 'payroll_admin',
  PAYROLL_OFFICER = 'payroll_officer',
  HR_OFFICER = 'hr_officer',
  APPROVER = 'approver',
  EXECUTIVE = 'executive',
  VIEWER = 'viewer',
  SUPER_USER = 'super_user',
}

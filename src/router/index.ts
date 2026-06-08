import { createRouter, createWebHistory, RouteMeta } from 'vue-router'
import { vueApp } from '@/app.ts'
import { AuthRole, AuthType } from '@/typings/auth.types.ts'
import { useAuthStore } from '@/stores/auth.store.ts'

const enum RouteGroup {
  HOME = 'Home',
  PAYROLL = 'Payroll',
  HR_MANAGEMENT = 'HR Management',
  REPORTS = 'Reports',
  ADMIN_TOOLS = 'Admin Tools',
  AUTH = 'Auth',
}

const allRoles = [
  AuthRole.PAYROLL_ADMIN,
  AuthRole.PAYROLL_OFFICER,
  AuthRole.HR_OFFICER,
  AuthRole.APPROVER,
  AuthRole.EXECUTIVE,
  AuthRole.VIEWER,
  AuthRole.SUPER_USER,
]

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/DashboardPage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.HOME,
      label: 'Dashboard',
      icon: 'pi pi-home',
      isSidebarMenu: true,
      authType: AuthType.AUTHENTICATED,
      roles: allRoles,
    },
  },
  {
    path: '/dashboard',
    redirect: '/',
  },
  {
    path: '/employees',
    name: 'employees',
    component: () => import('@/views/EmployeesPage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.HR_MANAGEMENT,
      label: 'Employees',
      icon: 'pi pi-users',
      isSidebarMenu: true,
      authType: AuthType.AUTHENTICATED,
      roles: [AuthRole.PAYROLL_ADMIN, AuthRole.HR_OFFICER, AuthRole.PAYROLL_OFFICER, AuthRole.SUPER_USER],
    },
  },
  {
    path: '/employees/new',
    name: 'employee-create',
    component: () => import('@/views/EmployeeFormPage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.HR_MANAGEMENT,
      label: 'New Employee',
      authType: AuthType.AUTHENTICATED,
      roles: [AuthRole.PAYROLL_ADMIN, AuthRole.HR_OFFICER, AuthRole.SUPER_USER],
    },
  },
  {
    path: '/employees/:id/edit',
    name: 'employee-edit',
    component: () => import('@/views/EmployeeFormPage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.HR_MANAGEMENT,
      label: 'Edit Employee',
      authType: AuthType.AUTHENTICATED,
      roles: [AuthRole.PAYROLL_ADMIN, AuthRole.HR_OFFICER, AuthRole.SUPER_USER],
    },
  },
  {
    path: '/salary-grades',
    name: 'salary-grades',
    component: () => import('@/views/SalaryGradesPage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.HR_MANAGEMENT,
      label: 'Salary Grades',
      icon: 'pi pi-table',
      isSidebarMenu: true,
      authType: AuthType.AUTHENTICATED,
      roles: [AuthRole.PAYROLL_ADMIN, AuthRole.PAYROLL_OFFICER, AuthRole.HR_OFFICER, AuthRole.SUPER_USER],
    },
  },
  {
    path: '/allowances',
    name: 'allowances',
    component: () => import('@/views/AllowancesPage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.HR_MANAGEMENT,
      label: 'Allowances',
      icon: 'pi pi-money-bill',
      isSidebarMenu: true,
      authType: AuthType.AUTHENTICATED,
      roles: [AuthRole.PAYROLL_ADMIN, AuthRole.PAYROLL_OFFICER, AuthRole.SUPER_USER],
    },
  },
  {
    path: '/loans',
    name: 'loans',
    component: () => import('@/views/LoansPage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.HR_MANAGEMENT,
      label: 'Loans',
      icon: 'pi pi-wallet',
      isSidebarMenu: true,
      authType: AuthType.AUTHENTICATED,
      roles: [AuthRole.PAYROLL_ADMIN, AuthRole.PAYROLL_OFFICER, AuthRole.SUPER_USER],
    },
  },
  {
    path: '/leave',
    name: 'leave',
    component: () => import('@/views/LeavePage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.HR_MANAGEMENT,
      label: 'Leave Management',
      icon: 'pi pi-calendar',
      isSidebarMenu: true,
      authType: AuthType.AUTHENTICATED,
      roles: [AuthRole.PAYROLL_ADMIN, AuthRole.HR_OFFICER, AuthRole.SUPER_USER],
    },
  },
  {
    path: '/payroll',
    name: 'payroll-run',
    component: () => import('@/views/PayrollRunPage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.PAYROLL,
      label: 'Payroll Processing',
      icon: 'pi pi-calculator',
      isSidebarMenu: true,
      authType: AuthType.AUTHENTICATED,
      roles: [AuthRole.PAYROLL_ADMIN, AuthRole.PAYROLL_OFFICER, AuthRole.SUPER_USER],
    },
  },
  {
    path: '/approvals',
    name: 'approvals',
    component: () => import('@/views/ApprovalsPage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.PAYROLL,
      label: 'Approvals',
      icon: 'pi pi-check-circle',
      isSidebarMenu: true,
      authType: AuthType.AUTHENTICATED,
      roles: [AuthRole.PAYROLL_ADMIN, AuthRole.APPROVER, AuthRole.SUPER_USER],
    },
  },
  {
    path: '/computation',
    name: 'computation-reference',
    component: () => import('@/views/ComputationReferencePage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.PAYROLL,
      label: 'Computation Reference',
      icon: 'pi pi-book',
      isSidebarMenu: true,
      authType: AuthType.AUTHENTICATED,
      roles: allRoles,
    },
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import('@/views/ReportsPage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.REPORTS,
      label: 'Reports',
      icon: 'pi pi-file',
      isSidebarMenu: true,
      authType: AuthType.AUTHENTICATED,
      roles: [AuthRole.PAYROLL_ADMIN, AuthRole.PAYROLL_OFFICER, AuthRole.EXECUTIVE, AuthRole.SUPER_USER],
    },
  },
  {
    path: '/exec-dashboard',
    name: 'exec-dashboard',
    component: () => import('@/views/ExecDashboardPage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.REPORTS,
      label: 'Executive Dashboard',
      icon: 'pi pi-chart-bar',
      isSidebarMenu: true,
      authType: AuthType.AUTHENTICATED,
      roles: [AuthRole.EXECUTIVE, AuthRole.PAYROLL_ADMIN, AuthRole.SUPER_USER],
    },
  },
  {
    path: '/resources',
    name: 'resources',
    component: () => import('@/views/ResourcesPage.vue'),
    meta: <RouteMeta>{
      group: RouteGroup.REPORTS,
      label: 'Resources',
      icon: 'pi pi-book',
      isSidebarMenu: true,
      authType: AuthType.AUTHENTICATED,
      roles: allRoles,
    },
  },
  {
    path: '/admin',
    name: 'admin-tools',
    redirect: { name: 'user-management' },
    children: [
      {
        path: 'users',
        name: 'user-management',
        component: () => import('@/views/UsersManagementPage.vue'),
        meta: <RouteMeta>{
          label: 'User Management',
          icon: 'pi pi-user-edit',
          isSidebarMenu: true,
          group: RouteGroup.ADMIN_TOOLS,
          authType: AuthType.AUTHENTICATED,
          roles: [AuthRole.PAYROLL_ADMIN, AuthRole.SUPER_USER],
        },
      },
      {
        path: 'audit',
        name: 'audit-log',
        component: () => import('@/views/AuditLogPage.vue'),
        meta: <RouteMeta>{
          label: 'Audit Log',
          icon: 'pi pi-history',
          isSidebarMenu: true,
          group: RouteGroup.ADMIN_TOOLS,
          authType: AuthType.AUTHENTICATED,
          roles: [AuthRole.PAYROLL_ADMIN, AuthRole.SUPER_USER],
        },
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/views/SettingsPage.vue'),
        meta: <RouteMeta>{
          label: 'Settings',
          icon: 'pi pi-cog',
          isSidebarMenu: true,
          group: RouteGroup.ADMIN_TOOLS,
          authType: AuthType.AUTHENTICATED,
          roles: [AuthRole.PAYROLL_ADMIN, AuthRole.SUPER_USER],
        },
      },
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    redirect: { name: 'login' },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/AuthPage.vue'),
        meta: <RouteMeta>{
          label: 'Login',
          hideNavigation: true,
          authType: AuthType.UNAUTHENTICATED,
          group: RouteGroup.AUTH,
        },
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/views/ForgotPasswordPage.vue'),
        meta: <RouteMeta>{
          label: 'Forgot Password',
          hideNavigation: true,
          authType: AuthType.UNAUTHENTICATED,
          group: RouteGroup.AUTH,
        },
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('@/views/ResetPasswordPage.vue'),
        meta: <RouteMeta>{
          label: 'Reset Password',
          hideNavigation: true,
          authType: AuthType.UNAUTHENTICATED,
          group: RouteGroup.AUTH,
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import('@/views/misc/404Page.vue'),
    meta: <RouteMeta>{
      label: 'Page not found',
      hideNavigation: true,
      authType: AuthType.OPEN,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/** Route Guards */
const appName = import.meta.env.VITE_APP_NAME
router.beforeEach(async (to, from) => {
  window.scrollTo(0, 0)

  if (to.name === 'auth') {
    return { name: 'login' }
  }

  const authStore = useAuthStore()

  // Block authenticated users from unauthenticated routes
  if (authStore.isAuthenticated && !authStore.authExpired && to.meta.authType === AuthType.UNAUTHENTICATED) {
    return from
  }

  // Protect authenticated routes
  if (to.meta.authType === AuthType.AUTHENTICATED && !authStore.isAuthenticated) {
    return { name: 'login' }
  }

  // Role-based access control
  if (to.meta.authType === AuthType.AUTHENTICATED && to.meta.roles) {
    const roles = authStore.authRoles
    if (!to.meta.roles.some((r: string) => roles.includes(r))) {
      return { name: 'dashboard' }
    }
  }

  // Set browser tab title
  document.title = `${appName} | ${to.meta.label}` || appName
})

/**
 * Extending vue-router type
 */
export {}

declare module 'vue-router' {
  interface RouteMeta {
    group?: RouteGroup
    label: string
    icon?: string
    isSidebarMenu?: boolean
    hideNavigation?: boolean
    roles?: AuthRole[]
    authType: AuthType
  }
}

vueApp.use(router)

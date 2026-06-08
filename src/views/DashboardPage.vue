<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { MOCK_EMPLOYEES, formatPeso } from '@/composables/mock-data'

const router = useRouter()

const empCount = computed(() => MOCK_EMPLOYEES.filter((e) => e.status === 'Active').length)
const monthlyPayroll = computed(() => empCount.value * 43000)
const pendingApprovals = ref(3)
const complianceDue = ref(2)

const recentActivity = [
  { action: 'Payroll approved', detail: 'May 2026 - 2nd Half', time: '2 hours ago', user: 'Finance Manager' },
  { action: 'Employee added', detail: 'Juan Dela Cruz (2026-00547)', time: '5 hours ago', user: 'HR Processor' },
  { action: 'Salary grade updated', detail: 'Maria Santos — SG 15 Step 3', time: '1 day ago', user: 'HR Processor' },
  { action: 'DTR uploaded', detail: 'May 2026 2nd Half — 9 employees', time: '1 day ago', user: 'HR Processor' },
]
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-xl font-bold text-gray-900">Dashboard</h1>
      <p class="mt-1 text-sm text-gray-500">Welcome to the Payroll Management System</p>
      <div class="mt-3 h-0.5 w-14 bg-amber-500"></div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div
        class="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:ring-2 hover:ring-blue-300"
        @click="router.push('/employees')"
      >
        <div class="flex items-center gap-4">
          <div class="rounded-lg bg-gray-50 p-3 text-blue-600">
            <i class="pi pi-users text-xl"></i>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ empCount }}</p>
            <p class="text-xs text-gray-500">Total Employees</p>
          </div>
        </div>
      </div>

      <div
        class="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:ring-2 hover:ring-amber-300"
        @click="router.push('/payroll')"
      >
        <div class="flex items-center gap-4">
          <div class="rounded-lg bg-gray-50 p-3 text-amber-600">
            <span class="text-xl font-bold">₱</span>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ formatPeso(monthlyPayroll) }}</p>
            <p class="text-xs text-gray-500">Monthly Payroll</p>
          </div>
        </div>
      </div>

      <div
        class="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:ring-2 hover:ring-orange-300"
        @click="router.push('/approvals')"
      >
        <div class="flex items-center gap-4">
          <div class="rounded-lg bg-gray-50 p-3 text-orange-500">
            <i class="pi pi-file text-xl"></i>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ pendingApprovals }}</p>
            <p class="text-xs text-gray-500">Pending Approvals</p>
          </div>
        </div>
      </div>

      <div
        class="cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:ring-2 hover:ring-red-300"
        @click="router.push('/reports')"
      >
        <div class="flex items-center gap-4">
          <div class="rounded-lg bg-gray-50 p-3 text-red-600">
            <i class="pi pi-clock text-xl"></i>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ complianceDue }}</p>
            <p class="text-xs text-gray-500">Compliance Due</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-base font-bold text-gray-900">Quick Actions</h2>
      <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
        <button
          class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:border-amber-500 hover:bg-amber-50"
          @click="router.push('/payroll')"
        >
          <span class="text-2xl">₱</span>
          <span class="text-xs font-medium text-gray-900">Run Payroll</span>
        </button>
        <button
          class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:border-amber-500 hover:bg-amber-50"
          @click="router.push('/employees/new')"
        >
          <i class="pi pi-user-plus text-xl text-blue-600"></i>
          <span class="text-xs font-medium text-gray-900">Add Employee</span>
        </button>
        <button
          class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:border-amber-500 hover:bg-amber-50"
          @click="router.push('/reports')"
        >
          <i class="pi pi-file text-xl text-amber-600"></i>
          <span class="text-xs font-medium text-gray-900">Reports</span>
        </button>
        <button
          class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-colors hover:border-amber-500 hover:bg-amber-50"
          @click="router.push('/admin/users')"
        >
          <span class="text-2xl">⚙️</span>
          <span class="text-xs font-medium text-gray-900">Administration</span>
        </button>
      </div>
    </div>

    <!-- System Overview -->
    <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-base font-bold text-gray-900">System Overview</h2>
      <div class="space-y-3">
        <div
          v-for="(item, i) in recentActivity"
          :key="i"
          class="flex items-center justify-between border-b border-gray-100 py-2 last:border-0"
        >
          <div>
            <p class="text-sm font-medium text-gray-900">{{ item.action }}</p>
            <p class="text-xs text-gray-500">{{ item.detail }}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-400">{{ item.time }}</p>
            <p class="text-xs text-amber-600">{{ item.user }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

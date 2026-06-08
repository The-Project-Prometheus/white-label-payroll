<script setup lang="ts">
import { ref } from 'vue'

const settings = ref([
  { key: 'APP_NAME', value: 'Payroll System', label: 'Application Name' },
  { key: 'PERA_AMOUNT', value: '2000', label: 'PERA Monthly Amount (₱)' },
  { key: 'NTHP_MINIMUM', value: '5000', label: 'Net Take-Home Pay Minimum (₱)' },
  { key: 'SESSION_TIMEOUT', value: '300', label: 'Session Timeout (seconds)' },
  { key: 'MAX_LOGIN_ATTEMPTS', value: '5', label: 'Max Login Attempts Before Lockout' },
  { key: 'PAYROLL_SCHEDULE', value: 'semi-monthly', label: 'Default Pay Frequency' },
  { key: 'SSL_TRANCHE', value: '3', label: 'SSL Tranche (EO 64)' },
  { key: 'SSL_EFFECTIVE_DATE', value: '2026-01-01', label: 'SSL Tranche Effective Date' },
  { key: 'BACKUP_SCHEDULE', value: 'daily-0600', label: 'Auto-Backup Schedule' },
  { key: 'MFA_REQUIRED', value: 'true', label: 'Require MFA for All Users' },
])
</script>

<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-xl font-bold text-gray-900">System Settings</h1>
      <p class="mt-0.5 text-sm text-gray-500">Global configuration parameters for the payroll system</p>
      <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
    </div>

    <div class="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div class="border-b border-gray-100 px-5 py-4">
        <h2 class="text-base font-bold text-gray-900">Configuration Parameters</h2>
        <p class="mt-0.5 text-xs text-gray-500">Changes take effect immediately for new payroll runs</p>
      </div>
      <div class="divide-y divide-gray-100">
        <div v-for="setting in settings" :key="setting.key" class="flex items-center justify-between px-5 py-4">
          <div>
            <p class="text-sm font-medium text-gray-900">{{ setting.label }}</p>
            <p class="font-mono text-[10px] text-gray-400">{{ setting.key }}</p>
          </div>
          <input
            v-model="setting.value"
            class="w-64 rounded-md border border-gray-300 px-3 py-2 text-right font-mono text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      <div class="flex justify-end border-t border-gray-100 bg-gray-50 px-5 py-3">
        <button class="inline-flex h-8 items-center gap-1.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:from-blue-700 hover:to-blue-600">
          <i class="pi pi-save text-xs"></i> Save Changes
        </button>
      </div>
    </div>

    <div class="rounded-lg border-l-4 border-l-amber-500 border border-gray-200 bg-white p-4 shadow-sm">
      <p class="text-xs text-gray-600">
        <span class="font-bold text-gray-900">Note:</span> Configuration changes are logged in the audit trail.
        SSL Tranche updates affect salary computations for all future payroll runs — prior periods remain unchanged.
      </p>
    </div>
  </div>
</template>

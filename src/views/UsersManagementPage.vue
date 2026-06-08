<script setup lang="ts">
import { ref } from 'vue'
import { MOCK_USERS } from '@/composables/mock-data'

const activeTab = ref('users')

const mockRoles = [
  { name: 'System Administrator', users: 1, permissions: 42 },
  { name: 'Payroll Manager', users: 2, permissions: 35 },
  { name: 'Payroll Officer', users: 5, permissions: 28 },
  { name: 'HR Liaison', users: 3, permissions: 18 },
  { name: 'Finance Manager', users: 2, permissions: 22 },
  { name: 'Auditor', users: 2, permissions: 12 },
]

const tabs = [
  { id: 'users', label: 'Users & Roles', icon: 'pi pi-users' },
  { id: 'rates', label: 'Contribution Rates', icon: 'pi pi-cog' },
  { id: 'backup', label: 'Backup & Restore', icon: 'pi pi-database' },
]
</script>

<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-xl font-bold text-gray-900">System Administration</h1>
      <p class="mt-0.5 text-sm text-gray-500">Manage users, roles, configuration, and system maintenance</p>
      <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 border-b border-gray-200">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors', activeTab === tab.id ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-900']"
        @click="activeTab = tab.id"
      >
        <i :class="tab.icon" class="text-sm"></i>
        {{ tab.label }}
      </button>
    </div>

    <!-- Users Tab -->
    <template v-if="activeTab === 'users'">
      <div class="flex items-center justify-between">
        <h2 class="text-base font-bold text-gray-900">User Accounts</h2>
        <button class="inline-flex h-8 items-center gap-1.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:from-blue-700 hover:to-blue-600">
          + Add User
        </button>
      </div>

      <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <table class="w-full">
          <thead>
            <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
              <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Username</th>
              <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Full Name</th>
              <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Role</th>
              <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">MFA</th>
              <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Status</th>
              <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Last Login</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in MOCK_USERS" :key="user.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="px-4 py-3 font-mono text-sm text-gray-900">{{ user.username }}</td>
              <td class="px-4 py-3 text-sm">{{ user.fullName }}</td>
              <td class="px-4 py-3">
                <span class="rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">{{ user.role }}</span>
              </td>
              <td class="px-4 py-3 text-center">
                <span :class="user.mfa ? 'text-green-600' : 'text-orange-500'" class="text-xs font-medium">
                  {{ user.mfa ? '✓ Enabled' : '✗ Disabled' }}
                </span>
              </td>
              <td class="px-4 py-3 text-center">
                <span :class="user.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'" class="rounded px-2 py-0.5 text-[11px] font-medium">
                  {{ user.active ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-4 py-3 text-xs text-gray-500">{{ user.lastLogin }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Roles -->
      <h2 class="text-base font-bold text-gray-900">Roles & Permissions</h2>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="role in mockRoles" :key="role.name" class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div class="mb-2 flex items-center gap-2">
            <i class="pi pi-shield text-amber-500"></i>
            <h3 class="text-sm font-bold text-gray-900">{{ role.name }}</h3>
          </div>
          <div class="flex items-center gap-4 text-xs text-gray-500">
            <span>{{ role.users }} users</span>
            <span>{{ role.permissions }} permissions</span>
          </div>
        </div>
      </div>
    </template>

    <!-- Rates Tab -->
    <template v-if="activeTab === 'rates'">
      <h2 class="text-base font-bold text-gray-900">Contribution Rate Configuration</h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div class="rounded-lg border-l-4 border-l-blue-500 border border-gray-200 bg-white p-4 shadow-sm">
          <h3 class="mb-3 text-sm font-bold text-gray-900">GSIS (RA 8291)</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-gray-500">Employee Rate</span><span class="font-mono font-bold">9.00%</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Employer Rate</span><span class="font-mono font-bold">12.00%</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Salary Ceiling</span><span class="font-mono">None</span></div>
          </div>
        </div>
        <div class="rounded-lg border-l-4 border-l-green-500 border border-gray-200 bg-white p-4 shadow-sm">
          <h3 class="mb-3 text-sm font-bold text-gray-900">PhilHealth (RA 11223)</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-gray-500">Total Rate</span><span class="font-mono font-bold">5.00%</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Income Floor</span><span class="font-mono">₱10,000</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Income Ceiling</span><span class="font-mono">₱100,000</span></div>
          </div>
        </div>
        <div class="rounded-lg border-l-4 border-l-amber-500 border border-gray-200 bg-white p-4 shadow-sm">
          <h3 class="mb-3 text-sm font-bold text-gray-900">Pag-IBIG (RA 9679)</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between"><span class="text-gray-500">EE/ER Rate</span><span class="font-mono font-bold">2% / 2%</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Max Fund Salary</span><span class="font-mono">₱10,000</span></div>
            <div class="flex justify-between"><span class="text-gray-500">Max Contribution</span><span class="font-mono">₱200/mo</span></div>
          </div>
        </div>
      </div>
    </template>

    <!-- Backup Tab -->
    <template v-if="activeTab === 'backup'">
      <div class="flex items-center justify-between">
        <h2 class="text-base font-bold text-gray-900">Database Backup & Restore</h2>
        <button class="inline-flex h-8 items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-red-700">
          Create Backup Now
        </button>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h3 class="mb-3 text-sm font-bold text-gray-900">Recent Backups</h3>
        <div class="space-y-2">
          <div v-for="(backup, i) in [
            { file: 'company_payroll_2026-05-20_0600.sql.gz', size: '142 MB', date: 'May 20, 2026 06:00' },
            { file: 'company_payroll_2026-05-19_0600.sql.gz', size: '141 MB', date: 'May 19, 2026 06:00' },
            { file: 'company_payroll_2026-05-18_0600.sql.gz', size: '140 MB', date: 'May 18, 2026 06:00' },
          ]" :key="i" class="flex items-center justify-between border-b border-gray-50 py-2 last:border-0">
            <div>
              <p class="font-mono text-sm text-gray-900">{{ backup.file }}</p>
              <p class="text-xs text-gray-500">{{ backup.date }} — {{ backup.size }}</p>
            </div>
            <div class="flex items-center gap-2">
              <span class="rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700">Completed</span>
              <button class="text-xs text-blue-600 hover:underline">Restore</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

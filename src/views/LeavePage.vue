<script setup lang="ts">
import { ref } from 'vue'
import { MOCK_LEAVE_REQUESTS } from '@/composables/mock-data'

const activeSection = ref<'types' | 'balances' | 'requests' | 'calendar'>('types')

const leaveTypes = [
  { id: 1, code: 'VL', name: 'Vacation Leave', daysPerYear: '1.25/mo', accumulates: true, commutable: true, basis: 'CSC MC 41, s.1998' },
  { id: 2, code: 'SL', name: 'Sick Leave', daysPerYear: '1.25/mo', accumulates: true, commutable: true, basis: 'CSC MC 41, s.1998' },
  { id: 3, code: 'SPL', name: 'Special Privilege Leave', daysPerYear: 3, accumulates: false, commutable: false, basis: 'MO 363, s.1996' },
  { id: 4, code: 'FL', name: 'Mandatory/Forced Leave', daysPerYear: 5, accumulates: false, commutable: false, basis: 'CSC MC 41, s.1998' },
  { id: 5, code: 'ML', name: 'Expanded Maternity Leave', daysPerYear: 105, accumulates: false, commutable: false, basis: 'RA 11210' },
  { id: 6, code: 'PL', name: 'Paternity Leave', daysPerYear: 7, accumulates: false, commutable: false, basis: 'RA 8187' },
  { id: 7, code: 'SOLO', name: 'Solo Parent Leave', daysPerYear: 7, accumulates: false, commutable: false, basis: 'RA 8972' },
  { id: 8, code: 'VAWC', name: 'VAWC Leave', daysPerYear: 10, accumulates: false, commutable: false, basis: 'RA 9262' },
  { id: 9, code: 'SEL', name: 'Special Emergency Leave', daysPerYear: 5, accumulates: false, commutable: false, basis: 'PO 2024-009' },
  { id: 10, code: 'LL', name: 'Legislative Leave', daysPerYear: 15, accumulates: false, commutable: false, basis: 'PO 2002-02' },
  { id: 11, code: 'HCL', name: 'Health Crisis Leave', daysPerYear: 45, accumulates: false, commutable: false, basis: 'PO 2013-004' },
  { id: 12, code: 'MWL', name: 'Mental Wellness Leave', daysPerYear: 5, accumulates: false, commutable: false, basis: 'PO 2024-001' },
  { id: 13, code: 'SMWL', name: 'Supplemental Mental Wellness Leave', daysPerYear: 10, accumulates: false, commutable: false, basis: 'PO 2025-006' },
  { id: 14, code: 'SBL', name: 'Special Benefits for Women', daysPerYear: 60, accumulates: false, commutable: false, basis: 'RA 9710' },
  { id: 15, code: 'RHL', name: 'Rehabilitation Leave', daysPerYear: 180, accumulates: false, commutable: false, basis: 'CSC MC 14, s.1999' },
  { id: 16, code: 'TL', name: 'Terminal Leave', daysPerYear: 'N/A', accumulates: false, commutable: true, basis: 'CSC MC 02-16' },
]

const leaveBalances = [
  { employee: 'Elena H. Cruz', number: '2020-00012', dept: 'Legal Division', vl: 90, sl: 90 },
  { employee: 'Miguel G. Torres', number: '2021-00034', dept: 'Finance Division', vl: 75, sl: 75 },
  { employee: 'Pedro C. Reyes', number: '2022-00056', dept: 'Office of Sen. Garcia', vl: 60, sl: 60 },
  { employee: 'Maria B. Santos', number: '2023-00078', dept: 'Legislative Budget Office', vl: 45, sl: 45 },
  { employee: 'Juan A. Dela Cruz', number: '2024-00001', dept: 'Office of the Secretary', vl: 30, sl: 30 },
  { employee: 'Carlos E. Mendoza', number: '2024-00045', dept: 'IT Division', vl: 30, sl: 30 },
  { employee: 'Ana D. Villanueva', number: '2025-00023', dept: 'HR Division', vl: 15, sl: 15 },
]

const statusConfig: Record<string, { color: string; bg: string }> = {
  Pending: { color: 'text-orange-600', bg: 'bg-orange-100' },
  Approved: { color: 'text-green-700', bg: 'bg-green-100' },
  Rejected: { color: 'text-red-700', bg: 'bg-red-100' },
}
</script>

<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-xl font-bold text-gray-900">Leave Management</h1>
      <p class="mt-0.5 text-sm text-gray-500">Manage leave requests, types, balances, and eligibility</p>
      <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
    </div>

    <!-- Section Tabs -->
    <div class="flex gap-1 border-b border-gray-200">
      <button
        v-for="tab in [
          { id: 'types', label: 'Leave Types Configuration' },
          { id: 'balances', label: 'Credit Balances' },
          { id: 'requests', label: 'Leave Records' },
          { id: 'calendar', label: 'Benefits Calendar' },
        ]"
        :key="tab.id"
        :class="[
          'border-b-2 px-4 py-2.5 text-xs font-medium transition-colors',
          activeSection === tab.id ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-900',
        ]"
        @click="activeSection = tab.id as typeof activeSection"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Leave Types -->
    <div v-if="activeSection === 'types'" class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Code</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Name</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Days/Year</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Accumulates</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Commutable</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Legal Basis</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lt in leaveTypes" :key="lt.id" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="px-4 py-3"><span class="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs font-bold">{{ lt.code }}</span></td>
            <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ lt.name }}</td>
            <td class="px-4 py-3 text-center text-sm font-bold">{{ lt.daysPerYear }}</td>
            <td class="px-4 py-3 text-center"><span :class="lt.accumulates ? 'text-green-600' : 'text-gray-400'" class="text-[11px] font-medium">{{ lt.accumulates ? '✓' : '✗' }}</span></td>
            <td class="px-4 py-3 text-center"><span :class="lt.commutable ? 'text-green-600' : 'text-gray-400'" class="text-[11px] font-medium">{{ lt.commutable ? '✓' : '✗' }}</span></td>
            <td class="px-4 py-3 text-xs text-gray-500">{{ lt.basis }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Credit Balances -->
    <div v-if="activeSection === 'balances'" class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Employee</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Department</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">VL Balance</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">SL Balance</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Total</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Can Monetize</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in leaveBalances" :key="emp.number" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="px-4 py-3">
              <p class="text-sm font-medium text-gray-900">{{ emp.employee }}</p>
              <p class="font-mono text-[10px] text-gray-400">{{ emp.number }}</p>
            </td>
            <td class="px-4 py-3 text-xs text-gray-600">{{ emp.dept }}</td>
            <td class="px-4 py-3 text-center"><span class="text-sm font-bold text-blue-600">{{ emp.vl }}</span></td>
            <td class="px-4 py-3 text-center"><span class="text-sm font-bold text-green-600">{{ emp.sl }}</span></td>
            <td class="px-4 py-3 text-center"><span class="text-sm font-bold text-gray-900">{{ emp.vl + emp.sl }}</span></td>
            <td class="px-4 py-3 text-center">
              <span v-if="emp.vl >= 15" class="rounded bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">✓ Eligible</span>
              <span v-else class="rounded bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">✗ Not yet</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Leave Requests -->
    <div v-if="activeSection === 'requests'" class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Employee</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Type</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Dates</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Days</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="req in MOCK_LEAVE_REQUESTS" :key="req.id" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ req.employee }}</td>
            <td class="px-4 py-3"><span class="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium">{{ req.type }}</span></td>
            <td class="px-4 py-3 text-sm text-gray-600">{{ req.dates }}</td>
            <td class="px-4 py-3 text-center text-sm font-medium">{{ req.days }}</td>
            <td class="px-4 py-3 text-center">
              <span :class="['inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium', statusConfig[req.status]?.bg, statusConfig[req.status]?.color]">
                {{ req.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Benefits Calendar -->
    <div v-if="activeSection === 'calendar'" class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Month</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Benefit</th>
            <th class="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-white">Amount</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Eligibility Cutoff</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, i) in [
              { month: 'January', benefit: 'Employee Wellness Assistance', amount: '1 Month Basic (min SG 19-1)', cutoff: 'In service Jan 31' },
              { month: 'February', benefit: 'Uniform Allowance', amount: '₱7,000', cutoff: 'In service Jan 31' },
              { month: 'February', benefit: 'Senate Medical Assistance', amount: '₱100,000', cutoff: 'In service Jan 31' },
              { month: 'March', benefit: 'Educational Assistance', amount: '₱50,000', cutoff: 'In service Feb 28' },
              { month: 'May', benefit: 'Mid-Year Bonus', amount: '1 Month Basic', cutoff: '4 months aggregate' },
              { month: 'June', benefit: 'Mid-Year Rice Allowance', amount: '₱15,000', cutoff: '3 months actual' },
              { month: 'November', benefit: 'Year-End Bonus + Cash Gift', amount: '1 Month Basic + ₱5,000', cutoff: '4 months aggregate' },
              { month: 'Monthly', benefit: 'Additional Grocery Expense', amount: '₱20,000', cutoff: '3 months service' },
              { month: 'Monthly', benefit: 'Reimbursable Transportation', amount: '₱20,000', cutoff: '3 consecutive months' },
            ]"
            :key="i"
            class="border-b border-gray-100 hover:bg-gray-50"
          >
            <td class="px-4 py-2.5 text-xs font-bold text-gray-900">{{ row.month }}</td>
            <td class="px-4 py-2.5 text-xs text-gray-900">{{ row.benefit }}</td>
            <td class="px-4 py-2.5 text-right font-mono text-xs font-medium text-amber-600">{{ row.amount }}</td>
            <td class="px-4 py-2.5 text-[11px] text-gray-500">{{ row.cutoff }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Monetization info -->
    <div class="rounded-lg border-l-4 border-l-amber-500 border border-gray-200 bg-white p-4 shadow-sm">
      <p class="text-xs text-gray-600">
        <span class="font-bold text-gray-900">Monetization (Section 22):</span> Min 15 days VL accumulated. Monetize 10–30 days/year. Retain 5 days.
        Formula: Salary ÷ 22 × Days.
      </p>
    </div>
  </div>
</template>

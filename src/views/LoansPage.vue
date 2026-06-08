<script setup lang="ts">
import { ref, computed } from 'vue'
import { MOCK_LOANS, formatPeso } from '@/composables/mock-data'

const search = ref('')
const showBalance = ref(false)
const showPrincipal = ref(false)

const filtered = computed(() =>
  MOCK_LOANS.filter(
    (l) => !search.value || l.employee.toLowerCase().includes(search.value.toLowerCase()) || l.number.includes(search.value),
  ),
)

const typeColors: Record<string, string> = {
  'GSIS MPL': 'bg-blue-100 text-blue-700',
  'GSIS Emergency': 'bg-purple-100 text-purple-700',
  'Pag-IBIG MPL': 'bg-green-100 text-green-700',
  'Pag-IBIG Calamity': 'bg-orange-100 text-orange-700',
  'Pag-IBIG Housing': 'bg-amber-50 text-gray-900',
  'Union Loan': 'bg-red-100 text-red-700',
}
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Loan Management</h1>
        <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
      </div>
      <button class="inline-flex h-8 items-center gap-1.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:from-blue-700 hover:to-blue-600">
        <i class="pi pi-plus text-xs"></i> Record New Loan
      </button>
    </div>

    <!-- Summary -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
        <p class="text-2xl font-bold text-gray-900">{{ MOCK_LOANS.length }}</p>
        <p class="text-xs text-gray-500">Active Loans</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
        <p class="text-2xl font-bold text-blue-600">{{ formatPeso(MOCK_LOANS.reduce((s, l) => s + l.monthly, 0)) }}</p>
        <p class="text-xs text-gray-500">Monthly Deductions (All Loans)</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
        <p class="text-2xl font-bold text-red-600">{{ MOCK_LOANS.filter((l) => l.monthly > 5000).length }}</p>
        <p class="text-xs text-gray-500">⚠️ NTHP Risk (deduction &gt; ₱5K)</p>
      </div>
    </div>

    <!-- Search -->
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="relative w-72">
        <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          v-model="search"
          class="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-xs placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Search by employee name or number..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Employee</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Loan Type</th>
            <th class="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-white">
              Principal
              <button class="ml-1 text-[9px] text-amber-400 underline hover:text-white" @click.stop="showPrincipal = !showPrincipal">
                {{ showPrincipal ? 'hide' : 'show' }}
              </button>
            </th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Rate</th>
            <th class="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-white">Monthly</th>
            <th class="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-white">
              Balance
              <button class="ml-1 text-[9px] text-amber-400 underline hover:text-white" @click.stop="showBalance = !showBalance">
                {{ showBalance ? 'hide' : 'show' }}
              </button>
            </th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Remaining</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="loan in filtered" :key="loan.id" class="cursor-pointer border-b border-gray-100 hover:bg-gray-50">
            <td class="px-4 py-3">
              <p class="text-sm font-medium text-gray-900">{{ loan.employee }}</p>
              <p class="font-mono text-xs text-gray-400">{{ loan.number }}</p>
            </td>
            <td class="px-4 py-3 text-center">
              <span :class="['rounded px-2 py-0.5 text-[11px] font-medium', typeColors[loan.type] || '']">{{ loan.type }}</span>
            </td>
            <td class="px-4 py-3 text-right font-mono text-sm">
              {{ showPrincipal ? formatPeso(loan.principal) : '••••••' }}
            </td>
            <td class="px-4 py-3 text-center text-sm">{{ loan.rate }}</td>
            <td class="px-4 py-3 text-right font-mono text-sm font-medium">{{ formatPeso(loan.monthly) }}</td>
            <td class="px-4 py-3 text-right font-mono text-sm text-red-600">
              {{ showBalance ? formatPeso(loan.balance) : '••••••' }}
            </td>
            <td class="px-4 py-3 text-center">
              <span :class="['text-[11px] font-medium', Math.ceil(loan.balance / loan.monthly) <= 6 ? 'text-green-600' : 'text-gray-600']">
                {{ Math.ceil(loan.balance / loan.monthly) }} mo
              </span>
            </td>
            <td class="px-4 py-3 text-center">
              <span class="rounded bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">{{ loan.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

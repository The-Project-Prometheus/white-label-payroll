<script setup lang="ts">
import { computed } from 'vue'
import { MOCK_EMPLOYEES, formatPeso } from '@/composables/mock-data'

const costByOffice = computed(() => {
  const offices: Record<string, { headcount: number; cost: number }> = {}
  MOCK_EMPLOYEES.filter((e) => e.status === 'Active').forEach((emp) => {
    if (!offices[emp.department]) offices[emp.department] = { headcount: 0, cost: 0 }
    offices[emp.department].headcount++
    // Approximate monthly cost
    offices[emp.department].cost += emp.sg * 3000 + 20000
  })
  return Object.entries(offices)
    .map(([office, data]) => ({ office, ...data, budget: data.cost + Math.round(Math.random() * 10000) }))
    .sort((a, b) => b.cost - a.cost)
})

const totalCost = computed(() => costByOffice.value.reduce((s, o) => s + o.cost, 0))
const totalHeadcount = computed(() => costByOffice.value.reduce((s, o) => s + o.headcount, 0))

const monthlyTrend = [
  { month: 'Jan 2026', cost: 385000 },
  { month: 'Feb 2026', cost: 385000 },
  { month: 'Mar 2026', cost: 389923 },
  { month: 'Apr 2026', cost: 389923 },
  { month: 'May 2026', cost: 389923 },
  { month: 'Jun 2026', cost: 392000 },
]

const maxCost = Math.max(...monthlyTrend.map((m) => m.cost))
</script>

<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-xl font-bold text-gray-900">Executive Dashboard</h1>
      <p class="mt-0.5 text-sm text-gray-500">Personnel cost analytics and budget monitoring</p>
      <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
      <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
        <p class="text-2xl font-bold text-gray-900">{{ totalHeadcount }}</p>
        <p class="text-xs text-gray-500">Total Headcount</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
        <p class="text-2xl font-bold text-amber-600">{{ formatPeso(totalCost) }}</p>
        <p class="text-xs text-gray-500">Monthly Personnel Cost</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
        <p class="text-2xl font-bold text-blue-600">{{ totalHeadcount > 0 ? formatPeso(Math.round(totalCost / totalHeadcount)) : '₱0' }}</p>
        <p class="text-xs text-gray-500">Avg Cost per Head</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
        <p class="text-2xl font-bold text-green-600">0</p>
        <p class="text-xs text-gray-500">Offices Over Budget</p>
      </div>
    </div>

    <!-- Trend -->
    <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-base font-bold text-gray-900">Personnel Cost Trend</h2>
      <div class="space-y-1.5">
        <div v-for="(m, i) in monthlyTrend" :key="m.month" class="flex items-center gap-3">
          <span class="w-24 shrink-0 text-xs text-gray-500">{{ m.month }}</span>
          <div class="h-5 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              class="flex h-full items-center justify-end rounded-full bg-red-500/80 pr-2"
              :style="{ width: `${(m.cost / maxCost) * 100}%` }"
            >
              <span class="text-[10px] font-medium text-white">{{ formatPeso(m.cost) }}</span>
            </div>
          </div>
          <span :class="['w-12 text-right text-[10px]', i > 0 && m.cost > monthlyTrend[i - 1].cost ? 'text-red-500' : 'text-green-500']">
            {{ i === 0 ? '—' : `${m.cost > monthlyTrend[i - 1].cost ? '+' : ''}${(((m.cost - monthlyTrend[i - 1].cost) / monthlyTrend[i - 1].cost) * 100).toFixed(1)}%` }}
          </span>
        </div>
      </div>
    </div>

    <!-- Cost by Office -->
    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div class="border-b border-gray-100 px-5 py-4">
        <h2 class="text-base font-bold text-gray-900">Personnel Cost by Office</h2>
      </div>
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Office</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Headcount</th>
            <th class="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-white">Actual Cost</th>
            <th class="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-white">Budget</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="office in costByOffice" :key="office.office" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ office.office }}</td>
            <td class="px-4 py-3 text-center text-sm">{{ office.headcount }}</td>
            <td class="px-4 py-3 text-right font-mono text-sm">{{ formatPeso(office.cost) }}</td>
            <td class="px-4 py-3 text-right font-mono text-sm text-gray-500">{{ formatPeso(office.budget) }}</td>
            <td class="px-4 py-3 text-center">
              <span class="rounded bg-green-100 px-2 py-0.5 text-[11px] font-medium text-green-700">Within</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { SG_TABLE } from '@/composables/mock-data'

const searchGrade = ref('')

const filteredGrades = computed(() => {
  return Object.entries(SG_TABLE).filter(([grade]) => !searchGrade.value || grade === searchGrade.value)
})
</script>

<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Salary Grade Table</h1>
        <p class="mt-0.5 text-sm text-gray-500">Company Pay Grades (Grade 1-15, Step 1-5)</p>
        <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
      </div>
      <button class="inline-flex h-8 items-center gap-1.5 rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-900 shadow-sm hover:bg-gray-50">
        <i class="pi pi-download text-xs"></i> Export Table
      </button>
    </div>

    <!-- Filter -->
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="flex items-center gap-3">
        <div class="relative w-48">
          <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <select
            v-model="searchGrade"
            class="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All Grades (1–15)</option>
            <option v-for="i in 15" :key="i" :value="String(i)">Grade {{ i }}</option>
          </select>
        </div>
        <span class="text-xs text-gray-500">15 grades × 5 steps = 75 salary entries</span>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
              <th class="w-20 px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Grade</th>
              <th v-for="step in 5" :key="step" class="px-3 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-white">
                Step {{ step }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="[grade, steps] in filteredGrades"
              :key="grade"
              class="border-b border-gray-100 transition-colors hover:bg-amber-50/30"
            >
              <td class="px-4 py-2.5 text-center">
                <span class="inline-block rounded bg-gray-800 px-2 py-0.5 text-[11px] font-bold text-white">Grade {{ grade }}</span>
              </td>
              <td v-for="(amount, i) in steps" :key="i" class="px-3 py-2.5 text-right font-mono text-sm text-gray-900">
                ₱{{ amount.toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Info -->
    <div class="rounded-lg border-l-4 border-l-amber-500 border border-gray-200 bg-white p-4 shadow-sm">
      <p class="text-xs text-gray-600">
        <span class="font-bold text-gray-900">Note:</span> Pay grades are reviewed annually. Step increments are awarded based on performance reviews and tenure.
        Contact HR for questions about grade placement or step advancement.
      </p>
    </div>
  </div>
</template>

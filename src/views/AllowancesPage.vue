<script setup lang="ts">
import { ref, computed } from 'vue'
import { MOCK_ALLOWANCE_TYPES, formatPeso } from '@/composables/mock-data'

const search = ref('')
const expandedId = ref<number | null>(null)

const filtered = computed(() => {
  return MOCK_ALLOWANCE_TYPES.filter(
    (a) =>
      !search.value ||
      a.code.toLowerCase().includes(search.value.toLowerCase()) ||
      a.name.toLowerCase().includes(search.value.toLowerCase()),
  )
})

const toggleExpand = (id: number) => {
  expandedId.value = expandedId.value === id ? null : id
}
</script>

<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Allowance Configuration</h1>
        <p class="mt-0.5 text-sm text-gray-500">Manage allowance types, amounts, and eligibility rules</p>
        <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
      </div>
      <button class="inline-flex h-8 items-center gap-1.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:from-blue-700 hover:to-blue-600">
        <i class="pi pi-plus text-xs"></i>
        Add Allowance Type
      </button>
    </div>

    <!-- Search -->
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="relative w-72">
        <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          v-model="search"
          class="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-xs transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Search allowance types..."
        />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
            <th class="w-8 px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white"></th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Code</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Name</th>
            <th class="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-white">Amount</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Frequency</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Taxable</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Legal Basis</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="a in filtered" :key="a.id">
            <tr
              class="cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50"
              :class="expandedId === a.id ? 'bg-gray-50' : ''"
              @click="toggleExpand(a.id)"
            >
              <td class="px-3 py-3">
                <i :class="expandedId === a.id ? 'pi pi-chevron-down text-amber-500' : 'pi pi-chevron-right text-gray-400'" class="text-xs"></i>
              </td>
              <td class="px-4 py-3">
                <span class="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs font-bold text-gray-900">{{ a.code }}</span>
              </td>
              <td class="px-4 py-3 text-sm text-gray-900">{{ a.name }}</td>
              <td class="px-4 py-3 text-right font-mono text-xs font-medium text-gray-900">{{ formatPeso(a.amount) }}</td>
              <td class="px-4 py-3 text-center">
                <span class="rounded bg-gray-100 px-2 py-0.5 text-[11px] text-gray-700">{{ a.frequency }}</span>
              </td>
              <td class="px-4 py-3 text-center">
                <span :class="a.taxable ? 'text-red-600' : 'text-green-600'" class="text-[11px] font-medium">
                  {{ a.taxable ? '✗ Yes' : '✓ No' }}
                </span>
              </td>
              <td class="px-4 py-3 text-xs text-gray-500">{{ a.basis }}</td>
            </tr>

            <!-- Expanded Eligibility -->
            <tr v-if="expandedId === a.id" :key="`${a.id}-detail`">
              <td colspan="7" class="px-0 py-0">
                <div class="border-b border-gray-200 bg-gray-50 px-12 py-4">
                  <div class="mb-3 flex items-center gap-1.5">
                    <i class="pi pi-shield text-amber-500"></i>
                    <span class="text-xs font-bold text-gray-900">Eligibility Rules</span>
                  </div>
                  <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div v-if="a.eligibleTypes">
                      <p class="mb-1 text-[10px] font-bold uppercase text-gray-400">Allowed Types</p>
                      <div class="flex flex-wrap gap-1">
                        <span
                          v-for="t in a.eligibleTypes"
                          :key="t"
                          class="rounded bg-blue-100 px-2 py-0.5 text-[11px] font-medium text-blue-700"
                        >
                          {{ t }}
                        </span>
                      </div>
                    </div>
                    <div v-if="a.excludedTypes">
                      <p class="mb-1 text-[10px] font-bold uppercase text-gray-400">Excluded Types</p>
                      <div class="flex flex-wrap gap-1">
                        <span
                          v-for="t in a.excludedTypes"
                          :key="t"
                          class="rounded bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-600"
                        >
                          {{ t }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Info -->
    <div class="rounded-lg border-l-4 border-l-amber-500 border border-gray-200 bg-white p-4 shadow-sm">
      <p class="text-xs text-gray-600">
        <span class="font-bold text-gray-900">Computation Rules:</span> Benefits marked with peso amounts are fixed.
        Benefits based on "1 Mo. Basic" are computed from the employee's current salary grade and step.
        "SG 19-1 or actual (higher)" means the minimum is ₱59,153 even if the employee's grade is lower.
      </p>
    </div>
  </div>
</template>

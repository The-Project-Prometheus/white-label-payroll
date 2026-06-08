<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')
const filterCategory = ref('All')

const categories = ['All', 'Law', 'Executive Order', 'DBM Circular', 'COA Circular', 'CSC Circular', 'BIR Regulation', 'Joint Circular', 'Internal Policy']

const categoryColors: Record<string, string> = {
  Law: 'bg-blue-100 text-blue-700',
  'Executive Order': 'bg-purple-100 text-purple-700',
  'DBM Circular': 'bg-green-100 text-green-700',
  'COA Circular': 'bg-orange-100 text-orange-700',
  'CSC Circular': 'bg-blue-100 text-blue-700',
  'BIR Regulation': 'bg-red-100 text-red-700',
  'Joint Circular': 'bg-amber-50 text-gray-900',
  'Internal Policy': 'bg-gray-100 text-gray-700',
}

const resources = [
  { id: 1, title: 'RA 8291 — GSIS Act of 1997', category: 'Law', description: 'Government Service Insurance System Act governing GSIS contributions and benefits', uploadedBy: 'Admin', date: '2026-01-15' },
  { id: 2, title: 'RA 11223 — Universal Health Care Act', category: 'Law', description: 'PhilHealth premium rates, income floor/ceiling, and coverage rules', uploadedBy: 'Admin', date: '2026-01-15' },
  { id: 3, title: 'RA 9679 — HDMF Law of 2009', category: 'Law', description: 'Pag-IBIG Fund contribution rates and housing loan programs', uploadedBy: 'Admin', date: '2026-01-15' },
  { id: 4, title: 'RA 10963 — TRAIN Law', category: 'Law', description: 'Tax Reform for Acceleration and Inclusion — graduated income tax brackets', uploadedBy: 'Admin', date: '2026-01-15' },
  { id: 5, title: 'EO 64, s. 2024 — SSL VI Salary Schedule', category: 'Executive Order', description: 'Updated salary schedule with 4 tranches (2024-2027) for civilian government personnel', uploadedBy: 'Admin', date: '2026-01-22' },
  { id: 6, title: 'DBM NBC 601 — Tranche 3 Implementation', category: 'DBM Circular', description: 'Implementation of Third Tranche salary increase effective January 1, 2026', uploadedBy: 'HR Admin', date: '2026-01-25' },
  { id: 7, title: 'COA Circular 2012-001 — Documentary Requirements', category: 'COA Circular', description: 'Revised guidelines and documentary requirements for payroll disbursement', uploadedBy: 'Admin', date: '2026-01-15' },
  { id: 8, title: 'CSC MC 41, s.1998 — Omnibus Rules on Leave', category: 'CSC Circular', description: 'Leave types, earning rates, monetization rules, and terminal leave computation', uploadedBy: 'HR Admin', date: '2026-02-01' },
  { id: 9, title: 'BIR RR 29-2025 — De Minimis Benefits', category: 'BIR Regulation', description: 'Updated non-taxable de minimis benefit thresholds effective January 6, 2026', uploadedBy: 'HR Admin', date: '2026-01-10' },
  { id: 10, title: 'CSC-DBM JC No. 1, s. 2012 — Step Increments', category: 'Joint Circular', description: 'Rules on step increment based on length of service and meritorious performance', uploadedBy: 'Admin', date: '2026-01-15' },
  { id: 11, title: 'Senate Leave Policy 2026', category: 'Internal Policy', description: 'Senate-specific leave policies including special leaves and monetization guidelines', uploadedBy: 'HR Head', date: '2026-03-01' },
  { id: 12, title: 'Senate Overtime Authorization Guidelines', category: 'Internal Policy', description: 'Procedures for requesting and approving overtime work per EO 292', uploadedBy: 'HR Head', date: '2026-02-15' },
]

const filtered = computed(() =>
  resources.filter((r) => {
    const matchesSearch = !search.value || r.title.toLowerCase().includes(search.value.toLowerCase()) || r.description.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = filterCategory.value === 'All' || r.category === filterCategory.value
    return matchesSearch && matchesCategory
  }),
)
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Resources & Legal Bases</h1>
        <p class="mt-0.5 text-sm text-gray-500">Upload and reference policies, laws, and circulars for payroll compliance</p>
        <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
      </div>
      <button class="inline-flex h-8 items-center gap-1.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:from-blue-700 hover:to-blue-600">
        <i class="pi pi-upload text-xs"></i> Upload Document
      </button>
    </div>

    <!-- Search & Filter -->
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative min-w-[240px] flex-1">
          <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            v-model="search"
            class="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-xs placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search policies, laws, or circulars... (e.g., 'leave eligibility', 'GSIS')"
          />
        </div>
        <select v-model="filterCategory" class="rounded-md border border-gray-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500">
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
    </div>

    <!-- Resources List -->
    <div class="space-y-3">
      <div
        v-for="resource in filtered"
        :key="resource.id"
        class="flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-amber-500"
      >
        <div class="shrink-0 rounded-lg bg-gray-50 p-2">
          <i :class="resource.category === 'Internal Policy' ? 'pi pi-book' : resource.category === 'Law' ? 'pi pi-verified' : 'pi pi-file'" class="text-xl text-amber-600"></i>
        </div>
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <h3 class="truncate text-sm font-bold text-gray-900">{{ resource.title }}</h3>
            <span :class="['shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium', categoryColors[resource.category] || '']">
              {{ resource.category }}
            </span>
          </div>
          <p class="mt-1 text-xs text-gray-500">{{ resource.description }}</p>
          <p class="mt-1.5 text-[10px] text-gray-400">Uploaded by {{ resource.uploadedBy }} on {{ resource.date }}</p>
        </div>
        <button class="shrink-0 text-blue-600 hover:text-blue-800">
          <i class="pi pi-download"></i>
        </button>
      </div>
      <div v-if="filtered.length === 0" class="rounded-lg border border-gray-200 bg-white py-8 text-center shadow-sm">
        <p class="text-sm text-gray-400">No resources found matching your search.</p>
      </div>
    </div>

    <div class="rounded-lg border-l-4 border-l-amber-500 border border-gray-200 bg-white p-4 shadow-sm">
      <p class="text-xs text-gray-600">
        <span class="font-bold text-gray-900">Tip:</span> Use the search bar to quickly find legal bases for employee eligibility questions.
        For example, search "leave eligibility" or "monetization" to find relevant policies.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { MOCK_EMPLOYEES, getSalary, formatPeso } from '@/composables/mock-data'
import type { MockEmployee } from '@/composables/mock-data'

const router = useRouter()

const search = ref('')
const filterType = ref('')
const filterStatus = ref('')
const sortBy = ref('name')
const sortOrder = ref<'asc' | 'desc'>('asc')
const selectedEmp = ref<MockEmployee | null>(null)
const showSG = ref(false)

const handleSort = (field: string) => {
  if (sortBy.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = field
    sortOrder.value = 'asc'
  }
}

const filtered = computed(() => {
  return MOCK_EMPLOYEES.filter((emp) => {
    const matchesSearch =
      !search.value ||
      emp.name.toLowerCase().includes(search.value.toLowerCase()) ||
      emp.number.toLowerCase().includes(search.value.toLowerCase())
    const matchesType = !filterType.value || emp.type === filterType.value
    const matchesStatus = !filterStatus.value || emp.status === filterStatus.value
    return matchesSearch && matchesType && matchesStatus
  }).sort((a, b) => {
    let valA = '', valB = ''
    if (sortBy.value === 'name') { valA = a.name; valB = b.name }
    else if (sortBy.value === 'department') { valA = a.department; valB = b.department }
    else if (sortBy.value === 'type') { valA = a.type; valB = b.type }
    else if (sortBy.value === 'number') { valA = a.number; valB = b.number }
    const cmp = valA.localeCompare(valB)
    return sortOrder.value === 'asc' ? cmp : -cmp
  })
})

const getServiceLength = (dateHired: string) => {
  const d = new Date(dateHired)
  const now = new Date()
  const totalMonths = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth())
  const yrs = Math.floor(totalMonths / 12)
  const mos = totalMonths % 12
  if (yrs > 0) return `${yrs}yr ${mos}mo`
  return `${mos}mo`
}

const typeColors: Record<string, string> = {
  Permanent: 'bg-blue-100 text-blue-700',
  Casual: 'bg-purple-100 text-purple-700',
  Contractual: 'bg-orange-100 text-orange-700',
  COS: 'bg-gray-100 text-gray-600',
  JO: 'bg-gray-100 text-gray-600',
}

const statusColors: Record<string, string> = {
  Active: 'bg-green-100 text-green-800',
  OnLeave: 'bg-yellow-100 text-yellow-800',
  Separated: 'bg-gray-100 text-gray-600',
}
</script>

<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Employees</h1>
        <p class="mt-0.5 text-sm text-gray-500">Manage employee records and information</p>
        <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
      </div>
      <div class="flex items-center gap-2">
        <button
          class="inline-flex h-8 items-center gap-1.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-sm transition-all hover:from-blue-700 hover:to-blue-600"
          @click="router.push('/employees/new')"
        >
          <i class="pi pi-plus text-xs"></i>
          Add Employee
        </button>
      </div>
    </div>

    <!-- Filters -->
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative min-w-[240px] flex-1">
          <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            v-model="search"
            type="text"
            class="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-xs transition-colors placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search by name or employee number..."
          />
        </div>
        <select
          v-model="filterType"
          class="rounded-md border border-gray-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="Permanent">Permanent</option>
          <option value="Casual">Casual</option>
          <option value="Contractual">Contractual</option>
          <option value="COS">COS</option>
          <option value="JO">JO</option>
        </select>
        <select
          v-model="filterStatus"
          class="rounded-md border border-gray-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="OnLeave">On Leave</option>
          <option value="Separated">Separated</option>
        </select>
      </div>
    </div>

    <!-- Count -->
    <p class="text-xs text-gray-500">
      Showing <span class="font-medium">{{ filtered.length }}</span> of
      <span class="font-medium">{{ MOCK_EMPLOYEES.length }}</span> employees
    </p>

    <!-- Table -->
    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
              <th
                class="cursor-pointer px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white hover:bg-gray-600/50"
                @click="handleSort('number')"
              >
                Employee No. {{ sortBy === 'number' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
              </th>
              <th
                class="cursor-pointer px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white hover:bg-gray-600/50"
                @click="handleSort('name')"
              >
                Name {{ sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
              </th>
              <th
                class="cursor-pointer px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white hover:bg-gray-600/50"
                @click="handleSort('department')"
              >
                Department {{ sortBy === 'department' ? (sortOrder === 'asc' ? '↑' : '↓') : '' }}
              </th>
              <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Position</th>
              <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">
                SG
                <button class="ml-1 text-[9px] text-amber-400 underline hover:text-white" @click.stop="showSG = !showSG">
                  {{ showSG ? 'hide' : 'show' }}
                </button>
              </th>
              <th
                class="cursor-pointer px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white hover:bg-gray-600/50"
                @click="handleSort('type')"
              >
                Type
              </th>
              <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Status</th>
              <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Service</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="emp in filtered"
              :key="emp.id"
              class="cursor-pointer border-b border-gray-100 transition-colors hover:bg-gray-50"
              @click="selectedEmp = emp"
            >
              <td class="whitespace-nowrap px-4 py-3 font-mono text-sm text-gray-900">{{ emp.number }}</td>
              <td class="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">{{ emp.name }}</td>
              <td class="whitespace-nowrap px-4 py-3 text-sm text-gray-600">{{ emp.department }}</td>
              <td class="whitespace-nowrap px-4 py-3 text-sm text-gray-600">{{ emp.position }}</td>
              <td class="whitespace-nowrap px-4 py-3 text-center">
                <span v-if="showSG" class="text-xs font-medium text-gray-900">SG {{ emp.sg }} / Step {{ emp.step }}</span>
                <span v-else class="text-xs text-gray-400">••••</span>
              </td>
              <td class="whitespace-nowrap px-4 py-3 text-center">
                <span :class="['rounded px-2 py-0.5 text-[11px] font-medium', typeColors[emp.type] || '']">
                  {{ emp.type }}
                </span>
              </td>
              <td class="whitespace-nowrap px-4 py-3 text-center">
                <span :class="['rounded px-2 py-0.5 text-[11px] font-medium', statusColors[emp.status] || '']">
                  {{ emp.status }}
                </span>
              </td>
              <td class="whitespace-nowrap px-4 py-3 text-center text-xs text-gray-500">
                {{ getServiceLength(emp.dateHired) }}
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="8" class="px-4 py-12 text-center text-sm text-gray-400">
                No employees found matching your criteria.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Employee Card Modal -->
    <div
      v-if="selectedEmp"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      @click="selectedEmp = null"
    >
      <div class="w-96 overflow-hidden rounded-xl bg-white shadow-2xl" @click.stop>
        <div class="bg-gray-800 px-5 py-3">
          <p class="text-sm font-bold text-white">{{ selectedEmp.name }}</p>
          <p class="font-mono text-[11px] text-gray-400">{{ selectedEmp.number }}</p>
        </div>
        <div class="space-y-2.5 px-5 py-4">
          <div class="flex justify-between text-xs">
            <span class="text-gray-500">Position</span>
            <span class="font-medium text-gray-900">{{ selectedEmp.position }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-gray-500">Department</span>
            <span class="font-medium text-gray-900">{{ selectedEmp.department }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-gray-500">Salary Grade</span>
            <span class="font-medium text-gray-900">SG {{ selectedEmp.sg }} / Step {{ selectedEmp.step }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-gray-500">Monthly Salary</span>
            <span class="font-mono font-bold text-amber-600">{{ formatPeso(getSalary(selectedEmp.sg, selectedEmp.step)) }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-gray-500">Type</span>
            <span class="font-medium text-blue-600">{{ selectedEmp.type }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-gray-500">Gender</span>
            <span class="font-medium text-gray-900">{{ selectedEmp.gender }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-gray-500">Civil Status</span>
            <span class="font-medium text-gray-900">{{ selectedEmp.civilStatus }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-gray-500">Service</span>
            <span class="font-medium text-gray-900">{{ getServiceLength(selectedEmp.dateHired) }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-gray-500">Date Hired</span>
            <span class="font-medium text-gray-900">{{ selectedEmp.dateHired }}</span>
          </div>
        </div>
        <div class="flex justify-end border-t border-gray-100 px-5 py-3">
          <button class="rounded px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 hover:text-gray-900" @click="selectedEmp = null">
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

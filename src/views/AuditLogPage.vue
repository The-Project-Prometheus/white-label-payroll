<script setup lang="ts">
import { ref, computed } from 'vue'
import { MOCK_AUDIT_LOG } from '@/composables/mock-data'

const search = ref('')
const filterAction = ref('')

const filtered = computed(() =>
  MOCK_AUDIT_LOG.filter((entry) => {
    const matchesSearch =
      !search.value ||
      entry.description.toLowerCase().includes(search.value.toLowerCase()) ||
      entry.user.includes(search.value) ||
      entry.entityId.includes(search.value)
    const matchesAction = !filterAction.value || entry.action === filterAction.value
    return matchesSearch && matchesAction
  }),
)

const actionColors: Record<string, string> = {
  Create: 'bg-green-100 text-green-700',
  Update: 'bg-blue-100 text-blue-700',
  Delete: 'bg-red-100 text-red-700',
  StatusChange: 'bg-purple-100 text-purple-700',
  LoginSuccess: 'bg-gray-100 text-gray-600',
  LoginFailed: 'bg-red-100 text-red-700',
}
</script>

<template>
  <div class="space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-bold text-gray-900">Audit Log</h1>
        <p class="mt-0.5 text-sm text-gray-500">Immutable record of all system changes and events</p>
        <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
      </div>
      <button class="inline-flex h-8 items-center gap-1.5 rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-900 shadow-sm hover:bg-gray-50">
        <i class="pi pi-download text-xs"></i> Export Log
      </button>
    </div>

    <!-- Filters -->
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="flex flex-wrap items-center gap-3">
        <div class="relative min-w-[240px] flex-1">
          <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            v-model="search"
            class="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-xs placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search by description, user, or entity ID..."
          />
        </div>
        <select
          v-model="filterAction"
          class="rounded-md border border-gray-300 px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">All Actions</option>
          <option value="Create">Create</option>
          <option value="Update">Update</option>
          <option value="Delete">Delete</option>
          <option value="StatusChange">Status Change</option>
          <option value="LoginSuccess">Login Success</option>
          <option value="LoginFailed">Login Failed</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Timestamp</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">User</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Action</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Entity</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Description</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">IP</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in filtered" :key="entry.id" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-500">{{ entry.timestamp }}</td>
            <td class="whitespace-nowrap px-4 py-3 font-mono text-sm text-gray-900">{{ entry.user }}</td>
            <td class="whitespace-nowrap px-4 py-3 text-center">
              <span :class="['rounded px-2 py-0.5 text-[11px] font-medium', actionColors[entry.action] || '']">{{ entry.action }}</span>
            </td>
            <td class="whitespace-nowrap px-4 py-3">
              <span class="text-xs text-gray-500">{{ entry.entity }}</span>
              <span class="ml-1 font-mono text-xs text-blue-600">{{ entry.entityId }}</span>
            </td>
            <td class="max-w-xs truncate px-4 py-3 text-sm text-gray-700">{{ entry.description }}</td>
            <td class="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-400">{{ entry.ip }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="rounded-lg border-l-4 border-l-gray-800 border border-gray-200 bg-white p-4 shadow-sm">
      <p class="text-xs text-gray-600">
        <span class="font-bold text-gray-900">Immutability:</span> Audit log records cannot be modified or deleted.
        Per COA Circular 2012-001, all computations, adjustments, and disbursements are logged with timestamps and user identification.
      </p>
    </div>
  </div>
</template>

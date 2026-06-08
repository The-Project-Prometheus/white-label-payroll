<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')

const reportCategories = [
  {
    title: 'Payroll Reports',
    reports: [
      { name: 'Payroll Register', description: 'Complete payroll breakdown per employee', formats: ['Excel', 'PDF'] },
      { name: 'Payslip Generation', description: 'Individual payslips for all employees', formats: ['PDF'] },
      { name: 'Payroll Summary', description: 'Summary by department and pay type', formats: ['Excel', 'PDF'] },
    ],
  },
  {
    title: 'Government Remittance',
    reports: [
      { name: 'GSIS Remittance Schedule', description: 'Monthly GSIS premium schedule', formats: ['Excel', 'CSV'] },
      { name: 'PhilHealth Remittance', description: 'Monthly PhilHealth contribution schedule', formats: ['Excel', 'CSV'] },
      { name: 'Pag-IBIG Remittance', description: 'Monthly Pag-IBIG contribution schedule', formats: ['Excel', 'CSV'] },
    ],
  },
  {
    title: 'BIR Tax Reports',
    reports: [
      { name: 'BIR Form 1601-C', description: 'Monthly remittance of withholding tax on compensation', formats: ['PDF'] },
      { name: 'BIR Form 2316', description: 'Certificate of compensation payment/tax withheld', formats: ['PDF'] },
      { name: 'BIR Form 1604-C', description: 'Annual information return with alphalist', formats: ['Excel', 'PDF'] },
    ],
  },
  {
    title: 'COA & Budget Reports',
    reports: [
      { name: 'COA Disbursement Voucher', description: 'COA-compliant payroll disbursement document', formats: ['PDF'] },
      { name: 'Budget Utilization', description: 'Actual vs. approved PS budget per office', formats: ['Excel', 'PDF'] },
    ],
  },
  {
    title: 'Analytics & Audit',
    reports: [
      { name: 'Headcount & Salary Report', description: 'Active headcount and total cost per department', formats: ['Excel'] },
      { name: '13th Month Pay Report', description: 'Per-employee 13th month computation', formats: ['Excel', 'PDF'] },
      { name: 'Audit Trail Report', description: 'All manual overrides and changes', formats: ['Excel', 'PDF'] },
    ],
  },
]

const complianceDeadlines = [
  { form: 'BIR 1601-C (June)', deadline: 'Jul 10, 2026', status: 'pending' },
  { form: 'GSIS Remittance (June)', deadline: 'Jul 10, 2026', status: 'pending' },
  { form: 'PhilHealth (June)', deadline: 'Jul 15, 2026', status: 'pending' },
  { form: 'BIR 1601-C (May)', deadline: 'Jun 10, 2026', status: 'submitted' },
  { form: 'GSIS Remittance (May)', deadline: 'Jun 10, 2026', status: 'submitted' },
]

const filteredCategories = computed(() =>
  reportCategories
    .map((cat) => ({
      ...cat,
      reports: cat.reports.filter(
        (r) => !search.value || r.name.toLowerCase().includes(search.value.toLowerCase()) || r.description.toLowerCase().includes(search.value.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.reports.length > 0),
)
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-bold text-gray-900">Reports & Compliance</h1>
      <p class="mt-0.5 text-sm text-gray-500">Generate reports and track compliance deadlines</p>
      <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
    </div>

    <!-- Search -->
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="relative">
        <i class="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
        <input
          v-model="search"
          class="w-full rounded-md border border-gray-300 py-2 pl-9 pr-3 text-xs placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Search reports... (e.g., 'BIR', 'remittance', 'payslip', 'budget')"
        />
      </div>
    </div>

    <!-- Compliance Calendar -->
    <div class="rounded-lg border-l-4 border-l-red-600 border border-gray-200 bg-white p-6 shadow-sm">
      <div class="mb-3 flex items-center gap-2">
        <i class="pi pi-calendar text-red-600"></i>
        <h2 class="text-sm font-bold text-gray-900">Upcoming Compliance Deadlines</h2>
      </div>
      <div class="space-y-2">
        <div v-for="(item, i) in complianceDeadlines" :key="i" class="flex items-center justify-between border-b border-gray-50 py-1.5 last:border-0">
          <div class="flex items-center gap-2">
            <i :class="item.status === 'submitted' ? 'pi pi-check-circle text-green-600' : 'pi pi-clock text-orange-500'" class="text-sm"></i>
            <span class="text-sm text-gray-900">{{ item.form }}</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-xs text-gray-500">{{ item.deadline }}</span>
            <span :class="['rounded px-1.5 py-0.5 text-[10px] font-medium', item.status === 'submitted' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700']">
              {{ item.status === 'submitted' ? 'Submitted' : 'Pending' }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Categories -->
    <div v-for="category in filteredCategories" :key="category.title">
      <h2 class="mb-3 text-base font-bold text-gray-900">{{ category.title }}</h2>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div v-for="report in category.reports" :key="report.name" class="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
          <div>
            <div class="flex items-start gap-2">
              <i class="pi pi-file mt-0.5 shrink-0 text-amber-500"></i>
              <div>
                <h3 class="text-sm font-bold text-gray-900">{{ report.name }}</h3>
                <p class="mt-0.5 text-xs text-gray-500">{{ report.description }}</p>
              </div>
            </div>
          </div>
          <div class="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
            <button
              v-for="fmt in report.formats"
              :key="fmt"
              class="flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:underline"
            >
              <i class="pi pi-download text-[10px]"></i>
              {{ fmt }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { MOCK_EMPLOYEES, MOCK_PAYROLL_RUNS, computePayroll, formatPeso } from '@/composables/mock-data'

const dtrUploaded = ref(false)
const detectedPeriod = ref<string | null>(null)
const workflowStep = ref(0)
const showRegister = ref(false)

const handleDTRUpload = () => {
  const now = new Date()
  const month = now.toLocaleString('en-US', { month: 'long' })
  const year = now.getFullYear()
  const half = now.getDate() <= 15 ? '1st Half' : '2nd Half'
  detectedPeriod.value = `${month} ${year} - ${half}`
  dtrUploaded.value = true
  workflowStep.value = 2
}

const activeEmployees = computed(() => MOCK_EMPLOYEES.filter((e) => e.status === 'Active'))

const payrollData = computed(() => {
  return activeEmployees.value.map((emp) => {
    const computed = computePayroll(emp)
    return { ...emp, ...computed }
  })
})

const totals = computed(() => {
  return payrollData.value.reduce(
    (acc, r) => ({
      basic: acc.basic + r.basic,
      pera: acc.pera + r.pera,
      rata: acc.rata + r.rata,
      grocery: acc.grocery + r.grocery,
      transport: acc.transport + r.transport,
      gross: acc.gross + r.gross,
      gsis: acc.gsis + r.gsis,
      philhealth: acc.philhealth + r.philhealth,
      pagibig: acc.pagibig + r.pagibig,
      tax: acc.tax + r.tax,
      totalDeductions: acc.totalDeductions + r.totalDeductions,
      netPay: acc.netPay + r.netPay,
    }),
    { basic: 0, pera: 0, rata: 0, grocery: 0, transport: 0, gross: 0, gsis: 0, philhealth: 0, pagibig: 0, tax: 0, totalDeductions: 0, netPay: 0 },
  )
})

const statusConfig: Record<string, { color: string; bg: string }> = {
  Draft: { color: 'text-gray-600', bg: 'bg-gray-100' },
  Approved: { color: 'text-green-700', bg: 'bg-green-100' },
  Locked: { color: 'text-gray-800', bg: 'bg-gray-200' },
}

const submitForApproval = () => {
  workflowStep.value = 3
  alert('Payroll submitted for approval. Approver will be notified.')
}
</script>

<template>
  <div class="space-y-5">
    <!-- Header -->
    <div>
      <h1 class="text-xl font-bold text-gray-900">Payroll Processing</h1>
      <p class="mt-0.5 text-sm text-gray-500">Upload DTR to trigger payroll computation automatically</p>
      <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
    </div>

    <!-- DTR Upload -->
    <div class="rounded-lg border-l-4 border-l-blue-500 border border-gray-200 bg-white p-6 shadow-sm">
      <div class="mb-3">
        <h2 class="flex items-center gap-2 text-base font-bold text-gray-900">
          <i class="pi pi-file-excel text-blue-500"></i>
          Upload Daily Time Records (DTR)
        </h2>
        <p class="mt-1 text-xs text-gray-500">Upload DTR to start payroll. System auto-detects the pay period from the dates in the file.</p>
      </div>

      <div class="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
          class="group flex items-center gap-3 rounded-lg border-2 border-dashed border-blue-300 p-4 transition-all hover:border-blue-500 hover:bg-blue-50"
          @click="handleDTRUpload"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200">
            <i class="pi pi-upload text-blue-600"></i>
          </div>
          <div class="text-left">
            <p class="text-sm font-bold text-gray-900">Upload Excel / CSV</p>
            <p class="text-[10px] text-gray-500">Columns: Employee No., Date, Time In, Time Out, OT Hours</p>
          </div>
        </button>
        <button
          class="group flex items-center gap-3 rounded-lg border-2 border-dashed border-amber-300 p-4 transition-all hover:border-amber-500 hover:bg-amber-50"
          @click="handleDTRUpload"
        >
          <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 group-hover:bg-amber-200">
            <i class="pi pi-camera text-amber-600"></i>
          </div>
          <div class="text-left">
            <p class="text-sm font-bold text-gray-900">Upload Scan (OCR)</p>
            <p class="text-[10px] text-gray-500">Upload scanned DTR sheets — system extracts data</p>
          </div>
        </button>
      </div>

      <!-- Workflow Progress -->
      <div v-if="detectedPeriod" class="mt-4 border-t border-gray-200 pt-4">
        <p class="mb-3 text-xs font-bold text-gray-900">Workflow Progress</p>
        <div class="flex items-center justify-between">
          <div v-for="(step, i) in ['DTR Uploaded', 'Computed', 'Submitted', 'Approved', 'Disbursed']" :key="step" class="flex items-center gap-1.5">
            <div
              :class="[
                'flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold',
                i + 1 <= workflowStep ? 'bg-green-500 text-white' : i + 1 === workflowStep + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500',
              ]"
            >
              {{ i + 1 <= workflowStep ? '✓' : i + 1 }}
            </div>
            <span :class="['text-[10px] font-medium', i + 1 <= workflowStep ? 'text-green-700' : 'text-gray-500']">{{ step }}</span>
            <div v-if="i < 4" :class="['h-0.5 w-6', i + 1 <= workflowStep ? 'bg-green-400' : 'bg-gray-200']"></div>
          </div>
        </div>
      </div>

      <!-- Detected Period -->
      <div v-if="detectedPeriod" class="mt-4 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 px-4 py-3">
        <div class="flex items-center gap-2">
          <i class="pi pi-check-circle text-green-600"></i>
          <div>
            <p class="text-xs font-bold text-green-800">DTR Uploaded — Period Detected</p>
            <p class="mt-0.5 text-sm font-bold text-green-900">{{ detectedPeriod }}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="inline-flex h-8 items-center gap-1.5 rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-900 shadow-sm hover:bg-gray-50"
            @click="showRegister = !showRegister"
          >
            <i class="pi pi-eye text-xs"></i> {{ showRegister ? 'Hide' : 'Preview' }}
          </button>
          <button
            class="inline-flex h-8 items-center gap-1.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:from-blue-700 hover:to-blue-600"
            @click="submitForApproval"
          >
            <i class="pi pi-check-circle text-xs"></i> Submit for Approval
          </button>
        </div>
      </div>

      <div v-if="!detectedPeriod" class="rounded-lg bg-gray-50 px-4 py-2.5 text-[10px] text-gray-500">
        <span class="font-bold text-gray-900">How it works:</span> Upload DTR → System reads dates → Auto-detects pay period → Computes payroll → Submits for approval.
      </div>
    </div>

    <!-- Payroll Register Preview -->
    <div v-if="showRegister && detectedPeriod" class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div class="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <div>
          <h2 class="text-base font-bold text-gray-900">Payroll Register</h2>
          <p class="mt-0.5 text-xs text-gray-500">Period: <span class="font-bold text-gray-900">{{ detectedPeriod }}</span></p>
        </div>
        <span class="rounded px-3 py-1 text-xs font-bold bg-orange-100 text-orange-700">Pending Approval</span>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-xs">
          <thead>
            <tr class="bg-gray-800 text-white">
              <th class="px-2 py-2 text-left font-medium">No.</th>
              <th class="px-2 py-2 text-left font-medium">Name</th>
              <th class="px-2 py-2 text-right font-medium">Basic</th>
              <th class="px-2 py-2 text-right font-medium">PERA</th>
              <th class="px-2 py-2 text-right font-medium">RATA</th>
              <th class="px-2 py-2 text-right font-medium">Grocery</th>
              <th class="px-2 py-2 text-right font-medium">Transport</th>
              <th class="px-2 py-2 text-right font-medium">Gross</th>
              <th class="px-2 py-2 text-right font-medium">GSIS</th>
              <th class="px-2 py-2 text-right font-medium">PhilHealth</th>
              <th class="px-2 py-2 text-right font-medium">Pag-IBIG</th>
              <th class="px-2 py-2 text-right font-medium">Tax</th>
              <th class="px-2 py-2 text-right font-medium">Total Ded.</th>
              <th class="px-2 py-2 text-right font-medium">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in payrollData" :key="r.id" class="border-b border-gray-100 hover:bg-gray-50">
              <td class="px-2 py-2 font-mono text-[10px] text-gray-600">{{ r.number }}</td>
              <td class="px-2 py-2 font-medium text-gray-900">
                {{ r.name }}
                <span v-if="r.type === 'COS' || r.type === 'JO'" class="ml-1 rounded bg-gray-200 px-1 py-0.5 text-[9px] text-gray-600">{{ r.type }}</span>
              </td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(r.basic) }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ r.pera > 0 ? formatPeso(r.pera) : '—' }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ r.rata > 0 ? formatPeso(r.rata) : '—' }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ r.grocery > 0 ? formatPeso(r.grocery) : '—' }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ r.transport > 0 ? formatPeso(r.transport) : '—' }}</td>
              <td class="px-2 py-2 text-right font-mono font-bold">{{ formatPeso(r.gross) }}</td>
              <td class="px-2 py-2 text-right font-mono text-red-600">{{ r.gsis > 0 ? formatPeso(r.gsis) : '—' }}</td>
              <td class="px-2 py-2 text-right font-mono text-red-600">{{ formatPeso(r.philhealth) }}</td>
              <td class="px-2 py-2 text-right font-mono text-red-600">{{ formatPeso(r.pagibig) }}</td>
              <td class="px-2 py-2 text-right font-mono text-red-600">{{ formatPeso(r.tax) }}</td>
              <td class="px-2 py-2 text-right font-mono font-bold text-red-700">{{ formatPeso(r.totalDeductions) }}</td>
              <td class="px-2 py-2 text-right font-mono font-bold text-green-700">{{ formatPeso(r.netPay) }}</td>
            </tr>
            <!-- Totals -->
            <tr class="bg-gray-800 font-bold text-white">
              <td class="px-2 py-2" colspan="2">TOTALS ({{ payrollData.length }} employees)</td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(totals.basic) }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(totals.pera) }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(totals.rata) }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(totals.grocery) }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(totals.transport) }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(totals.gross) }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(totals.gsis) }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(totals.philhealth) }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(totals.pagibig) }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(totals.tax) }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(totals.totalDeductions) }}</td>
              <td class="px-2 py-2 text-right font-mono">{{ formatPeso(totals.netPay) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
        <p class="text-2xl font-bold text-gray-900">{{ activeEmployees.length }}</p>
        <p class="mt-1 text-xs text-gray-500">Active Employees</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
        <p class="text-2xl font-bold text-amber-600">{{ formatPeso(totals.gross) }}</p>
        <p class="mt-1 text-xs text-gray-500">Monthly Gross Payroll</p>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
        <p class="text-2xl font-bold text-blue-600">3</p>
        <p class="mt-1 text-xs text-gray-500">Pending Approvals</p>
      </div>
    </div>

    <!-- Payroll History -->
    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div class="border-b border-gray-100 px-5 py-4">
        <h2 class="text-base font-bold text-gray-900">Payroll History</h2>
      </div>
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Period</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Pay Date</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Employees</th>
            <th class="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-white">Gross Pay</th>
            <th class="px-4 py-2.5 text-right text-[11px] font-bold uppercase tracking-wider text-white">Net Pay</th>
            <th class="px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="run in MOCK_PAYROLL_RUNS" :key="run.id" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ run.period }}</td>
            <td class="px-4 py-3 text-sm text-gray-600">{{ run.date }}</td>
            <td class="px-4 py-3 text-center text-sm">{{ run.employees }}</td>
            <td class="px-4 py-3 text-right font-mono text-sm">{{ formatPeso(run.grossPay) }}</td>
            <td class="px-4 py-3 text-right font-mono text-sm font-medium">{{ formatPeso(run.netPay) }}</td>
            <td class="px-4 py-3 text-center">
              <span :class="['inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-medium', statusConfig[run.status]?.bg, statusConfig[run.status]?.color]">
                <i :class="run.status === 'Approved' ? 'pi pi-check-circle' : 'pi pi-lock'" class="text-[10px]"></i>
                {{ run.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

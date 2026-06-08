<script setup lang="ts">
import { ref } from 'vue'
import { formatPeso } from '@/composables/mock-data'

interface PayrollSubmission {
  id: number
  period: string
  submittedBy: string
  submittedAt: string
  employees: number
  grossPay: number
  netPay: number
  status: 'Pending Review' | 'Approved' | 'Rejected'
  signatures: { role: string; name: string; date: string; status: 'Signed' | 'Pending'; cert?: string }[]
}

const submissions = ref<PayrollSubmission[]>([
  {
    id: 1,
    period: 'June 2026 - 1st Half',
    submittedBy: 'Ana Villanueva (Payroll Staff)',
    submittedAt: 'Jun 14, 2026 09:30 AM',
    employees: 9,
    grossPay: 389923,
    netPay: 298451,
    status: 'Pending Review',
    signatures: [
      { role: 'Payroll Staff', name: 'Ana Villanueva', date: 'Jun 14, 2026', status: 'Signed', cert: 'PNPKI-2026-004521' },
      { role: 'Accounting Officer', name: '', date: '', status: 'Pending' },
    ],
  },
  {
    id: 2,
    period: 'May 2026 - 2nd Half',
    submittedBy: 'Ana Villanueva (Payroll Staff)',
    submittedAt: 'May 30, 2026 10:15 AM',
    employees: 9,
    grossPay: 389923,
    netPay: 298451,
    status: 'Approved',
    signatures: [
      { role: 'Payroll Staff', name: 'Ana Villanueva', date: 'May 30, 2026', status: 'Signed', cert: 'PNPKI-2026-004521' },
      { role: 'Accounting Officer', name: 'Miguel Torres', date: 'May 31, 2026', status: 'Signed', cert: 'PNPKI-2026-003187' },
    ],
  },
  {
    id: 3,
    period: 'May 2026 - 1st Half',
    submittedBy: 'Ana Villanueva (Payroll Staff)',
    submittedAt: 'May 14, 2026 08:45 AM',
    employees: 9,
    grossPay: 389923,
    netPay: 298451,
    status: 'Approved',
    signatures: [
      { role: 'Payroll Staff', name: 'Ana Villanueva', date: 'May 14, 2026', status: 'Signed', cert: 'PNPKI-2026-004521' },
      { role: 'Accounting Officer', name: 'Miguel Torres', date: 'May 15, 2026', status: 'Signed', cert: 'PNPKI-2026-003187' },
    ],
  },
])

const selectedSubmission = ref<PayrollSubmission | null>(null)
const showSigningModal = ref(false)

const statusConfig: Record<string, { color: string; bg: string }> = {
  'Pending Review': { color: 'text-orange-600', bg: 'bg-orange-100' },
  Approved: { color: 'text-green-700', bg: 'bg-green-100' },
  Rejected: { color: 'text-red-700', bg: 'bg-red-100' },
}

const handleApprove = () => {
  showSigningModal.value = true
}

const handleSign = () => {
  showSigningModal.value = false
  if (selectedSubmission.value) {
    selectedSubmission.value.status = 'Approved'
    selectedSubmission.value.signatures[1] = {
      role: 'Accounting Officer',
      name: 'Miguel Torres',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Signed',
      cert: 'PNPKI-2026-003187',
    }
  }
}
</script>

<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-xl font-bold text-gray-900">Approval Workflow</h1>
      <p class="mt-0.5 text-sm text-gray-500">Review, approve, or return payroll submissions</p>
      <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
    </div>

    <!-- Workflow Steps -->
    <div class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div class="flex items-center justify-between">
        <div v-for="(step, i) in ['Processor Submits', 'Under Review', 'Approver Signs', 'Disbursement']" :key="step" class="flex items-center gap-2">
          <div :class="['flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold', i === 0 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500']">
            {{ i + 1 }}
          </div>
          <span class="hidden text-xs font-medium text-gray-900 md:inline">{{ step }}</span>
          <div v-if="i < 3" class="hidden h-0.5 w-8 bg-gray-200 md:block"></div>
        </div>
      </div>
    </div>

    <!-- Submissions -->
    <div class="space-y-3">
      <div
        v-for="sub in submissions"
        :key="sub.id"
        :class="['cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all', selectedSubmission?.id === sub.id ? 'ring-2 ring-amber-500' : '']"
        @click="selectedSubmission = sub"
      >
        <div class="flex items-center justify-between px-5 py-4">
          <div>
            <p class="text-sm font-bold text-gray-900">{{ sub.period }}</p>
            <p class="mt-0.5 text-xs text-gray-500">Submitted by {{ sub.submittedBy }} • {{ sub.submittedAt }}</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-right">
              <p class="font-mono text-sm font-bold text-gray-900">{{ formatPeso(sub.netPay) }}</p>
              <p class="text-[10px] text-gray-400">{{ sub.employees }} employees</p>
            </div>
            <span :class="['inline-flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-medium', statusConfig[sub.status]?.bg, statusConfig[sub.status]?.color]">
              <i :class="sub.status === 'Approved' ? 'pi pi-check-circle' : 'pi pi-clock'" class="text-[10px]"></i>
              {{ sub.status }}
            </span>
          </div>
        </div>

        <!-- Expanded -->
        <div v-if="selectedSubmission?.id === sub.id" class="space-y-4 border-t border-gray-100 bg-gray-50 px-5 py-4">
          <!-- Signature Trail -->
          <div>
            <p class="mb-2 flex items-center gap-1 text-xs font-bold text-gray-900">
              <i class="pi pi-pen-to-square text-amber-500"></i> Signature Trail
            </p>
            <div class="space-y-1.5">
              <div v-for="(sig, i) in sub.signatures" :key="i" class="flex items-center gap-3 text-xs">
                <span :class="['flex h-5 w-5 items-center justify-center rounded-full', sig.status === 'Signed' ? 'bg-green-100' : 'bg-gray-200']">
                  <i :class="sig.status === 'Signed' ? 'pi pi-check-circle text-green-600' : 'pi pi-clock text-gray-400'" class="text-[10px]"></i>
                </span>
                <span class="w-28 text-gray-500">{{ sig.role }}</span>
                <span class="font-medium text-gray-900">{{ sig.name || '—' }}</span>
                <span class="ml-auto text-gray-400">{{ sig.date || 'Awaiting' }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div v-if="sub.status === 'Pending Review'" class="flex items-center gap-2 border-t border-gray-200 pt-2">
            <button
              class="inline-flex h-8 items-center gap-1.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:from-blue-700 hover:to-blue-600"
              @click.stop="handleApprove"
            >
              <i class="pi pi-check-circle text-xs"></i> Approve & Sign
            </button>
            <button
              class="inline-flex h-8 items-center gap-1.5 rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-900 shadow-sm hover:bg-gray-50"
              @click.stop="() => { /* returned for correction */ }"
            >
              <i class="pi pi-times-circle text-xs"></i> Return for Correction
            </button>
            <button
              class="inline-flex h-8 items-center gap-1.5 rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-900 shadow-sm hover:bg-gray-50"
              @click.stop
            >
              <i class="pi pi-eye text-xs"></i> View Register
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- PNPKI Signing Modal -->
    <div v-if="showSigningModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30" @click="showSigningModal = false">
      <div class="w-[440px] overflow-hidden rounded-xl bg-white shadow-2xl" @click.stop>
        <div class="bg-gradient-to-r from-gray-800 to-gray-700 px-5 py-4">
          <p class="text-sm font-bold text-white">PNPKI Digital Signature</p>
          <p class="mt-0.5 text-[10px] text-gray-300">Philippine National Public Key Infrastructure</p>
        </div>
        <div class="space-y-4 px-5 py-5">
          <div class="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p class="text-xs font-medium text-blue-800">You are about to sign:</p>
            <p class="mt-1 text-xs text-blue-700">Payroll Register — {{ selectedSubmission?.period }}</p>
          </div>
          <div>
            <label class="mb-1 block text-[10px] font-bold uppercase text-gray-400">PNPKI Certificate</label>
            <select class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs">
              <option value="">Select your certificate...</option>
              <option value="PNPKI-2026-003187">PNPKI-2026-003187 — Miguel G. Torres (Accounting Officer)</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-[10px] font-bold uppercase text-gray-400">PIN / Passphrase</label>
            <input type="password" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs" placeholder="Enter your certificate PIN" />
          </div>
          <div class="space-y-1 rounded-lg bg-gray-50 p-3">
            <p class="text-[10px] text-gray-500"><span class="font-bold text-gray-900">Algorithm:</span> SHA256withRSA</p>
            <p class="text-[10px] text-gray-500"><span class="font-bold text-gray-900">Timestamp:</span> Trusted Time Authority</p>
            <p class="text-[10px] text-gray-500"><span class="font-bold text-gray-900">Non-repudiation:</span> Enabled</p>
          </div>
        </div>
        <div class="flex justify-end gap-2 border-t border-gray-100 bg-gray-50 px-5 py-3">
          <button class="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50" @click="showSigningModal = false">Cancel</button>
          <button class="rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-xs font-medium text-white hover:from-blue-700 hover:to-blue-600" @click="handleSign">
            Sign & Approve
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

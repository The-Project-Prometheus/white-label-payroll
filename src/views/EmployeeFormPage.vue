<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isEditing = computed(() => !!route.params.id)
const pageTitle = computed(() => (isEditing.value ? 'Edit Employee' : 'Add New Employee'))

const form = ref({
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  dateOfBirth: '',
  gender: '',
  civilStatus: '',
  address: '',
  contactNumber: '',
  email: '',
  tin: '',
  gsisNumber: '',
  philhealthNumber: '',
  pagibigNumber: '',
  departmentId: '',
  positionId: '',
  employmentType: '',
  dateHired: '',
  payFrequency: '',
  salaryGrade: '',
  step: '',
  bankName: '',
  bankAccountNumber: '',
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)

const validate = (): boolean => {
  const errs: Record<string, string> = {}
  if (!form.value.firstName.trim()) errs.firstName = 'First name is required.'
  if (!form.value.lastName.trim()) errs.lastName = 'Last name is required.'
  if (!form.value.dateOfBirth) errs.dateOfBirth = 'Date of birth is required.'
  if (!form.value.gender) errs.gender = 'Gender is required.'
  if (!form.value.civilStatus) errs.civilStatus = 'Civil status is required.'
  if (!form.value.address.trim()) errs.address = 'Address is required.'
  if (!form.value.tin.trim()) errs.tin = 'TIN is required.'
  if (!form.value.departmentId) errs.departmentId = 'Department is required.'
  if (!form.value.employmentType) errs.employmentType = 'Employment type is required.'
  if (!form.value.dateHired) errs.dateHired = 'Date hired is required.'
  errors.value = errs
  return Object.keys(errs).length === 0
}

const handleSubmit = () => {
  if (!validate()) return
  loading.value = true
  setTimeout(() => {
    loading.value = false
    router.push('/employees')
  }, 500)
}
</script>

<template>
  <div class="space-y-5">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <button class="rounded-lg p-2 transition-colors hover:bg-gray-200" @click="router.push('/employees')">
        <i class="pi pi-arrow-left text-gray-900"></i>
      </button>
      <div>
        <h1 class="text-xl font-bold text-gray-900">{{ pageTitle }}</h1>
        <p class="text-sm text-gray-500">Fill in the employee details below</p>
        <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Personal Information -->
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-base font-bold text-gray-900">Personal Information</h2>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">First Name *</label>
            <input v-model="form.firstName" :class="['w-full rounded-md border px-3 py-2 text-xs', errors.firstName ? 'border-red-500' : 'border-gray-300']" />
            <p v-if="errors.firstName" class="mt-0.5 text-[10px] text-red-600">{{ errors.firstName }}</p>
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Middle Name</label>
            <input v-model="form.middleName" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs" />
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Last Name *</label>
            <input v-model="form.lastName" :class="['w-full rounded-md border px-3 py-2 text-xs', errors.lastName ? 'border-red-500' : 'border-gray-300']" />
            <p v-if="errors.lastName" class="mt-0.5 text-[10px] text-red-600">{{ errors.lastName }}</p>
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Date of Birth *</label>
            <input v-model="form.dateOfBirth" type="date" :class="['w-full rounded-md border px-3 py-2 text-xs', errors.dateOfBirth ? 'border-red-500' : 'border-gray-300']" />
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Gender *</label>
            <select v-model="form.gender" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs">
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Civil Status *</label>
            <select v-model="form.civilStatus" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs">
              <option value="">Select...</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Separated">Separated</option>
            </select>
          </div>
          <div class="md:col-span-3">
            <label class="mb-1 block text-xs font-bold text-gray-900">Address *</label>
            <textarea v-model="form.address" rows="2" :class="['w-full rounded-md border px-3 py-2 text-xs', errors.address ? 'border-red-500' : 'border-gray-300']"></textarea>
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Contact Number</label>
            <input v-model="form.contactNumber" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs" placeholder="+639XX XXX XXXX" />
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Email</label>
            <input v-model="form.email" type="email" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs" placeholder="name@senate.gov.ph" />
          </div>
        </div>
      </div>

      <!-- Government IDs -->
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-base font-bold text-gray-900">Government IDs</h2>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">TIN * <span class="font-normal text-gray-400">(xxx-xxx-xxx-xxx)</span></label>
            <input v-model="form.tin" :class="['w-full rounded-md border px-3 py-2 text-xs', errors.tin ? 'border-red-500' : 'border-gray-300']" placeholder="000-000-000-000" />
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">GSIS Number</label>
            <input v-model="form.gsisNumber" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs" placeholder="GSIS-000000000" />
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">PhilHealth Number</label>
            <input v-model="form.philhealthNumber" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs" placeholder="00-000000000-0" />
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Pag-IBIG MID Number</label>
            <input v-model="form.pagibigNumber" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs" placeholder="0000-0000-0000" />
          </div>
        </div>
      </div>

      <!-- Employment Details -->
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-base font-bold text-gray-900">Employment Details</h2>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Department *</label>
            <select v-model="form.departmentId" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs">
              <option value="">Select department...</option>
              <option value="1">Office of the Secretary</option>
              <option value="2">Legislative Budget Office</option>
              <option value="3">HR Division</option>
              <option value="4">IT Division</option>
              <option value="5">Finance Division</option>
              <option value="6">Legal Division</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Employment Type *</label>
            <select v-model="form.employmentType" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs">
              <option value="">Select...</option>
              <option value="Permanent">Permanent</option>
              <option value="Casual">Casual</option>
              <option value="Contractual">Contractual</option>
              <option value="COS">COS</option>
              <option value="JO">JO</option>
            </select>
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Date Hired *</label>
            <input v-model="form.dateHired" type="date" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs" />
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Salary Grade</label>
            <div class="flex gap-2">
              <select v-model="form.salaryGrade" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs">
                <option value="">SG</option>
                <option v-for="i in 15" :key="i" :value="i">Grade {{ i }}</option>
              </select>
              <select v-model="form.step" class="w-24 rounded-md border border-gray-300 px-3 py-2 text-xs">
                <option value="">Step</option>
                <option v-for="i in 5" :key="i" :value="i">Step {{ i }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Banking Details -->
      <div class="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-base font-bold text-gray-900">Banking Details</h2>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Bank Name</label>
            <input v-model="form.bankName" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs" placeholder="e.g., Land Bank of the Philippines" />
          </div>
          <div>
            <label class="mb-1 block text-xs font-bold text-gray-900">Account Number</label>
            <input v-model="form.bankAccountNumber" class="w-full rounded-md border border-gray-300 px-3 py-2 text-xs" placeholder="0000-0000-0000" />
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-3">
        <button type="button" class="rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50" @click="router.push('/employees')">
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-xs font-medium text-white shadow-sm hover:from-blue-700 hover:to-blue-600 disabled:opacity-50"
        >
          <i class="pi pi-save text-xs"></i>
          Save Employee
        </button>
      </div>
    </form>
  </div>
</template>

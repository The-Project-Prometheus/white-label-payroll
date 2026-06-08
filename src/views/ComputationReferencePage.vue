<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('Contributions')

const data: Record<string, { id: number; name: string; formula: string; value: string; basis: string }[]> = {
  Contributions: [
    { id: 1, name: 'GSIS Employee Share', formula: '(Basic Salary + PERA) × Rate', value: '9%', basis: 'RA 8291' },
    { id: 2, name: 'GSIS Employer Share', formula: '(Basic Salary + PERA) × Rate', value: '12%', basis: 'RA 8291' },
    { id: 3, name: 'GSIS Salary Ceiling', formula: 'No ceiling — full compensation', value: 'None', basis: 'RA 8291' },
    { id: 4, name: 'PhilHealth Rate (Total)', formula: 'CLAMP(Salary, Floor, Ceiling) × Rate', value: '5%', basis: 'RA 11223' },
    { id: 5, name: 'PhilHealth Income Floor', formula: 'Minimum salary for computation', value: '₱10,000', basis: 'RA 11223' },
    { id: 6, name: 'PhilHealth Income Ceiling', formula: 'Maximum salary for computation', value: '₱100,000', basis: 'RA 11223' },
    { id: 7, name: 'Pag-IBIG Rate (EE)', formula: 'If salary > ₱1,500: 2%; else 1%', value: '2%', basis: 'RA 9679' },
    { id: 8, name: 'Pag-IBIG Max Fund Salary', formula: 'Cap on computation base', value: '₱10,000', basis: 'RA 9679' },
    { id: 9, name: 'Pag-IBIG Max Contribution', formula: 'Maximum per party per month', value: '₱200', basis: 'RA 9679' },
  ],
  Tax: [
    { id: 10, name: 'Tax-Exempt Threshold', formula: 'Annual income below this = 0% tax', value: '₱250,000', basis: 'TRAIN Law' },
    { id: 11, name: 'Bracket 2 (15%)', formula: '₱250,001–₱400,000', value: '15%', basis: 'TRAIN Law' },
    { id: 12, name: 'Bracket 3 (20%)', formula: '₱400,001–₱800,000 → ₱22,500 + 20%', value: '20%', basis: 'TRAIN Law' },
    { id: 13, name: 'Bracket 4 (25%)', formula: '₱800,001–₱2,000,000 → ₱102,500 + 25%', value: '25%', basis: 'TRAIN Law' },
    { id: 14, name: 'Bracket 5 (30%)', formula: '₱2,000,001–₱8,000,000 → ₱402,500 + 30%', value: '30%', basis: 'TRAIN Law' },
    { id: 15, name: 'Bracket 6 (35%)', formula: 'Over ₱8,000,000 → ₱2,202,500 + 35%', value: '35%', basis: 'TRAIN Law' },
    { id: 16, name: '₱90K Bonus Pool Ceiling', formula: '13th month + bonuses + excess de minimis', value: '₱90,000', basis: 'TRAIN Law' },
  ],
  Allowances: [
    { id: 20, name: 'PERA', formula: 'Fixed monthly (Permanent/Casual/Contractual)', value: '₱2,000', basis: 'DBM BC 2016-4' },
    { id: 21, name: 'RATA', formula: 'SG 15+ managerial/supervisory', value: 'Varies', basis: 'DBM BC 2017-5' },
    { id: 22, name: 'Employee Wellness Assistance', formula: '1 Mo. Basic (SG 19-1 or actual, higher)', value: '₱59,153+', basis: 'Company Policy' },
    { id: 23, name: 'Company Medical Assistance', formula: 'Fixed annual — February', value: '₱100,000', basis: 'Company Policy' },
    { id: 24, name: 'Educational Assistance', formula: 'Fixed annual — March', value: '₱50,000', basis: 'Company Policy' },
    { id: 25, name: 'Additional Grocery Expense', formula: 'Monthly (3 months service)', value: '₱20,000', basis: 'Company Policy' },
    { id: 26, name: 'Reimbursable Transportation', formula: 'Monthly (3 consecutive months)', value: '₱20,000', basis: 'Company Policy' },
  ],
  Timekeeping: [
    { id: 30, name: 'Work Schedule', formula: 'Compressed Work Week (Mon-Thu only)', value: '4 days', basis: 'Company Policy' },
    { id: 31, name: 'Daily Requirement', formula: 'Hours per working day', value: '11 hrs', basis: 'Company Policy' },
    { id: 32, name: 'Flexitime Window', formula: 'Arrival between 7:00 AM – 9:00 AM = NOT late', value: '7-9 AM', basis: 'Company Policy' },
    { id: 33, name: 'Late Threshold', formula: 'After 9:00 AM', value: '9:00 AM', basis: 'Company Policy' },
    { id: 34, name: 'Daily Rate Formula', formula: 'Monthly Salary ÷ working days in month', value: 'Salary÷Days', basis: 'Company Policy' },
    { id: 35, name: 'Hourly Rate Formula', formula: 'Daily Rate ÷ 11', value: 'Daily÷11', basis: 'Company Policy' },
    { id: 36, name: 'Overtime', formula: 'NO OT — extra hours are voluntary', value: 'None', basis: 'Company Policy' },
    { id: 37, name: 'Holiday Worked (Regular)', formula: 'Regular Holiday pay multiplier', value: '200%', basis: 'EO 292' },
    { id: 38, name: 'Holiday Worked (Special)', formula: 'Special Non-Working Day multiplier', value: '130%', basis: 'EO 292' },
  ],
  Deductions: [
    { id: 40, name: 'Min Net Take-Home Pay', formula: 'Floor after ALL deductions', value: '₱5,000', basis: 'GSIS Policy' },
    { id: 41, name: 'Priority 1: Withholding Tax', formula: 'Always deducted first', value: '1st', basis: 'NIRC' },
    { id: 42, name: 'Priority 2: GSIS Premium', formula: '9% of compensation', value: '2nd', basis: 'RA 8291' },
    { id: 43, name: 'Priority 3: PhilHealth', formula: '2.5% of basic salary', value: '3rd', basis: 'RA 11223' },
    { id: 44, name: 'Priority 4: Pag-IBIG', formula: '2% of fund salary (max ₱200)', value: '4th', basis: 'RA 9679' },
    { id: 45, name: 'Priority 5: Court Orders', formula: 'Child/spousal support', value: '5th', basis: 'Family Code' },
    { id: 46, name: 'Priority 6-10: Loans & Voluntary', formula: 'Subject to NTHP guard', value: '6-10', basis: 'Various' },
  ],
  Leave: [
    { id: 50, name: 'VL/SL Earning Rate', formula: 'Earned 1.25 days/month', value: '15 days/yr', basis: 'CSC MC 41' },
    { id: 51, name: 'Monetization Minimum', formula: 'Min accumulated VL to monetize', value: '15 days', basis: 'Section 22' },
    { id: 52, name: 'Monetization Max/Year', formula: 'Max days per application', value: '30 days', basis: 'Section 22' },
    { id: 53, name: 'Retain After Monetization', formula: 'Must keep at least', value: '5 days', basis: 'Section 22' },
    { id: 54, name: 'Monetization Formula', formula: 'Monthly Salary ÷ 22 × Days', value: 'Salary÷22×Days', basis: 'Section 22' },
    { id: 55, name: 'Terminal Leave Factor', formula: 'Highest Salary × factor × credits', value: '0.0481927', basis: 'CSC MC 02-16' },
  ],
}

const tabs = Object.keys(data)
</script>

<template>
  <div class="space-y-5">
    <div>
      <h1 class="text-xl font-bold text-gray-900">Computation Reference</h1>
      <p class="mt-0.5 text-sm text-gray-500">All rates, formulas, and parameters used in payroll computation</p>
      <div class="mt-2 h-0.5 w-14 bg-amber-500"></div>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 overflow-x-auto border-b border-gray-200">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="['whitespace-nowrap border-b-2 px-4 py-2.5 text-xs font-medium transition-colors', activeTab === tab ? 'border-red-600 text-red-600' : 'border-transparent text-gray-500 hover:text-gray-900']"
        @click="activeTab = tab"
      >
        {{ tab }} ({{ data[tab].length }})
      </button>
    </div>

    <!-- Table -->
    <div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <table class="w-full">
        <thead>
          <tr class="bg-gradient-to-r from-gray-800 to-gray-700">
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Item</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Formula / Description</th>
            <th class="w-32 px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wider text-white">Value</th>
            <th class="px-4 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider text-white">Legal Basis</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in data[activeTab]" :key="item.id" class="border-b border-gray-100 hover:bg-gray-50">
            <td class="px-4 py-3 text-xs font-medium text-gray-900">{{ item.name }}</td>
            <td class="px-4 py-3 text-xs text-gray-600">{{ item.formula }}</td>
            <td class="px-4 py-3 text-center font-mono text-xs font-bold text-gray-900">{{ item.value }}</td>
            <td class="px-4 py-3 text-[11px] text-gray-500">{{ item.basis }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

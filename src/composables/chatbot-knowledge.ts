/**
 * Chatbot Knowledge Base — White Label Version
 */

import { MOCK_EMPLOYEES, SG_TABLE, getSalary } from './mock-data'

export interface AgentAction {
  label: string
  type: 'navigate' | 'lookup' | 'show_employee'
  path?: string
  employeeNumber?: string
}

interface KnowledgeEntry {
  keywords: string[]
  answer: string
  actions?: AgentAction[]
}

const KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['vl', 'vacation leave', 'vacation'],
    answer: 'Vacation Leave: 15 days/year for regular employees. Probationary employees earn VL after 6 months. Contractual employees follow their contract terms.',
    actions: [{ label: 'Go to Leave Management', type: 'navigate', path: '/leave' }],
  },
  {
    keywords: ['sick leave', 'sl', 'sick'],
    answer: 'Sick Leave: 15 days/year for regular employees. Requires medical certificate for 3+ consecutive days.',
    actions: [{ label: 'Go to Leave Management', type: 'navigate', path: '/leave' }],
  },
  {
    keywords: ['sss', 'social security'],
    answer: 'SSS Contribution:\n• Employee Share: ~4.5% of monthly salary\n• Employer Share: ~9.5%\n• Maximum Monthly Salary Credit (MSC): ₱30,000\n• Maximum EE contribution: ₱1,350/mo',
    actions: [{ label: 'View Computation', type: 'navigate', path: '/computation' }],
  },
  {
    keywords: ['philhealth', 'health insurance'],
    answer: 'PhilHealth:\n• Rate: 5% of basic salary (split 2.5% EE / 2.5% ER)\n• Floor: ₱10,000 | Ceiling: ₱100,000',
    actions: [{ label: 'View Computation', type: 'navigate', path: '/computation' }],
  },
  {
    keywords: ['pagibig', 'pag-ibig', 'hdmf'],
    answer: 'Pag-IBIG: ₱200/month each (employee + employer). Max fund salary: ₱10,000.',
    actions: [{ label: 'View Computation', type: 'navigate', path: '/computation' }],
  },
  {
    keywords: ['tax', 'withholding', 'bir', 'train'],
    answer: 'Withholding Tax (TRAIN Law):\n• ₱0–250K/yr = 0%\n• ₱250K–400K = 15%\n• ₱400K–800K = 20% + ₱22,500\n• ₱800K–2M = 25% + ₱102,500\n• ₱2M–8M = 30% + ₱402,500',
    actions: [{ label: 'View Computation', type: 'navigate', path: '/computation' }],
  },
  {
    keywords: ['13th month', 'thirteenth'],
    answer: '13th Month Pay: Mandatory for all rank-and-file employees. Formula: Total basic salary earned ÷ 12. Due by December 24. First ₱90K combined with bonuses is tax-exempt.',
    actions: [{ label: 'View Allowances', type: 'navigate', path: '/allowances' }],
  },
  {
    keywords: ['loan', 'sss loan', 'pagibig loan', 'salary loan'],
    answer: 'Loan types: SSS Salary Loan (max ₱50K, 10%, 24 months), Pag-IBIG MPL (80% of TAV, 10.5%, 24 months), Company Loan (per policy).',
    actions: [{ label: 'Go to Loans', type: 'navigate', path: '/loans' }],
  },
  {
    keywords: ['run payroll', 'process payroll', 'compute salary'],
    answer: 'To run payroll: Upload attendance/DTR → System computes SSS, PhilHealth, Pag-IBIG, tax, loans → Preview register → Submit for approval.',
    actions: [{ label: 'Go to Payroll', type: 'navigate', path: '/payroll' }],
  },
  {
    keywords: ['help', 'what can you do', 'features'],
    answer: '**Payroll System Features:**\n\n📋 Employee Management\n💰 Payroll Processing\n🏦 Contributions (SSS, PhilHealth, Pag-IBIG)\n📊 Tax Computation (TRAIN Law)\n🌴 Leave Management\n💳 Loan Tracking\n✅ Approval Workflow\n📈 Reports\n\nTry: "salary of grade 10", "how much SSS for grade 8"',
    actions: [{ label: 'View Dashboard', type: 'navigate', path: '/' }],
  },
]

export function findAnswer(query: string): { answer: string; actions: AgentAction[] } {
  const q = query.toLowerCase().trim()
  if (q.length < 2) return { answer: 'Please ask a more specific question.', actions: [] }

  // Employee lookup
  const empMatch = MOCK_EMPLOYEES.find((emp) => {
    const parts = emp.name.toLowerCase().split(/[\s.]+/)
    return parts.some((p) => p.length > 2 && q.includes(p))
  })

  if (empMatch) {
    const salary = getSalary(empMatch.sg, empMatch.step)
    const now = new Date()
    const hired = new Date(empMatch.dateHired)
    const months = (now.getFullYear() - hired.getFullYear()) * 12 + (now.getMonth() - hired.getMonth())
    const yrs = Math.floor(months / 12)
    const mos = months % 12
    const svc = yrs > 0 ? `${yrs} yr ${mos} mo` : `${mos} mo`
    return {
      answer: `**${empMatch.name}** (${empMatch.number})\n• Position: ${empMatch.position}\n• Department: ${empMatch.department}\n• Grade ${empMatch.sg} Step ${empMatch.step} | ₱${salary.toLocaleString()}/mo\n• Type: ${empMatch.type}\n• Service: ${svc}`,
      actions: [{ label: 'View Employees', type: 'navigate', path: '/employees' }],
    }
  }

  // Grade computation
  const sgMatch = q.match(/grade\s*(\d+)/i) || q.match(/(?:sg|level)\s*(\d+)/i)
  if (sgMatch) {
    const sgNum = parseInt(sgMatch[1])
    const basic = SG_TABLE[sgNum]?.[0] || 0
    if (basic > 0) {
      const sss = Math.min(Math.round(basic * 0.045), 1350)
      const ph = Math.min(Math.round(basic * 0.025), 2500)
      const pi = 200
      const taxable = (basic - sss - ph - pi) * 12
      let tax = 0
      if (taxable > 800000) tax = 102500 + (taxable - 800000) * 0.25
      else if (taxable > 400000) tax = 22500 + (taxable - 400000) * 0.20
      else if (taxable > 250000) tax = (taxable - 250000) * 0.15
      const monthlyTax = Math.round(tax / 12)
      const net = basic - sss - ph - pi - monthlyTax
      return {
        answer: `**Grade ${sgNum} Step 1:**\n• Basic: ₱${basic.toLocaleString()}\n• SSS: ₱${sss.toLocaleString()}\n• PhilHealth: ₱${ph.toLocaleString()}\n• Pag-IBIG: ₱200\n• Tax: ₱${monthlyTax.toLocaleString()}\n• **Net: ₱${net.toLocaleString()}**`,
        actions: [{ label: 'View Salary Grades', type: 'navigate', path: '/salary-grades' }],
      }
    }
  }

  // Knowledge base
  let bestMatch: KnowledgeEntry | null = null
  let bestScore = 0
  for (const entry of KNOWLEDGE) {
    let score = 0
    for (const kw of entry.keywords) if (q.includes(kw)) score += kw.length
    if (score > bestScore) { bestScore = score; bestMatch = entry }
  }
  if (bestMatch && bestScore >= 2) return { answer: bestMatch.answer, actions: bestMatch.actions || [] }

  return {
    answer: "I can help with:\n• Employee info (type a name)\n• Salary computation (\"grade 10\")\n• Contributions (SSS, PhilHealth, Pag-IBIG)\n• Leave & loan policies\n• Payroll processing",
    actions: [{ label: 'View Computation', type: 'navigate', path: '/computation' }],
  }
}

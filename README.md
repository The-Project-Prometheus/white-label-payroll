# Payroll Management System — White Label

Vue 3 + PrimeVue + TailwindCSS white-label payroll system SPA.

## Tech Stack

- **Vue 3** (Composition API + `<script setup>`)
- **TypeScript**
- **PrimeVue 3** — UI component library
- **TailwindCSS** — utility-first CSS
- **Pinia** — state management
- **VueUse** — composables
- **Vue Router** — client-side routing with RBAC guards
- **Vite** — build tool

## Getting Started

```bash
npm install
npm run dev
```

## Demo Accounts

| Username | Password | Role |
|---|---|---|
| payroll | payroll | Payroll Manager |
| hr | hr | HR Manager |
| admin | admin | System Admin |

## Features

- Employee management (CRUD, pay grade tracking)
- Payroll processing with approval workflow
- Salary grades (15 grades × 5 steps)
- Allowances management (8 types)
- Loan tracking (SSS, Pag-IBIG, Company)
- Leave management (VL, SL, EL, ML, PL)
- Reports (Payslips, Register, Remittance, BIR forms)
- Executive dashboard with analytics
- Audit logging
- AI Payroll Assistant chatbot
- Role-based access control (RBAC)

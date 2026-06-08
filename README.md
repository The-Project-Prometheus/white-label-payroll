# Senate Payroll System — SPA Frontend

Vue 3 + PrimeVue + TailwindCSS single-page application for the Philippine Senate Payroll System.

## Tech Stack

- **Vue 3** (Composition API + `<script setup>`)
- **TypeScript**
- **PrimeVue 3** — UI component library
- **TailwindCSS** — utility-first CSS
- **Pinia** — state management
- **VueUse** — composables (including `useFetch` for API calls)
- **Vue Router** — client-side routing with role-based guards
- **Vite** — build tool
- **ApexCharts** — data visualization (Executive Dashboard)

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build:production
```

## Project Structure

```
src/
├── assets/css/          # Global styles, TailwindCSS imports
├── components/          # Reusable Vue components
│   ├── dashboard/       # Dashboard-specific components
│   ├── layout/          # Layout shell (sidebar, header, etc.)
│   ├── misc/            # Shared utility components
│   └── webkit/          # Base webkit design system components
├── composables/         # Vue composables
│   └── api/             # API layer (one file per domain)
├── plugins/             # Vue plugin registrations
├── router/              # Vue Router with RBAC guards
├── stores/              # Pinia stores
├── typings/             # TypeScript type definitions
├── utils/               # Helper functions
└── views/               # Page-level components (one per route)
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_APP_NAME` | Application display name |
| `VITE_API_ROOT_URL` | Backend API base URL |
| `VITE_APP_ENV` | Environment identifier |

## Features

- Employee management (CRUD, salary grade tracking)
- Payroll processing with approval workflow
- Salary grades (SSL Tranche table)
- Allowances management
- Loan tracking & amortization
- Leave management
- Reports (Payslips, Register, BIR forms, Remittances)
- Executive dashboard with charts
- Audit logging
- Role-based access control (RBAC)

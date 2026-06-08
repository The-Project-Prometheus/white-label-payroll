<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store.ts'

const router = useRouter()
const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const error = ref('')

const MOCK_USERS = [
  { username: 'payroll', password: 'payroll', label: 'Payroll Manager' },
  { username: 'hr', password: 'hr', label: 'HR Manager' },
  { username: 'admin', password: 'admin', label: 'System Admin' },
]

const handleLogin = (user?: typeof MOCK_USERS[0]) => {
  const loginUser = user || MOCK_USERS.find((u) => u.username === username.value && u.password === password.value)
  if (loginUser) {
    authStore.authenticationToken = 'mock-token-' + loginUser.username
    authStore.authenticatedUser = {
      id: 1,
      username: loginUser.username,
      email: `${loginUser.username}@company.com`,
      full_name: loginUser.label,
      roles: [{ name: 'super_user' }],
      email_verified_at: '2026-01-01',
      user_profile: { full_name: loginUser.label },
    }
    authStore.authExpired = false
    router.push('/')
  } else {
    error.value = 'Invalid username or password'
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col font-sans">
    <!-- Header -->
    <header class="flex h-14 items-center bg-indigo-700 px-6">
      <i class="pi pi-wallet mr-3 text-xl text-white"></i>
      <h1 class="text-lg font-bold text-white">Payroll Management System</h1>
    </header>

    <!-- Main -->
    <main class="flex flex-1 items-center justify-center bg-gradient-to-br from-slate-900 to-indigo-950">
      <div class="mx-4 w-full max-w-md text-center">
        <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-600">
          <i class="pi pi-wallet text-3xl text-white"></i>
        </div>
        <h2 class="mb-1 text-xl font-bold text-white">Payroll Management System</h2>
        <p class="mb-6 text-sm text-gray-400">Sign in to your account</p>

        <!-- Login Form -->
        <div class="mb-4 rounded-xl bg-white/5 p-6 text-left backdrop-blur">
          <div class="space-y-4">
            <div>
              <label class="mb-1 block text-[10px] font-bold uppercase text-gray-400">Username</label>
              <input
                v-model="username"
                type="text"
                class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-indigo-400 focus:outline-none"
                placeholder="Enter username"
                @keydown.enter="handleLogin()"
              />
            </div>
            <div>
              <label class="mb-1 block text-[10px] font-bold uppercase text-gray-400">Password</label>
              <input
                v-model="password"
                type="password"
                class="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-indigo-400 focus:outline-none"
                placeholder="Enter password"
                @keydown.enter="handleLogin()"
              />
            </div>
            <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
            <button
              class="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-indigo-700"
              @click="handleLogin()"
            >
              Sign In
            </button>
          </div>
        </div>

        <!-- Quick Login -->
        <p class="mb-2 text-[10px] text-gray-500">Demo accounts (click to login):</p>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="user in MOCK_USERS"
            :key="user.username"
            class="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left transition-all hover:border-indigo-400 hover:bg-white/10"
            @click="handleLogin(user)"
          >
            <p class="text-xs font-medium text-white">{{ user.label }}</p>
            <p class="text-[9px] text-gray-500">{{ user.username }} / {{ user.password }}</p>
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-950 px-6 py-4 text-center">
      <p class="text-[10px] text-gray-500">© 2026 Payroll Management System • White Label Edition</p>
    </footer>
  </div>
</template>

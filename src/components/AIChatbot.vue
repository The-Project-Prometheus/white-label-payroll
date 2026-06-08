<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import { findAnswer, type AgentAction } from '@/composables/chatbot-knowledge'

interface Message {
  id: number
  role: 'user' | 'assistant'
  content: string
  actions?: AgentAction[]
}

const router = useRouter()
const isOpen = ref(false)
const isMinimized = ref(false)
const input = ref('')
const messagesEnd = ref<HTMLDivElement | null>(null)

const messages = ref<Message[]>([
  {
    id: 0,
    role: 'assistant',
    content: "Hi! I'm the Senate Payroll Assistant. How can I help you?",
  },
])

const scrollToBottom = () => {
  nextTick(() => {
    messagesEnd.value?.scrollIntoView({ behavior: 'smooth' })
  })
}

watch(
  () => messages.value.length,
  () => scrollToBottom(),
)

const handleSend = () => {
  if (!input.value.trim()) return

  const userMsg: Message = { id: messages.value.length, role: 'user', content: input.value.trim() }
  const { answer, actions } = findAnswer(input.value.trim())
  const botMsg: Message = { id: messages.value.length + 1, role: 'assistant', content: answer, actions }

  messages.value.push(userMsg, botMsg)
  input.value = ''
}

const handleAction = (action: AgentAction) => {
  if (action.type === 'navigate' && action.path) {
    router.push(action.path)
    isOpen.value = false
  }
  if (action.type === 'show_employee') {
    router.push('/employees')
    isOpen.value = false
  }
}
</script>

<template>
  <!-- FAB Button -->
  <button
    v-if="!isOpen && !isMinimized"
    class="fixed bottom-6 right-6 z-50 flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-red-700 shadow-lg transition-colors hover:bg-red-800"
    title="Open AI Payroll Assistant"
    @click="isOpen = true"
  >
    <i class="pi pi-comments text-xl text-white"></i>
  </button>

  <!-- Minimized Bar -->
  <div
    v-if="isMinimized && !isOpen"
    class="fixed bottom-6 right-6 z-50 flex cursor-pointer items-center gap-3 rounded-full bg-gray-800 px-4 py-2.5 shadow-lg transition-colors hover:bg-gray-700"
    @click="isOpen = true; isMinimized = false"
  >
    <i class="pi pi-android text-amber-500"></i>
    <span class="text-xs font-medium text-white">Payroll Assistant</span>
    <span class="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
  </div>

  <!-- Chat Window -->
  <div
    v-if="isOpen"
    class="fixed bottom-6 right-6 z-50 flex h-[540px] w-[380px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl"
  >
    <!-- Header -->
    <div class="flex shrink-0 items-center justify-between rounded-t-xl bg-gray-800 px-4 py-3">
      <div class="flex items-center gap-2">
        <i class="pi pi-android text-amber-500"></i>
        <div>
          <p class="text-sm font-bold text-white">Payroll Assistant</p>
          <p class="text-[10px] text-gray-400">Ask questions • Navigate • Compute</p>
        </div>
      </div>
      <div class="flex items-center gap-1">
        <button class="text-gray-400 hover:text-white" title="Minimize" @click="isOpen = false; isMinimized = true">
          <span class="text-lg leading-none">−</span>
        </button>
        <button class="text-gray-400 hover:text-white" title="Close" @click="isOpen = false; isMinimized = false">
          <i class="pi pi-times"></i>
        </button>
      </div>
    </div>

    <!-- Messages -->
    <div class="flex-1 space-y-3 overflow-y-auto p-3">
      <div v-for="msg in messages" :key="msg.id">
        <div :class="['flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start']">
          <!-- Bot avatar -->
          <div v-if="msg.role === 'assistant'" class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100">
            <i class="pi pi-android text-xs text-amber-600"></i>
          </div>
          <!-- Message bubble -->
          <div
            :class="[
              'max-w-[80%] whitespace-pre-line rounded-lg px-3 py-2 text-xs leading-relaxed',
              msg.role === 'user' ? 'rounded-br-sm bg-blue-600 text-white' : 'rounded-bl-sm bg-gray-100 text-gray-900',
            ]"
          >
            {{ msg.content }}
          </div>
          <!-- User avatar -->
          <div v-if="msg.role === 'user'" class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100">
            <i class="pi pi-user text-xs text-blue-600"></i>
          </div>
        </div>
        <!-- Action buttons -->
        <div v-if="msg.actions && msg.actions.length > 0" class="ml-8 mt-1.5 flex flex-wrap gap-1.5">
          <button
            v-for="(action, i) in msg.actions"
            :key="i"
            class="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-white px-2.5 py-1 text-[10px] font-medium text-gray-900 transition-colors hover:border-amber-500 hover:bg-amber-50"
            @click="handleAction(action)"
          >
            <i class="pi pi-arrow-right text-[8px]"></i>
            {{ action.label }}
          </button>
        </div>
      </div>
      <div ref="messagesEnd"></div>
    </div>

    <!-- Input -->
    <div class="shrink-0 border-t border-gray-100 p-3">
      <div class="flex items-center gap-2">
        <input
          v-model="input"
          type="text"
          class="flex-1 rounded-md border border-gray-300 px-3 py-2 text-xs placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="Ask anything about payroll..."
          @keydown.enter="handleSend"
        />
        <button
          :disabled="!input.trim()"
          class="rounded-lg bg-red-700 p-2 text-white transition-colors hover:bg-red-800 disabled:opacity-50"
          @click="handleSend"
        >
          <i class="pi pi-send text-sm"></i>
        </button>
      </div>
    </div>
  </div>
</template>

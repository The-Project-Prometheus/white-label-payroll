/**
 * Auto-timeout: Automatically logs out user after inactivity.
 */

let timeoutId: ReturnType<typeof setTimeout> | null = null
const TIMEOUT_MS = 5 * 60 * 1000 // 5 minutes

const ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click']

let onTimeoutCallback: (() => void) | null = null

function resetTimer() {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  timeoutId = setTimeout(() => {
    if (onTimeoutCallback) {
      onTimeoutCallback()
    }
  }, TIMEOUT_MS)
}

export function startInactivityTimer(onTimeout: () => void) {
  onTimeoutCallback = onTimeout
  ACTIVITY_EVENTS.forEach((event) => {
    document.addEventListener(event, resetTimer, { passive: true })
  })
  resetTimer()
}

export function stopInactivityTimer() {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  ACTIVITY_EVENTS.forEach((event) => {
    document.removeEventListener(event, resetTimer)
  })
  onTimeoutCallback = null
}

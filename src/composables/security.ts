/**
 * Security utilities — OWASP compliance helpers.
 */

// A01: Input sanitization (prevents XSS)
export function sanitizeInput(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// A07: Session timeout tracking
const SESSION_TIMEOUT_MS = 5 * 60 * 1000 // 5 minutes
let lastActivity = Date.now()

export function recordActivity() {
  lastActivity = Date.now()
}

export function isSessionExpired(): boolean {
  return Date.now() - lastActivity > SESSION_TIMEOUT_MS
}

// A09: Security event logging
export function logSecurityEvent(event: string, details?: Record<string, unknown>) {
  const entry = {
    timestamp: new Date().toISOString(),
    event,
    ...details,
  }
  try {
    const log = JSON.parse(localStorage.getItem('security_audit_log') || '[]')
    log.push(entry)
    if (log.length > 1000) log.splice(0, log.length - 1000)
    localStorage.setItem('security_audit_log', JSON.stringify(log))
  } catch {
    // Silently fail
  }
  console.log('[SECURITY]', event, details || '')
}

// RA 10173: PII masking utility
export function maskPII(value: string, showLast: number = 4): string {
  if (value.length <= showLast) return '••••'
  return '•'.repeat(value.length - showLast) + value.slice(-showLast)
}

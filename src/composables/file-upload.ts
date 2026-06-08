/**
 * File Upload Composable — Handles file selection and basic parsing.
 * In production, integrate with xlsx library for Excel parsing.
 */

export interface UploadedFile {
  id: string
  fileName: string
  fileType: string
  fileSize: number
  uploadedAt: string
  context: string
  status: 'success' | 'error'
}

const STORAGE_KEY = 'payroll_uploads_v6'

function readStore(): UploadedFile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeStore(records: UploadedFile[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export function getUploadsByContext(context: string): UploadedFile[] {
  return readStore().filter((u) => u.context === context)
}

export interface UploadOptions {
  accept?: string
  context?: string
  onSuccess?: (record: UploadedFile) => void
}

/**
 * Trigger a file upload dialog and process the selected file.
 */
export function triggerFileUpload(options?: UploadOptions): Promise<File | null> {
  const context = options?.context || 'general'

  return new Promise((resolve) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = options?.accept || '.xlsx,.xls,.csv,.pdf,.png,.jpg'
    input.style.display = 'none'
    document.body.appendChild(input)

    input.onchange = () => {
      const file = input.files?.[0] || null
      document.body.removeChild(input)
      if (!file) {
        resolve(null)
        return
      }

      const record: UploadedFile = {
        id: `up-${Date.now()}`,
        fileName: file.name,
        fileType: file.name.split('.').pop() || '',
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
        context,
        status: 'success',
      }

      // Store record
      const store = readStore()
      store.push(record)
      writeStore(store)

      if (options?.onSuccess) options.onSuccess(record)
      resolve(file)
    }

    input.oncancel = () => {
      document.body.removeChild(input)
      resolve(null)
    }

    input.click()
  })
}

import { defineStore } from 'pinia'

export type ToastVariant = 'default' | 'success' | 'error'

export interface Toast {
  id: string
  message: string
  variant: ToastVariant
  duration: number
}

const MAX_TOASTS = 4

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
  }),
  actions: {
    add(message: string, variant: ToastVariant = 'default', duration = 3000) {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      if (this.toasts.length >= MAX_TOASTS) this.toasts.shift()
      this.toasts.push({ id, message, variant, duration })
      if (duration > 0) setTimeout(() => this.remove(id), duration)
    },
    remove(id: string) {
      this.toasts = this.toasts.filter(t => t.id !== id)
    },
  },
})

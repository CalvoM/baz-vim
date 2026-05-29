import type { ToastVariant } from '~/stores/toast'

export default function () {
  const store = useToastStore()

  const show    = (message: string, variant?: ToastVariant, duration?: number) =>
    store.add(message, variant, duration)
  const dismiss = (id: string) => store.remove(id)
  const toasts  = computed(() => store.toasts)

  return { show, dismiss, toasts }
}

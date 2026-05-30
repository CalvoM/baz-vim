<script setup lang="ts">
const toast = useToast();

const BADGE: Record<string, string> = {
  default: "i",
  success: "ok",
  error: "!",
};
</script>

<template>
  <Teleport to="body">
    <div class="toast-region" aria-live="polite" aria-atomic="false">
      <TransitionGroup name="toast" tag="div" class="toast-stack">
        <div
          v-for="t in toast.toasts.value"
          :key="t.id"
          class="toast"
          :class="`toast--${t.variant}`"
          role="status"
        >
          <span class="toast-accent" aria-hidden="true" />
          <span class="toast-badge">{{ BADGE[t.variant] }}</span>
          <span class="toast-message">{{ t.message }}</span>
          <button
            class="toast-dismiss"
            aria-label="Dismiss notification"
            @click="toast.dismiss(t.id)"
          >
            ×
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style>
/* ── Toast region (anchor) ─────────────────────────────── */
.toast-region {
  position: fixed;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 500;
  pointer-events: none;
}

/* ── Stack container ───────────────────────────────────── */
.toast-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

/* ── Single toast ──────────────────────────────────────── */
.toast {
  display: flex;
  align-items: center;
  gap: 0;
  min-width: 220px;
  max-width: 440px;
  background: rgba(16, 25, 31, 0.95);
  border: 1px solid rgba(156, 121, 72, 0.22);
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    0 0 18px rgba(0, 0, 0, 0.45),
    0 4px 16px rgba(0, 0, 0, 0.5);
  pointer-events: all;
  white-space: nowrap;
}

/* 3 px left accent bar */
.toast-accent {
  display: block;
  width: 3px;
  align-self: stretch;
  flex-shrink: 0;
  background: var(--toast-color);
}

/* Prefix badge */
.toast-badge {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--toast-color);
  background: rgba(0, 0, 0, 0.25);
  padding: 0 10px;
  align-self: stretch;
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

/* Message */
.toast-message {
  font-family: "JetBrains Mono", monospace;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: var(--c-cream);
  padding: 9px 14px 9px 12px;
  flex: 1;
}

/* Dismiss button */
.toast-dismiss {
  font-family: "JetBrains Mono", monospace;
  font-size: 16px;
  line-height: 1;
  color: rgba(212, 201, 168, 0.3);
  background: transparent;
  border: none;
  padding: 0 12px;
  align-self: stretch;
  cursor: pointer;
  transition: color 120ms;
  flex-shrink: 0;
}
.toast-dismiss:hover {
  color: rgba(212, 201, 168, 0.75);
}

/* ── Variant color tokens ──────────────────────────────── */
.toast--default {
  --toast-color: #9c7948;
  border-color: rgba(156, 121, 72, 0.28);
}
.toast--success {
  --toast-color: #7aab2f;
  border-color: rgba(122, 171, 47, 0.28);
}
.toast--error {
  --toast-color: #c47060;
  border-color: rgba(196, 112, 96, 0.28);
}

/* ── TransitionGroup ───────────────────────────────────── */
.toast-enter-active {
  transition:
    opacity 130ms ease-out,
    transform 130ms ease-out;
}
.toast-leave-active {
  transition:
    opacity 280ms ease-in,
    transform 280ms ease-in;
  /* keep in flow so siblings reflow smoothly */
}
.toast-move {
  transition: transform 280ms ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
/* prevent leave items from collapsing width mid-transition */
.toast-leave-active {
  position: absolute;
}
</style>

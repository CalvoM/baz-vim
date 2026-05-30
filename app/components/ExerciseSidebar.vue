<script setup lang="ts">
import type { Category } from '~/utils/exercises'

defineProps<{ collapsed: boolean }>()
defineEmits<{ toggle: [] }>()

const ex = useExercises()

// Per-item expand state — active exercise starts expanded
const expandedIds = ref<Set<string>>(new Set([ex.currentId.value]))

function toggleItem(id: string) {
  const next = new Set(expandedIds.value)
  if (next.has(id)) {
    next.delete(id)
  } else {
    next.add(id)
    ex.setCurrentId(id)
  }
  expandedIds.value = next
}

const isExpanded = (id: string) => expandedIds.value.has(id)

const CAT_COLOR: Record<Category, string> = {
  navigation: '#9C7948',
  editing:    '#7aab2f',
  motions:    '#4a8fb5',
  operators:  '#c47060',
  visual:     '#b8a870',
}

const DIFF_LABEL: Record<string, string> = {
  beginner:     'bgn',
  intermediate: 'int',
  advanced:     'adv',
}
const DIFF_COLOR: Record<string, string> = {
  beginner:     'rgba(122,171,47,0.85)',
  intermediate: 'rgba(156,121,72,0.85)',
  advanced:     'rgba(196,112,96,0.85)',
}
</script>

<template>
  <aside class="ex-sidebar" :class="{ 'is-collapsed': collapsed }">

    <!-- ── Sidebar toggle ──────────────────────────────── -->
    <button
      class="ex-toggle"
      :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      @click="$emit('toggle')"
      aria-label="Toggle sidebar"
    >
      <span class="ex-toggle-icon">{{ collapsed ? '›' : '‹' }}</span>
      <span v-if="!collapsed" class="ex-toggle-label">exercises</span>
      <span v-if="!collapsed" class="ex-progress">
        {{ ex.completionCount.value }}/{{ ex.totalCount }}
      </span>
    </button>

    <!-- ── Expanded: grouped, collapsible exercise list ── -->
    <nav v-if="!collapsed" class="ex-list" aria-label="Exercises">
      <div
        v-for="group in ex.grouped.value"
        :key="group.category"
        class="ex-group"
      >
        <div class="ex-group-header">
          <span class="ex-cat-dot" :style="{ background: CAT_COLOR[group.category] }" />
          <span
            class="ex-group-label"
            :style="{ color: CAT_COLOR[group.category] }"
          >{{ group.label }}</span>
        </div>

        <div
          v-for="item in group.items"
          :key="item.id"
          class="ex-item"
          :class="{
            'is-active':   ex.currentId.value === item.id,
            'is-complete': ex.isComplete(item.id),
            'is-open':     isExpanded(item.id),
          }"
        >
          <!-- Title row — always visible, click to toggle -->
          <button class="ex-item-header" @click="toggleItem(item.id)">
            <span class="ex-item-dot" :style="{ background: CAT_COLOR[item.category] }" />
            <span class="ex-item-title">{{ item.title }}</span>
            <span v-if="ex.isComplete(item.id)" class="ex-check">✓</span>
            <span class="ex-chevron" :class="{ 'is-open': isExpanded(item.id) }">›</span>
          </button>

          <!-- Collapsible body — description + meta -->
          <Transition name="ex-body">
            <div v-if="isExpanded(item.id)" class="ex-item-body">
              <p class="ex-item-desc">{{ item.description }}</p>
              <div class="ex-item-meta">
                <span
                  class="ex-diff"
                  :style="{ color: DIFF_COLOR[item.difficulty] }"
                >{{ DIFF_LABEL[item.difficulty] }}</span>
                <span class="ex-cat-chip">{{ item.category }}</span>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </nav>

    <!-- ── Collapsed: dot-only list ────────────────────── -->
    <div v-else class="ex-dots" aria-hidden="true">
      <div
        v-for="item in ex.exercises"
        :key="item.id"
        class="ex-dot-row"
        :class="{
          'is-active':   ex.currentId.value === item.id,
          'is-complete': ex.isComplete(item.id),
        }"
        :title="item.title"
      >
        <span class="ex-item-dot" :style="{ background: CAT_COLOR[item.category] }" />
        <span v-if="ex.isComplete(item.id)" class="ex-dot-check">·</span>
      </div>
    </div>

  </aside>
</template>

<style>
/* ── Sidebar shell ─────────────────────────────────────── */
.ex-sidebar {
  display: flex;
  flex-direction: column;
  background: rgba(10, 18, 24, 0.65);
  border-right: 1px solid rgba(156, 121, 72, 0.12);
  backdrop-filter: blur(6px);
  overflow: hidden;
  position: relative;
  z-index: 1;
}

/* ── Sidebar toggle ────────────────────────────────────── */
.ex-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 13px 14px;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(156, 121, 72, 0.1);
  cursor: pointer;
  text-align: left;
  transition: background 150ms;
  flex-shrink: 0;
}
.ex-toggle:hover { background: rgba(156, 121, 72, 0.06); }

.ex-toggle-icon {
  font-family: 'JetBrains Mono', monospace;
  font-size: 17px;
  color: rgba(156, 121, 72, 0.55);
  line-height: 1;
  transition: color 150ms;
  flex-shrink: 0;
}
.ex-toggle:hover .ex-toggle-icon { color: var(--c-gold); }

.ex-toggle-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(212, 201, 168, 0.5);
  flex: 1;
}

.ex-progress {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: rgba(156, 121, 72, 0.6);
  flex-shrink: 0;
}

/* ── Exercise list ─────────────────────────���───────────── */
.ex-list {
  flex: 1;
  overflow-y: auto;
  padding: 6px 0 20px;
  scrollbar-width: thin;
  scrollbar-color: rgba(156, 121, 72, 0.2) transparent;
}
.ex-list::-webkit-scrollbar { width: 4px; }
.ex-list::-webkit-scrollbar-track { background: transparent; }
.ex-list::-webkit-scrollbar-thumb {
  background: rgba(156, 121, 72, 0.2);
  border-radius: 2px;
}

/* ── Group ─────────────────────────────────────────────── */
.ex-group {
  margin-bottom: 4px;
  border-top: 1px solid rgba(156, 121, 72, 0.1);
}
.ex-group:first-child { border-top: none; }

.ex-group-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 16px 8px;
}

.ex-cat-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 0 6px currentColor;
}

.ex-group-label {
  font-family: 'Fraunces', serif;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

/* ── Exercise item wrapper ─────────────────────────────── */
.ex-item {
  border-left: 2px solid transparent;
  transition: border-color 140ms, background 140ms;
}
.ex-item.is-active  { border-left-color: var(--c-gold); }
.ex-item.is-open    { background: rgba(156, 121, 72, 0.05); }

/* ── Item header (always visible, click to expand) ─────── */
.ex-item-header {
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 10px 14px 10px 12px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: background 130ms;
}
.ex-item-header:hover { background: rgba(156, 121, 72, 0.06); }
.ex-item.is-active .ex-item-header { background: rgba(156, 121, 72, 0.09); }

.ex-item-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.ex-item-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  font-weight: 500;
  color: var(--c-cream);
  flex: 1;
  line-height: 1.3;
  transition: color 140ms;
}
.ex-item.is-complete .ex-item-title {
  color: rgba(212, 201, 168, 0.45);
}

.ex-check {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--c-gold);
  flex-shrink: 0;
  line-height: 1;
}

.ex-chevron {
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  color: rgba(156, 121, 72, 0.35);
  flex-shrink: 0;
  line-height: 1;
  transition: transform 220ms cubic-bezier(0.65, 0, 0.35, 1), color 140ms;
  display: inline-block;
}
.ex-chevron.is-open {
  transform: rotate(90deg);
  color: rgba(156, 121, 72, 0.65);
}

/* ── Collapsible body ──────────────────────────────────── */
.ex-item-body {
  padding: 0 14px 12px 29px;
  overflow: hidden;
}

.ex-item-desc {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 400;
  color: rgba(212, 201, 168, 0.75);
  line-height: 1.6;
  margin-bottom: 8px;
}

.ex-item-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.ex-diff {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
}

.ex-cat-chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(212, 201, 168, 0.28);
}

/* ── Expand / collapse transition ──────────────────────── */
.ex-body-enter-active,
.ex-body-leave-active {
  transition: opacity 200ms ease, max-height 220ms cubic-bezier(0.65, 0, 0.35, 1);
  max-height: 120px;
  overflow: hidden;
}
.ex-body-enter-from,
.ex-body-leave-to {
  opacity: 0;
  max-height: 0;
}

/* ── Collapsed: dot-only ───────────────────────────────── */
.ex-dots {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px 0;
  overflow-y: auto;
}

.ex-dot-row {
  position: relative;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 140ms;
}
.ex-dot-row.is-active {
  background: rgba(156, 121, 72, 0.15);
  box-shadow: inset 0 0 0 1px rgba(156, 121, 72, 0.3);
}

.ex-dot-check {
  position: absolute;
  bottom: 2px;
  right: 3px;
  font-size: 9px;
  color: var(--c-gold);
  line-height: 1;
}
</style>

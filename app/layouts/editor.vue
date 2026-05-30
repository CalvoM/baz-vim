<script setup lang="ts">
const collapsed = ref(false);
</script>

<template>
  <div class="editor-layout" :class="{ 'is-collapsed': collapsed }">
    <!-- ── Header ──────────────────────────────────────── -->
    <header class="layout-header">
      <NuxtLink to="/" class="layout-home">← home</NuxtLink>
      <h1 class="layout-title">
        baz<span class="layout-title-dash">-</span>vim
      </h1>
      <div class="badge layout-badge">✦ VIM POWERED ✦</div>
    </header>

    <!-- ── Sidebar ─────────────────────────────────────── -->
    <div class="layout-sidebar">
      <ExerciseSidebar
        :collapsed="collapsed"
        @toggle="collapsed = !collapsed"
      />
    </div>

    <!-- ── Main content ────────────────────────────────── -->
    <main class="layout-main">
      <slot />
    </main>

    <!-- ── Footer ──────────────────────────────────────── -->
    <footer class="layout-footer">
      <span class="footer-glyph">◆</span>
      <span>baz-vim</span>
      <span class="footer-glyph">◆</span>
    </footer>
  </div>
</template>

<style>
/* ── Layout grid ───────────────────────────────────────── */
.editor-layout {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 580px 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  min-height: 100vh;
  transition: grid-template-columns 280ms cubic-bezier(0.65, 0, 0.35, 1);
}
.editor-layout.is-collapsed {
  grid-template-columns: 48px 1fr;
}

/* ── Header ────────────────────────────────────────────── */
.layout-header {
  grid-area: header;
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 54px;
  border-bottom: 1px solid rgba(156, 121, 72, 0.12);
  background: rgba(10, 18, 24, 0.7);
  backdrop-filter: blur(8px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.layout-home {
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: rgba(156, 121, 72, 0.5);
  text-decoration: none;
  letter-spacing: 0.06em;
  transition: color 150ms;
  flex-shrink: 0;
  width: 80px;
}
.layout-home:hover {
  color: var(--c-gold);
}

.layout-title {
  font-family: "Fraunces", serif;
  font-optical-sizing: auto;
  font-size: 28px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--c-gold);
  text-shadow:
    0 0 24px rgba(156, 121, 72, 0.45),
    0 0 48px rgba(156, 121, 72, 0.15);
  flex: 1;
  text-align: center;
  animation: title-pulse 6s ease-in-out infinite;
}
.layout-title-dash {
  color: var(--c-olive);
}

.layout-badge {
  font-size: 10px;
  padding: 4px 14px;
  flex-shrink: 0;
  width: 80px;
  text-align: right;
  display: flex;
  justify-content: flex-end;
}

/* ── Sidebar ───────────────────────────────────────────── */
.layout-sidebar {
  grid-area: sidebar;
  overflow: hidden;
  position: sticky;
  top: 54px;
  height: calc(100vh - 54px);
}

/* ── Main ──────────────────────────────────────────────── */
.layout-main {
  grid-area: main;
  padding: 28px 28px 40px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  min-width: 0; /* prevent grid blowout */
}

/* ── Footer ────────────────────────────────────────────── */
.layout-footer {
  grid-area: footer;
  text-align: center;
  font-family: "Fraunces", serif;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(156, 121, 72, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px;
  border-top: 1px solid rgba(156, 121, 72, 0.08);
}
</style>

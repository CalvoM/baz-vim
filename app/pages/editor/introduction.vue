<script setup lang="ts">
definePageMeta({ layout: "editor" });

const lang_meta = useLang();
const editor_stats = useEditorStats();
const vim_editor = useVimeEditor();
const toast = useToast();

const keyBuffer = ref("");

function handleKeydown(e: KeyboardEvent) {
  if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

  if (e.key === "Escape") {
    keyBuffer.value = "";
    return;
  }

  if (e.key === "Enter") {
    const cmd = keyBuffer.value.trim();
    if (cmd === ":q") {
      toast.show("Nice try — but you can't escape that easily.", "default", 4500);
    } else if (cmd === ":q!") {
      toast.show("Force quit? Bold move. Still not leaving.", "error", 4500);
    } else if (cmd === ":wq" || cmd === ":wq!") {
      toast.show("Saved and quit? There's nothing to save here.", "success", 4500);
    } else if (cmd === ":x") {
      toast.show("x marks the spot — but not the exit.", "default", 4500);
    } else if (cmd === ":e exercises") {
      toast.show("Opening exercises...", "success", 2000);
      navigateTo("/editor/exercises");
    }
    keyBuffer.value = "";
    return;
  }

  if (!keyBuffer.value && e.key !== ":") return;
  if (e.key.length === 1) keyBuffer.value += e.key;
  if (keyBuffer.value.length > 22) keyBuffer.value = "";
}

onMounted(() => document.addEventListener("keydown", handleKeydown));
onUnmounted(() => document.removeEventListener("keydown", handleKeydown));
</script>

<template>
  <div class="editor-page">
    <!-- Hero -->
    <section class="intro-hero">
      <span class="badge">✦ LESSON 0 ✦</span>
      <h1 class="intro-title">Introduction to Vim</h1>
      <p class="intro-credit">
        based on vimtutor by Michael C. Pierce, Robert K. Ware &amp; Bram
        Moolenaar
      </p>
    </section>

    <!-- Card 1: The Concept -->
    <section class="intro-card">
      <span class="eyebrow">the concept</span>
      <h2 class="intro-heading">A Modal Editor</h2>
      <p class="intro-body">
        Vim is not like other editors. It operates in distinct
        <em>modes</em> — each with a different purpose. You don't type
        directly into the buffer when navigating; instead, you switch
        between modes intentionally. This makes Vim feel strange at first,
        and then feel like nothing else.
      </p>
      <div class="intro-modes">
        <div class="intro-mode-chip intro-mode-chip--normal">
          <span class="intro-mode-badge">NORMAL</span>
          <span class="intro-mode-label">navigate &amp; command</span>
        </div>
        <div class="intro-mode-chip intro-mode-chip--insert">
          <span class="intro-mode-badge">INSERT</span>
          <span class="intro-mode-label">type your text</span>
        </div>
        <div class="intro-mode-chip intro-mode-chip--visual">
          <span class="intro-mode-badge">VISUAL</span>
          <span class="intro-mode-label">select &amp; operate</span>
        </div>
      </div>
    </section>

    <!-- Card 2: Navigation -->
    <section class="intro-card">
      <span class="eyebrow">movement</span>
      <h2 class="intro-heading">Four Keys. Total Control.</h2>
      <p class="intro-body">
        Forget the arrow keys. In Normal mode, four letters handle all
        cursor movement — keeping your hands right where they belong.
      </p>
      <div class="intro-hjkl">
        <div class="intro-key-item">
          <kbd class="intro-key">h</kbd>
          <span class="intro-key-arrow">←</span>
          <span class="intro-key-desc">left</span>
        </div>
        <div class="intro-key-item">
          <kbd class="intro-key">j</kbd>
          <span class="intro-key-arrow">↓</span>
          <span class="intro-key-desc">down</span>
        </div>
        <div class="intro-key-item">
          <kbd class="intro-key">k</kbd>
          <span class="intro-key-arrow">↑</span>
          <span class="intro-key-desc">up</span>
        </div>
        <div class="intro-key-item">
          <kbd class="intro-key">l</kbd>
          <span class="intro-key-arrow">→</span>
          <span class="intro-key-desc">right</span>
        </div>
      </div>
      <p class="intro-callout">
        Arrow keys work too — but resist the temptation. Your hands will
        thank you.
      </p>
    </section>

    <!-- Card 3: Commands -->
    <section class="intro-card">
      <span class="eyebrow">commands</span>
      <h2 class="intro-heading">Your First Vocabulary</h2>
      <p class="intro-body">
        A small set of commands goes a long way. Learn these and you can
        survive — and thrive — in any Vim session.
      </p>
      <dl class="intro-cmd-list">
        <dt><kbd class="intro-cmd-key">x</kbd></dt>
        <dd class="intro-cmd-desc">delete the character under the cursor</dd>

        <dt><kbd class="intro-cmd-key">dd</kbd></dt>
        <dd class="intro-cmd-desc">delete the entire current line</dd>

        <dt><kbd class="intro-cmd-key">u</kbd></dt>
        <dd class="intro-cmd-desc">undo the last change</dd>

        <dt><kbd class="intro-cmd-key">i</kbd></dt>
        <dd class="intro-cmd-desc">enter Insert mode before the cursor</dd>

        <dt><kbd class="intro-cmd-key">Esc</kbd></dt>
        <dd class="intro-cmd-desc">return to Normal mode from anywhere</dd>

        <dt><kbd class="intro-cmd-key">:wq</kbd></dt>
        <dd class="intro-cmd-desc">write the file and quit</dd>

        <dt><kbd class="intro-cmd-key">:q!</kbd></dt>
        <dd class="intro-cmd-desc">quit without saving — abandon all changes</dd>
      </dl>
    </section>

    <!-- Card 4: The Golden Rule -->
    <section class="intro-card intro-card--quote">
      <blockquote class="intro-quote">
        "Vim speaks in a language. Operators act on Motions. Once you
        understand the grammar, everything composes."
      </blockquote>
      <p class="intro-hint">use the editor on the right →</p>
    </section>
  </div>
</template>

<style>
.editor-page {
  display: flex;
  flex-direction: column;
  gap: 28px;
  position: relative;
  z-index: 1;
  min-width: 0;
}

/* Override the full-viewport-breakout in layout context */
.kb-section--inset {
  width: auto !important;
  margin-left: 0 !important;
}

/* ── Hero ──────────────────────────────────────────────── */
.intro-hero {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  padding: 8px 0 4px;
}

.intro-title {
  font-family: "Fraunces", serif;
  font-weight: 900;
  font-size: clamp(36px, 5vw, 58px);
  color: var(--c-gold);
  line-height: 1.05;
  margin: 0;
  text-shadow:
    0 0 28px rgba(156, 121, 72, 0.45),
    0 0 60px rgba(156, 121, 72, 0.2);
}

.intro-credit {
  font-family: "JetBrains Mono", monospace;
  font-size: 1em;
  color: var(--c-muted);
  letter-spacing: 0.08em;
  margin: 0;
}

/* ── Cards ─────────────────────────────────────────────── */
.intro-card {
  backdrop-filter: blur(10px);
  background: rgba(27, 41, 51, 0.48);
  border: 1px solid rgba(156, 121, 72, 0.16);
  border-radius: 14px;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition:
    transform 160ms ease,
    border-color 160ms ease;
}

.intro-card:hover {
  transform: translateY(-2px);
  border-color: rgba(156, 121, 72, 0.28);
}

.intro-card--quote {
  border-left: 4px solid rgba(156, 121, 72, 0.5);
  background: rgba(27, 41, 51, 0.32);
}

.intro-heading {
  font-family: "Fraunces", serif;
  font-weight: 700;
  font-size: clamp(20px, 3vw, 30px);
  color: var(--c-cream);
  margin: 0;
  line-height: 1.2;
}

.intro-body {
  font-family: "Fraunces", serif;
  font-weight: 300;
  font-size: 1.3em;
  color: rgba(212, 201, 168, 0.78);
  line-height: 1.8;
  margin: 0;
}

.intro-body em {
  color: var(--c-cream);
  font-style: italic;
}

/* ── Mode chips ────────────────────────────────────────── */
.intro-modes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
}

.intro-mode-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(11, 20, 27, 0.6);
  border-radius: 8px;
  padding: 8px 14px 8px 6px;
  border: 1px solid transparent;
}

.intro-mode-chip--normal {
  border-color: rgba(156, 121, 72, 0.3);
}
.intro-mode-chip--insert {
  border-color: rgba(89, 105, 31, 0.35);
}
.intro-mode-chip--visual {
  border-color: rgba(196, 112, 96, 0.3);
}

.intro-mode-badge {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.75em;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 3px 8px;
  border-radius: 4px;
}

.intro-mode-chip--normal .intro-mode-badge {
  background: rgba(156, 121, 72, 0.15);
  color: var(--c-gold);
}
.intro-mode-chip--insert .intro-mode-badge {
  background: rgba(89, 105, 31, 0.18);
  color: #7aab2f;
}
.intro-mode-chip--visual .intro-mode-badge {
  background: rgba(196, 112, 96, 0.15);
  color: #c47060;
}

.intro-mode-label {
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.2em;
  color: rgba(212, 201, 168, 0.55);
  font-style: italic;
}

/* ── hjkl showcase ─────────────────────────────────────── */
.intro-hjkl {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin: 4px 0;
}

.intro-key-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  min-width: 56px;
}

.intro-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  font-family: "JetBrains Mono", monospace;
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--c-cream);
  background: rgba(11, 20, 27, 0.7);
  border: 1px solid rgba(156, 121, 72, 0.35);
  border-bottom: 3px solid rgba(156, 121, 72, 0.5);
  border-radius: 7px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.35);
  transition: transform 100ms ease;
}

.intro-key:hover {
  transform: translateY(-2px);
  border-color: rgba(156, 121, 72, 0.6);
}

.intro-key-arrow {
  font-size: 2em;
  color: var(--c-gold);
  line-height: 1;
}

.intro-key-desc {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.2em;
  color: var(--c-muted);
  letter-spacing: 0.06em;
}

.intro-callout {
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.2em;
  font-style: italic;
  color: rgba(212, 201, 168, 0.55);
  border-left: 3px solid rgba(156, 121, 72, 0.35);
  padding-left: 14px;
  margin: 0;
  line-height: 1.6;
}

/* ── Command list ──────────────────────────────────────── */
.intro-cmd-list {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 20px;
  align-items: baseline;
  margin: 0;
}

.intro-cmd-key {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.3em;
  font-weight: 500;
  color: var(--c-cream);
  background: rgba(11, 20, 27, 0.65);
  border: 1px solid rgba(156, 121, 72, 0.28);
  border-bottom: 2px solid rgba(156, 121, 72, 0.4);
  border-radius: 5px;
  padding: 3px 9px;
  white-space: nowrap;
}

.intro-cmd-desc {
  font-family: "Fraunces", serif;
  font-weight: 600;
  font-size: 1.2em;
  font-style: italic;
  color: rgba(212, 201, 168, 0.7);
  margin: 0;
  line-height: 1.4;
}

/* ── Quote card ────────────────────────────────────────── */
.intro-quote {
  font-family: "Fraunces", serif;
  font-weight: 300;
  font-style: italic;
  font-size: clamp(15px, 2vw, 19px);
  color: var(--c-cream);
  margin: 0;
  line-height: 1.75;
}

.intro-hint {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.2em;
  color: rgba(156, 121, 72, 0.5);
  margin: 4px 0 0;
  letter-spacing: 0.05em;
}
</style>

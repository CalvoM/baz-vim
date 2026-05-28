<script setup lang="ts">
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import type { EditorView, ViewUpdate } from '@codemirror/view';
import { vim, getCM } from '@replit/codemirror-vim';
import type { CodeMirrorRef, Statistics } from '../src/runtime/types/nuxt-codemirror';
import { bazVimTheme } from './theme';

useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,700;0,9..144,900;1,9..144,300;1,9..144,500&family=JetBrains+Mono:wght@400;500&family=Roboto:wght@300;400&display=swap',
    },
  ],
});

const starterCodes = {
  js: `// baz-vim — where code meets warmth
const forest = {
  palette: ['#9C7948', '#59691F', '#0B330C'],
  depth:   ['#361015', '#1B2933'],
}

function kindle(spark = 42) {
  const ember = spark > 0
    ? forest.palette.map(c => c.toUpperCase())
    : null

  console.log('burning bright ✦', ember)
  return ember
}

kindle()`,

  py: `# baz-vim — where code meets warmth
forest = {
    "palette": ["#9C7948", "#59691F", "#0B330C"],
    "depth":   ["#361015", "#1B2933"],
}

def kindle(spark=42):
    ember = (
        [c.upper() for c in forest["palette"]]
        if spark > 0 else None
    )
    print("burning bright ✦", ember)
    return ember

kindle()`,
}

const code  = ref(starterCodes.js);
const cmRef = ref<CodeMirrorRef>();
const stats = ref<Statistics | null>(null);

type Lang = 'js' | 'py'
const lang = ref<Lang>('js')
const langMeta = { js: { label: 'JavaScript', file: 'scratch.js' }, py: { label: 'Python', file: 'scratch.py' } }
const extensions = computed(() => [lang.value === 'js' ? javascript() : python(), vim()])

watch(lang, (l) => { code.value = starterCodes[l] })

interface VimModeEvent { mode: string; subMode?: string }
const vimModeEvent = ref<VimModeEvent>({ mode: 'normal' });

const vimModeLabel = computed(() => {
  const { mode, subMode } = vimModeEvent.value;
  if (mode === 'visual') {
    if (subMode === 'linewise')  return 'V-LINE';
    if (subMode === 'blockwise') return 'V-BLOCK';
    return 'VISUAL';
  }
  return mode.toUpperCase();
});

const vimModeClass = computed(() => `vim-mode--${vimModeEvent.value.mode}`);

function handleCreateEditor({ view }: { view: EditorView }) {
  const cm = getCM(view);
  if (!cm) return;
  cm.on('vim-mode-change', (e: VimModeEvent) => {
    vimModeEvent.value = e;
  });
}

const lineNum = computed(() => stats.value?.line.number ?? 1);
const colNum  = computed(() => {
  if (!stats.value) return 1;
  return stats.value.selectionAsSingle.anchor - stats.value.line.from + 1;
});
const lineCount = computed(() => stats.value?.lineCount ?? 0);

const handleStatistics = (s: Statistics) => { stats.value = s; };
const handleUpdate     = (_: ViewUpdate) => {
};
const handleChange     = (_v: string, _u: ViewUpdate) => {
};
</script>

<template>
  <!-- Ambient background orbs -->
  <div class="orb orb-gold"   aria-hidden="true" />
  <div class="orb orb-maroon" aria-hidden="true" />
  <div class="orb orb-forest" aria-hidden="true" />
  <div class="dot-grid"       aria-hidden="true" />

  <main class="site">

    <!-- ── Header ──────────────────────────────────────── -->
    <header class="site-header">
      <div class="badge">✦ VIM POWERED ✦</div>
      <h1 class="site-title">
        baz<span class="title-dash">-</span>vim
      </h1>
      <p class="site-tagline">
        <em>write code &nbsp;·&nbsp; live vim &nbsp;·&nbsp; burn bright</em>
      </p>
    </header>

    <!-- ── Editor card ─────────────────────────────────── -->
    <section class="editor-wrap">
      <div class="card-header">
        <div class="window-dots">
          <span class="dot dot-r" />
          <span class="dot dot-y" />
          <span class="dot dot-g" />
        </div>
        <span class="file-name">{{ langMeta[lang].file }}</span>
        <div class="lang-switcher">
          <button
            v-for="l in (['js', 'py'] as Lang[])"
            :key="l"
            class="lang-btn"
            :class="{ 'is-active': lang === l }"
            @click="lang = l"
          >{{ langMeta[l].label }}</button>
        </div>
      </div>

      <NuxtCodeMirror
        ref="cmRef"
        v-model="code"
        placeholder="start typing…"
        :auto-focus="true"
        :editable="true"
        :extensions="extensions"
        :basic-setup="true"
        :indent-with-tab="true"
        height="50vh"
        :theme="bazVimTheme"
        @on-change="handleChange"
        @on-statistics="handleStatistics"
        @on-update="handleUpdate"
        @on-create-editor="handleCreateEditor"
      />

      <!-- Status bar -->
      <div class="status-bar">
        <span class="vim-mode" :class="vimModeClass">{{ vimModeLabel }}</span>
        <span class="status-sep">│</span>
        <span class="cursor-pos">{{ lineNum }}:{{ colNum }}</span>
        <span class="status-sep">│</span>
        <span class="line-total">{{ lineCount }} lines</span>
        <span class="status-spacer" />
        <span class="status-lang">{{ langMeta[lang].label }}</span>
        <span class="status-sep">│</span>
        <span class="status-enc">UTF-8</span>
      </div>
    </section>

    <!-- ── Keyboard ─────────────────────────────────────── -->
    <section class="kb-section">
      <VimKeyboard :show-finger-colors="true" />
    </section>

    <!-- ── Footer ──────────────────────────────────────── -->
    <footer class="site-footer">
      <span class="footer-glyph">◆</span>
      <span>baz-vim</span>
      <span class="footer-glyph">◆</span>
    </footer>

  </main>
</template>

<style>
/* ── Reset & base ──────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --c-gold:    #9C7948;
  --c-olive:   #59691F;
  --c-maroon:  #361015;
  --c-forest:  #0B330C;
  --c-navy:    #1B2933;
  --c-cream:   #d4c9a8;
  --c-muted:   #7a8a7a;

  --gold-glow: rgba(156, 121, 72, 0.35);
  --gold-soft: rgba(156, 121, 72, 0.15);
}

html, body {
  height: 100%;
}

body {
  background: linear-gradient(145deg, #091e13 0%, #1B2933 48%, #1e0a0e 100%);
  min-height: 100vh;
  color: var(--c-cream);
  font-family: 'Fraunces', Georgia, serif;
}

/* ── Ambient orbs ──────────────────────────────────────── */
.orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
  will-change: transform;
}

.orb-gold {
  width: 640px;
  height: 640px;
  background: radial-gradient(circle, rgba(156,121,72,0.22) 0%, transparent 70%);
  top: -180px;
  right: -120px;
  animation: drift-a 22s ease-in-out infinite;
}

.orb-maroon {
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(54,16,21,0.5) 0%, transparent 70%);
  top: 35%;
  right: -80px;
  animation: drift-b 28s ease-in-out infinite;
}

.orb-forest {
  width: 580px;
  height: 580px;
  background: radial-gradient(circle, rgba(11,51,12,0.4) 0%, transparent 70%);
  bottom: -160px;
  left: 10%;
  animation: drift-c 34s ease-in-out infinite;
}

.dot-grid {
  position: fixed;
  inset: 0;
  background-image: radial-gradient(rgba(156,121,72,0.06) 1px, transparent 1px);
  background-size: 28px 28px;
  pointer-events: none;
  z-index: 0;
}

@keyframes drift-a {
  0%, 100% { transform: translate(0, 0) scale(1); }
  40%       { transform: translate(-40px, 30px) scale(1.08); }
  70%       { transform: translate(25px, -20px) scale(0.94); }
}
@keyframes drift-b {
  0%, 100% { transform: translate(0, 0) scale(1); }
  35%       { transform: translate(-30px, -40px) scale(1.05); }
  65%       { transform: translate(20px, 35px) scale(0.97); }
}
@keyframes drift-c {
  0%, 100% { transform: translate(0, 0) scale(1); }
  30%       { transform: translate(45px, -25px) scale(1.06); }
  60%       { transform: translate(-35px, 30px) scale(0.96); }
}

/* ── Site layout ───────────────────────────────────────── */
.site {
  position: relative;
  z-index: 1;
  max-width: 1100px;
  margin: 0 auto;
  padding: 48px 28px 40px;
  display: flex;
  flex-direction: column;
  gap: 36px;
}

/* ── Header ────────────────────────────────────────────── */
.site-header {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.badge {
  display: inline-block;
  font-family: 'Fraunces', serif;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--c-gold);
  border: 1px solid rgba(156,121,72,0.35);
  border-radius: 20px;
  padding: 5px 18px;
  background: rgba(156,121,72,0.08);
  position: relative;
  overflow: hidden;
}
.badge::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(156,121,72,0.25), transparent);
  animation: badge-shine 4s ease-in-out infinite;
}
@keyframes badge-shine {
  0%   { left: -60%; }
  50%, 100% { left: 130%; }
}

.site-title {
  font-family: 'Fraunces', serif;
  font-optical-sizing: auto;
  font-size: clamp(64px, 12vw, 112px);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: var(--c-gold);
  text-shadow:
    0 0 40px rgba(156,121,72,0.5),
    0 0 80px rgba(156,121,72,0.2),
    0 2px 0 rgba(0,0,0,0.4);
  animation: title-pulse 6s ease-in-out infinite;
}
.title-dash {
  color: var(--c-olive);
  text-shadow:
    0 0 30px rgba(89,105,31,0.6),
    0 0 60px rgba(89,105,31,0.2);
}

@keyframes title-pulse {
  0%, 100% {
    text-shadow:
      0 0 40px rgba(156,121,72,0.5),
      0 0 80px rgba(156,121,72,0.2),
      0 2px 0 rgba(0,0,0,0.4);
  }
  50% {
    text-shadow:
      0 0 55px rgba(156,121,72,0.7),
      0 0 110px rgba(156,121,72,0.3),
      0 2px 0 rgba(0,0,0,0.4);
  }
}

.site-tagline {
  font-family: 'Fraunces', serif;
  font-optical-sizing: auto;
  font-size: clamp(14px, 2vw, 18px);
  font-style: italic;
  font-weight: 300;
  color: rgba(212,201,168,0.7);
  letter-spacing: 0.04em;
}

/* ── Editor card ───────────────────────────────────────── */
.editor-wrap {
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(156,121,72,0.22);
  box-shadow:
    0 0 0 1px rgba(156,121,72,0.06),
    0 0 40px rgba(156,121,72,0.12),
    0 0 80px rgba(11,51,12,0.25),
    0 24px 64px rgba(0,0,0,0.55);
  animation: card-glow 8s ease-in-out infinite;
}
@keyframes card-glow {
  0%, 100% {
    box-shadow:
      0 0 0 1px rgba(156,121,72,0.06),
      0 0 40px rgba(156,121,72,0.12),
      0 0 80px rgba(11,51,12,0.25),
      0 24px 64px rgba(0,0,0,0.55);
  }
  50% {
    box-shadow:
      0 0 0 1px rgba(156,121,72,0.1),
      0 0 55px rgba(156,121,72,0.2),
      0 0 100px rgba(11,51,12,0.35),
      0 24px 64px rgba(0,0,0,0.55);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  background: #10191f;
  border-bottom: 1px solid rgba(156,121,72,0.12);
}

.window-dots {
  display: flex;
  gap: 7px;
  align-items: center;
}
.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.dot-r { background: #c47060; box-shadow: 0 0 6px rgba(196,112,96,0.5); }
.dot-y { background: #c4a060; box-shadow: 0 0 6px rgba(196,160,96,0.5); }
.dot-g { background: #7aab2f; box-shadow: 0 0 6px rgba(122,171,47,0.5); }

.file-name {
  font-family: 'Fraunces', serif;
  font-size: 13px;
  font-weight: 300;
  color: rgba(212,201,168,0.6);
  flex: 1;
  text-align: center;
  letter-spacing: 0.04em;
}

.lang-switcher {
  display: flex;
  gap: 4px;
}

.lang-btn {
  font-family: 'Fraunces', serif;
  font-size: 11px;
  font-weight: 300;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(212,201,168,0.4);
  background: transparent;
  border: 1px solid rgba(156,121,72,0.15);
  border-radius: 20px;
  padding: 3px 12px;
  cursor: pointer;
  transition: color 120ms, background 120ms, border-color 120ms;
}

.lang-btn:hover {
  color: rgba(212,201,168,0.7);
  border-color: rgba(156,121,72,0.3);
}

.lang-btn.is-active {
  color: var(--c-gold);
  background: rgba(156,121,72,0.1);
  border-color: rgba(156,121,72,0.35);
}

/* ── Status bar ────────────────────────────────────────── */
.status-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 16px;
  background: #10191f;
  border-top: 1px solid rgba(156,121,72,0.12);
  font-family: 'Fraunces', serif;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(212,201,168,0.5);
}

.vim-mode {
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.15em;
  border-radius: 4px;
  padding: 2px 8px;
  transition: color 80ms, background 80ms, border-color 80ms;
  /* normal (default) */
  color: var(--c-gold);
  background: rgba(156,121,72,0.12);
  border: 1px solid rgba(156,121,72,0.3);
}
.vim-mode--insert {
  color: #7aab2f;
  background: rgba(122,171,47,0.12);
  border-color: rgba(122,171,47,0.35);
}
.vim-mode--visual {
  color: #4a8fb5;
  background: rgba(74,143,181,0.12);
  border-color: rgba(74,143,181,0.35);
}
.vim-mode--replace {
  color: #c47060;
  background: rgba(196,112,96,0.12);
  border-color: rgba(196,112,96,0.35);
}

.cursor-pos { color: var(--c-cream); opacity: 0.75; }
.line-total { color: rgba(212,201,168,0.45); }
.status-sep { color: rgba(156,121,72,0.3); }
.status-spacer { flex: 1; }
.status-lang { color: rgba(212,201,168,0.5); }
.status-enc  { color: rgba(212,201,168,0.35); }

/* ── Keyboard section ──────────────────────────────────── */
.kb-section {
  /* Break out of .site's max-width so the keyboard isn't clipped */
  width: 100vw;
  margin-left: calc(50% - 50vw);
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding: 4px 0;
}

/* ── Footer ────────────────────────────────────────────── */
.site-footer {
  text-align: center;
  font-family: 'Fraunces', serif;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(156,121,72,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.footer-glyph {
  font-size: 8px;
  color: rgba(89,105,31,0.5);
}

/* ── Responsive ────────────────────────────────────────── */
@media (max-width: 600px) {
  .site { padding: 32px 16px 28px; gap: 24px; }
  .status-lang, .status-enc { display: none; }
}
</style>

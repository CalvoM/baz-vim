<script setup lang="ts">
const router = useRouter()

/* ── Section navigation ──────────────────────────────── */
const TOTAL = 5
const currentSection = ref(0)
let navCooldown = false

function navigate(dir: number) {
  if (navCooldown) return
  navCooldown = true
  currentSection.value = Math.max(0, Math.min(TOTAL - 1, currentSection.value + dir))
  setTimeout(() => { navCooldown = false }, 700)
}

function goTo(n: number) {
  currentSection.value = Math.max(0, Math.min(TOTAL - 1, n))
}

/* ── Typewriter ──────────────────────────────────────── */
const phrases = [
  'move at the speed of thought',
  'master the modal editor',
  'hjkl is all you need',
  'never touch the mouse again',
  'become a keyboard wizard',
]

const displayText   = ref('')
const cursorVisible = ref(true)

let phraseIdx = 0
let charIdx   = 0
let isDeleting = false
let typingTimer: ReturnType<typeof setTimeout> | null = null
let cursorTimer: ReturnType<typeof setInterval> | null = null

function typewriterTick() {
  const phrase = phrases[phraseIdx]
  if (!isDeleting) {
    charIdx++
    displayText.value = phrase.slice(0, charIdx)
    typingTimer = setTimeout(typewriterTick, charIdx === phrase.length ? 2200 : 68)
    if (charIdx === phrase.length) isDeleting = true
  } else {
    charIdx--
    displayText.value = phrase.slice(0, charIdx)
    if (charIdx === 0) {
      isDeleting = false
      phraseIdx  = (phraseIdx + 1) % phrases.length
      typingTimer = setTimeout(typewriterTick, 380)
    } else {
      typingTimer = setTimeout(typewriterTick, 36)
    }
  }
}

/* ── Pressed-key feedback ────────────────────────────── */
const pressedKey = ref<string | null>(null)

function flashKey(k: string) {
  pressedKey.value = k
  setTimeout(() => { pressedKey.value = null }, 200)
}

/* ── Toast (easter-egg command feedback) ─────────────── */
const toast = useToast()

/* ── Keyboard handler ────────────────────────────────── */
let lastKeyWasG = false
let gTimer: ReturnType<typeof setTimeout> | null = null

function handleKeydown(e: KeyboardEvent) {
  const key = e.key

  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(key)) {
    e.preventDefault()
    return
  }

  if (['h','j','k','l'].includes(key)) flashKey(key)

  switch (key) {
    case 'j': case 'J':
      navigate(1); break
    case 'k': case 'K':
      navigate(-1); break
    case 'G':
      goTo(TOTAL - 1)
      toast.show('G')
      break
    case 'g':
      if (lastKeyWasG) {
        goTo(0)
        toast.show('gg')
        lastKeyWasG = false
        if (gTimer) clearTimeout(gTimer)
      } else {
        lastKeyWasG = true
        gTimer = setTimeout(() => { lastKeyWasG = false }, 500)
      }
      break
    case 'Enter':
      if (currentSection.value === TOTAL - 1) router.push('/editor')
      break
  }
}

/* ── Wheel ───────────────────────────────────────────── */
let wheelCooldown = false

function handleWheel(e: WheelEvent) {
  if (wheelCooldown) return
  wheelCooldown = true
  navigate(e.deltaY > 0 ? 1 : -1)
  setTimeout(() => { wheelCooldown = false }, 700)
}

/* ── Touch ───────────────────────────────────────────── */
let touchStartY = 0

function handleTouchStart(e: TouchEvent) {
  touchStartY = e.touches[0].clientY
}
function handleTouchEnd(e: TouchEvent) {
  const diff = touchStartY - e.changedTouches[0].clientY
  if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1)
}

/* ── Lifecycle ───────────────────────────────────────── */
onMounted(() => {
  document.body.style.overflow = 'hidden'
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('wheel', handleWheel, { passive: true })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
  window.addEventListener('touchend', handleTouchEnd, { passive: true })
  typingTimer  = setTimeout(typewriterTick, 900)
  cursorTimer  = setInterval(() => { cursorVisible.value = !cursorVisible.value }, 530)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('wheel', handleWheel)
  window.removeEventListener('touchstart', handleTouchStart)
  window.removeEventListener('touchend', handleTouchEnd)
  if (typingTimer) clearTimeout(typingTimer)
  if (cursorTimer) clearInterval(cursorTimer)
  if (gTimer) clearTimeout(gTimer)
})

/* ── Static data ─────────────────────────────────────── */
const keysData = [
  { key: 'H', arrow: '←', direction: 'left',  desc: 'step back one character' },
  { key: 'J', arrow: '↓', direction: 'down',  desc: 'move to the line below'  },
  { key: 'K', arrow: '↑', direction: 'up',    desc: 'move to the line above'  },
  { key: 'L', arrow: '→', direction: 'right', desc: 'step forward one character' },
]

const features = [
  {
    icon: '⚡',
    name: 'Speed',
    desc: 'Modal editing means fewer keystrokes. Every motion is deliberate, every command composable.',
  },
  {
    icon: '🎯',
    name: 'Precision',
    desc: 'Navigate by word, sentence, paragraph. Land exactly where you need — without the mouse.',
  },
  {
    icon: '🌍',
    name: 'Universal',
    desc: 'Vim is everywhere. Your muscle memory travels with you to any terminal, any machine.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Feel the keys',
    desc: 'Navigate with h j k l. Let your hands forget the arrow keys ever existed.',
    keys: ['h', 'j', 'k', 'l'],
  },
  {
    num: '02',
    title: 'Learn the language',
    desc: 'Operators, motions, text objects. Vim commands compose like spoken sentences.',
    keys: ['d', 'w', 'c', 'i'],
  },
  {
    num: '03',
    title: 'Reach flow state',
    desc: 'Muscle memory takes over. Editing becomes a conversation. Thought becomes action.',
    keys: [],
  },
]
</script>

<template>
  <div class="landing">

    <!-- ── Progress dots (right rail) ──────────────────── -->
    <nav class="progress-nav" aria-label="Page sections">
      <button
        v-for="i in TOTAL"
        :key="i"
        class="progress-dot"
        :class="{ 'is-active': currentSection === i - 1 }"
        @click="goTo(i - 1)"
        :aria-label="`Go to section ${i}`"
      />
    </nav>

    <!-- ── Slides wrapper ───────────────────────────────── -->
    <div
      class="slides"
      :style="{ transform: `translateY(calc(${-currentSection} * 100vh))` }"
    >

      <!-- ─────────────────── SECTION 1 · Hero ─────────── -->
      <section class="slide" :class="{ 'is-active': currentSection === 0 }">
        <div class="slide-inner hero-inner">

          <div class="badge">✦ LEARN VIM THE RIGHT WAY ✦</div>

          <h1 class="hero-title">
            baz<span class="hero-dash">-</span>vim
          </h1>

          <p class="hero-tagline" aria-live="polite">
            <span class="typewriter-text">{{ displayText }}</span><span
              class="typewriter-cursor"
              :class="{ invisible: !cursorVisible }"
            >_</span>
          </p>

          <NuxtLink to="/editor" class="cta-btn">
            Begin Your Journey <span class="cta-arrow">→</span>
          </NuxtLink>

          <!-- hjkl key showcase -->
          <div class="hero-keys">
            <div v-for="k in keysData" :key="k.key" class="key-group">
              <kbd
                class="key-badge"
                :class="{ 'is-pressed': pressedKey === k.key.toLowerCase() }"
              >{{ k.key }}</kbd>
              <span class="key-label">{{ k.direction }}</span>
            </div>
          </div>

          <p class="nav-hint">
            press <kbd class="hint-key">j</kbd> to continue &nbsp;↓
          </p>

        </div>
      </section>

      <!-- ─────────────────── SECTION 2 · Why ──────────── -->
      <section class="slide" :class="{ 'is-active': currentSection === 1 }">
        <div class="slide-inner section-inner">
          <span class="eyebrow">the why</span>
          <h2 class="section-title">Stop fighting your editor.</h2>
          <p class="section-sub">In vim, you don't just edit text. You speak it.</p>

          <div class="feature-grid">
            <div
              v-for="f in features"
              :key="f.name"
              class="feature-card"
            >
              <div class="feature-icon">{{ f.icon }}</div>
              <h3 class="feature-name">{{ f.name }}</h3>
              <p class="feature-desc">{{ f.desc }}</p>
            </div>
          </div>

          <p class="nav-hint nav-hint--center">
            <kbd class="hint-key">k</kbd> back &nbsp;·&nbsp; <kbd class="hint-key">j</kbd> next
          </p>
        </div>
      </section>

      <!-- ─────────────────── SECTION 3 · Keys ─────────── -->
      <section class="slide" :class="{ 'is-active': currentSection === 2 }">
        <div class="slide-inner section-inner">
          <span class="eyebrow">the foundation</span>
          <h2 class="section-title">Four keys. Infinite reach.</h2>
          <p class="section-sub">Before commands, before operators — learn to move.</p>

          <div class="keys-showcase">
            <div
              v-for="k in keysData"
              :key="k.key"
              class="key-showcase-item"
            >
              <kbd
                class="key-badge key-badge--xl"
                :class="{ 'is-pressed': pressedKey === k.key.toLowerCase() }"
              >{{ k.key }}</kbd>
              <span class="key-arrow">{{ k.arrow }}</span>
              <span class="key-direction">{{ k.direction }}</span>
              <p class="key-desc">{{ k.desc }}</p>
            </div>
          </div>

          <p class="nav-hint nav-hint--center">
            <kbd class="hint-key">k</kbd> back &nbsp;·&nbsp; <kbd class="hint-key">j</kbd> next
          </p>
        </div>
      </section>

      <!-- ─────────────────── SECTION 4 · Path ─────────── -->
      <section class="slide" :class="{ 'is-active': currentSection === 3 }">
        <div class="slide-inner section-inner">
          <span class="eyebrow">your path</span>
          <h2 class="section-title">From lost to legendary.</h2>
          <p class="section-sub">A clear path from curious beginner to vim artisan.</p>

          <div class="steps">
            <div v-for="s in steps" :key="s.num" class="step">
              <div class="step-num">{{ s.num }}</div>
              <div class="step-body">
                <h3 class="step-title">{{ s.title }}</h3>
                <p class="step-desc">{{ s.desc }}</p>
              </div>
              <div v-if="s.keys.length" class="step-keys">
                <kbd v-for="k in s.keys" :key="k" class="hint-key">{{ k }}</kbd>
              </div>
            </div>
          </div>

          <p class="nav-hint nav-hint--center">
            <kbd class="hint-key">k</kbd> back &nbsp;·&nbsp; <kbd class="hint-key">j</kbd> next
          </p>
        </div>
      </section>

      <!-- ─────────────────── SECTION 5 · CTA ──────────── -->
      <section class="slide" :class="{ 'is-active': currentSection === 4 }">
        <div class="slide-inner cta-inner">
          <span class="eyebrow">begin</span>
          <h2 class="cta-title">
            Ready to<br>
            <span class="cta-title-gold">burn bright?</span>
          </h2>
          <p class="section-sub">Your vim journey starts with a single keystroke.</p>

          <NuxtLink to="/editor" class="cta-btn cta-btn--lg">
            Open the Editor <span class="cta-arrow">→</span>
          </NuxtLink>

          <p class="nav-hint">
            or press <kbd class="hint-key">Enter</kbd>
          </p>
        </div>
      </section>

    </div><!-- /slides -->

  </div><!-- /landing -->
</template>

<style>
/* ── Landing shell ─────────────────────────────────────── */
.landing {
  position: relative;
  z-index: 1;
  height: 100vh;
  overflow: hidden;
}

/* ── Slides ────────────────────────────────────────────── */
.slides {
  will-change: transform;
  transition: transform 680ms cubic-bezier(0.65, 0, 0.35, 1);
}

.slide {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
}

/* Content fade-in when section becomes active */
.slide-inner {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 520ms 160ms ease-out, transform 520ms 160ms ease-out;
}
.slide.is-active .slide-inner {
  opacity: 1;
  transform: translateY(0);
}

/* ── Progress nav dots ─────────────────────────────────── */
.progress-nav {
  position: fixed;
  right: 22px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 200;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.progress-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(156,121,72,0.2);
  border: 1px solid rgba(156,121,72,0.28);
  cursor: pointer;
  padding: 0;
  transition: background 200ms, transform 200ms, box-shadow 200ms;
}
.progress-dot:hover {
  background: rgba(156,121,72,0.45);
}
.progress-dot.is-active {
  background: var(--c-gold);
  border-color: var(--c-gold);
  transform: scale(1.5);
  box-shadow: 0 0 8px rgba(156,121,72,0.6);
}

/* ── Shared section layout ─────────────────────────────── */
.section-inner {
  text-align: center;
  max-width: 940px;
  width: 100%;
}

.eyebrow {
  display: block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--c-olive);
  margin-bottom: 14px;
}

.section-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(36px, 5vw, 62px);
  font-weight: 900;
  line-height: 1.0;
  letter-spacing: -0.025em;
  color: var(--c-cream);
  margin-bottom: 14px;
}

.section-sub {
  font-family: 'Fraunces', serif;
  font-size: clamp(15px, 2vw, 19px);
  font-weight: 300;
  font-style: italic;
  color: rgba(212,201,168,0.58);
  margin-bottom: 40px;
}

/* ── Nav hints ─────────────────────────────────────────── */
.nav-hint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: rgba(212,201,168,0.28);
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 32px;
}
.nav-hint--center {
  justify-content: center;
}

.hint-key {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-style: normal;
  color: rgba(156,121,72,0.65);
  background: rgba(156,121,72,0.07);
  border: 1px solid rgba(156,121,72,0.22);
  border-bottom: 2px solid rgba(156,121,72,0.32);
  border-radius: 4px;
  padding: 2px 6px;
}

/* ── Key badges ────────────────────────────────────────── */
.key-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 15px;
  font-weight: 500;
  color: var(--c-gold);
  background: rgba(16, 25, 31, 0.92);
  border: 1px solid rgba(156,121,72,0.38);
  border-bottom: 3px solid rgba(156,121,72,0.52);
  border-radius: 7px;
  padding: 10px 16px;
  min-width: 44px;
  cursor: default;
  user-select: none;
  transition:
    border-bottom-width 60ms,
    transform          60ms,
    background         140ms,
    box-shadow         140ms,
    color              140ms;
  box-shadow: 0 2px 10px rgba(0,0,0,0.35);
}
.key-badge:hover {
  border-bottom-width: 2px;
  transform: translateY(1px);
  background: rgba(156,121,72,0.09);
}
.key-badge.is-pressed {
  border-bottom-width: 1px;
  transform: translateY(2px);
  background: rgba(156,121,72,0.17);
  box-shadow: 0 0 14px rgba(156,121,72,0.38), 0 1px 4px rgba(0,0,0,0.3);
  color: #c4a060;
}

.key-badge--xl {
  font-size: 26px;
  padding: 18px 24px;
  min-width: 72px;
  border-radius: 10px;
  border-bottom-width: 4px;
}

/* ── Hero section ──────────────────────────────────────── */
.hero-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  max-width: 780px;
}

.hero-title {
  font-family: 'Fraunces', serif;
  font-optical-sizing: auto;
  font-size: clamp(72px, 13vw, 128px);
  font-weight: 900;
  line-height: 0.88;
  letter-spacing: -0.03em;
  color: var(--c-gold);
  text-shadow:
    0 0 40px rgba(156,121,72,0.5),
    0 0 80px rgba(156,121,72,0.2),
    0 2px 0 rgba(0,0,0,0.4);
  animation: title-pulse 6s ease-in-out infinite;
}
.hero-dash {
  color: var(--c-olive);
  text-shadow:
    0 0 30px rgba(89,105,31,0.6),
    0 0 60px rgba(89,105,31,0.2);
}

.hero-tagline {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(14px, 2vw, 19px);
  color: rgba(212,201,168,0.65);
  letter-spacing: 0.04em;
  min-height: 1.6em;
  line-height: 1.6;
}
.typewriter-text { color: var(--c-cream); }
.typewriter-cursor {
  color: var(--c-gold);
  margin-left: 1px;
}
.typewriter-cursor.invisible { opacity: 0; }

/* ── CTA button ────────────────────────────────────────── */
.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'Fraunces', serif;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-decoration: none;
  color: #12202b;
  background: var(--c-gold);
  border-radius: 32px;
  padding: 13px 30px;
  position: relative;
  overflow: hidden;
  transition: transform 160ms, box-shadow 160ms;
  box-shadow: 0 4px 22px rgba(156,121,72,0.38);
}
.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(156,121,72,0.52);
}
.cta-btn::after {
  content: '';
  position: absolute;
  top: 0; left: -100%;
  width: 55%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
  animation: btn-shimmer 3.2s ease-in-out infinite;
}
@keyframes btn-shimmer {
  0%        { left: -60%; }
  50%, 100% { left: 130%; }
}
.cta-btn:hover .cta-arrow {
  transform: translateX(4px);
}
.cta-arrow {
  display: inline-block;
  transition: transform 200ms;
}

.cta-btn--lg {
  font-size: 18px;
  padding: 16px 42px;
}

/* ── Hero key row ──────────────────────────────────────── */
.hero-keys {
  display: flex;
  gap: 14px;
  align-items: flex-start;
}

.key-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.key-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: rgba(212,201,168,0.35);
  letter-spacing: 0.06em;
  text-transform: lowercase;
}

/* ── Feature grid ──────────────────────────────────────── */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.feature-card {
  background: rgba(27, 41, 51, 0.48);
  border: 1px solid rgba(156,121,72,0.13);
  border-radius: 14px;
  padding: 30px 22px;
  backdrop-filter: blur(10px);
  text-align: left;
  transition: border-color 240ms, box-shadow 240ms, transform 220ms;
  cursor: default;
}
.feature-card:hover {
  border-color: rgba(156,121,72,0.34);
  box-shadow: 0 0 28px rgba(156,121,72,0.11), 0 14px 36px rgba(0,0,0,0.32);
  transform: translateY(-3px);
}

.feature-icon {
  font-size: 26px;
  margin-bottom: 13px;
  line-height: 1;
}

.feature-name {
  font-family: 'Fraunces', serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--c-gold);
  margin-bottom: 9px;
}

.feature-desc {
  font-family: 'Fraunces', serif;
  font-size: 14px;
  font-weight: 300;
  color: rgba(212,201,168,0.62);
  line-height: 1.65;
}

/* ── Keys showcase ─────────────────────────────────────── */
.keys-showcase {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-bottom: 8px;
}

.key-showcase-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 11px;
}

.key-arrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 20px;
  color: var(--c-gold);
  line-height: 1;
}

.key-direction {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: rgba(156,121,72,0.65);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.key-desc {
  font-family: 'Fraunces', serif;
  font-size: 12px;
  font-weight: 300;
  font-style: italic;
  color: rgba(212,201,168,0.45);
  max-width: 90px;
  text-align: center;
  line-height: 1.5;
}

/* ── Steps ─────────────────────────────────────────────── */
.steps {
  display: flex;
  flex-direction: column;
  max-width: 560px;
  margin: 0 auto;
  text-align: left;
}

.step {
  display: grid;
  grid-template-columns: 52px 1fr auto;
  align-items: center;
  gap: 18px;
  padding: 22px 0;
  border-bottom: 1px solid rgba(156,121,72,0.09);
  transition: border-color 200ms;
}
.step:last-child { border-bottom: none; }
.step:hover { border-bottom-color: rgba(156,121,72,0.2); }

.step-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 34px;
  font-weight: 400;
  color: rgba(156,121,72,0.18);
  line-height: 1;
  transition: color 200ms;
}
.step:hover .step-num { color: rgba(156,121,72,0.38); }

.step-title {
  font-family: 'Fraunces', serif;
  font-size: 19px;
  font-weight: 700;
  color: var(--c-cream);
  margin-bottom: 4px;
}

.step-desc {
  font-family: 'Fraunces', serif;
  font-size: 13px;
  font-weight: 300;
  color: rgba(212,201,168,0.52);
  line-height: 1.55;
}

.step-keys {
  display: flex;
  gap: 5px;
  flex-shrink: 0;
}

/* ── CTA section ───────────────────────────────────────── */
.cta-inner {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
}

.cta-title {
  font-family: 'Fraunces', serif;
  font-size: clamp(48px, 8vw, 94px);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.03em;
  color: var(--c-cream);
}
.cta-title-gold {
  color: var(--c-gold);
  text-shadow:
    0 0 40px rgba(156,121,72,0.5),
    0 0 80px rgba(156,121,72,0.2);
  animation: title-pulse 6s ease-in-out infinite;
}

/* ── Responsive ────────────────────────────────────────── */
@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    max-height: 60vh;
    overflow-y: auto;
  }

  .keys-showcase {
    gap: 16px;
  }
  .key-badge--xl {
    font-size: 20px;
    padding: 14px 18px;
    min-width: 56px;
  }

  .step {
    grid-template-columns: 40px 1fr;
  }
  .step-keys { display: none; }

  .progress-nav { right: 10px; }
}

@media (max-width: 480px) {
  .hero-keys { gap: 10px; }
  .key-badge { font-size: 13px; padding: 8px 12px; min-width: 36px; }
  .keys-showcase { gap: 10px; }
  .section-sub { margin-bottom: 24px; }
}
</style>

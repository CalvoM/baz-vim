<script setup lang="ts">
type Finger = 'lp' | 'lr' | 'lm' | 'li' | 'ri' | 'rm' | 'rr' | 'rp' | 'th';

// Each finger gets a distinct color rooted in the baz-vim palette
const FINGER_COLORS: Record<Finger, string> = {
  lp: '122, 92, 158',   // purple  — left pinky
  lr: '74, 143, 181',   // blue    — left ring
  lm: '89, 132, 31',    // olive   — left middle (brand)
  li: '109, 155, 58',   // green   — left index
  ri: '156, 121, 72',   // gold    — right index (brand)
  rm: '196, 134, 74',   // amber   — right middle
  rr: '196, 112, 96',   // coral   — right ring
  rp: '158, 61, 92',    // rose    — right pinky
  th: '74, 138, 138',   // teal    — thumbs (space)
};

interface KeyDef {
  label: string;
  key: string;      // KeyboardEvent.key value
  code: string;     // KeyboardEvent.code (unique per physical key)
  finger: Finger;
  width: number;    // in key units (1u = 44px + 4px gap)
}

// Standard QWERTY layout — all rows total 15 units wide
const ROWS: KeyDef[][] = [
  // Number row — 1+1+1+1+1+1+1+1+1+1+1+1+1+2 = 15
  [
    { label: '`',  key: '`',         code: 'Backquote',    finger: 'lp', width: 1    },
    { label: '1',  key: '1',         code: 'Digit1',       finger: 'lp', width: 1    },
    { label: '2',  key: '2',         code: 'Digit2',       finger: 'lr', width: 1    },
    { label: '3',  key: '3',         code: 'Digit3',       finger: 'lm', width: 1    },
    { label: '4',  key: '4',         code: 'Digit4',       finger: 'li', width: 1    },
    { label: '5',  key: '5',         code: 'Digit5',       finger: 'li', width: 1    },
    { label: '6',  key: '6',         code: 'Digit6',       finger: 'ri', width: 1    },
    { label: '7',  key: '7',         code: 'Digit7',       finger: 'ri', width: 1    },
    { label: '8',  key: '8',         code: 'Digit8',       finger: 'rm', width: 1    },
    { label: '9',  key: '9',         code: 'Digit9',       finger: 'rr', width: 1    },
    { label: '0',  key: '0',         code: 'Digit0',       finger: 'rp', width: 1    },
    { label: '-',  key: '-',         code: 'Minus',        finger: 'rp', width: 1    },
    { label: '=',  key: '=',         code: 'Equal',        finger: 'rp', width: 1    },
    { label: '⌫',  key: 'Backspace', code: 'Backspace',    finger: 'rp', width: 2    },
  ],
  // QWERTY row — 1.5 + 12×1 + 1.5 = 15
  [
    { label: 'Tab', key: 'Tab',      code: 'Tab',          finger: 'lp', width: 1.5  },
    { label: 'Q',   key: 'q',        code: 'KeyQ',         finger: 'lp', width: 1    },
    { label: 'W',   key: 'w',        code: 'KeyW',         finger: 'lr', width: 1    },
    { label: 'E',   key: 'e',        code: 'KeyE',         finger: 'lm', width: 1    },
    { label: 'R',   key: 'r',        code: 'KeyR',         finger: 'li', width: 1    },
    { label: 'T',   key: 't',        code: 'KeyT',         finger: 'li', width: 1    },
    { label: 'Y',   key: 'y',        code: 'KeyY',         finger: 'ri', width: 1    },
    { label: 'U',   key: 'u',        code: 'KeyU',         finger: 'ri', width: 1    },
    { label: 'I',   key: 'i',        code: 'KeyI',         finger: 'rm', width: 1    },
    { label: 'O',   key: 'o',        code: 'KeyO',         finger: 'rr', width: 1    },
    { label: 'P',   key: 'p',        code: 'KeyP',         finger: 'rp', width: 1    },
    { label: '[',   key: '[',        code: 'BracketLeft',  finger: 'rp', width: 1    },
    { label: ']',   key: ']',        code: 'BracketRight', finger: 'rp', width: 1    },
    { label: '\\',  key: '\\',       code: 'Backslash',    finger: 'rp', width: 1.5  },
  ],
  // Home row — 1.75 + 11×1 + 2.25 = 15
  [
    { label: 'Caps', key: 'CapsLock', code: 'CapsLock',    finger: 'lp', width: 1.75 },
    { label: 'A',    key: 'a',        code: 'KeyA',        finger: 'lp', width: 1    },
    { label: 'S',    key: 's',        code: 'KeyS',        finger: 'lr', width: 1    },
    { label: 'D',    key: 'd',        code: 'KeyD',        finger: 'lm', width: 1    },
    { label: 'F',    key: 'f',        code: 'KeyF',        finger: 'li', width: 1    },
    { label: 'G',    key: 'g',        code: 'KeyG',        finger: 'li', width: 1    },
    { label: 'H',    key: 'h',        code: 'KeyH',        finger: 'ri', width: 1    },
    { label: 'J',    key: 'j',        code: 'KeyJ',        finger: 'ri', width: 1    },
    { label: 'K',    key: 'k',        code: 'KeyK',        finger: 'rm', width: 1    },
    { label: 'L',    key: 'l',        code: 'KeyL',        finger: 'rr', width: 1    },
    { label: ';',    key: ';',        code: 'Semicolon',   finger: 'rp', width: 1    },
    { label: "'",    key: "'",        code: 'Quote',       finger: 'rp', width: 1    },
    { label: '↵',    key: 'Enter',    code: 'Enter',       finger: 'rp', width: 2.25 },
  ],
  // Shift row — 2.25 + 10×1 + 2.75 = 15
  [
    { label: '⇧',    key: 'Shift',   code: 'ShiftLeft',   finger: 'lp', width: 2.25 },
    { label: 'Z',    key: 'z',       code: 'KeyZ',        finger: 'lp', width: 1    },
    { label: 'X',    key: 'x',       code: 'KeyX',        finger: 'lr', width: 1    },
    { label: 'C',    key: 'c',       code: 'KeyC',        finger: 'lm', width: 1    },
    { label: 'V',    key: 'v',       code: 'KeyV',        finger: 'li', width: 1    },
    { label: 'B',    key: 'b',       code: 'KeyB',        finger: 'li', width: 1    },
    { label: 'N',    key: 'n',       code: 'KeyN',        finger: 'ri', width: 1    },
    { label: 'M',    key: 'm',       code: 'KeyM',        finger: 'ri', width: 1    },
    { label: ',',    key: ',',       code: 'Comma',       finger: 'rm', width: 1    },
    { label: '.',    key: '.',       code: 'Period',      finger: 'rr', width: 1    },
    { label: '/',    key: '/',       code: 'Slash',       finger: 'rp', width: 1    },
    { label: '⇧',    key: 'Shift',   code: 'ShiftRight',  finger: 'rp', width: 2.75 },
  ],
  // Bottom row — 1.25+1.25+10+1.25+1.25 = 15
  [
    { label: 'Ctrl', key: 'Control', code: 'ControlLeft',  finger: 'lp', width: 1.25 },
    { label: 'Alt',  key: 'Alt',     code: 'AltLeft',      finger: 'lp', width: 1.25 },
    { label: '',     key: ' ',       code: 'Space',        finger: 'th', width: 10   },
    { label: 'Alt',  key: 'Alt',     code: 'AltRight',     finger: 'rp', width: 1.25 },
    { label: 'Ctrl', key: 'Control', code: 'ControlRight', finger: 'rp', width: 1.25 },
  ],
];

const props = withDefaults(defineProps<{
  nextKey?: string;
  showFingerColors?: boolean;
}>(), {
  showFingerColors: true,
});

// Track pressed keys by code (precise, handles L/R variants)
const pressedCodes = ref(new Set<string>());

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Tab') e.preventDefault();
  pressedCodes.value = new Set([...pressedCodes.value, e.code]);
}

function onKeyUp(e: KeyboardEvent) {
  const s = new Set(pressedCodes.value);
  s.delete(e.code);
  pressedCodes.value = s;
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
});

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown);
  document.removeEventListener('keyup', onKeyUp);
});

function isPressed(keyDef: KeyDef): boolean {
  return pressedCodes.value.has(keyDef.code);
}

function isNext(keyDef: KeyDef): boolean {
  if (!props.nextKey) return false;
  return keyDef.key.toLowerCase() === props.nextKey.toLowerCase();
}

// Inline style per key: width + finger color CSS var
function keyStyle(keyDef: KeyDef): Record<string, string> {
  const rgb = props.showFingerColors
    ? FINGER_COLORS[keyDef.finger]
    : '156, 121, 72';  // fallback to brand gold when colors are off
  return {
    '--fr': rgb,
    'width': `calc(${keyDef.width} * 66px + ${keyDef.width - 1} * 6px)`,
  };
}
</script>

<template>
  <div class="kb-wrap" role="img" aria-label="Keyboard diagram">
    <div
      v-for="(row, ri) in ROWS"
      :key="ri"
      class="kb-row"
    >
      <div
        v-for="keyDef in row"
        :key="keyDef.code"
        class="kb-key"
        :class="{
          'is-pressed': isPressed(keyDef),
          'is-next':    isNext(keyDef),
          'is-wide':    keyDef.width >= 2,
          'is-space':   keyDef.key === ' ',
        }"
        :style="keyStyle(keyDef)"
        :title="keyDef.key"
      >
        <span class="kb-label">{{ keyDef.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Keyboard shell ──────────────────────────────────────── */
.kb-wrap {
  display: inline-flex;
  flex-direction: column;
  gap: 6px;
  padding: 18px;
  border-radius: 18px;
  background: rgba(9, 16, 14, 0.95);
  border: 1px solid rgba(156, 121, 72, 0.2);
  box-shadow:
    0 0 0 1px rgba(156, 121, 72, 0.06),
    0 8px 32px rgba(0, 0, 0, 0.6),
    0 0 60px rgba(11, 51, 12, 0.2);
}

/* ── Row ─────────────────────────────────────────────────── */
.kb-row {
  display: flex;
  gap: 6px;
  align-items: center;
}

/* ── Individual key ──────────────────────────────────────── */
.kb-key {
  /* --fr: finger RGB, set inline per key */
  --fr: 156, 121, 72;

  flex: 0 0 auto;
  height: 66px;
  border-radius: 9px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-bottom-color: rgba(0, 0, 0, 0.5);

  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(0, 0, 0, 0.1) 100%
    );
  background-color: rgba(var(--fr), 0.09);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  user-select: none;

  box-shadow:
    0 3px 0 rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.07);

  transition:
    transform       75ms ease-out,
    box-shadow      75ms ease-out,
    background-color 75ms ease-out,
    border-color    75ms ease-out,
    color           75ms ease-out;

  will-change: transform;
}

/* ── Key label ───────────────────────────────────────────── */
.kb-label {
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: rgba(212, 201, 168, 0.55);
  transition: color 75ms ease-out;
  pointer-events: none;
  line-height: 1;
}

.is-wide .kb-label {
  font-size: 14px;
  letter-spacing: 0.04em;
}

.is-space .kb-label {
  /* spacebar has no visible label */
  opacity: 0;
}

/* ── Hover ───────────────────────────────────────────────── */
.kb-key:hover {
  background-color: rgba(var(--fr), 0.16);
  border-color: rgba(var(--fr), 0.25);
}

.kb-key:hover .kb-label {
  color: rgba(212, 201, 168, 0.85);
}

/* ── Pressed ─────────────────────────────────────────────── */
.kb-key.is-pressed {
  transform: translateY(3px);
  background-color: rgba(var(--fr), 0.32);
  border-color: rgba(var(--fr), 0.5);
  border-bottom-color: rgba(var(--fr), 0.3);

  box-shadow:
    0 0 0 rgba(0, 0, 0, 0),
    0 0 20px rgba(var(--fr), 0.55),
    inset 0 1px 2px rgba(0, 0, 0, 0.3);
}

.kb-key.is-pressed .kb-label {
  color: rgb(var(--fr));
  text-shadow: 0 0 8px rgba(var(--fr), 0.8);
}

/* ── Next key (typing guide) ─────────────────────────────── */
.kb-key.is-next {
  border-color: rgba(var(--fr), 0.55);
  animation: key-pulse 1.6s ease-in-out infinite;
}

.kb-key.is-next .kb-label {
  color: rgb(var(--fr));
}

@keyframes key-pulse {
  0%, 100% {
    box-shadow:
      0 2px 0 rgba(0, 0, 0, 0.45),
      0 0  6px rgba(var(--fr), 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.07);
    background-color: rgba(var(--fr), 0.09);
  }
  50% {
    box-shadow:
      0 2px 0 rgba(0, 0, 0, 0.45),
      0 0 22px rgba(var(--fr), 0.55),
      inset 0 1px 0 rgba(255, 255, 255, 0.07);
    background-color: rgba(var(--fr), 0.2);
  }
}

/* ── Finger legend ───────────────────────────────────────── */
.kb-legend {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 10px;
  padding: 0 2px;
}

.kb-legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Fraunces', serif;
  font-size: 10px;
  font-weight: 300;
  letter-spacing: 0.06em;
  color: rgba(212, 201, 168, 0.4);
}

.kb-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}
</style>

<script setup lang="ts">
import type {Statistics, CodeMirrorRef} from "#build/nuxt-codemirror";
import { vim, Vim, getCM } from '@replit/codemirror-vim';
import { keymap } from '@codemirror/view';
import type { EditorView, ViewUpdate } from '@codemirror/view';
import { Prec } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { bazVimTheme } from '../theme';

const lang_meta = useLang();
const editor_stats = useEditorStats();
const vim_editor = useVimeEditor();

const cmRef = ref<CodeMirrorRef>();

const blockArrowKeys = Prec.highest(keymap.of([
  { key: 'ArrowLeft',  run: () => true },
  { key: 'ArrowRight', run: () => true },
  { key: 'ArrowUp',    run: () => true },
  { key: 'ArrowDown',  run: () => true },
]));

const extensions = computed(() => [lang_meta.currentLanguage.value === 'js' ? javascript() : python(), vim(), blockArrowKeys])

function handleCreateEditor({ view }: { view: EditorView }) {
  const cm = getCM(view);
  if (!cm) return;
  cm.on('vim-mode-change', (e: VimModeEvent) => {
    vim_editor.setVimModeEvent(e);
  });
  Vim.unmap("<Left>");
  Vim.unmap("<Right>");
  Vim.unmap("<Up>");
  Vim.unmap("<Down>");
  Vim.unmap("gg", "normal");
}

const handleStatistics = (s: Statistics) => { editor_stats.updateStatistics(s); };
const handleUpdate     = (_: ViewUpdate) => {
};
const handleChange     = (_v: string, _u: ViewUpdate) => {}

</script>

<template>
      <NuxtCodeMirror
        ref="cmRef"
        v-model="lang_meta.currentStarterCode.value"
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
</template>

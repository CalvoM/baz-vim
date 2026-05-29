<script setup lang="ts">
import type {Statistics, CodeMirrorRef} from "#build/nuxt-codemirror";
import { vim, getCM } from '@replit/codemirror-vim';
import type { EditorView, ViewUpdate } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { bazVimTheme } from '../theme';

const lang_meta = useLang();
const editor_stats = useEditorStats();
const vim_editor = useVimeEditor();

const cmRef = ref<CodeMirrorRef>();
const extensions = computed(() => [lang_meta.currentLanguage.value === 'js' ? javascript() : python(), vim()])

function handleCreateEditor({ view }: { view: EditorView }) {
  const cm = getCM(view);
  if (!cm) return;
  cm.on('vim-mode-change', (e: VimModeEvent) => {
    vim_editor.setVimModeEvent(e);
  });
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

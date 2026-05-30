<script setup lang="ts">
import { LangMetaDetails, type Lang } from '~/utils/starter-code';

definePageMeta({ layout: 'editor' })

const lang_meta    = useLang();
const editor_stats = useEditorStats();
const vim_editor   = useVimeEditor();
</script>

<template>
  <div class="editor-page">

    <!-- ── Editor card ─────────────────────────────────── -->
    <section class="editor-wrap">
      <div class="card-header">
        <div class="window-dots">
          <span class="dot dot-r" />
          <span class="dot dot-y" />
          <span class="dot dot-g" />
        </div>
        <span class="file-name">{{ lang_meta.currentFileName }}</span>
        <div class="lang-switcher">
          <button
            v-for="l in (['js', 'py'] as Lang[])"
            :key="l"
            class="lang-btn"
            :class="{ 'is-active': lang_meta.currentLanguage.value === l }"
            @click="lang_meta.switchLanguage(l)"
          >{{ LangMetaDetails[l].label }}</button>
        </div>
      </div>

      <VimEditor />

      <!-- Status bar -->
      <div class="status-bar">
        <span class="vim-mode" :class="vim_editor.vimModeClass">{{ vim_editor.vimModeLabel }}</span>
        <span class="status-sep">│</span>
        <span class="cursor-pos">{{ editor_stats.currentLineNum }}:{{ editor_stats.currentColNum }}</span>
        <span class="status-sep">│</span>
        <span class="line-total">{{ editor_stats.currentLineCount }} lines</span>
        <span class="status-spacer" />
        <span class="status-lang">{{ lang_meta.currentLabel }}</span>
        <span class="status-sep">│</span>
        <span class="status-enc">UTF-8</span>
      </div>
    </section>

    <!-- ── Keyboard ─────────────────────────────────────── -->
    <section class="kb-section kb-section--inset">
      <VimKeyboard :show-finger-colors="true" />
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
</style>

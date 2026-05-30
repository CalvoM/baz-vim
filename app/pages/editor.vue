<script setup lang="ts">
import { LangMetaDetails, type Lang } from '~/utils/starter-code';

const lang_meta   = useLang();
const editor_stats = useEditorStats();
const vim_editor  = useVimeEditor();
</script>

<template>
  <main class="site">

    <!-- ── Header ──────────────────────────────────────── -->
    <header class="site-header">
      <NuxtLink to="/" class="home-link">← home</NuxtLink>
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
.home-link {
  position: absolute;
  top: 0;
  left: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: rgba(156,121,72,0.5);
  text-decoration: none;
  letter-spacing: 0.06em;
  transition: color 150ms;
  padding: 4px 0;
}
.home-link:hover {
  color: var(--c-gold);
}
</style>

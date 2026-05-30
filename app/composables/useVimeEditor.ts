export default function () {
  const store = useVimEditorStore();

  const vimModeEvent = computed(() => store.vimModeEvent);
  const mode = computed(() => store.mode);
  const subMode = computed(() => store.subMode);
  const vimModeLabel = computed(() => store.vimModeLabel);
  const vimModeClass = computed(() => store.vimModeClass);
  const setVimModeEvent = (e: VimModeEvent) => store.setVimModeEvent(e);
  return {
    vimModeEvent,
    mode,
    subMode,
    vimModeLabel,
    vimModeClass,
    setVimModeEvent,
  };
}

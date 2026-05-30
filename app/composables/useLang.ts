export default function () {
  const store = useLangStore();
  const currentLanguage = computed(() => store.currentLanguage);
  const currentLabel = computed(() => store.currentLabel);
  const currentStarterCode = computed(() => store.currentStarterCode);
  const currentFileName = computed(() => store.currentFileName);
  const switchLanguage = (lang: Lang) => store.setCurrentLanguage(lang);
  return {
    currentLanguage,
    currentLabel,
    currentStarterCode,
    currentFileName,
    switchLanguage,
  };
}

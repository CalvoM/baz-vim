import type { Statistics } from "#build/nuxt-codemirror";

export default function () {
  const store = useEditorStatsStore();

  const currentStats = computed(() => store.stats);
  const currentLineNum = computed(() => store.lineNum);
  const currentColNum = computed(() => store.colNum);
  const currentLineCount = computed(() => store.lineCount);
  const updateStatistics = (stats: Statistics) => store.setStatistics(stats);
  return {
    currentStats,
    currentLineNum,
    currentColNum,
    currentLineCount,
    updateStatistics,
  };
}

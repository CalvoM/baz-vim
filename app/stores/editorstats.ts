import type { Statistics } from "#build/nuxt-codemirror";
import { defineStore } from "pinia";

export const useEditorStatsStore = defineStore("editorstats", {
  state: () => {
    return {
      stats: null as Statistics | null,
    };
  },
  getters: {
    lineNum: (state) => state.stats?.line.number ?? 1,
    colNum(state) {
      if (!state.stats) return 1;
      return state.stats?.selectionAsSingle.anchor - state.stats.line.from + 1;
    },
    lineCount: (state) => state.stats?.lineCount ?? 0,
  },
  actions: {
    setStatistics(stats: Statistics) {
      this.stats = stats;
    },
  },
});

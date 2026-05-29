import {defineStore} from "pinia";
import type {VimModeEvent} from "~/utils/vimeditor";

export const useVimEditorStore = defineStore("vimeditor", {
  state: () => {
    return{
      vimModeEvent: {mode: 'normal', subMode: undefined} as VimModeEvent,
    }
  },
  getters:{
    mode: (state) => state.vimModeEvent.mode,
    subMode: (state) => state.vimModeEvent.subMode,
    vimModeClass: (state) => `vim-mode--${state.vimModeEvent.mode}`,
    vimModeLabel(state){
      const {mode, subMode} = state.vimModeEvent;
      if (mode === 'visual') {
        if (subMode === 'linewise')  return 'V-LINE';
        if (subMode === 'blockwise') return 'V-BLOCK';
        return 'VISUAL';
      }
      return mode.toUpperCase();
    },
  },
  actions: {
    setVimModeEvent(event: VimModeEvent){
      this.vimModeEvent = event;
    }
  }
})

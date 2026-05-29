import {defineStore} from "pinia";
import {LangMetaDetails} from "~/utils/starter-code";

export const useLangStore = defineStore("langs", {
  state: () => {
    return {
      currentLanguage: "js" as Lang,
    };

  },
  getters: {
    currentStarterCode: (state) => LangMetaDetails[state.currentLanguage].starterCode,
    currentLabel: (state) => LangMetaDetails[state.currentLanguage].label,
    currentFileName: (state) => LangMetaDetails[state.currentLanguage].file_name,
  },
  actions: {
    setCurrentLanguage(lang: Lang){
      this.currentLanguage = lang
    }
  }
})

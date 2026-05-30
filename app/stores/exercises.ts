import { defineStore } from "pinia";
import { EXERCISES } from "~/utils/exercises";

export const useExercisesStore = defineStore("exercises", {
  state: () => ({
    completedIds: [] as string[],
    currentId: EXERCISES[0].id,
  }),
  getters: {
    isComplete: (state) => (id: string) => state.completedIds.includes(id),
    currentExercise: (state) =>
      EXERCISES.find((e) => e.id === state.currentId) ?? EXERCISES[0],
    completionCount: (state) => state.completedIds.length,
  },
  actions: {
    setCurrentId(id: string) {
      this.currentId = id;
    },
    markComplete(id: string) {
      if (!this.completedIds.includes(id)) this.completedIds.push(id);
    },
  },
});

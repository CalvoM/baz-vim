import { EXERCISES, CATEGORY_ORDER, CATEGORY_LABELS } from '~/utils/exercises'
import type { Category } from '~/utils/exercises'

export default function () {
  const store = useExercisesStore()

  const completedSet = computed(() => new Set(store.completedIds))

  const grouped = computed(() => {
    return CATEGORY_ORDER.map(cat => ({
      category: cat,
      label:    CATEGORY_LABELS[cat],
      items:    EXERCISES.filter(e => e.category === cat),
    })).filter(g => g.items.length > 0)
  })

  return {
    exercises:       EXERCISES,
    grouped,
    currentId:       computed(() => store.currentId),
    currentExercise: computed(() => store.currentExercise),
    completedSet,
    completionCount: computed(() => store.completionCount),
    totalCount:      EXERCISES.length,
    isComplete:      (id: string) => completedSet.value.has(id),
    setCurrentId:    (id: string) => store.setCurrentId(id),
    markComplete:    (id: string) => store.markComplete(id),
  }
}

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Category =
  | "introduction"
  | "navigation"
  | "editing"
  | "motions"
  | "operators"
  | "visual";

export interface Exercise {
  id: string;
  title: string;
  category: Category;
  difficulty: Difficulty;
  description: string;
}

export const EXERCISES: Exercise[] = [
  // Introduction
  {
    id: "introduction-to-vim",
    title: "Introduction",
    category: "introduction",
    difficulty: "beginner",
    description: "Understanding vim",
  },
  // Navigation
  {
    id: "hjkl-01",
    title: "Basic Navigation",
    category: "navigation",
    difficulty: "beginner",
    description: "Move with h j k l — no arrow keys",
  },
  {
    id: "word-01",
    title: "Word Jumps",
    category: "navigation",
    difficulty: "beginner",
    description: "Jump by word with w, b, e",
  },
  {
    id: "line-01",
    title: "Line Boundaries",
    category: "navigation",
    difficulty: "beginner",
    description: "Jump to start and end of line with 0 and $",
  },
  {
    id: "jump-01",
    title: "File Jumps",
    category: "navigation",
    difficulty: "intermediate",
    description: "gg, G, and line numbers with :N",
  },

  // Motions
  {
    id: "search-01",
    title: "Search & Navigate",
    category: "motions",
    difficulty: "intermediate",
    description: "/, ?, n, N — find and move through matches",
  },
  {
    id: "find-01",
    title: "Find on Line",
    category: "motions",
    difficulty: "intermediate",
    description: "f, t, F, T — jump to characters on a line",
  },

  // Editing
  {
    id: "delete-01",
    title: "Delete Motions",
    category: "editing",
    difficulty: "intermediate",
    description: "Delete with d + motion: dw, dd, d$",
  },
  {
    id: "change-01",
    title: "Change in Place",
    category: "editing",
    difficulty: "intermediate",
    description: 'Change text with c + motion: cw, cc, ci"',
  },
  {
    id: "yank-01",
    title: "Yank & Paste",
    category: "editing",
    difficulty: "intermediate",
    description: "Copy with y, paste with p and P",
  },

  // Operators
  {
    id: "textobj-01",
    title: "Text Objects",
    category: "operators",
    difficulty: "advanced",
    description: "ciw, dap, yis — operate on semantic objects",
  },
  {
    id: "repeat-01",
    title: "Dot Repeat",
    category: "operators",
    difficulty: "advanced",
    description: ". repeats the last change — learn to use it",
  },

  // Visual
  {
    id: "visual-01",
    title: "Visual Selection",
    category: "visual",
    difficulty: "intermediate",
    description: "Select with v (char), V (line), Ctrl-v (block)",
  },
  {
    id: "visual-02",
    title: "Visual Operators",
    category: "visual",
    difficulty: "advanced",
    description: "Apply d, c, y, > on a visual selection",
  },
];

export const CATEGORY_ORDER: Category[] = [
  "introduction",
  "navigation",
  "motions",
  "editing",
  "operators",
  "visual",
];

export const CATEGORY_LABELS: Record<Category, string> = {
  introduction: "Introduction",
  navigation: "Navigation",
  motions: "Motions",
  editing: "Editing",
  operators: "Operators",
  visual: "Visual",
};

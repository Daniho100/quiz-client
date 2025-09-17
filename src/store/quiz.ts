import { create } from 'zustand';

interface QuizState {
  questions: any[];
  currentQuestion: number;
  answers: { [key: number]: number };
  startTime: number | null;
  setQuestions: (questions: any[]) => void;
  setAnswer: (questionId: number, option: number) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  startQuiz: () => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  questions: [],
  currentQuestion: 0,
  answers: {},
  startTime: null,
  setQuestions: (questions) => set({ questions }),
  setAnswer: (questionId, option) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: option },
    })),
  nextQuestion: () => set((state) => ({ currentQuestion: state.currentQuestion + 1 })),
  prevQuestion: () => set((state) => ({ currentQuestion: state.currentQuestion - 1 })),
  startQuiz: () => set({ startTime: Date.now() }),
  resetQuiz: () =>
    set({ questions: [], currentQuestion: 0, answers: {}, startTime: null }),
}));
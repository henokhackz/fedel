import { Lesson } from '@/type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {v4 as uuid  } from 'uuid';



export type LessonActions = {
  addLesson: (lesson: Lesson) => void;
  updateLesson: (lesson: Lesson) => void;
  removeLesson: (title: string) => void;
};


// Default initial state for lessons
export const defaultInitState: Lesson[] = [];



export const useLessonStore = create<LessonActions & { lessons: Lesson[] }>()(
  persist(
    (set) => ({
      lessons: defaultInitState,
      addLesson: (lesson) => set((state) => ({ lessons: [...state.lessons, { ...lesson, id: uuid() } ] })),
      updateLesson: (lesson) => set((state) => ({ lessons: state.lessons.map((l) => (l.id === lesson.id ? lesson : l)) })),
      removeLesson: (id) => set((state) => ({ lessons: state.lessons.filter((l) => l.id !== id) })),
    }),
    {
      name: "lessons", 
    }
  )
);

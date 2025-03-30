// src/stores/subtitle.store.ts
import { SubtitleData } from '@/type';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'



export type SubtitleActions = {
  addSubtitle: (subtitle: SubtitleData) => void;
  updateSubtitle: (subtitle: SubtitleData) => void;
  removeSubtitle: (name: string) => void; 
  subtitle: SubtitleData[]; 
};

export const defaultInitState: SubtitleData[] = [];

export const useSubtitleStore = create<SubtitleActions & { subtitle: SubtitleData[] }>()(
  persist(
    (set) => ({
      subtitle: defaultInitState,
      addSubtitle: (subtitle: SubtitleData) =>
        set((state) => {
          const exists = state.subtitle.some((s) => s.id === subtitle.id);
          if (exists) return state;
          return { subtitle: [...state.subtitle, subtitle] };
        }),
      updateSubtitle: (subtitle: SubtitleData) =>
        set((state) => ({
          subtitle: state.subtitle.map((s) =>
            s.id === subtitle.id ? subtitle : s
          ),
        })),
      removeSubtitle: (id: string) =>
        set((state) => ({
          subtitle: state.subtitle.filter((s) => s.id !== id),
        })),
    }),
    { name: 'subtitle' }
  )
)
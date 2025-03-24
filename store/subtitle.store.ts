// src/stores/subtitle.store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Subtitle = {
  name: string;
  subtitle: string;
  type: "movie" | "series";
  image: string | null;
};

export type SubtitleActions = {
  addSubtitle: (subtitle: Subtitle) => void;
  updateSubtitle: (subtitle: Subtitle) => void;
  removeSubtitle: (name: string) => void; 
  subtitle: Subtitle[]; 
};

export const defaultInitState: Subtitle[] = [];

export const useSubtitleStore = create<SubtitleActions & { subtitle: Subtitle[] }>()(
  persist(
    (set) => ({
      subtitle: defaultInitState,
      addSubtitle: (subtitle: Subtitle) =>
        set((state) => ({ subtitle: [...state.subtitle, subtitle] })),
      updateSubtitle: (subtitle: Subtitle) =>
        set((state) => ({
          subtitle: state.subtitle.map((s) =>
            s.name === subtitle.name ? subtitle : s
          ),
        })),
      removeSubtitle: (name: string) =>
        set((state) => ({
          subtitle: state.subtitle.filter((s) => s.name !== name),
        })),
    }),
    { name: 'subtitle' }
  )
)
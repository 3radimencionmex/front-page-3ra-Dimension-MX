import { create } from 'zustand';

interface ThemeState {
  slicerMode: boolean;
  toggleSlicer: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  slicerMode: false,
  toggleSlicer: () => set((state) => ({ slicerMode: !state.slicerMode })),
}));

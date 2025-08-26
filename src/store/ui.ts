import { Appearance } from 'react-native';
import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface UIState {
  theme: Theme;
  toggleTheme: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: Appearance.getColorScheme() === 'dark' ? 'dark' : 'light',
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}));

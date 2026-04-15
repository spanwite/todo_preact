import type { Signal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContext {
  theme: Signal<Theme>;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContext | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

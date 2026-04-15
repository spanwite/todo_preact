import {
  effect,
  signal,
  useComputed,
  useSignal,
  useSignalEffect,
} from '@preact/signals';
import { useEffect, useMemo } from 'preact/hooks';
import type { Signal } from '@preact/signals';
import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

export type Theme = 'light' | 'dark';
export type ThemePreference = Theme | 'auto';

interface ThemeContext {
  theme: Signal<ThemePreference>;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContext | null>(null);

const darkSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

function getSystemTheme(): Theme {
  return darkSchemeMediaQuery.matches ? 'dark' : 'light';
}

export function ThemeProvider({
  children,
  defaultTheme = 'auto',
  storageKey = 'theme',
}: {
  children: preact.ComponentChildren;
  defaultTheme?: ThemePreference;
  storageKey?: string;
}) {
  const themePref = useSignal<ThemePreference>(
    defaultTheme ||
      (localStorage.getItem(storageKey) as Theme) ||
      getSystemTheme()
  );
  const systemTheme = signal<Theme>(getSystemTheme());
  const theme = useComputed<Theme>(() => {
    if (themePref.value === 'auto') {
      return systemTheme.value;
    }
    return themePref.value;
  });

  useEffect(() => {
    const updateSystemTheme = () => {
      systemTheme.value = getSystemTheme();
    };
    darkSchemeMediaQuery.addEventListener('change', updateSystemTheme);
    return () => {
      darkSchemeMediaQuery.removeEventListener('change', updateSystemTheme);
    };
  }, []);

  useSignalEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark', 'light');

    if (themePref.value === 'auto') {
      root.classList.add(systemTheme.value);
    } else {
      root.classList.add(themePref.value);
    }
  });

  const toggle = () => {
    if (themePref.value === 'auto') {
      themePref.value = systemTheme.value === 'dark' ? 'light' : 'dark';
    } else {
      const nextTheme = themePref.value === 'dark' ? 'light' : 'dark';
      themePref.value = systemTheme.value === nextTheme ? 'auto' : nextTheme;
    }
    localStorage.setItem(storageKey, themePref.value);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

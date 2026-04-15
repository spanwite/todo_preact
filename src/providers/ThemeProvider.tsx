import { ThemeContext, type Theme } from '@/contexts/ThemeContext';
import { effect, signal } from '@preact/signals';
import { useMemo } from 'preact/hooks';

export function ThemeProvider({
  children,
}: {
  children: preact.ComponentChildren;
}) {
  const value = useMemo(() => {
    const theme = signal<Theme>('light');

    effect(() => {
      const root = document.documentElement;
      const isDark = theme.value === 'dark';
      root.classList.toggle('dark', isDark);
      root.style.setProperty('color-scheme', isDark ? 'dark' : 'light');
    });

    return {
      theme,
      toggle() {
        theme.value = theme.value === 'light' ? 'dark' : 'light';
      },
    };
  }, []);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

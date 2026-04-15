import { Moon, Sun } from 'lucide-preact';
import { Button } from '../ui/Button';
import { useTheme } from '@/contexts/ThemeContext';

export function Header() {
  const { theme, toggle } = useTheme();
  const isLight = theme.value === 'light';

  return (
    <header className='mb-6 flex items-center justify-center gap-4'>
      <h1 className='font-serif text-4xl font-medium italic'>To Do List</h1>
      <Button size='icon-sm' onClick={toggle}>
        {isLight ? <Moon /> : <Sun />}
      </Button>
    </header>
  );
}

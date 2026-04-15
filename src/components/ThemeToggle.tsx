import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from './ui/Button';
import { Moon, Sun } from 'lucide-preact';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLight = theme.value === 'light';

  return (
    <Button
      onClick={toggle}
      size='sm'
      title={`Сменить тему на ${isLight ? 'тёмную' : 'светлую'}`}
    >
      {isLight ? <Moon /> : <Sun />}
      <span className='max-sm:hidden'>
        {isLight ? 'Тёмная' : 'Светлая'} тема
      </span>
    </Button>
  );
}

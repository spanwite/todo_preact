import { cn } from '@/lib/helpers';
import { unpackSignal } from '@/lib/utils';
import type { ComponentProps } from 'preact';
import ThemeToggler from '../ThemeToggler';

export function Header({ className, ...props }: ComponentProps<'header'>) {
  return (
    <header
      className={cn(
        'mx-auto flex flex-wrap items-center justify-center gap-4 sm:justify-between',
        unpackSignal(className)
      )}
      {...props}
    >
      <h1 className='font-serif text-4xl font-medium whitespace-nowrap italic'>
        To Do List
      </h1>
      <ThemeToggler />
    </header>
  );
}

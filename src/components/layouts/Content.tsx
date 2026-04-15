import { cn } from '@/lib/helpers';
import { unpackSignal } from '@/lib/utils';
import type { ComponentProps } from 'preact';

export function Content({ className, ...props }: ComponentProps<'main'>) {
  return (
    <main
      className={cn('mx-auto max-w-2xl px-4', unpackSignal(className))}
      {...props}
    />
  );
}

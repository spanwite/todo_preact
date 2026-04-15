import { cn } from '@/lib/helpers';
import { unpackSignal } from '@/lib/utils';
import type { ComponentProps } from 'preact';

export function Content({ className, ...props }: ComponentProps<'main'>) {
  return (
    <main
      className={cn('container mx-auto p-2', unpackSignal(className))}
      {...props}
    />
  );
}

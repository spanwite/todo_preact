import { cn } from '@/lib/helpers';
import { isSignal } from '@/lib/utils';
import type { ComponentProps } from 'preact';

export default function Label({
  className,
  ...props
}: ComponentProps<'label'>) {
  return (
    <label
      className={cn(
        'text-sm leading-tight font-medium transition-colors select-none',
        isSignal(className) ? className.value : className
      )}
      {...props}
    />
  );
}

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
        'flex items-center gap-2 text-sm leading-none font-medium transition-colors select-none',
        isSignal(className) ? className.value : className
      )}
      {...props}
    />
  );
}

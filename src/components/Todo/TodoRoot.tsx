import { cn } from '@/lib/helpers';
import { isSignal } from '@/lib/utils';
import { TodoProvider } from '@/providers/TodoProvider';
import type { ComponentProps } from 'preact';

export function TodoRoot({ className, ...props }: ComponentProps<'div'>) {
  return (
    <TodoProvider>
      <div
        className={cn(
          'mx-auto flex flex-col gap-5',
          isSignal(className) ? className.value : className
        )}
        {...props}
      />
    </TodoProvider>
  );
}

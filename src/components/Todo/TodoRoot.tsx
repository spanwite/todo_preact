import { cn } from '@/lib/helpers';
import { isSignal } from '@/lib/utils';
import { TodoProvider } from '@/providers/TodoProvider';
import type { ComponentProps } from 'preact';

export function TodoRoot({ className, ...props }: ComponentProps<'div'>) {
  return (
    <TodoProvider>
      <div
        className={cn(
          'mx-auto flex max-w-2xl flex-col gap-5',
          isSignal(className) ? className.value : className
        )}
        {...props}
      />
    </TodoProvider>
  );
}

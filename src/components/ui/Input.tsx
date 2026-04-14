import { useSignalValue } from '@/hooks/useSignalValue';
import { cn } from '@/lib/helpers';
import type { ComponentProps } from 'preact';
import { forwardRef } from 'preact/compat';

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    const classValue = useSignalValue(className);

    return (
      <input
        className={cn(
          'border-border h-8 w-full min-w-0 rounded-lg border px-2.5 py-1 transition-colors outline-none',
          'placeholder:text-muted-foreground placeholder:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-3',
          classValue
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

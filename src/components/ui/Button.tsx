import { cn } from '@/lib/helpers';
import { isSignal } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'preact';

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center whitespace-nowrap justify-center border border-transparent shrink-0 rounded-lg text-sm font-medium transition-all outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground not-disabled:hover:bg-primary/80',
        outline:
          'bg-background border-border not-disabled:hover:bg-muted-background not-disabled:hover:text-foreground',
        ghost:
          'border-transparent bg-background not-disabled:hover:bg-muted-background not-disabled:hover:text-foreground',
      },
      size: {
        default: 'h-8 gap-1 px-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      {...props}
      className={cn(
        buttonVariants({ variant }),
        isSignal(className) ? className.value : className
      )}
    />
  );
}

export { Button };

import { cn } from '@/lib/helpers';
import { isSignal } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'preact';
import { useMemo } from 'preact/hooks';

const fieldVariants = cva(
  'flex w-full gap-2.5 data-[invalid=true]:text-destructive',
  {
    variants: {
      orientation: {
        vertical: 'flex-col *:w-full [&>.sr-only]:w-auto',
        horizontal: 'flex-row items-center',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  }
);

function Field({
  className,
  orientation = 'vertical',
  ...props
}: ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role='group'
      className={cn(
        fieldVariants({ orientation }),
        isSignal(className) ? className.value : className
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'text-muted-foreground text-left text-sm leading-normal',
        isSignal(className) ? className.value : className
      )}
      {...props}
    />
  );
}

function FieldError({
  className,
  errors,
  children,
  ...props
}: ComponentProps<'div'> & { errors?: Array<{ message?: string } | string> }) {
  const content = useMemo(() => {
    if (children) {
      return children;
    }
    if (!errors?.length) {
      return null;
    }
    const uniqueErrors = Array.from(
      new Set(errors.map((e) => (typeof e === 'object' ? e.message : e)))
    );
    if (uniqueErrors.length === 1) {
      return uniqueErrors[0];
    }
    return (
      <ul className='flex list-disc flex-col gap-1'>
        {uniqueErrors.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    );
  }, [errors, children]);

  return (
    <div
      role='alert'
      className={cn(
        'text-destructive max-w-full overflow-hidden text-xs text-ellipsis whitespace-nowrap',
        isSignal(className) ? className.value : className
      )}
      {...props}
    >
      {content}
    </div>
  );
}

export { Field, FieldDescription, fieldVariants, FieldError };

import { cn } from '@/lib/helpers';
import { isSignal } from '@/lib/utils';
import { useSignal } from '@preact/signals';
import { Check } from 'lucide-preact';
import type { ComponentProps } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

export default function Checkbox({
  checked,
  className,
  onChange,
  ...props
}: Omit<ComponentProps<'input'>, 'type'>) {
  const checkedValue = Boolean(isSignal(checked) ? checked.value : checked);
  const isChecked = useSignal(checkedValue);
  const classValue = isSignal(className) ? className.value : className;

  const attributes = {
    [isChecked.value ? 'data-checked' : 'data-unchecked']: '',
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const toggleNativeInput = () => {
    inputRef.current?.click();
  };

  useEffect(() => {
    isChecked.value = Boolean(checkedValue);
  }, [checked]);

  return (
    <>
      <span
        className={cn(
          'border-border focus-visible:border-ring focus-visible:ring-ring/50 data-checked:bg-primary data-checked:text-primary-foreground data-checked:border-primary relative flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border text-transparent transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:ring-3',
          classValue
        )}
        role='checkbox'
        tabIndex={0}
        aria-checked={isChecked}
        onClick={(event) => {
          event.preventDefault();
          toggleNativeInput();
        }}
        onKeyDown={(event) => {
          if (event.key !== ' ' && event.key !== 'Enter') {
            return;
          }

          event.preventDefault();
          const input = inputRef.current;
          if (!input) {
            return;
          }

          input.dispatchEvent(
            new KeyboardEvent('keydown', {
              key: event.key,
              code: event.key === ' ' ? 'Space' : 'Enter',
              bubbles: true,
              cancelable: true,
              shiftKey: event.shiftKey,
              ctrlKey: event.ctrlKey,
              altKey: event.altKey,
              metaKey: event.metaKey,
            })
          );
          toggleNativeInput();
        }}
        {...attributes}
      >
        <Check />
      </span>
      <input
        className='sr-only'
        type='checkbox'
        checked={isChecked}
        tabIndex={-1}
        aria-hidden='true'
        ref={inputRef}
        onChange={(event) => {
          const nextValue = event.currentTarget.checked;
          isChecked.value = nextValue;
          onChange?.(event);
        }}
        {...props}
      />
    </>
  );
}

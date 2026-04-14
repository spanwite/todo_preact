import { useTodoContext } from '@/hooks/useTodoContext';
import { Plus } from 'lucide-preact';
import { useEffect, useId, useRef } from 'preact/hooks';
import { Button } from '../ui/Button';
import { Field, FieldError } from '../ui/Field';
import { Input } from '../ui/Input';
import Label from '../ui/Label';

import { cn } from '@/lib/helpers';
import { useComputed } from '@preact/signals';

export function TodoAddForm() {
  const { viewModel } = useTodoContext();
  const { newTodoTitle } = viewModel;
  const titleInputId = useId();
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const titleFieldErrors = useComputed(() => {
    const errors = [];
    if (
      newTodoTitle.value.trim().length === 0 &&
      newTodoTitle.value.length > 0
    ) {
      errors.push('Название задачи не может быть пустым');
    }
    return errors;
  });
  const hasEmptyError = useComputed(
    () =>
      newTodoTitle.value.trim().length === 0 && newTodoTitle.value.length > 0
  );

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  return (
    <form
      className={cn('flex items-end gap-2', hasEmptyError.value && 'mb-4')}
      onSubmit={(e) => {
        e.preventDefault();
        viewModel.makeTodo();
        titleInputRef.current?.focus();
      }}
    >
      <Field className='relative' data-invalid={hasEmptyError}>
        <Label htmlFor={titleInputId}>Название новой задачи</Label>
        <Input
          type='text'
          ref={titleInputRef}
          autoComplete='off'
          id={titleInputId}
          value={newTodoTitle.value}
          onChange={(e) => (newTodoTitle.value = e.currentTarget.value)}
          aria-invalid={hasEmptyError}
          placeholder='Приготовить ужин...'
        />
        <FieldError
          title={titleFieldErrors.value.join(', ')}
          className='absolute top-full left-0 translate-y-1'
          errors={titleFieldErrors.value}
        />
      </Field>
      <Button type='submit' disabled={newTodoTitle.value.trim().length === 0}>
        <Plus size={18} /> Добавить
      </Button>
    </form>
  );
}

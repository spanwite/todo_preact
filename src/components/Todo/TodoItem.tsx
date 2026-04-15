import { cn } from '@/lib/helpers';
import Checkbox from '../ui/Checkbox';
import Label from '../ui/Label';
import { Button } from '../ui/Button';
import { Trash } from 'lucide-preact';
import { Field } from '../ui/Field';
import { useId } from 'preact/hooks';

export function TodoItem({
  isChecked,
  onCheck,
  onRemove,
  title,
}: {
  title: string;
  isChecked: boolean;
  onCheck: (isChecked: boolean) => void;
  onRemove: () => void;
}) {
  const titleId = useId();

  return (
    <li className='bg-surface border-border flex h-10 items-center justify-between rounded-lg border px-3'>
      <Field orientation='horizontal'>
        <Checkbox
          id={titleId}
          checked={isChecked}
          onChange={(e) => {
            onCheck(e.currentTarget.checked);
          }}
        />
        <Label
          htmlFor={titleId}
          className={cn(
            'cursor-pointer',
            isChecked && 'text-muted-foreground line-through'
          )}
        >
          {title}
        </Label>
      </Field>
      <Button onClick={onRemove} variant='ghost' size='icon'>
        <Trash className='size-4.5' />
      </Button>
    </li>
  );
}

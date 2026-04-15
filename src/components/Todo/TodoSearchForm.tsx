import { useTodoContext } from '@/hooks/useTodoContext';
import { Search, X } from 'lucide-preact';
import { useId } from 'preact/hooks';
import { Field } from '../ui/Field';
import { Input } from '../ui/Input';
import Label from '../ui/Label';
import { cn } from '@/lib/helpers';
import { Button } from '../ui/Button';

export function TodoSearchForm() {
  const {
    viewModel: { searchQuery },
  } = useTodoContext();
  const searchQueryInputId = useId();

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Field>
        <Label htmlFor={searchQueryInputId}>Название искомой задачи</Label>
        <div className='relative'>
          <Search className='text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2' />
          <Input
            id={searchQueryInputId}
            className='peer px-8'
            autoComplete='off'
            type='text'
            value={searchQuery.value}
            onInput={(e) => (searchQuery.value = e.currentTarget.value)}
            placeholder='Покормить собаку...'
          />
          <Button
            type='button'
            onClick={() => (searchQuery.value = '')}
            tabIndex={searchQuery.value ? 0 : -1}
            variant='ghost'
            size='icon-xs'
            className={cn(
              'absolute top-1/2 right-2.5 -translate-y-1/2 text-transparent',
              searchQuery.value
                ? 'text-muted-foreground'
                : 'pointer-events-none'
            )}
          >
            <X className='size-4.5' />
          </Button>
        </div>
      </Field>
    </form>
  );
}

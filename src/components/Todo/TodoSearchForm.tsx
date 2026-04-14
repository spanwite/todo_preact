import { useTodoContext } from '@/hooks/useTodoContext';
import { Search, X } from 'lucide-preact';
import { useId } from 'preact/hooks';
import { Field } from '../ui/Field';
import { Input } from '../ui/Input';
import Label from '../ui/Label';
import { cn } from '@/lib/helpers';

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
          <button
            type='button'
            onClick={() => (searchQuery.value = '')}
            className={cn(
              'pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-sm p-0.5 text-transparent transition-colors',
              'hover:bg-muted-background',
              'peer-not-placeholder-shown:text-muted-foreground peer-not-placeholder-shown:pointer-events-auto'
            )}
          >
            <X />
          </button>
        </div>
      </Field>
    </form>
  );
}

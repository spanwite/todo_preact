import { useTodoContext } from '@/hooks/useTodoContext';
import { Input } from '../ui/Input';
import Label from '../ui/Label';
import { Field } from '../ui/Field';
import { Search } from 'lucide-preact';
import { useId } from 'preact/hooks';

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
            className='pl-8'
            autoComplete='off'
            type='text'
            value={searchQuery.value}
            onInput={(e) => (searchQuery.value = e.currentTarget.value)}
            placeholder='Покормить собаку...'
          />
        </div>
      </Field>
    </form>
  );
}

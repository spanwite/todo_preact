import { useTodoContext } from '@/hooks/useTodoContext';
import { cn } from '@/lib/helpers';
import { isSignal } from '@/lib/utils';
import type { ComponentProps } from 'preact';
import { TodoItem } from './TodoItem';

export function TodoList({ className, ...props }: ComponentProps<'ul'>) {
  const { model, viewModel } = useTodoContext();
  const { filteredTodos, listLabel, checkTodo } = viewModel;

  if (filteredTodos.value.length === 0) {
    return <div className='text-muted-foreground'>{listLabel.value}</div>;
  }

  return (
    <ul
      className={cn(
        'space-y-3',
        isSignal(className) ? className.value : className
      )}
      {...props}
    >
      {filteredTodos.value.map((todo) => (
        <TodoItem
          title={todo.title}
          isChecked={todo.completed}
          onCheck={(isChecked) => checkTodo(todo.id, isChecked)}
          onRemove={() => model.removeTodo(todo.id)}
          key={todo.id}
        />
      ))}
    </ul>
  );
}

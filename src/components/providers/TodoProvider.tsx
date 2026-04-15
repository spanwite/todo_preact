import { TodoContext } from '@/contexts/TodoContext';
import { TodoModel } from '@/models/TodoModel';
import { TodoViewModel } from '@/models/TodoViewModel';
import { TodoStorage } from '@/services/TodoStorage';
import { useSignalEffect } from '@preact/signals';
import { useMemo } from 'preact/hooks';

export function TodoProvider({
  children,
}: {
  children: preact.ComponentChildren;
}) {
  const value = useMemo(() => {
    const storage = new TodoStorage();
    const model = new TodoModel(storage.load());
    const viewModel = new TodoViewModel(model);
    return { model, viewModel, storage };
  }, []);

  useSignalEffect(() => {
    const todos = value.model.todos.value;
    value.storage.save(todos);
    console.log(`Saved ${todos.length} todos to localStorage.`);
  });

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

import { createModel, Signal, signal } from '@preact/signals';
import { generateId } from '@/lib/helpers';

export interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}

export type ITodoDto = Pick<ITodo, 'title'>;

export interface ITodoModel {
  todos: Signal<ITodo[]>;
  addTodo: (todo: ITodoDto) => void;
  removeTodo: (id: ITodo['id']) => void;
  updateTodo: (id: ITodo['id'], updates: Partial<Omit<ITodo, 'id'>>) => void;
}

export const TodoModel = createModel<ITodoModel, [ITodo[]?]>(
  (initialTodos: ITodo[] = []) => {
    const todos = signal<ITodo[]>(initialTodos);

    return {
      todos,
      addTodo(todo) {
        if (!todo.title.trim()) {
          return;
        }
        todos.value = [
          ...todos.value,
          {
            ...todo,
            completed: false,
            id: generateId(),
          },
        ];
      },
      removeTodo(id) {
        todos.value = todos.value.filter((todo) => todo.id !== id);
      },
      updateTodo(id, updates) {
        todos.value = todos.value.map((todo) =>
          todo.id === id ? { ...todo, ...updates } : todo
        );
      },
    };
  }
);

import {
  computed,
  createModel,
  Signal,
  signal,
  type ReadonlySignal,
} from '@preact/signals';
import type { ITodo, ITodoModel } from './TodoModel';

export interface ITodoViewModel {
  filteredTodos: ReadonlySignal<ITodo[]>;
  infoLabel: ReadonlySignal<string>;
  listLabel: ReadonlySignal<string>;
  searchQuery: Signal<string>;
  newTodoTitle: Signal<string>;
  checkTodo(id: string, isChecked: boolean): void;
  makeTodo(): void;
}

export const TodoViewModel = createModel<ITodoViewModel, [ITodoModel]>(
  (model: ITodoModel) => {
    const { todos } = model;

    const newTodoTitle = signal('');

    const searchQuery = signal('');
    const cleanedSearchQuery = computed(() => {
      const query = searchQuery.value.trim();
      return query.toLowerCase();
    });
    const filteredTodos = computed(() => {
      return todos.value.filter((todo) => {
        const isMatching = todo.title
          .toLowerCase()
          .includes(cleanedSearchQuery.value);
        return isMatching;
      });
    });

    const infoLabel = computed(() => {
      if (searchQuery.value.trim()) {
        const count = filteredTodos.value.length;
        return `Найдено задач: ${count}`;
      }
      return `Количество задач: ${todos.value.length}`;
    });

    const listLabel = computed(() => {
      const count = filteredTodos.value.length;
      if (count > 0) {
        return '';
      }
      if (cleanedSearchQuery.value) {
        return `По запросу "${cleanedSearchQuery.value}" ничего не найдено...`;
      } else {
        return 'В списке дел пусто... Добавьте новую задачу! ';
      }
    });

    return {
      searchQuery,
      newTodoTitle,
      filteredTodos,
      checkTodo(id: string, isChecked: boolean) {
        model.updateTodo(id, { completed: isChecked });
      },
      makeTodo() {
        const formattedTitle = newTodoTitle.value.trim();
        if (formattedTitle) {
          model.addTodo({ title: formattedTitle });
          newTodoTitle.value = '';
          searchQuery.value = '';
        }
      },
      infoLabel,
      listLabel,
    };
  }
);

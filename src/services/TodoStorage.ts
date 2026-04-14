import type { ITodo } from '@/models/TodoModel';

export class TodoStorage {
  protected readonly key: string;

  constructor(key = 'todos') {
    this.key = key;
  }

  public save(todos: ITodo[]): void {
    localStorage.setItem(this.key, JSON.stringify(todos));
  }

  public load(): ITodo[] {
    const savedTodos = localStorage.getItem(this.key);
    if (!savedTodos) {
      return [];
    }
    try {
      const todos = JSON.parse(savedTodos);
      if (Array.isArray(todos)) {
        return todos;
      }
    } catch (error) {
      console.error('Failed to parse saved todos from localStorage:', error);
    }
    return [];
  }
}

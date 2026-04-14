import type { ITodoModel } from '@/models/TodoModel';
import type { ITodoViewModel } from '@/models/TodoViewModel';
import { createContext } from 'preact';

export interface ITodoContext {
  model: ITodoModel;
  viewModel: ITodoViewModel;
}

export const TodoContext = createContext<ITodoContext | null>(null);

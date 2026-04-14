import { TodoContext } from '@/contexts/TodoContext';
import { useContext } from 'preact/hooks';

export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
}

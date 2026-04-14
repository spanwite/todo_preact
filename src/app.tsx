import Todo from './components/Todo';

export default function App() {
  return (
    <div className='container mx-auto p-2'>
      <Todo.Root>
        <Todo.AddForm />
        <Todo.SearchForm />
        <Todo.Info />
        <Todo.List />
      </Todo.Root>
    </div>
  );
}

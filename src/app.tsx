import { Content } from './components/layouts/Content';
import { Header } from './components/layouts/Header';
import Todo from './components/Todo';
import { ThemeProvider } from './components/providers/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <Content>
        <Header className='mt-3 mb-5' />
        <Todo.Root>
          <Todo.AddForm />
          <Todo.SearchForm />
          <Todo.Info />
          <Todo.List />
        </Todo.Root>
      </Content>
    </ThemeProvider>
  );
}

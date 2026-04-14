import { useTodoContext } from '@/hooks/useTodoContext';

export function TodoInfo() {
  const { viewModel } = useTodoContext();
  const { infoLabel } = viewModel;

  return (
    <div className={'flex justify-end'}>
      <div>{infoLabel}</div>
    </div>
  );
}

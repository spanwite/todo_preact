import { useTodoContext } from '@/hooks/useTodoContext';
import { Tabs, TabsList, TabsTrigger } from '../ui/Tabs';

export function TodoInfo() {
  const { viewModel } = useTodoContext();
  const { infoLabel, activeTab } = viewModel;

  return (
    <div className={'flex items-center justify-between gap-2'}>
      <Tabs activeTab={activeTab}>
        <TabsList className='max-[28rem]:flex-col'>
          <TabsTrigger value='all'>Все</TabsTrigger>
          <TabsTrigger value='todo'>Активные</TabsTrigger>
          <TabsTrigger value='done'>Выполненные</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className='text-right'>{infoLabel}</div>
    </div>
  );
}

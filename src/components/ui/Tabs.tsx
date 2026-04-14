import { cn } from '@/lib/helpers';
import { unpackSignal } from '@/lib/utils';
import {
  signal,
  useComputed,
  useSignal,
  useSignalEffect,
  type Signal,
} from '@preact/signals';
import { createContext, type ComponentProps } from 'preact';
import { useContext, useMemo } from 'preact/hooks';

interface ITabsContext {
  activeTab: Signal<string>;
}

const TabsContext = createContext<ITabsContext | null>(null);

function useTabsContext(): ITabsContext {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider');
  }
  return context;
}

export function Tabs({
  children,
  activeTab,
}: {
  children: preact.ComponentChildren;
  activeTab?: Signal<string>;
}) {
  const value = useMemo(() => {
    return {
      activeTab: activeTab || signal(''),
    };
  }, [activeTab]);

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

export function TabsList({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      role='tablist'
      className={cn(
        'bg-muted-background flex rounded-lg p-0.75',
        unpackSignal(className)
      )}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  value,
  ...props
}: Omit<ComponentProps<'button'>, 'value'> & { value: string }) {
  const { activeTab } = useTabsContext();
  const isActive = useComputed(() => activeTab.value === value);

  return (
    <button
      type='button'
      role='tab'
      aria-selected={isActive.value}
      className={cn(
        'text-muted-foreground h-7 cursor-pointer rounded-lg px-2.5 text-sm font-medium transition-colors',
        'hover:text-primary',
        isActive.value && 'text-primary bg-background shadow',
        unpackSignal(className)
      )}
      onClick={() => (activeTab.value = value)}
      {...props}
    />
  );
}

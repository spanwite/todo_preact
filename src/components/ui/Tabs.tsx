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
      className={cn('bg-muted flex rounded-lg p-0.75', unpackSignal(className))}
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
      data-value={value}
      aria-selected={isActive.value}
      tabIndex={isActive.value ? 0 : -1}
      className={cn(
        'text-muted-foreground h-7 cursor-pointer rounded-lg border-2 border-transparent px-2.5 text-sm font-medium transition-colors outline-none dark:border',
        'hover:text-primary',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring focus-visible:ring-2 focus-visible:outline-1',
        isActive.value &&
          'text-primary bg-background dark:bg-border/30 dark:border-border shadow',
        unpackSignal(className)
      )}
      onClick={() => (activeTab.value = value)}
      onKeyDown={(e) => {
        const element = {
          ArrowLeft: e.currentTarget
            .previousElementSibling as HTMLElement | null,
          ArrowRight: e.currentTarget.nextElementSibling as HTMLElement | null,
        }[e.key];
        if (element && element.dataset.value) {
          e.preventDefault();
          activeTab.value = element.dataset.value;
          element.focus();
        }
      }}
      {...props}
    />
  );
}

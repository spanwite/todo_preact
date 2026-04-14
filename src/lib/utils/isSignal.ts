import type { Signalish, SignalLike } from 'preact';

export function isSignal<T>(value: Signalish<T>): value is SignalLike<T> {
  return (
    value !== null &&
    typeof value === 'object' &&
    'peek' in value &&
    typeof value.peek === 'function' &&
    'value' in value
  );
}

import type { Signalish } from 'preact';
import { isSignal } from '@/lib/utils';

export function useSignalValue<T>(signal: Signalish<T>): T {
  if (isSignal(signal)) {
    return signal.value;
  }
  return signal;
}

import { mergeClasses, type ClassInput } from '@/lib/utils/mergeClasses';
import { twMerge } from 'tailwind-merge';

export function classNames(...inputs: ClassInput[]): string {
  return twMerge(mergeClasses(...inputs));
}

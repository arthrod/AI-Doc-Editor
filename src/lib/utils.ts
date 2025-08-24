import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class values into a single, deduplicated Tailwind CSS class string.
 *
 * Converts the provided `ClassValue` arguments to a normalized class string using `clsx`
 * and then merges/deduplicates Tailwind-style utility classes with `twMerge`.
 *
 * @param inputs - One or more `ClassValue` items (strings, arrays, objects, etc.) accepted by `clsx`
 * @returns A single string of merged, deduplicated CSS classes suitable for Tailwind
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function wait(second: number) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * second))
}

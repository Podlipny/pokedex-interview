import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * CSS classnames generator
 * @param inputs - CSS classnames
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

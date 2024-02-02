import * as React from 'react'

import styles from './input.module.scss'

import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        styles.base,
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
)

Input.displayName = 'Input'

export { Input }

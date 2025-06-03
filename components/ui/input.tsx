import * as React from 'react'
import { cn } from '@/lib/utils'

type InputProps = React.ComponentProps<'input'> & {
  label?: string
  error?: string
}

/**
 * If value is undefined/null we don't pass it → keeps the input uncontrolled.
 * For non-file inputs we fall back to empty string, so it's always controlled.
 */
function Input({ className, type, label, error, value, ...rest }: InputProps) {
  const isFile = type === 'file'

  return (
    <div className="space-y-1">
      {label && <label className="text-sm font-medium">{label}</label>}

      <input
        type={type}
        data-slot="input"
        aria-invalid={Boolean(error)}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-bg-300 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className
        )}
        {
          ...(isFile
            ? rest // <input type="file"> ne reçoit PAS de prop value
            : { ...rest, value: value ?? '' }) // always string
        }
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}

export { Input }

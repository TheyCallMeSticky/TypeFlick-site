'use client'

import { useState } from 'react'

type Interval = 'week' | 'month' | 'year'

type Props = {
  onChange: (value: Interval) => void
  defaultValue?: Interval
  /** Permet de n’afficher que certains intervalles (ex : ['month','year']) */
  options?: Interval[]
}

export function IntervalSelector({
  onChange,
  defaultValue = 'month',
  options = ['week', 'month', 'year']
}: Props) {
  const [interval, setInterval] = useState<Interval>(defaultValue)

  const handleClick = (value: Interval) => {
    setInterval(value)
    onChange(value)
  }

  return (
    /* barre de fond grise */
    <div className="flex border-b border-bg-300">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => handleClick(option)}
          className={`
            relative -mb-px px-4 py-2
            whitespace-nowrap text-sm font-medium transition-colors
            ${
              interval === option
                ? 'border-b-2 border-accent-100 text-accent-100'
                : 'border-b-2 border-transparent text-text-200 hover:text-accent-100 hover:border-text-200'
            }
          `}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  )
}

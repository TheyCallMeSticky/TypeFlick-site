'use client'

type Props = {
  /** Progression entre 0 et 100. */
  value: number
}

export default function ProgressCell({ value }: Props) {
  // Clamp de sûreté
  const pct = Math.max(0, Math.min(100, value))

  return (
    <div className="">
      <div className="w-full rounded bg-muted/40">
        <div
          className="h-full rounded bg-primary transition-all duration-200"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="ml-1 text-xs tabular-nums">{pct}%</span>
    </div>
  )
}

interface Props {
  value: number
  status: 'pending' | 'processing' | 'done' | 'failed'
}
export default function ProgressBar({ value, status }: Props) {
  const color =
    status === 'failed' ? 'bg-destructive' : status === 'done' ? 'bg-success' : 'bg-primary'

  return (
    <div className="w-full h-2 bg-muted rounded overflow-hidden">
      <div className={`h-full transition-all ${color}`} style={{ width: `${value}%` }} />
    </div>
  )
}

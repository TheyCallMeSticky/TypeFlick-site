// components/ui/info-card.tsx
import { Card, CardContent } from '@/components/ui/card'
import { ReactNode } from 'react'

interface InfoCardProps {
  title: string
  icon?: ReactNode
  children: ReactNode
  className?: string
}

export function InfoCard({ title, icon, children, className }: InfoCardProps) {
  return (
    <Card className={`bg-bg-200 border-bg-300 ${className || ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          {icon && <div className="text-primary-100">{icon}</div>}
          <h4 className="font-medium text-text-100">{title}</h4>
        </div>
        <div className="space-y-2 text-sm">{children}</div>
      </CardContent>
    </Card>
  )
}

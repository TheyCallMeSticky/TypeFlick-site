// components/wizard/StepReview.tsx
import { useState } from 'react'
import useSWR from 'swr'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { InfoCard } from '@/components/ui/info-card'
import { Music, Video, Image as ImageIcon, ExternalLink, Edit, AlertTriangle } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface StepReviewProps {
  watch: any
  onEditStep?: (step: number) => void
}

export function StepReview({ watch, onEditStep }: StepReviewProps) {
  const [hasReviewed, setHasReviewed] = useState(false)
  const data = watch()

  const { data: templates, isLoading: tplLoading } = useSWR('/api/templates', fetcher)

  const selectedTemplate = templates?.find((t: any) => t.id === data.templateId)
  const formatLabel = (f: string) => f.replace('_', ':')
  const formatBytes = (bytes?: number) => {
    if (!bytes || isNaN(bytes)) return '—'
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  const estimatedDuration = data.formats?.length * 2 || 2 // 2min par format

  return (
    <div className="space-y-6">
      <Card className="bg-bg-200 border-bg-300">
        <CardHeader>
          <h3 className="text-lg font-semibold text-text-100">Review & Confirm</h3>
          <p className="text-sm text-text-200">
            Double-check everything before generating your video
          </p>
        </CardHeader>
        <CardContent>
          {!hasReviewed && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-text-100">Take a moment to review</p>
                  <p className="text-xs text-text-200 mt-1">
                    Once generation starts, you won't be able to modify these settings. Estimated
                    time: ~{estimatedDuration} minutes.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => setHasReviewed(true)}
                  >
                    I've reviewed everything
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard title="Beat Details" icon={<Music className="w-5 h-5" />}>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Primary:</span> {data.primaryBeatmaker}
            </p>
            {data.collaborators && (
              <p>
                <span className="font-medium">Collaborators:</span> {data.collaborators}
              </p>
            )}
            <p>
              <span className="font-medium">Beat name:</span> {data.beatName}
            </p>
            <p>
              <span className="font-medium">Type beat:</span> {data.typeBeat}
            </p>
            {data.buyLink && (
              <p>
                <span className="font-medium">Purchase:</span>{' '}
                <a
                  href={data.buyLink}
                  className="text-primary-100 hover:text-primary-200 underline inline-flex items-center gap-1"
                  target="_blank"
                  rel="noreferrer"
                >
                  Link <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            )}
          </div>
          {onEditStep && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 text-xs"
              onClick={() => onEditStep(1)}
            >
              <Edit className="w-3 h-3 mr-1" />
              Edit details
            </Button>
          )}
        </InfoCard>

        <InfoCard title="Output Settings" icon={<Video className="w-5 h-5" />}>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Template:</span>{' '}
              {selectedTemplate ? selectedTemplate.name : tplLoading ? 'Loading...' : 'Unknown'}
            </p>
            <div>
              <span className="font-medium">Formats:</span>
              <div className="flex gap-1 mt-1">
                {data.formats?.map((f: string) => (
                  <Badge key={f} variant="secondary">
                    {formatLabel(f)}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium">Platforms:</span>
              <div className="flex gap-1 mt-1">
                {data.publishTargets?.map((p: string) => (
                  <Badge key={p} variant="secondary">
                    {p === 'x' ? 'X' : p[0].toUpperCase() + p.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          {onEditStep && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 text-xs"
              onClick={() => onEditStep(3)}
            >
              <Edit className="w-3 h-3 mr-1" />
              Edit template
            </Button>
          )}
        </InfoCard>

        <InfoCard title="Assets" icon={<ImageIcon className="w-5 h-5" />}>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Audio:</span> {data.audioFile?.name ?? '—'}{' '}
              <span className="text-text-200">({formatBytes(data.audioFile?.size)})</span>
            </p>
            <p>
              <span className="font-medium">Image:</span> {data.imageFile?.name ?? '—'}{' '}
              <span className="text-text-200">({formatBytes(data.imageFile?.size)})</span>
            </p>
          </div>
          {onEditStep && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-3 text-xs"
              onClick={() => onEditStep(2)}
            >
              <Edit className="w-3 h-3 mr-1" />
              Edit assets
            </Button>
          )}
        </InfoCard>
      </div>

      {/* Summary footer */}
      <Card className="bg-primary-100/5 border-primary-100/20">
        <CardContent className="pt-6">
          <div className="text-center">
            <h4 className="font-medium text-text-100 mb-2">Ready to generate</h4>
            <p className="text-sm text-text-200">
              {data.formats?.length || 0} video{(data.formats?.length || 0) > 1 ? 's' : ''} •
              {data.publishTargets?.length || 0} platform
              {(data.publishTargets?.length || 0) > 1 ? 's' : ''} • ~{estimatedDuration} min
              processing
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

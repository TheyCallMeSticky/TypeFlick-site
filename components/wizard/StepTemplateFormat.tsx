// components/wizard/StepTemplateFormat.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, Volume2 } from 'lucide-react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface Template {
  id: number
  name: string
  slug: string
  aspectRatio: '16_9' | '1_1' | '9_16'
  thumbnailUrl: string
  previewVideoUrl?: string
  requiredPlan: string
  config: Record<string, unknown>
  description?: string
  features?: string[]
}

const Req = () => (
  <span aria-hidden className="text-red-600">
    *
  </span>
)

interface StepTemplateFormatProps {
  control: any
  errors: any
  watch: any
  setValue: any
}

export function StepTemplateFormat({ control, errors, watch, setValue }: StepTemplateFormatProps) {
  const selectedTemplate = watch('templateId')
  const selectedFormats: string[] = watch('formats')
  const selectedTargets: string[] = watch('publishTargets')

  const [userTouchedFormats, setUserTouchedFormats] = useState<Set<string>>(new Set())
  const [previewPlaying, setPreviewPlaying] = useState(false)

  // Fetch templates
  const {
    data: templates,
    error: tplErr,
    isLoading: tplLoading
  } = useSWR<Template[]>('/api/templates', fetcher)

  const platformFormats: Record<string, string[]> = {
    youtube: ['16_9'],
    instagram: ['1_1', '9_16'],
    tiktok: ['9_16'],
    x: ['16_9']
  }

  const selectedTemplateData = templates?.find((t) => t.id === selectedTemplate)

  if (tplLoading) {
    return (
      <Card>
        <CardHeader>Video template & formats</CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-8">
                <div className="aspect-video bg-bg-200 rounded-lg"></div>
              </div>
              <div className="col-span-4">
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-bg-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (tplErr || !templates) {
    return (
      <Card>
        <CardHeader>Video template & formats</CardHeader>
        <CardContent>
          <p className="text-red-600">Failed to load templates.</p>
        </CardContent>
      </Card>
    )
  }

  const togglePlatform = (p: string) => {
    const isAdding = !selectedTargets.includes(p)
    const nextPlatforms = isAdding
      ? [...selectedTargets, p]
      : selectedTargets.filter((x) => x !== p)

    let nextFormats = [...selectedFormats]

    if (isAdding) {
      for (const f of platformFormats[p]) {
        if (!nextFormats.includes(f)) nextFormats.push(f)
      }
    } else {
      const stillNeeded = new Set(nextPlatforms.flatMap((pl) => platformFormats[pl]))
      nextFormats = nextFormats.filter((f) => stillNeeded.has(f) || userTouchedFormats.has(f))
    }

    setValue('publishTargets', nextPlatforms)
    setValue('formats', nextFormats)
  }

  const toggleFormat = (f: string) => {
    const next = selectedFormats.includes(f)
      ? selectedFormats.filter((x) => x !== f)
      : [...selectedFormats, f]

    setValue('formats', next)
    setUserTouchedFormats((prev) => new Set(prev).add(f))
  }

  const handleSelectTemplate = (tplId: number, tplAspect: string) => {
    setValue('templateId', tplId)
    if (selectedFormats.length === 0) {
      setValue('formats', [tplAspect])
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-1">
          Choose template & configure output <Req />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-12 gap-6">
          {/* Preview Area - Left Side (like YouTube video) */}
          <div className="col-span-8 space-y-4">
            {selectedTemplateData ? (
              <>
                {/* Video Preview */}
                <div className="relative bg-bg-300 rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <Image
                      src={selectedTemplateData.thumbnailUrl}
                      alt={selectedTemplateData.name}
                      fill
                      className="object-cover"
                    />

                    {/* Play Button Overlay */}
                    {selectedTemplateData.previewVideoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          variant="secondary"
                          size="lg"
                          className="rounded-full bg-bg-100/80 hover:bg-bg-100/90 backdrop-blur-sm"
                          onClick={() => setPreviewPlaying(!previewPlaying)}
                        >
                          {previewPlaying ? (
                            <Pause className="h-6 w-6" />
                          ) : (
                            <Play className="h-6 w-6 ml-1" />
                          )}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Template Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-text-100">
                      {selectedTemplateData.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary">
                        {selectedTemplateData.aspectRatio.replace('_', ':')} default
                      </Badge>
                      <Badge
                        variant={
                          selectedTemplateData.requiredPlan === 'free' ? 'default' : 'destructive'
                        }
                      >
                        {selectedTemplateData.requiredPlan}
                      </Badge>
                    </div>
                  </div>

                  {selectedTemplateData.description && (
                    <p className="text-text-200 text-sm leading-relaxed">
                      {selectedTemplateData.description}
                    </p>
                  )}

                  {selectedTemplateData.features && (
                    <div>
                      <h4 className="font-medium text-text-100 mb-2">Features:</h4>
                      <ul className="text-sm text-text-200 space-y-1">
                        {selectedTemplateData.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary-100 rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Configuration Section */}
                <Card className="bg-bg-200 border-bg-300">
                  <CardContent className="pt-6 space-y-6">
                    {/* Platforms Selection */}
                    <div>
                      <h4 className="font-medium text-text-100 mb-3 flex items-center gap-1">
                        Publish to <Req />
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {['youtube', 'instagram', 'tiktok', 'x'].map((p) => (
                          <label
                            key={p}
                            className="flex items-center gap-3 p-3 rounded-lg border border-bg-300 hover:border-primary-100/50 cursor-pointer transition-colors"
                          >
                            <Checkbox
                              checked={selectedTargets.includes(p)}
                              onCheckedChange={() => togglePlatform(p)}
                            />
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-primary-100 rounded-sm flex items-center justify-center text-xs font-bold text-white">
                                {p[0].toUpperCase()}
                              </div>
                              <span className="font-medium">
                                {p === 'x' ? 'X (Twitter)' : p[0].toUpperCase() + p.slice(1)}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                      {errors.publishTargets && (
                        <p className="text-red-600 text-sm mt-2">{errors.publishTargets.message}</p>
                      )}
                    </div>

                    {/* Aspect Ratios Selection */}
                    <div>
                      <h4 className="font-medium text-text-100 mb-3 flex items-center gap-1">
                        Output formats <Req />
                      </h4>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: '16_9', label: '16:9', desc: 'YouTube, horizontal' },
                          { value: '1_1', label: '1:1', desc: 'Instagram post' },
                          { value: '9_16', label: '9:16', desc: 'Stories, TikTok' }
                        ].map((format) => (
                          <label
                            key={format.value}
                            className="flex flex-col p-3 rounded-lg border border-bg-300 hover:border-primary-100/50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <Checkbox
                                checked={selectedFormats.includes(format.value)}
                                onCheckedChange={() => toggleFormat(format.value)}
                              />
                              <span className="font-medium">{format.label}</span>
                            </div>
                            <span className="text-xs text-text-200 ml-6">{format.desc}</span>
                          </label>
                        ))}
                      </div>
                      {errors.formats && (
                        <p className="text-red-600 text-sm mt-2">{errors.formats.message}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="aspect-video bg-bg-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-text-200">
                  <Volume2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Select a template to preview</p>
                </div>
              </div>
            )}
          </div>

          {/* Templates List - Right Side (like YouTube suggestions) */}
          <div className="col-span-4">
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              <h4 className="font-medium text-text-100 mb-3 sticky top-0 bg-bg-100 py-2">
                Templates
              </h4>

              {templates.map((tpl) => {
                const isActive = selectedTemplate === tpl.id
                return (
                  <div
                    key={tpl.id}
                    className={`group cursor-pointer rounded-lg p-2 transition-all ${
                      isActive
                        ? 'bg-primary-100/10 border border-primary-100'
                        : 'hover:bg-bg-200 border border-transparent'
                    }`}
                    onClick={() => handleSelectTemplate(tpl.id, tpl.aspectRatio)}
                  >
                    <div className="flex gap-3">
                      <div className="relative flex-shrink-0">
                        <Image
                          src={tpl.thumbnailUrl}
                          alt={tpl.name}
                          width={120}
                          height={68}
                          className="rounded object-cover"
                        />
                        {isActive && (
                          <div className="absolute inset-0 bg-primary-100/20 rounded flex items-center justify-center">
                            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm text-text-100 line-clamp-2 mb-1">
                          {tpl.name}
                        </h5>
                        <div className="space-y-1">
                          <p className="text-xs text-text-200">
                            Default: {tpl.aspectRatio.replace('_', ':')}
                          </p>
                          <Badge
                            variant={tpl.requiredPlan === 'free' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {tpl.requiredPlan}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {errors.templateId && (
          <p className="text-red-600 text-sm mt-4">{errors.templateId.message}</p>
        )}
      </CardContent>
    </Card>
  )
}

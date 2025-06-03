'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, Check, XCircle } from 'lucide-react'
import Image from 'next/image'
import useSWR from 'swr'
import { User } from '@/lib/db/schema'
import { getUwT } from './actions'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
/* ------------------------------------------------------------------
   1. Zod schema (client side)
-------------------------------------------------------------------*/

const formSchema = z.object({
  // step 1
  primaryBeatmaker: z.string().min(1, 'Required'),
  collaborators: z.string().optional(), // comma separated
  beatName: z.string().min(1, 'Required'),
  typeBeat: z.string().min(1, 'Required'),
  // step 2
  audioFile: z.instanceof(File),
  imageFile: z.instanceof(File),
  // step 3
  templateId: z.number().int(),
  formats: z.array(z.enum(['16_9', '1_1', '9_16'])).min(1),
  publishTargets: z
    .array(z.enum(['youtube', 'tiktok', 'instagram']))
    .min(1, 'Pick at least one platform'),
  // optional
  buyLink: z
    .string()
    .trim()
    .transform((s) => (s === '' ? undefined : s)) // ← NEW
    .optional()
    .refine((val) => val === undefined || z.string().url().safeParse(val).success, {
      message: 'Invalid URL'
    })
})

export type WizardForm = z.infer<typeof formSchema>

/* ------------------------------------------------------------------
   2. Template stub (ideally fetched via SWR / trpc)
-------------------------------------------------------------------*/

const templates = [
  { id: 1, name: 'Waveform Classic', aspect: '16_9', thumb: '/thumb/free.png' },
  { id: 2, name: 'Neon Pulses', aspect: '16_9', thumb: '/thumb/base.png' },
  { id: 3, name: 'Vintage VHS', aspect: '16_9', thumb: '/thumb/vintage.png' }
]
const allPlatforms = [
  { id: 'youtube', label: 'YouTube' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'instagram', label: 'Instagram' }
]
/* ------------------------------------------------------------------
   3. Wizard component
-------------------------------------------------------------------*/

export default function VideoWizard() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  const { data: user, isLoading: userLoading, error: userErr } = useSWR<User>('/api/user', fetcher)

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = useForm<WizardForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formats: [],
      publishTargets: [] // NEW
    }
  })

  // Map fields that belong to each wizard step – used for scoped validation
  const stepFields: Record<number, (keyof WizardForm)[]> = {
    1: ['primaryBeatmaker', 'collaborators', 'beatName', 'typeBeat', 'buyLink'],
    2: ['audioFile', 'imageFile'],
    3: ['templateId', 'formats']
  }

  const next = async () => {
    // validate only the inputs of the current step
    const fieldsToValidate = stepFields[step]
    const valid = await trigger(fieldsToValidate, { shouldFocus: true })
    if (!valid) return
    setStep((s) => s + 1)
  }

  const prev = () => setStep((s) => (s > 1 ? s - 1 : 1))

  const onSubmit = async (data: WizardForm) => {
    if (userLoading) {
      setError('User still loading, please try again in a second.')
      return
    }
    if (!user) {
      setError(userErr?.message ?? 'Unable to load user context')
      return
    }

    setLoading(true)
    setError(null)
    try {
      // 1. Upload assets (stub)
      const audioPath = await uploadFile(data.audioFile, 'audio')
      const imagePath = await uploadFile(data.imageFile, 'image')
      const userWithTeam = await getUwT()

      // 2. POST to API
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userWithTeam.user.id, // TODO: replace with session user
          teamId: userWithTeam.teamId, // TODO: replace with team context
          primaryBeatmaker: data.primaryBeatmaker,
          collaborators: data.collaborators
            ?.split(',')
            .map((n) => n.trim())
            .filter(Boolean),
          beatName: data.beatName,
          typeBeat: data.typeBeat,
          templateId: data.templateId,
          formats: data.formats,
          audioPath,
          imagePath,
          buyLink: data.buyLink,
          publishTargets: data.publishTargets
        })
      })
      if (!res.ok) throw new Error(await res.text())
      setSuccess(true)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  /* ---------------------- UI per step -------------------------- */
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Create a Video</h1>

      {success ? (
        <Card className="p-6 text-center">
          <Check className="w-12 h-12 mx-auto mb-4" />
          <p className="text-xl">Your video is now being generated!</p>
        </Card>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && <StepInfo control={control} errors={errors} />}
          {step === 2 && <StepAssets control={control} errors={errors} />}
          {step === 3 && (
            <StepTemplateFormat
              control={control}
              errors={errors}
              watch={watch}
              setValue={setValue}
            />
          )}
          {step === 4 && <StepReview watch={watch} />}

          {error && (
            <div className="flex items-center gap-2 text-red-600 mt-4">
              <XCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button type="button" variant="secondary" onClick={prev}>
                Back
              </Button>
            )}
            {step < 4 && (
              <Button type="button" onClick={next}>
                Next
              </Button>
            )}
            {step === 4 && (
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
                Generate
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------
   Step 1 – Infos text
-------------------------------------------------------------------*/

function StepInfo({ control, errors }: any) {
  return (
    <Card>
      <CardHeader>Beat information</CardHeader>
      <CardContent className="space-y-4">
        <Controller
          control={control}
          name="primaryBeatmaker"
          render={({ field }) => (
            <Input label="Main beatmaker" {...field} error={errors.primaryBeatmaker?.message} />
          )}
        />
        <Controller
          control={control}
          name="collaborators"
          render={({ field }) => (
            <Input
              label="Additional beatmakers (comma‑separated)"
              {...field}
              error={errors.collaborators?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="beatName"
          render={({ field }) => (
            <Input label="Beat name" {...field} error={errors.beatName?.message} />
          )}
        />
        <Controller
          control={control}
          name="typeBeat"
          render={({ field }) => (
            <Input label="Type beat (e.g. 21 Savage)" {...field} error={errors.typeBeat?.message} />
          )}
        />
        <Controller
          control={control}
          name="buyLink"
          render={({ field }) => (
            <Input label="Purchase link" {...field} error={errors.buyLink?.message} />
          )}
        />
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------
   Step 2 – Upload assets (simple version)
-------------------------------------------------------------------*/

function StepAssets({ control, errors }: any) {
  return (
    <Card>
      <CardHeader>Uploads</CardHeader>
      <CardContent className="space-y-4">
        <Controller
          control={control}
          name="audioFile"
          render={({ field: { onChange, onBlur, name, ref } }) => (
            <Input
              type="file"
              accept="audio/*"
              label="Audio file"
              name={name}
              ref={ref}
              onBlur={onBlur}
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                onChange(file)
              }}
              error={errors.audioFile?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="imageFile"
          render={({ field: { onChange, onBlur, name, ref } }) => (
            <Input
              type="file"
              accept="image/*"
              label="Cover image"
              name={name}
              ref={ref}
              onBlur={onBlur}
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                onChange(file)
              }}
              error={errors.imageFile?.message}
            />
          )}
        />
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------
   Step 3 – Template + formats – Template + formats
-------------------------------------------------------------------*/

function StepTemplateFormat({ control, errors, watch, setValue }: any) {
  const selectedTemplate = watch('templateId')
  const selectedFormats: string[] = watch('formats')
  const selectedTargets: string[] = watch('publishTargets')

  const [userTouchedFormats, setUserTouchedFormats] = useState<Set<string>>(new Set())

  const platformFormats: Record<string, string[]> = {
    youtube: ['16_9'],
    instagram: ['1_1', '9_16'],
    tiktok: ['9_16']
  }

  const handleSelectTemplate = (tplId: number, tplAspect: string) => {
    setValue('templateId', tplId)
    // If no format selected yet, default to the template main aspect
    if (selectedFormats.length === 0) {
      setValue('formats', [tplAspect])
    }
  }

  /* ---------- toggle helpers ---------- */
  const togglePlatform = (p: string) => {
    const isAdding = !selectedTargets.includes(p)
    const nextPlatforms = isAdding
      ? [...selectedTargets, p]
      : selectedTargets.filter((x) => x !== p)

    let nextFormats = [...selectedFormats]

    if (isAdding) {
      // add required formats
      for (const f of platformFormats[p]) if (!nextFormats.includes(f)) nextFormats.push(f)
    } else {
      // remove formats no longer needed by ANY platform,
      // unless the user forced them manually
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
    // remember that user manually touched this format
    setUserTouchedFormats((prev) => new Set(prev).add(f))
  }

  return (
    <Card>
      <CardHeader>Video template & formats</CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Pick a template, then choose one or multiple aspect ratios to generate.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className={`border rounded-xl p-2 cursor-pointer transition ring-offset-2 ${selectedTemplate === tpl.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => handleSelectTemplate(tpl.id, tpl.aspect)}
            >
              <Image
                src={tpl.thumb}
                alt={tpl.name}
                width={400}
                height={225}
                className="rounded-lg"
              />
              <p className="mt-2 text-center text-sm font-medium">{tpl.name}</p>
              <p className="text-center text-xs text-muted-foreground">
                Default: {tpl.aspect.replace('_', ':')}
              </p>
            </div>
          ))}
        </div>

        {errors.templateId && (
          <p className="text-red-600 mt-2 text-sm">{errors.templateId.message}</p>
        )}

        <div>
          <p className="font-medium mb-2">Publish to :</p>
          <div className="flex flex-wrap gap-4">
            {['youtube', 'instagram', 'tiktok'].map((p) => (
              <label key={p} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedTargets.includes(p)}
                  onCheckedChange={() => togglePlatform(p)}
                />
                {p[0].toUpperCase() + p.slice(1)}
              </label>
            ))}
          </div>
          {errors.publishTargets && (
            <p className="text-red-600 text-sm mt-1">{errors.publishTargets.message}</p>
          )}
        </div>

        {/* formats -------------------------------------------------- */}
        <div>
          <p className="font-medium mb-2">Aspect ratios :</p>
          <div className="flex flex-wrap gap-4">
            {['16_9', '1_1', '9_16'].map((f) => (
              <label key={f} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedFormats.includes(f)}
                  onCheckedChange={() => toggleFormat(f)}
                />
                {f.replace('_', ':')}
              </label>
            ))}
          </div>
          {errors.formats && <p className="text-red-600 text-sm mt-1">{errors.formats.message}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------
   Step 4 – Review – Review
-------------------------------------------------------------------*/

/* ------------------------------------------------------------------
   Step 4 – Review & confirm (remplace ton StepReview actuel)
-------------------------------------------------------------------*/

function StepReview({ watch }: any) {
  const data = watch()
  const tpl = templates.find((t) => t.id === data.templateId)

  const formatLabel = (f: string) => f.replace('_', ':')

  const formatBytes = (bytes?: number) => (bytes ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : '—')

  return (
    <Card>
      <CardHeader>Review & confirm</CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div>
          <span className="font-medium">Primary beatmaker:</span> {data.primaryBeatmaker}
        </div>

        {data.collaborators && (
          <div>
            <span className="font-medium">Collaborators:</span> {data.collaborators}
          </div>
        )}

        <div>
          <span className="font-medium">Beat name:</span> {data.beatName}
        </div>

        <div>
          <span className="font-medium">Type beat:</span> {data.typeBeat}
        </div>

        {data.buyLink && (
          <div>
            <span className="font-medium">Purchase link:</span>{' '}
            <a
              href={data.buyLink}
              className="underline text-primary"
              target="_blank"
              rel="noreferrer"
            >
              {data.buyLink}
            </a>
          </div>
        )}

        <div>
          <span className="font-medium">Template:</span> {tpl ? tpl.name : '—'}
        </div>

        <div>
          <span className="font-medium">Formats:</span> {data.formats.map(formatLabel).join(', ')}
        </div>
        <div>
          <span className="font-medium">Platforms:</span>{' '}
          {data.publishTargets.map((p: string) => p[0].toUpperCase() + p.slice(1)).join(', ')}
        </div>

        <div>
          <span className="font-medium">Audio file:</span> {data.audioFile?.name ?? '—'}{' '}
          <span className="text-muted-foreground">{formatBytes(data.audioFile?.size)}</span>
        </div>

        <div>
          <span className="font-medium">Image file:</span> {data.imageFile?.name ?? '—'}{' '}
          <span className="text-muted-foreground">{formatBytes(data.imageFile?.size)}</span>
        </div>
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------
   Utils — upload stub (to be replaced by S3 / B2 presigned later)
-------------------------------------------------------------------*/

async function uploadFile(file: File, type: 'audio' | 'image') {
  // TODO: implement presigned upload; for now just return placeholder URL
  const blobUrl = URL.createObjectURL(file)
  return blobUrl
}

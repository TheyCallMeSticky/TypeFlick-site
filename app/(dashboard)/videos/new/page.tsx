'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, Check, XCircle } from 'lucide-react'
import Image from 'next/image'

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
  // optional
  buyLink: z.string().url().optional()
})

export type WizardForm = z.infer<typeof formSchema>

/* ------------------------------------------------------------------
   2. Template stub (ideally fetched via SWR / trpc)
-------------------------------------------------------------------*/

const templates = [
  { id: 1, name: 'Waveform Classic', aspect: '16_9', thumb: '/thumb/classic.png' },
  { id: 2, name: 'Neon Pulses', aspect: '1_1', thumb: '/thumb/neon.png' },
  { id: 3, name: 'Vintage VHS', aspect: '9_16', thumb: '/thumb/vintage.png' }
]

/* ------------------------------------------------------------------
   3. Wizard component
-------------------------------------------------------------------*/

export default function VideoWizard() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

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
      formats: []
    }
  })

  const next = async () => {
    const valid = await trigger(undefined, { shouldFocus: true })
    if (!valid) return
    setStep((s) => s + 1)
  }

  const prev = () => setStep((s) => s - 1)

  const onSubmit = async (data: WizardForm) => {
    setLoading(true)
    setError(null)
    try {
      // 1. Upload assets (stub)
      const audioPath = await uploadFile(data.audioFile, 'audio')
      const imagePath = await uploadFile(data.imageFile, 'image')

      // 2. POST to API
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1, // TODO: replace with session user
          teamId: 1, // TODO: replace with team context
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
          buyLink: data.buyLink
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
      <h1 className="text-3xl text-primary-100 font-bold mb-6">Create a Video</h1>

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
              <Button
                type="button"
                onClick={next}
                className="border border-transparent rounded-full 
              shadow-sm text-sm font-medium text-white 
              bg-accent-200 
              hover:bg-accent-100
              focus:outline-none focus:ring-2 
              focus:ring-offset-2 focus:ring-primary-100"
              >
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

  const toggleFormat = (format: string) => {
    const next = selectedFormats.includes(format)
      ? selectedFormats.filter((f) => f !== format)
      : [...selectedFormats, format]
    setValue('formats', next)
  }

  return (
    <Card>
      <CardHeader>Video template & formats</CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              className={`border rounded-xl p-2 cursor-pointer ${selectedTemplate === tpl.id ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setValue('templateId', tpl.id)}
            >
              <Image
                src={tpl.thumb}
                alt={tpl.name}
                width={400}
                height={225}
                className="rounded-lg"
              />
              <p className="mt-2 text-center text-sm">{tpl.name}</p>
            </div>
          ))}
        </div>

        {errors.templateId && (
          <p className="text-red-600 mt-2 text-sm">{errors.templateId.message}</p>
        )}

        <div className="flex gap-4 mt-6">
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
        {errors.formats && <p className="text-red-600 mt-2 text-sm">{errors.formats.message}</p>}
      </CardContent>
    </Card>
  )
}

/* ------------------------------------------------------------------
   Step 4 – Review
-------------------------------------------------------------------*/

function StepReview({ watch }: any) {
  const data = watch()
  return (
    <Card>
      <CardHeader>Review & confirm</CardHeader>
      <CardContent>
        <Textarea
          value={JSON.stringify(data, null, 2)}
          readOnly
          className="min-h-[300px] font-mono"
        />
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

// app/(dashboard)/videos/new/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2, Check, XCircle, ArrowRight, ArrowLeft, Video, Wand2 } from 'lucide-react'
import useSWR from 'swr'
import { User } from '@/lib/db/schema'
import { getCurrentUser } from './actions'
import { ProgressSteps } from '@/components/wizard/ProgressSteps'
import { StepInfo } from '@/components/wizard/StepInfo'
import { StepAssets } from '@/components/wizard/StepAssets'
import { StepTemplateFormat } from '@/components/wizard/StepTemplateFormat'
import { StepReview } from '@/components/wizard/StepReview'
import { formSchema, type WizardForm } from '@/lib/wizard/schema'
import { uploadFile } from '@/lib/wizard/upload'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const stepNames = ['Beat Info', 'Assets', 'Template', 'Review']

export default function VideoWizard() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<number | null>(null)

  const { data: user, isLoading: userLoading, error: userErr } = useSWR<User>('/api/user', fetcher)

  const form = useForm<WizardForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      formats: [],
      publishTargets: []
    }
  })

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    reset,
    formState: { errors }
  } = form

  // Clear draft and reset form when component mounts (new video creation)
  useEffect(() => {
    localStorage.removeItem('videoDraft')
    reset({
      formats: [],
      publishTargets: []
    })
  }, [reset])

  // Auto-save draft (but not on initial load)
  useEffect(() => {
    let hasInitialized = false
    const subscription = watch((data) => {
      if (hasInitialized) {
        localStorage.setItem('videoDraft', JSON.stringify(data))
      } else {
        hasInitialized = true
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  // Map fields that belong to each wizard step
  const stepFields: Record<number, (keyof WizardForm)[]> = {
    1: ['primaryBeatmaker', 'collaborators', 'beatName', 'typeBeat', 'buyLink'],
    2: ['audioFile', 'imageFile'],
    3: ['templateId', 'formats', 'publishTargets']
  }

  const next = async () => {
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
      // 1. Upload assets
      const audioPath = await uploadFile(data.audioFile, 'audio')
      const imagePath = await uploadFile(data.imageFile, 'image')
      const currentUser = await getCurrentUser()

      // 2. POST to API
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
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
      const { id: newVideoId } = (await res.json()) as { id: number }

      // Clear draft on success
      localStorage.removeItem('videoDraft')
      setSuccess(newVideoId)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2 text-text-100">Create a Video</h1>
        <p className="text-text-200">Generate professional type beat videos in minutes</p>
      </div>

      {success !== null ? (
        <Card className="p-8 text-center space-y-6 bg-bg-200 border-bg-300">
          <div>
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold text-text-100 mb-2">Video Generation Started!</h3>
            <p className="text-text-200">
              Your video is now being generated. You'll be notified when it's ready.
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="secondary" asChild className="min-w-[140px]">
              <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
            <Button asChild className="min-w-[140px]">
              <Link href={`/videos/${success}`}>
                <Video className="mr-2 h-4 w-4" />
                View Video
              </Link>
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <ProgressSteps currentStep={step} totalSteps={4} stepNames={stepNames} />

          <form
            className="space-y-8"
            onKeyDown={(e) => {
              // évite les submits involontaires à l’étape Review (Enter dans un input, etc.)
              if (step === 4 && e.key === 'Enter') e.preventDefault()
            }}
          >
            {step === 1 && <StepInfo control={control} errors={errors} />}
            {step === 2 && (
              <StepAssets control={control} errors={errors} setValue={setValue} watch={watch} />
            )}
            {step === 3 && (
              <StepTemplateFormat
                control={control}
                errors={errors}
                watch={watch}
                setValue={setValue}
              />
            )}
            {step === 4 && <StepReview watch={watch} onEditStep={setStep} />}

            {error && (
              <Card className="border-red-500/20 bg-red-500/5">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 text-red-500">
                    <XCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between">
              {step > 1 ? (
                <Button type="button" variant="secondary" onClick={prev} className="min-w-[120px]">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div /> // Spacer
              )}

              {step < 4 ? (
                <Button type="button" onClick={next} className="min-w-[120px]">
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  disabled={loading}
                  size="lg"
                  className="min-w-[200px]"
                  onClick={handleSubmit(onSubmit)} // ← on déclenche manuellement la soumission ici
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin mr-2 h-5 w-5" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="mr-2 h-5 w-5" />
                      Generate Video
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  )
}

// components/wizard/StepInfo.tsx
import { Controller } from 'react-hook-form'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ControlledInput } from '@/components/ui/controlled-input'

const Req = () => (
  <span aria-hidden className="text-red-600">
    *
  </span>
)

interface StepInfoProps {
  control: any
  errors: any
}

export function StepInfo({ control, errors }: StepInfoProps) {
  return (
    <Card className="bg-bg-200 border-bg-300">
      <CardHeader>
        <h3 className="text-lg font-semibold text-text-100">Beat Information</h3>
        <p className="text-sm text-text-200">Tell us about your beat and who made it</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Controller
          control={control}
          name="primaryBeatmaker"
          render={({ field }) => (
            <ControlledInput
              label={
                <>
                  Main beatmaker <Req />
                </>
              }
              placeholder="Your name or producer name"
              {...field}
              error={errors.primaryBeatmaker?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="collaborators"
          render={({ field }) => (
            <ControlledInput
              label="Additional beatmakers"
              placeholder="Co-producer 1, Co-producer 2 (comma-separated)"
              {...field}
              error={errors.collaborators?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="beatName"
          render={({ field }) => (
            <ControlledInput
              label={
                <>
                  Beat name <Req />
                </>
              }
              placeholder="My Fire Beat"
              {...field}
              error={errors.beatName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="typeBeat"
          render={({ field }) => (
            <ControlledInput
              label={
                <>
                  Type beat style <Req />
                </>
              }
              placeholder="Drake, Travis Scott, Key Glock..."
              {...field}
              error={errors.typeBeat?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="buyLink"
          render={({ field }) => (
            <ControlledInput
              label="Purchase link (optional)"
              placeholder="https://beatstars.com/your-beat"
              {...field}
              error={errors.buyLink?.message}
            />
          )}
        />
      </CardContent>
    </Card>
  )
}

// components/wizard/ProgressSteps.tsx
import { Check } from 'lucide-react'

interface ProgressStepsProps {
  currentStep: number
  totalSteps: number
  stepNames: string[]
}

export function ProgressSteps({ currentStep, totalSteps, stepNames }: ProgressStepsProps) {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        {Array.from({ length: totalSteps }, (_, i) => {
          const step = i + 1
          const isCompleted = currentStep > step
          const isCurrent = currentStep === step
          const isUpcoming = currentStep < step

          return (
            <div key={step} className={`flex items-start ${step < totalSteps ? 'flex-1' : ''}`}>
              {/* Step Circle and Name */}
              <div className="flex flex-col items-center min-w-[120px]">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all mb-3 ${
                    isCompleted
                      ? 'bg-primary-100 text-white'
                      : isCurrent
                        ? 'bg-primary-100 text-white ring-4 ring-primary-100/20'
                        : 'bg-bg-200 text-text-200 border-2 border-bg-300'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step}
                </div>

                {/* Step Name - Fixed height container */}
                <div className="h-10 flex items-center">
                  <span
                    className={`text-xs text-center leading-tight ${
                      isCurrent ? 'text-text-100 font-medium' : 'text-text-200'
                    }`}
                  >
                    {stepNames[i]}
                  </span>
                </div>
              </div>

              {/* Connector Line */}
              {step < totalSteps && (
                <div className="flex-1 h-0.5 mt-5 mx-4">
                  <div
                    className={`h-full transition-all ${
                      isCompleted ? 'bg-primary-100' : 'bg-bg-200'
                    }`}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

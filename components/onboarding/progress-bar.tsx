"use client"

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
}

export function OnboardingProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
      <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
    </div>
  )
}

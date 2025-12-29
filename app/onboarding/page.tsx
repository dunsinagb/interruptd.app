"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OnboardingProgressBar } from "@/components/onboarding/progress-bar"
import { QuizScreen } from "@/components/onboarding/quiz-screen"
import { ResultsScreen } from "@/components/onboarding/results-screen"
import { SymptomsScreen } from "@/components/onboarding/symptoms-screen"
import { HowItHelpsScreen } from "@/components/onboarding/how-it-helps-screen"
import { ReviewsScreen } from "@/components/onboarding/reviews-screen"
import { FeaturesScreen } from "@/components/onboarding/features-screen"
import { CustomPlanScreen } from "@/components/onboarding/custom-plan-screen"
import { PaywallScreen } from "@/components/onboarding/paywall-screen"
import { quizQuestions } from "@/lib/onboarding-data"
import { Logo } from "@/components/logo"

type OnboardingStep =
  | "quiz-0"
  | "quiz-1"
  | "quiz-2"
  | "quiz-3"
  | "results"
  | "symptoms"
  | "how-it-helps"
  | "reviews"
  | "features"
  | "custom-plan"
  | "paywall"

const STEPS: OnboardingStep[] = [
  "quiz-0",
  "quiz-1",
  "quiz-2",
  "quiz-3",
  "results",
  "symptoms",
  "how-it-helps",
  "reviews",
  "features",
  "custom-plan",
  "paywall",
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const currentStep = STEPS[currentStepIndex]

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const handleQuizAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleComplete = () => {
    localStorage.setItem("defaulted_onboarding_complete", "true")
    localStorage.setItem("defaulted_onboarding_answers", JSON.stringify(answers))
    router.push("/dashboard")
  }

  const renderStep = () => {
    if (currentStep.startsWith("quiz-")) {
      const quizIndex = Number.parseInt(currentStep.split("-")[1])
      const question = quizQuestions[quizIndex]
      return (
        <QuizScreen
          question={question}
          selectedAnswer={answers[question.id] || null}
          onSelect={(value) => handleQuizAnswer(question.id, value)}
          onNext={handleNext}
        />
      )
    }

    switch (currentStep) {
      case "results":
        return <ResultsScreen answers={answers} onNext={handleNext} />
      case "symptoms":
        return <SymptomsScreen onNext={handleNext} />
      case "how-it-helps":
        return <HowItHelpsScreen onNext={handleNext} />
      case "reviews":
        return <ReviewsScreen onNext={handleNext} />
      case "features":
        return <FeaturesScreen onNext={handleNext} />
      case "custom-plan":
        return <CustomPlanScreen answers={answers} onNext={handleNext} />
      case "paywall":
        return <PaywallScreen onComplete={handleComplete} onSkip={handleComplete} />
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            {currentStepIndex > 0 ? (
              <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            ) : (
              <div className="w-8" />
            )}
            <Logo size="sm" />
            <div className="w-8" />
          </div>
          <OnboardingProgressBar currentStep={currentStepIndex} totalSteps={STEPS.length} />
        </div>
      </header>

      {/* Content */}
      {renderStep()}
    </main>
  )
}

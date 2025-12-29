"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Sparkles } from "lucide-react"

interface CustomPlanScreenProps {
  answers: Record<string, string>
  onNext: () => void
}

export function CustomPlanScreen({ answers, onNext }: CustomPlanScreenProps) {
  const getDefaultSuggestion = () => {
    if (answers.behavior === "screen") return "Social Media Scrolling"
    if (answers.behavior === "food") return "Junk Food"
    if (answers.behavior === "sleep") return "Late Night Screen Time"
    return "Your Custom Default"
  }

  const getPlanFeatures = () => {
    const base = ["Personalized default tracking", "Weekly pattern reports", "Reason logging for each deviation"]
    if (answers.frequency === "daily") {
      base.push("Daily pattern notifications")
    }
    if (answers.tracking === "judgmental" || answers.tracking === "inconsistent") {
      base.push("Judgment-free observation mode")
    }
    base.push("AI-powered insights")
    return base
  }

  return (
    <div className="flex-1 flex flex-col px-4 py-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-accent-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Your Custom Plan</h2>
          <p className="text-muted-foreground">Tailored to your goals</p>
        </div>

        <Card className="border-primary bg-primary/5 mb-4">
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">Suggested first default</p>
            <p className="font-bold text-lg text-foreground">{getDefaultSuggestion()}</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardContent className="p-4">
            <p className="text-sm font-semibold text-foreground mb-3">Your plan includes:</p>
            <div className="space-y-2">
              {getPlanFeatures().map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent-foreground" />
                  </div>
                  <p className="text-sm text-foreground">{feature}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="pt-6">
        <Button size="lg" className="w-full" onClick={onNext}>
          See Plans
        </Button>
      </div>
    </div>
  )
}

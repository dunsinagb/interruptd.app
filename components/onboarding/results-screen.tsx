"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Target, Brain } from "lucide-react"

interface ResultsScreenProps {
  answers: Record<string, string>
  onNext: () => void
}

export function ResultsScreen({ answers, onNext }: ResultsScreenProps) {
  const getInsight = () => {
    if (answers.goal === "break") return "You're ready to observe and understand your patterns"
    if (answers.goal === "understand") return "Self-awareness is the first step to clarity"
    if (answers.goal === "multiple") return "Tracking multiple behaviors gives you a complete picture"
    return "Curiosity is a great starting point for self-discovery"
  }

  const getBehaviorInsight = () => {
    if (answers.behavior === "screen") return "Screen time patterns are often tied to emotions"
    if (answers.behavior === "food") return "Food choices often reveal stress and mood patterns"
    if (answers.behavior === "sleep") return "Sleep deviations often correlate with daily stress"
    return "Multi-behavior tracking reveals hidden connections"
  }

  return (
    <div className="flex-1 flex flex-col px-4 py-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Your Profile</h2>
          <p className="text-muted-foreground">Based on your answers</p>
        </div>

        <div className="space-y-3">
          <Card className="border-border bg-card">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 text-violet-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Your Goal</h3>
                <p className="text-sm text-muted-foreground">{getInsight()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">Pattern Insight</h3>
                <p className="text-sm text-muted-foreground">{getBehaviorInsight()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary bg-primary/5">
            <CardContent className="p-4">
              <p className="text-sm text-foreground font-medium text-center">
                defaulted<span className="text-primary">.</span> can help you see patterns you've never noticed before
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="pt-6">
        <Button size="lg" className="w-full" onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  )
}

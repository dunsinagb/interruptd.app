"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Sparkles } from "lucide-react"

interface HowItHelpsScreenProps {
  onNext: () => void
}

export function HowItHelpsScreen({ onNext }: HowItHelpsScreenProps) {
  const benefits = [
    "Assumes you'll follow your default (no daily check-ins)",
    "Only log when you deviate - takes seconds",
    "Past days are locked for honest tracking",
    "See weekly, monthly, and yearly patterns",
    "AI-powered insights reveal hidden triggers",
    "No judgment, just observation",
  ]

  return (
    <div className="flex-1 flex flex-col px-4 py-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            How defaulted<span className="text-primary">.</span> Helps
          </h2>
          <p className="text-muted-foreground">A different approach to pattern tracking</p>
        </div>

        <Card className="border-border bg-card">
          <CardContent className="p-4 space-y-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-accent-foreground" />
                </div>
                <p className="text-sm text-foreground">{benefit}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="pt-6">
        <Button size="lg" className="w-full" onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  )
}

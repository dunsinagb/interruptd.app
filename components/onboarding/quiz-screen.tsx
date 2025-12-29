"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import type { QuizQuestion } from "@/lib/onboarding-data"

interface QuizScreenProps {
  question: QuizQuestion
  selectedAnswer: string | null
  onSelect: (value: string) => void
  onNext: () => void
}

export function QuizScreen({ question, selectedAnswer, onSelect, onNext }: QuizScreenProps) {
  return (
    <div className="flex-1 flex flex-col px-4 py-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8 text-balance">{question.question}</h2>

        <div className="space-y-3">
          {question.options.map((option) => (
            <Card
              key={option.value}
              className={`cursor-pointer transition-all duration-200 ${
                selectedAnswer === option.value
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => onSelect(option.value)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <span className="font-medium text-foreground">{option.label}</span>
                {selectedAnswer === option.value && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="pt-6">
        <Button size="lg" className="w-full" disabled={!selectedAnswer} onClick={onNext}>
          Continue
        </Button>
      </div>
    </div>
  )
}

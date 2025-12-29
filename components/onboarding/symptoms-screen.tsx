"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { symptoms } from "@/lib/onboarding-data"

interface SymptomsScreenProps {
  onNext: () => void
}

export function SymptomsScreen({ onNext }: SymptomsScreenProps) {
  return (
    <div className="flex-1 flex flex-col px-4 py-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Sound familiar?</h2>
          <p className="text-muted-foreground">You're not alone in this</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {symptoms.map((symptom, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-4 text-center">
                <span className="text-2xl mb-2 block">{symptom.icon}</span>
                <p className="text-sm text-foreground font-medium">{symptom.label}</p>
              </CardContent>
            </Card>
          ))}
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

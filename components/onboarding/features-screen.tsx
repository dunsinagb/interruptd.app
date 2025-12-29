"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Grid3X3, Brain, Lock, Tag, Layers } from "lucide-react"
import { features } from "@/lib/onboarding-data"

interface FeaturesScreenProps {
  onNext: () => void
}

const iconMap: Record<string, React.ReactNode> = {
  calendar: <Calendar className="w-5 h-5" />,
  grid: <Grid3X3 className="w-5 h-5" />,
  brain: <Brain className="w-5 h-5" />,
  lock: <Lock className="w-5 h-5" />,
  tag: <Tag className="w-5 h-5" />,
  layers: <Layers className="w-5 h-5" />,
}

export function FeaturesScreen({ onNext }: FeaturesScreenProps) {
  return (
    <div className="flex-1 flex flex-col px-4 py-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Powerful Features</h2>
          <p className="text-muted-foreground">Everything you need to observe your patterns</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 text-primary">
                  {iconMap[feature.icon]}
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
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

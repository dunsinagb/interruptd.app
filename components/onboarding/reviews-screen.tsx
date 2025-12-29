"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { reviews } from "@/lib/onboarding-data"

interface ReviewsScreenProps {
  onNext: () => void
}

export function ReviewsScreen({ onNext }: ReviewsScreenProps) {
  return (
    <div className="flex-1 flex flex-col px-4 py-6">
      <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">What people say</h2>
          <p className="text-muted-foreground">Join thousands observing their patterns</p>
        </div>

        <div className="space-y-3">
          {reviews.map((review, index) => (
            <Card key={index} className="border-border bg-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{review.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{review.name}</p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{review.text}</p>
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

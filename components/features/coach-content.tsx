"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2, MessageCircle } from "lucide-react"
import type { Habit } from "@/lib/habit-data"

export function CoachContent() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [coachMessage, setCoachMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("/api/patterns")
        const data = (await res.json()) as { patterns?: Habit[]; error?: string }
        if (!res.ok) throw new Error(data.error || "Failed to load")
        if (!cancelled) setHabits(data.patterns || [])
      } catch (e) {
        console.error("[coach] failed to load patterns", e)
        if (!cancelled) setHabits([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const getCoachAdvice = async () => {
    if (habits.length === 0) return

    setLoading(true)
    setCoachMessage(null)

    try {
      const habitSummary = habits.map((h) => ({
        name: h.name,
        totalDefaults: h.defaultedDays.length,
      }))

      const response = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ habits: habitSummary }),
      })

      if (!response.ok) throw new Error("Failed to get coach advice")

      const data = await response.json()
      setCoachMessage(data.message)
    } catch (error) {
      console.error("[v0] Error:", error)
      setCoachMessage("Unable to generate coaching advice. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">AI Coach</h1>
        <p className="text-muted-foreground">Personalized, non-judgmental pattern observations and reflections</p>
      </div>

      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        {coachMessage ? (
          <Card className="glass-card w-full border-primary/20">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <MessageCircle className="w-4 h-4" />
                Coach Reflection
              </div>
              <p className="text-foreground leading-relaxed">{coachMessage}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">Ready for reflection?</h3>
            <p className="text-muted-foreground max-w-md">
              Get personalized, observational insights about your patterns without judgment or prescriptive advice.
            </p>
          </div>
        )}

        <Button onClick={getCoachAdvice} disabled={loading || habits.length === 0} size="lg" className="gap-2">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating reflection...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Get Coach Reflection
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

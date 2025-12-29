"use client"

import { useState, useEffect, Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { type Habit, getHabitColor } from "@/lib/habit-data"
import { Sparkles, Loader2, TrendingUp, Calendar, Clock } from "lucide-react"

function InsightsContent() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null)
  const [insights, setInsights] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("/api/patterns")
        const data = (await res.json()) as { patterns?: Habit[]; error?: string }
        if (!res.ok) throw new Error(data.error || "Failed to load")
        const parsed = data.patterns || []
        if (!cancelled) {
          setHabits(parsed)
          setSelectedHabitId(parsed[0]?.id ?? null)
        }
      } catch (e) {
        console.error("[insights] failed to load patterns", e)
        if (!cancelled) setHabits([])
      } finally {
        if (!cancelled) setMounted(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const selectedHabit = habits.find((h) => h.id === selectedHabitId)

  const analyzePattern = async () => {
    if (!selectedHabit) return

    setLoading(true)
    setInsights(null)

    try {
      const today = new Date()
      const startOfYear = new Date(2025, 0, 1)
      const totalDays = Math.floor((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1

      const response = await fetch("/api/analyze-pattern", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          habitName: selectedHabit.name,
          defaultedDays: selectedHabit.defaultedDays,
          totalDays: Math.min(totalDays, 364),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze pattern")
      }

      const data = await response.json()
      setInsights(data.insights)
    } catch (error) {
      console.error("[v0] Error:", error)
      setInsights("Unable to generate insights. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    )
  }

  if (habits.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center space-y-4">
        <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground" />
        <h2 className="text-xl font-bold">No Defaults Yet</h2>
        <p className="text-muted-foreground">Add a default to start discovering patterns in your behavior.</p>
      </div>
    )
  }

  const colors = selectedHabit ? getHabitColor(selectedHabit.color) : null

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Pattern Insights</h1>
        <p className="text-muted-foreground">AI-powered analysis of your defaulting patterns</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Select a Default
          </CardTitle>
          <CardDescription>Choose which default pattern to analyze</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {habits.map((habit) => {
            const habitColors = getHabitColor(habit.color)
            const isSelected = habit.id === selectedHabitId
            return (
              <button
                key={habit.id}
                onClick={() => setSelectedHabitId(habit.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                  isSelected ? `${habitColors.border} bg-primary/5` : "border-border hover:border-muted-foreground"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${habitColors.bg} flex items-center justify-center flex-shrink-0`}
                >
                  <span className="text-white font-bold text-xs">
                    {habit.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-medium truncate">{habit.name}</p>
                  <p className="text-sm text-muted-foreground">{habit.defaultedDays.length} days defaulted</p>
                </div>
              </button>
            )
          })}
        </CardContent>
      </Card>

      {selectedHabit && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI Pattern Analysis
            </CardTitle>
            <CardDescription>Discover temporal patterns and behavioral triggers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={analyzePattern} disabled={loading} className="w-full" size="lg">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing Pattern...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Analyze "{selectedHabit.name}"
                </>
              )}
            </Button>

            {insights && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock className="w-4 h-4" />
                  Pattern Insights
                </div>
                <div className="text-sm leading-relaxed text-foreground space-y-2">
                  {insights.split("\n").map(
                    (line, i) =>
                      line.trim() && (
                        <div key={i} className="flex items-start gap-2">
                          <span className="mt-0.5">{line}</span>
                        </div>
                      ),
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="text-center text-xs text-muted-foreground">
        <p>AI insights are observational and non-prescriptive.</p>
        <p>Powered by OpenRouter</p>
      </div>
    </div>
  )
}

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <InsightsContent />
      </Suspense>
    </main>
  )
}

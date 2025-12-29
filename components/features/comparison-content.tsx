"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react"
import type { Habit } from "@/lib/habit-data"

export function ComparisonContent() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [timeframe, setTimeframe] = useState<"month" | "quarter">("month")

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("/api/patterns")
        const data = (await res.json()) as { patterns?: Habit[]; error?: string }
        if (!res.ok) throw new Error(data.error || "Failed to load")
        if (!cancelled) setHabits(data.patterns || [])
      } catch (e) {
        console.error("[comparison] failed to load patterns", e)
        if (!cancelled) setHabits([])
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const getMonthDefaults = (habit: Habit, monthOffset: number) => {
    const now = new Date()
    const targetMonth = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1)
    const monthStr = `${targetMonth.getFullYear()}-${String(targetMonth.getMonth() + 1).padStart(2, "0")}`
    return habit.defaultedDays.filter((d) => d.date.startsWith(monthStr)).length
  }

  const getQuarterDefaults = (habit: Habit, quarterOffset: number) => {
    const now = new Date()
    const currentMonth = now.getMonth() // 0-11
    const currentQuarter = Math.floor(currentMonth / 3) // 0-3
    const currentYear = now.getFullYear()

    // Calculate target quarter and year
    let targetQuarter = currentQuarter - quarterOffset
    let targetYear = currentYear

    // Handle year rollover
    while (targetQuarter < 0) {
      targetQuarter += 4
      targetYear -= 1
    }

    // Get the three months for this quarter (0-indexed)
    const quarterMonths = [
      [0, 1, 2], // Q1: Jan, Feb, Mar
      [3, 4, 5], // Q2: Apr, May, Jun
      [6, 7, 8], // Q3: Jul, Aug, Sep
      [9, 10, 11], // Q4: Oct, Nov, Dec
    ][targetQuarter]

    return habit.defaultedDays.filter((d) => {
      const [year, month] = d.date.split("-").map(Number)
      return year === targetYear && quarterMonths.includes(month - 1)
    }).length
  }

  const getQuarterName = (quarterOffset: number) => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentQuarter = Math.floor(currentMonth / 3)
    let targetQuarter = currentQuarter - quarterOffset

    // Handle year rollover
    while (targetQuarter < 0) {
      targetQuarter += 4
    }
    targetQuarter = targetQuarter % 4

    const quarters = ["Q1", "Q2", "Q3", "Q4"]
    return quarters[targetQuarter]
  }

  const thisMonth = new Date().toLocaleDateString("en-US", { month: "long" })
  const lastMonth = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleDateString("en-US", {
    month: "long",
  })

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Trend Comparison</h1>
        <p className="text-muted-foreground">Track how your patterns change over time</p>
      </div>

      <div className="flex gap-2 p-1 bg-muted/50 rounded-lg">
        <Button
          variant={timeframe === "month" ? "secondary" : "ghost"}
          className="flex-1"
          onClick={() => setTimeframe("month")}
        >
          Month
        </Button>
        <Button
          variant={timeframe === "quarter" ? "secondary" : "ghost"}
          className="flex-1"
          onClick={() => setTimeframe("quarter")}
        >
          Quarter
        </Button>
      </div>

      <div className="space-y-4">
        {habits.map((habit) => {
          const currentCount = timeframe === "month" ? getMonthDefaults(habit, 0) : getQuarterDefaults(habit, 0)
          const previousCount = timeframe === "month" ? getMonthDefaults(habit, 1) : getQuarterDefaults(habit, 1)
          const currentLabel = timeframe === "month" ? thisMonth : getQuarterName(0)
          const previousLabel = timeframe === "month" ? lastMonth : getQuarterName(1)

          const change = currentCount - previousCount
          const percentChange = previousCount > 0 ? Math.round((change / previousCount) * 100) : 0
          const isIncrease = change > 0

          return (
            <Card key={habit.id} className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">{habit.name}</CardTitle>
                <CardDescription>Defaulting frequency comparison</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{previousLabel}</p>
                    <p className="text-3xl font-bold">{previousCount}</p>
                    <p className="text-xs text-muted-foreground">defaults</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-muted-foreground mx-4" />
                  <div className="text-center flex-1">
                    <p className="text-sm text-muted-foreground mb-1">{currentLabel}</p>
                    <p className="text-3xl font-bold text-primary">{currentCount}</p>
                    <p className="text-xs text-muted-foreground">defaults</p>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {isIncrease ? (
                    <>
                      <div className="flex items-center gap-1 text-emerald-500 font-semibold">
                        <TrendingUp className="w-4 h-4" />
                        <span>{Math.abs(percentChange)}% more</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        defaults this {timeframe === "month" ? "month" : "quarter"}
                      </span>
                    </>
                  ) : change < 0 ? (
                    <>
                      <div className="flex items-center gap-1 text-amber-500 font-semibold">
                        <TrendingDown className="w-4 h-4" />
                        <span>{Math.abs(percentChange)}% fewer</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        defaults this {timeframe === "month" ? "month" : "quarter"}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No change from last {timeframe === "month" ? "month" : "quarter"}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

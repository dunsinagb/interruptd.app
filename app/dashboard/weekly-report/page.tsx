"use client"

import { useState, useEffect, Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { type Habit, getHabitColor } from "@/lib/habit-data"
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Loader2,
  FileText,
  Sparkles,
  Download,
} from "lucide-react"

const STORAGE_KEY = "defaulted-habits-2025"

function getWeekRange(weeksAgo = 0) {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - dayOfWeek - weeksAgo * 7)
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)

  const formatDate = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  const formatDisplay = (d: Date) => d.toLocaleDateString("en-US", { month: "short", day: "numeric" })

  return {
    start: formatDate(startOfWeek),
    end: formatDate(endOfWeek),
    display: `${formatDisplay(startOfWeek)} - ${formatDisplay(endOfWeek)}`,
    startDate: startOfWeek,
    endDate: endOfWeek,
  }
}

function WeeklyReportContent() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [weeksAgo, setWeeksAgo] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [aiSummary, setAiSummary] = useState<string | null>(null)
  const [loadingAi, setLoadingAi] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      setHabits(JSON.parse(saved).filter((h: Habit) => !h.archived))
    }
  }, [])

  const week = getWeekRange(weeksAgo)
  const prevWeek = getWeekRange(weeksAgo + 1)

  const getWeekData = (habit: Habit, weekRange: { start: string; end: string }) => {
    return habit.defaultedDays.filter((d) => d.date >= weekRange.start && d.date <= weekRange.end)
  }

  const generateAiSummary = async () => {
    setLoadingAi(true)
    setAiSummary(null)

    const weekData = habits.map((h) => ({
      name: h.name,
      defaults: getWeekData(h, week),
      count: getWeekData(h, week).length,
    }))

    try {
      const response = await fetch("/api/analyze-pattern", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          habitName: "Weekly Summary",
          defaultedDays: weekData.flatMap((w) => w.defaults.map((d) => ({ ...d, habit: w.name }))),
          totalDays: 7,
          isWeeklySummary: true,
          weekRange: week.display,
          habitSummaries: weekData,
        }),
      })

      if (!response.ok) throw new Error("Failed")
      const data = await response.json()
      setAiSummary(data.insights)
    } catch {
      setAiSummary("Unable to generate summary. Please try again.")
    } finally {
      setLoadingAi(false)
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (habits.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center space-y-4">
        <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
        <h2 className="text-xl font-bold">No Data Yet</h2>
        <p className="text-muted-foreground">Add a default to start seeing weekly reports.</p>
      </div>
    )
  }

  const totalThisWeek = habits.reduce((sum, h) => sum + getWeekData(h, week).length, 0)
  const totalLastWeek = habits.reduce((sum, h) => sum + getWeekData(h, prevWeek).length, 0)
  const weekChange = totalLastWeek > 0 ? ((totalThisWeek - totalLastWeek) / totalLastWeek) * 100 : 0

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 pb-24">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Weekly Report</h1>
        <p className="text-muted-foreground">Your pattern summary for the week</p>
      </div>

      {/* Week Navigator */}
      <div className="flex items-center justify-between bg-muted/50 rounded-xl p-3">
        <Button variant="ghost" size="icon" onClick={() => setWeeksAgo((w) => w + 1)}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {weeksAgo === 0 ? "This Week" : weeksAgo === 1 ? "Last Week" : `${weeksAgo} Weeks Ago`}
          </p>
          <p className="font-semibold">{week.display}</p>
        </div>
        <Button variant="ghost" size="icon" disabled={weeksAgo === 0} onClick={() => setWeeksAgo((w) => w - 1)}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Summary Card */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Defaults This Week</p>
              <p className="text-5xl font-bold mt-1">{totalThisWeek}</p>
              <p className="text-sm text-muted-foreground mt-2">across {habits.length} defaults tracked</p>
            </div>
            <div
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold ${
                weekChange > 0
                  ? "bg-emerald-100 text-emerald-700"
                  : weekChange < 0
                    ? "bg-rose-100 text-rose-700"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {weekChange > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : weekChange < 0 ? (
                <TrendingDown className="w-4 h-4" />
              ) : (
                <Minus className="w-4 h-4" />
              )}
              {Math.abs(weekChange).toFixed(0)}% vs last week
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Per-Default Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">By Default</CardTitle>
          <CardDescription>How each pattern performed this week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {habits.map((habit) => {
            const thisWeekCount = getWeekData(habit, week).length
            const lastWeekCount = getWeekData(habit, prevWeek).length
            const change = lastWeekCount > 0 ? ((thisWeekCount - lastWeekCount) / lastWeekCount) * 100 : 0
            const colors = getHabitColor(habit.color)
            const topReason = getWeekData(habit, week).reduce(
              (acc, d) => {
                const r = d.reason || "No reason"
                acc[r] = (acc[r] || 0) + 1
                return acc
              },
              {} as Record<string, number>,
            )
            const mostCommon = Object.entries(topReason).sort((a, b) => b[1] - a[1])[0]

            return (
              <div key={habit.id} className="p-4 border rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                      <span className="text-white font-bold text-xs">
                        {habit.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold">{habit.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {thisWeekCount} {thisWeekCount === 1 ? "time" : "times"} this week
                      </p>
                    </div>
                  </div>
                  <div
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      change > 0
                        ? "bg-emerald-100 text-emerald-700"
                        : change < 0
                          ? "bg-rose-100 text-rose-700"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {change > 0 ? "+" : ""}
                    {change.toFixed(0)}%
                  </div>
                </div>
                {mostCommon && thisWeekCount > 0 && (
                  <div className="text-sm bg-muted/50 rounded-lg px-3 py-2">
                    <span className="text-muted-foreground">Top reason: </span>
                    <span className="font-medium">{mostCommon[0]}</span>
                    <span className="text-muted-foreground"> ({mostCommon[1]}x)</span>
                  </div>
                )}
                {/* Week day visualization */}
                <div className="flex gap-1">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => {
                    const date = new Date(week.startDate)
                    date.setDate(date.getDate() + i)
                    const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
                    const hasDefault = getWeekData(habit, week).some((d) => d.date === dateStr)
                    return (
                      <div key={i} className="flex-1 text-center">
                        <div
                          className={`aspect-square rounded-md flex items-center justify-center text-xs ${
                            hasDefault ? `${colors.bg} text-white` : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {day}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* AI Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="w-5 h-5" />
            AI Weekly Insights
          </CardTitle>
          <CardDescription>AI-generated observations about your week</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={generateAiSummary} disabled={loadingAi} className="w-full">
            {loadingAi ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Summary...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Weekly Summary
              </>
            )}
          </Button>

          {aiSummary && (
            <div className="p-4 bg-muted/50 rounded-lg space-y-2">
              {aiSummary.split("\n").map(
                (line, i) =>
                  line.trim() && (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <span>{line}</span>
                    </div>
                  ),
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Export Button */}
      <Button
        variant="outline"
        className="w-full bg-transparent"
        onClick={() => {
          const data = {
            week: week.display,
            totalDefaults: totalThisWeek,
            habits: habits.map((h) => ({
              name: h.name,
              defaults: getWeekData(h, week),
            })),
          }
          const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = `defaulted-weekly-report-${week.start}.json`
          a.click()
        }}
      >
        <Download className="w-4 h-4 mr-2" />
        Export Report
      </Button>
    </div>
  )
}

export default function WeeklyReportPage() {
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
        <WeeklyReportContent />
      </Suspense>
    </main>
  )
}

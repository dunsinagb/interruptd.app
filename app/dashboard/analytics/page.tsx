"use client"

import { useState, useEffect, Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard-header"
import { type Habit, getHabitColor } from "@/lib/habit-data"
import { PieChart, BarChart3, Calendar, TrendingDown, TrendingUp, Loader2 } from "lucide-react"

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const COLOR_MAP: Record<string, string> = {
  purple: "#8b5cf6",
  blue: "#3b82f6",
  green: "#22c55e",
  red: "#ef4444",
  orange: "#f97316",
  pink: "#ec4899",
  teal: "#14b8a6",
}

function AnalyticsContent() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("/api/patterns")
        const data = (await res.json()) as { patterns?: Habit[]; error?: string }
        if (!res.ok) throw new Error(data.error || "Failed to load")
        const parsed = (data.patterns || []).filter((h) => !h.archived)
        if (!cancelled) {
          setHabits(parsed)
          setSelectedHabitId(parsed[0]?.id ?? null)
        }
      } catch (e) {
        console.error("[analytics] failed to load patterns", e)
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

  // Calculate reason breakdown
  const getReasonBreakdown = () => {
    if (!selectedHabit) return []
    const reasonCounts: Record<string, number> = {}
    selectedHabit.defaultedDays.forEach((day) => {
      const reason = day.reason || "No reason logged"
      reasonCounts[reason] = (reasonCounts[reason] || 0) + 1
    })
    return Object.entries(reasonCounts)
      .map(([reason, count]) => ({ reason, count, percentage: (count / selectedHabit.defaultedDays.length) * 100 }))
      .sort((a, b) => b.count - a.count)
  }

  // Calculate day of week breakdown
  const getDayOfWeekBreakdown = () => {
    if (!selectedHabit) return []
    const dayCounts = [0, 0, 0, 0, 0, 0, 0]
    selectedHabit.defaultedDays.forEach((day) => {
      const date = new Date(day.date + "T12:00:00")
      dayCounts[date.getDay()]++
    })
    const maxCount = Math.max(...dayCounts, 1)
    return DAYS_OF_WEEK.map((day, i) => ({
      day,
      count: dayCounts[i],
      percentage: (dayCounts[i] / maxCount) * 100,
    }))
  }

  // Calculate monthly breakdown
  const getMonthlyBreakdown = () => {
    if (!selectedHabit) return []
    const monthCounts = Array(12).fill(0)
    selectedHabit.defaultedDays.forEach((day) => {
      const month = Number.parseInt(day.date.split("-")[1]) - 1
      monthCounts[month]++
    })
    const maxCount = Math.max(...monthCounts, 1)
    return MONTHS.map((month, i) => ({
      month,
      count: monthCounts[i],
      percentage: (monthCounts[i] / maxCount) * 100,
    }))
  }

  // Calculate week over week trend
  const getWeeklyTrend = () => {
    if (!selectedHabit) return { current: 0, previous: 0, change: 0 }
    const today = new Date()
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000)

    const formatDate = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`

    const currentWeek = selectedHabit.defaultedDays.filter((d) => d.date > formatDate(oneWeekAgo)).length
    const previousWeek = selectedHabit.defaultedDays.filter(
      (d) => d.date > formatDate(twoWeeksAgo) && d.date <= formatDate(oneWeekAgo),
    ).length

    const change = previousWeek > 0 ? ((currentWeek - previousWeek) / previousWeek) * 100 : 0
    return { current: currentWeek, previous: previousWeek, change }
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
        <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground" />
        <h2 className="text-xl font-bold">No Data Yet</h2>
        <p className="text-muted-foreground">Add a default to start seeing your analytics.</p>
      </div>
    )
  }

  const reasonBreakdown = getReasonBreakdown()
  const dayBreakdown = getDayOfWeekBreakdown()
  const monthlyBreakdown = getMonthlyBreakdown()
  const weeklyTrend = getWeeklyTrend()

  const activeColor = selectedHabit ? COLOR_MAP[selectedHabit.color] || "#8b5cf6" : "#8b5cf6"
  const colors = selectedHabit ? getHabitColor(selectedHabit.color) : null

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 pb-24">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Reason Analytics</h1>
        <p className="text-muted-foreground">Visual breakdown of why you default</p>
      </div>

      {/* Default Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {habits.map((habit) => {
          const habitColors = getHabitColor(habit.color)
          const isSelected = habit.id === selectedHabitId
          return (
            <button
              key={habit.id}
              onClick={() => setSelectedHabitId(habit.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 whitespace-nowrap transition-all ${
                isSelected ? `border-transparent text-white` : "border-white/10 hover:border-white/20"
              }`}
              style={isSelected ? { backgroundColor: COLOR_MAP[habit.color] || "#8b5cf6" } : {}}
            >
              <span className="text-sm font-medium">{habit.name}</span>
            </button>
          )
        })}
      </div>

      {selectedHabit && (
        <>
          {/* Weekly Trend Card */}
          <Card className="glass border-white/10">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Week vs Last Week</p>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-4xl font-bold">{weeklyTrend.current}</span>
                    <span className="text-muted-foreground">vs {weeklyTrend.previous}</span>
                  </div>
                </div>
                <div
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${
                    weeklyTrend.change > 0
                      ? "bg-emerald-500/20 text-emerald-400"
                      : weeklyTrend.change < 0
                        ? "bg-rose-500/20 text-rose-400"
                        : "bg-white/10 text-muted-foreground"
                  }`}
                >
                  {weeklyTrend.change > 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : weeklyTrend.change < 0 ? (
                    <TrendingDown className="w-4 h-4" />
                  ) : null}
                  {Math.abs(weeklyTrend.change).toFixed(0)}%
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reason Breakdown */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChart className="w-5 h-5" />
                Top Reasons
              </CardTitle>
              <CardDescription>Why you stepped away from the norm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {reasonBreakdown.length > 0 ? (
                reasonBreakdown.slice(0, 5).map((item, i) => (
                  <div key={item.reason} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium truncate max-w-[200px]">{item.reason}</span>
                      <span className="text-muted-foreground">
                        {item.count} times ({item.percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full transition-all duration-500 rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: activeColor,
                          opacity: 1 - i * 0.15,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No reasons logged yet</p>
              )}
            </CardContent>
          </Card>

          {/* Day of Week Breakdown */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="w-5 h-5" />
                Day of Week Pattern
              </CardTitle>
              <CardDescription>Which days you default most</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-2" style={{ height: "128px" }}>
                {dayBreakdown.map((item) => {
                  const barHeight = Math.max(item.percentage, 5)
                  return (
                    <div key={item.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative" style={{ height: "80px" }}>
                        <div
                          className="absolute bottom-0 left-0 right-0 w-full bg-white/5 rounded-t-md"
                          style={{ height: "80px" }}
                        />
                        <div
                          className="absolute bottom-0 left-0 right-0 w-full transition-all duration-500 rounded-t-md"
                          style={{
                            height: `${(barHeight / 100) * 80}px`,
                            backgroundColor: activeColor,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{item.day}</span>
                      <span className="text-xs font-medium">{item.count}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Breakdown */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart3 className="w-5 h-5" />
                Monthly Overview
              </CardTitle>
              <CardDescription>Defaults across the year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between gap-1" style={{ height: "128px" }}>
                {monthlyBreakdown.map((item) => {
                  const barHeight = Math.max(item.percentage, 5)
                  return (
                    <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative" style={{ height: "96px" }}>
                        <div
                          className="absolute bottom-0 left-0 right-0 w-full bg-white/5 rounded-t-md"
                          style={{ height: "96px" }}
                        />
                        <div
                          className="absolute bottom-0 left-0 right-0 w-full transition-all duration-500 rounded-t-md"
                          style={{
                            height: `${(barHeight / 100) * 96}px`,
                            backgroundColor: activeColor,
                          }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">{item.month}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

export default function AnalyticsPage() {
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
        <AnalyticsContent />
      </Suspense>
    </main>
  )
}

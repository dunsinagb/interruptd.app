"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, MoreVertical, Edit2, Archive } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type Habit, type DefaultedDay, getHabitColor } from "@/lib/habit-data"
import { HabitStatsCards } from "@/components/habit-stats-cards"
import { HabitDayGrid } from "@/components/habit-day-grid"
import { HabitViewToggle, type ViewMode } from "@/components/habit-view-toggle"
import { HabitDayModal } from "@/components/habit-day-modal"
import { HabitLegend } from "@/components/habit-legend"
import { DashboardHeader } from "@/components/dashboard-header"
import { EditHabitModal } from "@/components/edit-habit-modal"
import { getTodayString } from "@/lib/date-utils"

export default function HabitDetailPage() {
  const params = useParams()
  const router = useRouter()
  const habitId = params.id as string

  const [habit, setHabit] = useState<Habit | null>(null)
  const [mounted, setMounted] = useState(false)
  const [view, setView] = useState<ViewMode>("week")
  const [selectedMonth, setSelectedMonth] = useState(() => new Date().getMonth())
  const [weekOffset, setWeekOffset] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const today = useMemo(() => getTodayString(), [])

  const todayDayNumber = useMemo(() => {
    const now = new Date()
    const start = new Date(2025, 0, 1)
    return Math.min(Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1, 364)
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`/api/patterns/${habitId}`)
        const data = (await res.json()) as { pattern?: Habit; error?: string }
        if (!res.ok || !data.pattern) throw new Error(data.error || "Not found")
        if (!cancelled) setHabit(data.pattern)
      } catch (e) {
        console.error("[habit] failed to load", e)
        if (!cancelled) setHabit(null)
      } finally {
        if (!cancelled) setMounted(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [habitId])

  const updateHabit = (updatedHabit: Habit) => {
    setHabit(updatedHabit)
    ;(async () => {
      try {
        const res = await fetch(`/api/patterns/${habitId}`, {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            name: updatedHabit.name,
            description: updatedHabit.description,
            color: updatedHabit.color,
            archived: updatedHabit.archived,
          }),
        })
        const data = (await res.json()) as { pattern?: Habit; error?: string }
        if (!res.ok || !data.pattern) throw new Error(data.error || "Failed to update")
        setHabit(data.pattern)
      } catch (e) {
        console.error("[habit] failed to update", e)
        alert("Unable to save changes. Please try again.")
      }
    })()
  }

  const handleDayClick = (date: string) => {
    if (date !== today) return
    setSelectedDate(date)
    setModalOpen(true)
  }

  const handleSaveEntry = (date: string, reason?: string) => {
    if (!habit) return

    const existingIndex = habit.defaultedDays.findIndex((d) => d.date === date)
    let newDefaultedDays: DefaultedDay[]

    if (existingIndex !== -1) {
      newDefaultedDays = [...habit.defaultedDays]
      newDefaultedDays[existingIndex] = { date, reason }
    } else {
      newDefaultedDays = [...habit.defaultedDays, { date, reason }]
    }

    ;(async () => {
      try {
        const res = await fetch(`/api/patterns/${habit.id}/days`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ date, reason }),
        })
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        if (!res.ok) throw new Error(data?.error || "Failed")
        setHabit({ ...habit, defaultedDays: newDefaultedDays })
      } catch (e) {
        console.error("[habit] failed to save entry", e)
        alert("Unable to save entry. Please try again.")
      }
    })()
  }

  const handleClearEntry = (date: string) => {
    if (!habit) return
    const newDefaultedDays = habit.defaultedDays.filter((d) => d.date !== date)
    ;(async () => {
      try {
        const res = await fetch(`/api/patterns/${habit.id}/days`, {
          method: "DELETE",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ date }),
        })
        const data = (await res.json().catch(() => null)) as { error?: string } | null
        if (!res.ok) throw new Error(data?.error || "Failed")
        setHabit({ ...habit, defaultedDays: newDefaultedDays })
      } catch (e) {
        console.error("[habit] failed to clear entry", e)
        alert("Unable to clear entry. Please try again.")
      }
    })()
  }

  const handleArchive = () => {
    if (!habit) return
    ;(async () => {
      updateHabit({ ...habit, archived: !habit.archived })
      router.push("/dashboard")
    })()
  }

  const stats = useMemo(() => {
    if (!habit) return { defaultedCount: 0, normCount: 0, currentCycle: 0, longestCycle: 0 }

    const defaultedSet = new Set(habit.defaultedDays.map((d) => d.date))
    let defaultedCount = 0

    for (let i = 1; i <= todayDayNumber; i++) {
      const date = new Date(2025, 0, i).toISOString().split("T")[0]
      if (defaultedSet.has(date)) {
        defaultedCount++
      }
    }

    const normCount = todayDayNumber - defaultedCount

    let currentCycle = 0
    for (let i = todayDayNumber; i >= 1; i--) {
      const date = new Date(2025, 0, i).toISOString().split("T")[0]
      if (defaultedSet.has(date)) {
        currentCycle++
      } else {
        break
      }
    }

    let longestCycle = 0
    let tempCycle = 0
    for (let i = 1; i <= todayDayNumber; i++) {
      const date = new Date(2025, 0, i).toISOString().split("T")[0]
      if (defaultedSet.has(date)) {
        tempCycle++
        longestCycle = Math.max(longestCycle, tempCycle)
      } else {
        tempCycle = 0
      }
    }

    return { defaultedCount, normCount, currentCycle, longestCycle }
  }, [habit, todayDayNumber])

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </main>
    )
  }

  if (!habit) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Default not found</p>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </main>
    )
  }

  const colors = getHabitColor(habit.color)
  const selectedEntry = habit.defaultedDays.find((d) => d.date === selectedDate)

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
              <span className="text-white font-bold text-sm">
                {habit.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold text-foreground truncate">{habit.name}</h1>
              {habit.description && <p className="text-xs text-muted-foreground truncate">{habit.description}</p>}
            </div>
          </div>
          {stats.currentCycle > 0 && (
            <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full">
              <span className="text-base">🔄</span>
              <span className="font-bold text-amber-600 text-sm">{stats.currentCycle}</span>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Default
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleArchive}>
                <Archive className="w-4 h-4 mr-2" />
                {habit.archived ? "Unarchive" : "Archive"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <HabitStatsCards
          defaultedCount={stats.defaultedCount}
          normCount={stats.normCount}
          currentCycle={stats.currentCycle}
          longestCycle={stats.longestCycle}
          total={todayDayNumber}
          color={habit.color}
        />

        <HabitViewToggle
          view={view}
          onViewChange={setView}
          currentMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
          currentWeekOffset={weekOffset}
          onWeekChange={setWeekOffset}
        />

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <HabitDayGrid
              defaultedDays={habit.defaultedDays}
              onDayClick={handleDayClick}
              view={view}
              selectedMonth={selectedMonth}
              color={habit.color}
              weekOffset={weekOffset}
            />
            {view === "year" && (
              <div className="mt-6">
                <HabitLegend color={habit.color} variant="gradient" />
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">Past days are locked. Only today can be logged.</p>
      </div>

      {selectedDate && (
        <HabitDayModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          date={selectedDate}
          entry={selectedEntry}
          onSave={handleSaveEntry}
          onClear={handleClearEntry}
          color={habit.color}
        />
      )}

      <EditHabitModal open={editModalOpen} onOpenChange={setEditModalOpen} habit={habit} onSave={updateHabit} />
    </main>
  )
}

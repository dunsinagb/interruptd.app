"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Eye, Calendar, TrendingUp } from "lucide-react"
import { HabitCard } from "@/components/habit-card"
import { AddHabitModal } from "@/components/add-habit-modal"
import { DashboardHeader } from "@/components/dashboard-header"
import { AnimatedBackground } from "@/components/animated-background"
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/motion-wrapper"
import { type Habit } from "@/lib/habit-data"

export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [mounted, setMounted] = useState(false)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [showArchived, setShowArchived] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch("/api/patterns")
        const data = (await res.json()) as { patterns?: Habit[]; error?: string }
        if (!res.ok) throw new Error(data.error || "Failed to load patterns")
        if (!cancelled) setHabits(data.patterns || [])
      } catch (e) {
        console.error("[dashboard] failed to load patterns", e)
        if (!cancelled) setHabits([])
      } finally {
        if (!cancelled) setMounted(true)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const handleAddHabit = async (habit: Omit<Habit, "id" | "createdAt" | "defaultedDays" | "archived">) => {
    try {
      const res = await fetch("/api/patterns", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(habit),
      })
      const data = (await res.json()) as { pattern?: Habit; error?: string }
      if (!res.ok || !data.pattern) throw new Error(data.error || "Failed to create default")
      setHabits((prev) => [...prev, data.pattern!])
    } catch (e) {
      console.error("[dashboard] failed to create pattern", e)
      alert("Unable to add default. Please try again.")
    }
  }

  const visibleHabits = habits.filter((h) => (showArchived ? h.archived : !h.archived))
  const totalTimesDefaulted = visibleHabits.reduce((acc, h) => acc + h.defaultedDays.length, 0)
  const daysTracked = Math.min(
    Math.floor((new Date().getTime() - new Date(2025, 0, 1).getTime()) / (1000 * 60 * 60 * 24)) + 1,
    364,
  )
  const avgDefaultsPerPattern = visibleHabits.length > 0 ? Math.round(totalTimesDefaulted / visibleHabits.length) : 0

  if (!mounted) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center relative">
        <AnimatedBackground />
        <div className="text-muted-foreground font-mono">Loading...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <div className="fixed inset-0 pointer-events-none z-[1] noise" />

      <div className="relative z-10">
        <DashboardHeader />

        <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
          {/* Page Title */}
          <FadeIn>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Defaults</h1>
                <p className="text-sm text-muted-foreground font-mono">Observe your patterns</p>
              </div>
              <Button
                size="sm"
                onClick={() => setAddModalOpen(true)}
                className="gap-1.5 bg-primary/90 hover:bg-primary glow-border magnetic-btn"
              >
                <Plus className="w-4 h-4" />
                Add
              </Button>
            </div>
          </FadeIn>

          {/* Overview Stats */}
          <FadeIn delay={0.1}>
            <Card className="glass-strong border-white/10 overflow-hidden">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {/* Patterns Observed */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-primary" />
                      <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Watching</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-foreground">{visibleHabits.length}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">
                        {visibleHabits.length === 1 ? "pattern" : "patterns"}
                      </p>
                    </div>
                  </div>

                  {/* Days Tracked */}
                  <div className="space-y-2 border-l border-white/10 pl-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Tracked</p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-foreground">{daysTracked}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">of 364 days</p>
                    </div>
                  </div>

                  {/* Avg Defaults */}
                  <div className="space-y-2 border-l border-white/10 pl-4">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
                        Avg/Pattern
                      </p>
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-foreground">{avgDefaultsPerPattern}</p>
                      <p className="text-[10px] text-muted-foreground font-mono">days off norm</p>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs font-mono text-muted-foreground">
                    <span>Year Progress</span>
                    <span>{Math.round((daysTracked / 364) * 100)}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(daysTracked / 364) * 100}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Archived Filter Toggle */}
          {habits.some((h) => h.archived) && (
            <FadeIn delay={0.15}>
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant={!showArchived ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowArchived(false)}
                  className={!showArchived ? "glow-border" : "glass border-white/10"}
                >
                  Active
                </Button>
                <Button
                  variant={showArchived ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowArchived(true)}
                  className={showArchived ? "glow-border" : "glass border-white/10"}
                >
                  Archived
                </Button>
              </div>
            </FadeIn>
          )}

          {/* Defaults List */}
          <FadeInStagger className="space-y-3">
            {visibleHabits.map((habit, i) => (
              <FadeInStaggerItem key={habit.id}>
                <Link href={`/dashboard/habit/${habit.id}`}>
                  <HabitCard habit={habit} />
                </Link>
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>

          {visibleHabits.length === 0 && (
            <FadeIn delay={0.2}>
              <Card className="glass border-white/10 border-dashed">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-muted/30 border border-white/10 flex items-center justify-center mx-auto">
                    <Plus className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">
                      {showArchived ? "No archived defaults" : "No defaults yet"}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light">
                      {showArchived ? "Archived defaults will appear here" : "Add your first default to start tracking"}
                    </p>
                  </div>
                  {!showArchived && (
                    <Button onClick={() => setAddModalOpen(true)} className="gap-1.5 glow-border magnetic-btn">
                      <Plus className="w-4 h-4" />
                      Add Default
                    </Button>
                  )}
                </CardContent>
              </Card>
            </FadeIn>
          )}
        </div>
      </div>

      {/* Add Default Modal */}
      <AddHabitModal open={addModalOpen} onOpenChange={setAddModalOpen} onAdd={handleAddHabit} />
    </main>
  )
}

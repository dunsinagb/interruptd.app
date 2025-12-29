"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"
import { type Habit, getHabitColor } from "@/lib/habit-data"

interface HabitCardProps {
  habit: Habit
}

export function HabitCard({ habit }: HabitCardProps) {
  const colors = getHabitColor(habit.color)

  const today = useMemo(() => {
    const now = new Date()
    const start = new Date(2025, 0, 1)
    return Math.min(Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1, 364)
  }, [])

  const stats = useMemo(() => {
    const defaultedSet = new Set(habit.defaultedDays.map((d) => d.date))
    let defaultedCount = 0

    for (let i = 1; i <= today; i++) {
      const date = new Date(2025, 0, i).toISOString().split("T")[0]
      if (defaultedSet.has(date)) {
        defaultedCount++
      }
    }

    let currentCycle = 0
    for (let i = today; i >= 1; i--) {
      const date = new Date(2025, 0, i).toISOString().split("T")[0]
      if (defaultedSet.has(date)) {
        currentCycle++
      } else {
        break
      }
    }

    return { defaultedCount, currentCycle }
  }, [habit.defaultedDays, today])

  const yearGrid = useMemo(() => {
    const defaultedSet = new Set(habit.defaultedDays.map((d) => d.date))
    const grid: boolean[][] = []

    for (let month = 0; month < 12; month++) {
      const monthDays: boolean[] = []
      const daysInMonth = new Date(2025, month + 1, 0).getDate()
      for (let day = 1; day <= daysInMonth; day++) {
        const date = `2025-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
        monthDays.push(defaultedSet.has(date))
      }
      grid.push(monthDays)
    }
    return grid
  }, [habit.defaultedDays])

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
      <Card className="glass border-white/10 hover:border-primary/30 transition-all cursor-pointer tilt-card group">
        <CardContent className="p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}
                style={{
                  boxShadow: `0 8px 24px ${colors.bg.includes("violet") ? "rgba(139,92,246,0.3)" : colors.bg.includes("rose") ? "rgba(244,63,94,0.3)" : colors.bg.includes("orange") ? "rgba(249,115,22,0.3)" : "rgba(139,92,246,0.2)"}`,
                }}
              >
                <span className="text-white font-bold text-sm">
                  {habit.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg tracking-tight">{habit.name}</h3>
                <p className="text-xs text-muted-foreground font-mono">Daily pattern</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {stats.currentCycle > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                  <span className="font-bold text-sm text-amber-400">{stats.currentCycle}</span>
                  <span className="text-xs text-amber-400/70 font-mono">cycle</span>
                </div>
              )}
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
            </div>
          </div>

          {/* Mini Year Grid */}
          <div className="space-y-2 p-4 rounded-xl bg-background/30 border border-white/5">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono">
              <span>2025</span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-sm bg-muted/50"></div>
                  <span>Norm</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className={`w-2.5 h-2.5 rounded-sm ${colors.bg}`}></div>
                  <span>Interrupted</span>
                </div>
              </div>
            </div>
            <div className="flex gap-[3px]">
              {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((month, mi) => (
                <div key={mi} className="flex-1 min-w-0">
                  <div className="grid grid-rows-5 gap-[2px]">
                    {Array.from({ length: 5 }).map((_, row) => (
                      <div key={row} className="flex gap-[2px] justify-center">
                        {Array.from({ length: 6 }).map((_, col) => {
                          const dayIndex = row * 6 + col
                          const isDefaulted = yearGrid[mi]?.[dayIndex] || false
                          const dayDate = new Date(2025, mi, dayIndex + 1)
                          const isPast = dayDate <= new Date()
                          const isValidDay = dayIndex < (yearGrid[mi]?.length || 0)

                          if (!isValidDay) {
                            return <div key={col} className="w-1.5 h-1.5" />
                          }

                          return (
                            <div
                              key={col}
                              className={`w-1.5 h-1.5 rounded-[2px] transition-colors ${
                                !isPast ? "bg-muted/20" : isDefaulted ? `${colors.bg} shadow-sm` : "bg-muted/40"
                              }`}
                              style={
                                isDefaulted && isPast
                                  ? {
                                      boxShadow: `0 0 4px ${colors.bg.includes("violet") ? "rgba(139,92,246,0.5)" : "rgba(139,92,246,0.3)"}`,
                                    }
                                  : {}
                              }
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

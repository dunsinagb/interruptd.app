"use client"

import { useMemo } from "react"
import { Check } from "lucide-react"
import { type DefaultedDay, getHabitColor } from "@/lib/habit-data"
import {
  getWeekDates,
  isToday,
  isPast,
  isFuture,
  getDaysInMonth,
  getFirstDayOfMonth,
  getShortMonthName,
  getDayName,
  getDayNumber,
} from "@/lib/date-utils"
import type { ViewMode } from "@/components/habit-view-toggle"
import { cn } from "@/lib/utils"

interface HabitDayGridProps {
  defaultedDays: DefaultedDay[]
  onDayClick: (date: string) => void
  view: ViewMode
  selectedMonth: number
  color: string
  weekOffset: number
}

export function HabitDayGrid({ defaultedDays, onDayClick, view, selectedMonth, color, weekOffset }: HabitDayGridProps) {
  const defaultedSet = useMemo(() => new Set(defaultedDays.map((d) => d.date)), [defaultedDays])

  const colors = getHabitColor(color)

  if (view === "week") {
    const weekDays = getWeekDates(weekOffset)

    return (
      <div className="space-y-4">
        {/* Horizontal week grid */}
        <div className="grid grid-cols-7 gap-1">
          {weekDays.map((date) => {
            const isTodayDate = isToday(date)
            const isPastDate = isPast(date)
            const isFutureDate = isFuture(date)
            const isDefaulted = !isFutureDate && defaultedSet.has(date)
            const dayName = getDayName(date)
            const dayNum = getDayNumber(date)

            return (
              <button
                key={date}
                onClick={() => isTodayDate && onDayClick(date)}
                disabled={!isTodayDate}
                className="flex flex-col items-center gap-1.5"
              >
                {/* Day name */}
                <span className={cn("text-xs font-medium", isTodayDate ? "text-primary" : "text-muted-foreground")}>
                  {dayName}
                </span>

                {/* Day box */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                    isTodayDate && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                    isDefaulted && `${colors.bg}`,
                    !isDefaulted && isPastDate && "bg-muted",
                    isFutureDate && "bg-muted/30 border border-dashed border-muted-foreground/20",
                    !isDefaulted && isTodayDate && "bg-muted",
                    isTodayDate && "cursor-pointer",
                    !isTodayDate && "cursor-default",
                  )}
                >
                  {isDefaulted ? <Check className="w-5 h-5 text-white" /> : null}
                </div>

                {/* Day number */}
                <span
                  className={cn(
                    "text-sm font-semibold",
                    isTodayDate ? "text-primary" : isFutureDate ? "text-muted-foreground/50" : "text-foreground",
                  )}
                >
                  {dayNum}
                </span>
              </button>
            )
          })}
        </div>

        {/* Hint text */}
        <p className="text-center text-xs text-muted-foreground">Tap today to log</p>
      </div>
    )
  }

  if (view === "month") {
    const daysInMonth = getDaysInMonth(2025, selectedMonth)
    const firstDay = getFirstDayOfMonth(2025, selectedMonth)
    const weeks: (number | null)[][] = []
    let currentWeek: (number | null)[] = Array(firstDay).fill(null)

    for (let day = 1; day <= daysInMonth; day++) {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        weeks.push(currentWeek)
        currentWeek = []
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push(null)
      }
      weeks.push(currentWeek)
    }

    return (
      <div className="space-y-3">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 gap-1">
            {week.map((day, di) => {
              if (day === null) {
                return <div key={di} className="aspect-square" />
              }

              const date = `2025-${String(selectedMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
              const isTodayDate = isToday(date)
              const isPastDate = isPast(date)
              const isFutureDate = isFuture(date)
              const isDefaulted = !isFutureDate && defaultedSet.has(date)

              return (
                <button
                  key={di}
                  onClick={() => isTodayDate && onDayClick(date)}
                  disabled={!isTodayDate}
                  className={cn(
                    "aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all",
                    isTodayDate && "ring-2 ring-primary ring-offset-2",
                    isDefaulted && `${colors.bg} text-white`,
                    !isDefaulted && isPastDate && "bg-muted text-muted-foreground",
                    isFutureDate &&
                      "bg-muted/30 text-muted-foreground/40 border border-dashed border-muted-foreground/20",
                    isTodayDate && !isDefaulted && "bg-primary/10 text-primary",
                    isTodayDate && isDefaulted && `${colors.bg} text-white`,
                  )}
                >
                  {day}
                </button>
              )
            })}
          </div>
        ))}

        {/* Hint text */}
        <p className="text-center text-xs text-muted-foreground">Tap today to log</p>
      </div>
    )
  }

  // Year view
  const months = Array.from({ length: 12 }, (_, i) => i)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-medium">2025</span>
        <span>← Scroll to see full year →</span>
      </div>

      <div className="overflow-x-auto -mx-4 px-4">
        <div className="flex gap-2 min-w-max">
          {months.map((month) => {
            const daysInMonth = getDaysInMonth(2025, month)
            const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

            return (
              <div key={month} className="flex-shrink-0">
                <p className="text-[10px] text-muted-foreground mb-1.5 text-center font-medium">
                  {getShortMonthName(month)}
                </p>
                <div className="grid grid-rows-7 grid-flow-col gap-[3px]">
                  {days.map((day) => {
                    const date = `2025-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
                    const isTodayDate = isToday(date)
                    const isPastDate = isPast(date)
                    const isFutureDate = isFuture(date)
                    const isDefaulted = !isFutureDate && defaultedSet.has(date)

                    return (
                      <button
                        key={day}
                        onClick={() => isTodayDate && onDayClick(date)}
                        disabled={!isTodayDate}
                        className={cn(
                          "w-3 h-3 rounded-[3px] transition-all",
                          isTodayDate && "ring-1 ring-primary ring-offset-1",
                          isDefaulted && colors.bg,
                          !isDefaulted && isPastDate && "bg-muted",
                          isFutureDate && "bg-muted/20",
                          isTodayDate && !isDefaulted && "bg-primary/30",
                        )}
                        title={`${date}${isDefaulted ? " - Defaulted" : isFutureDate ? " - Assumed" : ""}`}
                      />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hint text */}
      <p className="text-center text-xs text-muted-foreground">Tap today to log</p>
    </div>
  )
}

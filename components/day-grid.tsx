"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import type { ViewMode } from "./view-toggle"
import { Sparkles } from "lucide-react"

interface DayEntry {
  defaulted: boolean
  reason?: string
}

interface DayGridProps {
  entries: Map<number, DayEntry>
  onDayClick: (day: number) => void
  view: ViewMode
  selectedMonth: number
}

const MONTHS = [
  { name: "Jan", days: 31, start: 1 },
  { name: "Feb", days: 28, start: 32 },
  { name: "Mar", days: 31, start: 60 },
  { name: "Apr", days: 30, start: 91 },
  { name: "May", days: 31, start: 121 },
  { name: "Jun", days: 30, start: 152 },
  { name: "Jul", days: 31, start: 182 },
  { name: "Aug", days: 31, start: 213 },
  { name: "Sep", days: 30, start: 244 },
  { name: "Oct", days: 31, start: 274 },
  { name: "Nov", days: 30, start: 305 },
  { name: "Dec", days: 30, start: 335 },
]

const FULL_MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function DayGrid({ entries, onDayClick, view, selectedMonth }: DayGridProps) {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)

  const today = useMemo(() => {
    const now = new Date()
    const start = new Date(2025, 0, 1)
    const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return Math.min(Math.max(diff + 1, 1), 364)
  }, [])

  const getDateForDay = (dayNumber: number) => {
    const date = new Date(2025, 0, dayNumber)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const getDayOfMonth = (dayNumber: number) => {
    const date = new Date(2025, 0, dayNumber)
    return date.getDate()
  }

  const canEdit = (dayNumber: number) => dayNumber === today

  const visibleDays = useMemo(() => {
    if (view === "recent") {
      // Last 5 days including today
      const days: number[] = []
      for (let i = Math.max(1, today - 4); i <= today; i++) {
        days.push(i)
      }
      return days
    } else if (view === "month") {
      const month = MONTHS[selectedMonth]
      const days: number[] = []
      for (let i = 0; i < month.days; i++) {
        const dayNum = month.start + i
        if (dayNum <= 364) days.push(dayNum)
      }
      return days
    }
    return null // Full year view
  }, [view, selectedMonth, today])

  if (view === "recent" && visibleDays) {
    return (
      <div className="space-y-3">
        {visibleDays.map((dayNumber) => {
          const entry = entries.get(dayNumber)
          const isDefaulted = entry?.defaulted ?? false
          const isToday = dayNumber === today
          const isPast = dayNumber < today
          const isEditable = canEdit(dayNumber)

          return (
            <button
              key={dayNumber}
              onClick={() => isEditable && onDayClick(dayNumber)}
              disabled={!isEditable}
              className={cn(
                "w-full p-4 rounded-xl transition-all duration-200 text-left",
                "border",
                isEditable && "hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
                !isEditable && "cursor-default opacity-80",
                isDefaulted
                  ? "bg-primary/10 border-primary/30 shadow-[0_0_20px_rgba(74,222,128,0.15)]"
                  : "bg-card border-border",
                isToday && "ring-2 ring-foreground/50",
              )}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">
                      {isToday ? "Today" : getDateForDay(dayNumber)}
                    </span>
                    {isToday && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground text-background font-medium">
                        Tap to log
                      </span>
                    )}
                    {isPast && !isToday && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        Locked
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">Day {dayNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  {isDefaulted ? (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium text-primary">Defaulted</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted">
                      <span className="text-xs text-muted-foreground">Norm</span>
                    </div>
                  )}
                </div>
              </div>
              {entry?.reason && <p className="mt-2 text-xs text-muted-foreground italic truncate">"{entry.reason}"</p>}
            </button>
          )
        })}
      </div>
    )
  }

  if (view === "month" && visibleDays) {
    const month = MONTHS[selectedMonth]
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-center text-foreground">{FULL_MONTH_NAMES[selectedMonth]} 2025</h3>
        <div className="grid grid-cols-7 gap-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div key={i} className="text-center text-xs text-muted-foreground font-medium py-2">
              {day}
            </div>
          ))}
          {/* Empty cells for first day offset */}
          {Array.from({ length: new Date(2025, selectedMonth, 1).getDay() }, (_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {visibleDays.map((dayNumber) => {
            const entry = entries.get(dayNumber)
            const isDefaulted = entry?.defaulted ?? false
            const isToday = dayNumber === today
            const isPast = dayNumber < today
            const isFuture = dayNumber > today
            const isEditable = canEdit(dayNumber)

            return (
              <button
                key={dayNumber}
                onClick={() => isEditable && onDayClick(dayNumber)}
                onMouseEnter={() => setHoveredDay(dayNumber)}
                onMouseLeave={() => setHoveredDay(null)}
                disabled={!isEditable}
                className={cn(
                  "aspect-square rounded-lg transition-all duration-150 flex items-center justify-center text-sm font-medium",
                  "touch-manipulation min-h-[44px]",
                  isEditable && "hover:ring-2 hover:ring-primary/50 hover:scale-105 active:scale-95 cursor-pointer",
                  !isEditable && "cursor-default",
                  isPast && !isDefaulted && "bg-muted/50 text-muted-foreground",
                  isPast && isDefaulted && "bg-primary text-primary-foreground shadow-[0_0_12px_rgba(74,222,128,0.4)]",
                  isFuture && "bg-secondary/30 text-muted-foreground/50",
                  isToday && !isDefaulted && "bg-muted/50 ring-2 ring-foreground text-foreground",
                  isToday &&
                    isDefaulted &&
                    "bg-primary ring-2 ring-foreground text-primary-foreground shadow-[0_0_12px_rgba(74,222,128,0.4)]",
                )}
              >
                {getDayOfMonth(dayNumber)}
              </button>
            )
          })}
        </div>
        {hoveredDay && (
          <div className="text-center text-sm text-muted-foreground pt-2">
            {getDateForDay(hoveredDay)} •{" "}
            {hoveredDay > today ? (
              <span>Expected</span>
            ) : (
              <span className={entries.get(hoveredDay)?.defaulted ? "text-primary" : ""}>
                {entries.get(hoveredDay)?.defaulted ? "Defaulted" : "Norm"}
              </span>
            )}
            {hoveredDay === today && <span className="ml-1">(Tap to log)</span>}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div className="min-w-[320px]">
        <div className="grid grid-cols-12 gap-1 mb-2 px-1">
          {MONTHS.map((month) => (
            <div key={month.name} className="text-xs text-muted-foreground text-center font-medium">
              {month.name}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-12 gap-1">
          {MONTHS.map((month) => (
            <div key={month.name} className="flex flex-col gap-[2px]">
              {Array.from({ length: month.days }, (_, i) => {
                const dayNumber = month.start + i
                if (dayNumber > 364) return null
                const entry = entries.get(dayNumber)
                const isDefaulted = entry?.defaulted ?? false
                const isToday = dayNumber === today
                const isPast = dayNumber < today
                const isFuture = dayNumber > today
                const isEditable = canEdit(dayNumber)

                return (
                  <button
                    key={dayNumber}
                    onClick={() => isEditable && onDayClick(dayNumber)}
                    onMouseEnter={() => setHoveredDay(dayNumber)}
                    onMouseLeave={() => setHoveredDay(null)}
                    disabled={!isEditable}
                    className={cn(
                      "w-full aspect-square rounded-sm transition-all duration-150 min-h-[12px] min-w-[12px]",
                      "touch-manipulation",
                      isEditable && "hover:ring-2 hover:ring-primary/50 hover:scale-110 active:scale-95 cursor-pointer",
                      !isEditable && "cursor-default",
                      isPast && !isDefaulted && "bg-muted-foreground/20",
                      isPast && isDefaulted && "bg-primary shadow-[0_0_8px_rgba(74,222,128,0.4)]",
                      isFuture && "bg-secondary/30",
                      isToday && !isDefaulted && "bg-muted-foreground/20 ring-2 ring-foreground",
                      isToday &&
                        isDefaulted &&
                        "bg-primary ring-2 ring-foreground shadow-[0_0_8px_rgba(74,222,128,0.4)]",
                    )}
                  />
                )
              })}
            </div>
          ))}
        </div>

        {hoveredDay && (
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Day {hoveredDay} • {getDateForDay(hoveredDay)} •{" "}
            {hoveredDay > today ? (
              <span>Expected</span>
            ) : (
              <span className={entries.get(hoveredDay)?.defaulted ? "text-primary" : ""}>
                {entries.get(hoveredDay)?.defaulted ? "Defaulted" : "Norm"}
              </span>
            )}
            {hoveredDay === today && <span className="ml-1">(Tap to log)</span>}
            {hoveredDay < today && <span className="text-muted-foreground/60 ml-1">(Locked)</span>}
          </div>
        )}
      </div>
    </div>
  )
}

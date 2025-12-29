"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getMonthName, getWeekDateRange } from "@/lib/date-utils"

export type ViewMode = "week" | "month" | "year"

interface HabitViewToggleProps {
  view: ViewMode
  onViewChange: (view: ViewMode) => void
  currentMonth: number
  onMonthChange: (month: number) => void
  currentWeekOffset: number
  onWeekChange: (offset: number) => void
}

export function HabitViewToggle({
  view,
  onViewChange,
  currentMonth,
  onMonthChange,
  currentWeekOffset,
  onWeekChange,
}: HabitViewToggleProps) {
  return (
    <div className="space-y-3">
      {/* View Tabs */}
      <div className="flex gap-1 p-1 bg-muted rounded-lg">
        <button
          onClick={() => onViewChange("week")}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
            view === "week" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          This Week
        </button>
        <button
          onClick={() => onViewChange("month")}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
            view === "month" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => onViewChange("year")}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
            view === "year" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Full Year
        </button>
      </div>

      {view === "week" && (
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => onWeekChange(currentWeekOffset - 1)}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-medium text-foreground text-sm">{getWeekDateRange(currentWeekOffset)}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onWeekChange(currentWeekOffset + 1)}
            disabled={currentWeekOffset >= 0}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Month Navigator (only for month view) */}
      {view === "month" && (
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onMonthChange(Math.max(0, currentMonth - 1))}
            disabled={currentMonth === 0}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-semibold text-foreground">{getMonthName(currentMonth)} 2025</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onMonthChange(Math.min(11, currentMonth + 1))}
            disabled={currentMonth === 11}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

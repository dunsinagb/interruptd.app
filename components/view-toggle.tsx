"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type ViewMode = "recent" | "month" | "year"

interface ViewToggleProps {
  view: ViewMode
  onViewChange: (view: ViewMode) => void
  currentMonth: number
  onMonthChange: (month: number) => void
}

const MONTHS = [
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

export function ViewToggle({ view, onViewChange, currentMonth, onMonthChange }: ViewToggleProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-1 p-1 bg-secondary/50 rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange("recent")}
          className={cn("flex-1 text-xs h-8", view === "recent" && "bg-background shadow-sm")}
        >
          Last 5 Days
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange("month")}
          className={cn("flex-1 text-xs h-8", view === "month" && "bg-background shadow-sm")}
        >
          Monthly
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange("year")}
          className={cn("flex-1 text-xs h-8", view === "year" && "bg-background shadow-sm")}
        >
          Full Year
        </Button>
      </div>

      {view === "month" && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 -mx-4 px-4">
          {MONTHS.map((month, index) => (
            <Button
              key={month}
              variant="ghost"
              size="sm"
              onClick={() => onMonthChange(index)}
              className={cn(
                "text-xs h-7 px-3 shrink-0",
                currentMonth === index && "bg-primary text-primary-foreground",
              )}
            >
              {month.slice(0, 3)}
            </Button>
          ))}
        </div>
      )}
    </div>
  )
}

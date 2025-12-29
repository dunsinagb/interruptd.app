import { getHabitColor } from "@/lib/habit-data"

interface HabitLegendProps {
  color: string
  variant?: "default" | "gradient"
}

export function HabitLegend({ color, variant = "default" }: HabitLegendProps) {
  const colors = getHabitColor(color)

  if (variant === "gradient") {
    return (
      <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground font-mono">
        <span className="font-medium">Norm</span>
        <div className="flex items-center gap-0.5 bg-muted rounded-full p-1">
          <div className="w-3 h-3 rounded-full bg-muted" />
          <div className={`w-3 h-3 rounded-full ${colors.bg} opacity-25`} />
          <div className={`w-3 h-3 rounded-full ${colors.bg} opacity-50`} />
          <div className={`w-3 h-3 rounded-full ${colors.bg} opacity-75`} />
          <div className={`w-3 h-3 rounded-full ${colors.bg}`} />
        </div>
        <span className="font-medium">Interrupted</span>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground font-mono">
      <span className="font-medium">Norm</span>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-muted" title="Norm - automatic behavior happened" />
        <div className={`w-3 h-3 rounded-full ${colors.bg} opacity-25`} title="Rarely interrupted" />
        <div className={`w-3 h-3 rounded-full ${colors.bg} opacity-50`} title="Occasionally interrupted" />
        <div className={`w-3 h-3 rounded-full ${colors.bg} opacity-75`} title="Frequently interrupted" />
        <div className={`w-3 h-3 rounded-full ${colors.bg}`} title="Consistently interrupted" />
      </div>
      <span className="font-medium">Interrupted</span>
    </div>
  )
}

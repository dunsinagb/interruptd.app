"use client"

interface ProgressBarProps {
  defaultedDays: number
  elapsed: number
  total: number
}

export function ProgressBar({ defaultedDays, elapsed, total }: ProgressBarProps) {
  const elapsedPercentage = (elapsed / total) * 100
  const defaultedRate = elapsed > 0 ? (defaultedDays / elapsed) * 100 : 0

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Year Progress</span>
        <span className="text-foreground font-medium">
          {elapsed} / {total} days elapsed
        </span>
      </div>
      <div className="h-3 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-muted-foreground/30 via-muted-foreground/50 to-muted-foreground/30 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${elapsedPercentage}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Jan 1</span>
        <span className="text-primary font-medium">{defaultedRate.toFixed(1)}% defaulted</span>
        <span>Dec 30</span>
      </div>
    </div>
  )
}

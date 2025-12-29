import { Card, CardContent } from "@/components/ui/card"
import { getHabitColor } from "@/lib/habit-data"
import { TrendingUp, Calendar, Repeat, Trophy } from "lucide-react"

interface HabitStatsCardsProps {
  defaultedCount: number
  normCount: number
  currentCycle: number
  longestCycle: number
  total: number
  color: string
}

export function HabitStatsCards({
  defaultedCount,
  normCount,
  currentCycle,
  longestCycle,
  total,
  color,
}: HabitStatsCardsProps) {
  const colors = getHabitColor(color)
  const percentage = total > 0 ? Math.round((defaultedCount / total) * 100) : 0
  const normPercentage = 100 - percentage

  return (
    <div className="space-y-3">
      <Card className={`border-2 ${colors.border} shadow-sm`}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`${colors.bg} p-2 rounded-lg`}>
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <p className="text-sm font-medium text-foreground">Times Interrupted</p>
            </div>
            <div className={`${colors.bg} px-2.5 py-1 rounded-full`}>
              <span className="text-xs font-bold text-white">{percentage}%</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <p className={`text-5xl font-bold ${colors.text}`}>{defaultedCount}</p>
            <p className="text-sm text-muted-foreground">/ {total} days</p>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden flex">
            <div className={`${colors.bg} transition-all duration-500`} style={{ width: `${percentage}%` }} />
            <div className="bg-border flex-1" />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground">Norm Days</p>
            </div>
            <p className="text-2xl font-bold text-foreground mb-0.5">{normCount}</p>
            <p className="text-xs text-muted-foreground">{normPercentage}%</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Repeat className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground">Current</p>
            </div>
            <p className={`text-2xl font-bold ${colors.text} mb-0.5`}>{currentCycle}</p>
            <p className="text-xs text-muted-foreground">day cycle</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-muted-foreground" />
              <p className="text-xs font-medium text-muted-foreground">Longest</p>
            </div>
            <p className={`text-2xl font-bold ${colors.text} mb-0.5`}>{longestCycle}</p>
            <p className="text-xs text-muted-foreground">day cycle</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

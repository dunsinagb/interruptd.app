"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Flame, Target, TrendingUp, Sparkles } from "lucide-react"

interface StatsCardsProps {
  normDays: number
  defaultedDays: number
  total: number
  currentStreak: number
  longestStreak: number
}

export function StatsCards({ normDays, defaultedDays, total, currentStreak, longestStreak }: StatsCardsProps) {
  const defaultedRate = total > 0 ? Math.round((defaultedDays / total) * 100) : 0

  const stats = [
    {
      label: "Defaulted",
      value: defaultedDays,
      subtext: "days deviated",
      icon: Sparkles,
      color: "text-primary",
    },
    {
      label: "Norm Days",
      value: normDays,
      subtext: `of ${total} elapsed`,
      icon: Target,
      color: "text-muted-foreground",
    },
    {
      label: "Current Streak",
      value: currentStreak,
      subtext: "defaulted in a row",
      icon: Flame,
      color: "text-orange-500",
    },
    {
      label: "Deviation Rate",
      value: `${defaultedRate}%`,
      subtext: "of elapsed days",
      icon: TrendingUp,
      color: "text-chart-5",
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{stat.subtext}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

"use client"

import type React from "react"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, Target, Calendar, Eye, Brain, Zap, Trophy, Star, Heart, TrendingUp } from "lucide-react"

interface Badge {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  bgColor: string
  earned: boolean
  earnedDate?: string
  progress?: number
  maxProgress?: number
}

const badges: Badge[] = [
  {
    id: "1",
    name: "First Insight",
    description: "Log your first deviated day",
    icon: Star,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    earned: true,
    earnedDate: "Jan 2, 2025",
  },
  {
    id: "2",
    name: "Self-Aware",
    description: "Track 50 days defaulted across all patterns",
    icon: Eye,
    color: "text-primary",
    bgColor: "bg-primary/10",
    earned: true,
    earnedDate: "Mar 15, 2025",
  },
  {
    id: "3",
    name: "Pattern Finder",
    description: "Discover your first behavioral pattern",
    icon: Brain,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    earned: true,
    earnedDate: "Feb 8, 2025",
  },
  {
    id: "4",
    name: "Cycle Spotter",
    description: "Identify a 5-day default cycle",
    icon: TrendingUp,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    earned: true,
    earnedDate: "Apr 22, 2025",
  },
  {
    id: "5",
    name: "Month Observer",
    description: "Track defaults for a full month",
    icon: Calendar,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    earned: true,
    earnedDate: "Feb 1, 2025",
  },
  {
    id: "6",
    name: "Default Explorer",
    description: "Create 5 different defaults to track",
    icon: Target,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    earned: false,
    progress: 3,
    maxProgress: 5,
  },
  {
    id: "7",
    name: "Century Insights",
    description: "Log 100 days defaulted total",
    icon: Trophy,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    earned: false,
    progress: 78,
    maxProgress: 100,
  },
  {
    id: "8",
    name: "Quick Capture",
    description: "Log a default within 1 hour of it happening",
    icon: Zap,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    earned: false,
  },
  {
    id: "9",
    name: "Reflective",
    description: "Add a reason to 25 deviated days",
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    earned: false,
    progress: 18,
    maxProgress: 25,
  },
]

export default function BadgesPage() {
  const earnedCount = badges.filter((b) => b.earned).length

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Back button and title */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Badges</h1>
            <p className="text-sm text-muted-foreground">
              {earnedCount} of {badges.length} earned
            </p>
          </div>
        </div>

        {/* Progress card */}
        <Card className="bg-sidebar border-sidebar-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Collection Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round((earnedCount / badges.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${(earnedCount / badges.length) * 100}%` }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Badges grid */}
        <div className="grid grid-cols-3 gap-3">
          {badges.map((badge) => (
            <Card
              key={badge.id}
              className={`transition-all ${
                badge.earned ? "bg-card border-border" : "bg-muted/30 border-border/50 opacity-60"
              }`}
            >
              <CardContent className="p-4 text-center space-y-2">
                <div
                  className={`w-12 h-12 rounded-full ${badge.bgColor} flex items-center justify-center mx-auto ${
                    !badge.earned && "grayscale"
                  }`}
                >
                  <badge.icon className={`w-6 h-6 ${badge.color}`} />
                </div>
                <h3 className="font-semibold text-foreground text-xs leading-tight">{badge.name}</h3>
                {badge.earned ? (
                  <p className="text-[10px] text-muted-foreground">{badge.earnedDate}</p>
                ) : badge.progress !== undefined ? (
                  <div className="space-y-1">
                    <div className="h-1 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary/50 rounded-full"
                        style={{
                          width: `${(badge.progress / (badge.maxProgress || 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground">
                      {badge.progress}/{badge.maxProgress}
                    </p>
                  </div>
                ) : (
                  <p className="text-[10px] text-muted-foreground">Locked</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}

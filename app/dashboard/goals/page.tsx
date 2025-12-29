"use client"

import { useState, useEffect, Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard-header"
import { type Habit, getHabitColor } from "@/lib/habit-data"
import { Target, Plus, Check, Trophy, Loader2, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const STORAGE_KEY = "defaulted-habits-2025"
const GOALS_KEY = "defaulted-goals-2025"

interface Goal {
  id: string
  habitId: string
  targetDefaults: number
  month: number // 0-11
  year: number
}

function GoalsContent() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [mounted, setMounted] = useState(false)
  const [addingGoal, setAddingGoal] = useState(false)
  const [selectedHabitId, setSelectedHabitId] = useState<string>("")
  const [targetDefaults, setTargetDefaults] = useState("")

  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    setMounted(true)
    const savedHabits = localStorage.getItem(STORAGE_KEY)
    const savedGoals = localStorage.getItem(GOALS_KEY)
    if (savedHabits) {
      const parsed = JSON.parse(savedHabits).filter((h: Habit) => !h.archived)
      setHabits(parsed)
      if (parsed.length > 0) setSelectedHabitId(parsed[0].id)
    }
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals))
    }
  }, [])

  const saveGoals = (newGoals: Goal[]) => {
    setGoals(newGoals)
    localStorage.setItem(GOALS_KEY, JSON.stringify(newGoals))
  }

  const addGoal = () => {
    if (!selectedHabitId || !targetDefaults) return
    const newGoal: Goal = {
      id: Date.now().toString(),
      habitId: selectedHabitId,
      targetDefaults: Number.parseInt(targetDefaults),
      month: currentMonth,
      year: currentYear,
    }
    saveGoals([...goals, newGoal])
    setAddingGoal(false)
    setTargetDefaults("")
  }

  const deleteGoal = (goalId: string) => {
    saveGoals(goals.filter((g) => g.id !== goalId))
  }

  const getMonthDefaults = (habit: Habit) => {
    const monthStr = String(currentMonth + 1).padStart(2, "0")
    return habit.defaultedDays.filter((d) => d.date.startsWith(`${currentYear}-${monthStr}`)).length
  }

  const monthName = new Date(currentYear, currentMonth).toLocaleDateString("en-US", { month: "long", year: "numeric" })

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (habits.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center space-y-4">
        <Target className="w-12 h-12 mx-auto text-muted-foreground" />
        <h2 className="text-xl font-bold">No Defaults Yet</h2>
        <p className="text-muted-foreground">Add a default to start setting goals.</p>
      </div>
    )
  }

  const currentMonthGoals = goals.filter((g) => g.month === currentMonth && g.year === currentYear)
  const habitsWithoutGoals = habits.filter((h) => !currentMonthGoals.some((g) => g.habitId === h.id))

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Monthly Goals</h1>
          <p className="text-muted-foreground">{monthName}</p>
        </div>
        {habitsWithoutGoals.length > 0 && (
          <Dialog open={addingGoal} onOpenChange={setAddingGoal}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-1" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Set Monthly Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Select Default</Label>
                  <div className="grid gap-2">
                    {habitsWithoutGoals.map((habit) => {
                      const colors = getHabitColor(habit.color)
                      return (
                        <button
                          key={habit.id}
                          onClick={() => setSelectedHabitId(habit.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                            selectedHabitId === habit.id
                              ? `${colors.border} bg-primary/5`
                              : "border-border hover:border-muted-foreground"
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-md ${colors.bg}`} />
                          <span className="font-medium">{habit.name}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target">Target: Default at least X times</Label>
                  <Input
                    id="target"
                    type="number"
                    placeholder="e.g., 8"
                    value={targetDefaults}
                    onChange={(e) => setTargetDefaults(e.target.value)}
                    min="1"
                    max="31"
                  />
                  <p className="text-xs text-muted-foreground">
                    Set your minimum target for deviating from this pattern this month
                  </p>
                </div>
                <Button onClick={addGoal} className="w-full" disabled={!selectedHabitId || !targetDefaults}>
                  Set Goal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {currentMonthGoals.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-12 text-center space-y-3">
            <Target className="w-10 h-10 mx-auto text-muted-foreground" />
            <p className="text-muted-foreground">No goals set for this month</p>
            <p className="text-sm text-muted-foreground">Set a goal to track your progress</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {currentMonthGoals.map((goal) => {
            const habit = habits.find((h) => h.id === goal.habitId)
            if (!habit) return null

            const current = getMonthDefaults(habit)
            const progress = Math.min((current / goal.targetDefaults) * 100, 100)
            const isMeetingGoal = current >= goal.targetDefaults
            const daysLeft = new Date(currentYear, currentMonth + 1, 0).getDate() - new Date().getDate()
            const colors = getHabitColor(habit.color)

            return (
              <Card key={goal.id} className={`border-2 ${isMeetingGoal ? "border-emerald-200" : "border-amber-200"}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${colors.bg} flex items-center justify-center`}>
                        <span className="text-white font-bold text-xs">
                          {habit.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-base">{habit.name}</CardTitle>
                        <CardDescription>Target: at least {goal.targetDefaults} defaults</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => deleteGoal(goal.id)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-4xl font-bold">
                        {current}
                        <span className="text-lg text-muted-foreground font-normal">/{goal.targetDefaults}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">days defaulted</p>
                    </div>
                    {isMeetingGoal ? (
                      <div className="flex items-center gap-1 text-emerald-600 bg-emerald-100 px-3 py-1.5 rounded-full">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Goal Met</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-amber-600 bg-amber-100 px-3 py-1.5 rounded-full">
                        <Target className="w-4 h-4" />
                        <span className="text-sm font-medium">In Progress</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 rounded-full ${
                          isMeetingGoal ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground text-right">{daysLeft} days left in month</p>
                  </div>

                  {current >= goal.targetDefaults ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-sm text-emerald-800">
                      Excellent progress. You've met your deviation target for the month.
                    </div>
                  ) : daysLeft < goal.targetDefaults - current ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                      Not enough days left to reach this goal, but you're building awareness. Focus on next month!
                    </div>
                  ) : (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-800">
                      You're making progress. {goal.targetDefaults - current} more defaults needed to reach your target.
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Completed Goals Section */}
      {goals.filter((g) => g.month !== currentMonth || g.year !== currentYear).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="w-5 h-5" />
              Past Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {goals
              .filter((g) => g.month !== currentMonth || g.year !== currentYear)
              .slice(0, 5)
              .map((goal) => {
                const habit = habits.find((h) => h.id === goal.habitId)
                if (!habit) return null
                const monthName = new Date(goal.year, goal.month).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })
                return (
                  <div key={goal.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">{habit.name}</p>
                      <p className="text-sm text-muted-foreground">{monthName}</p>
                    </div>
                    <p className="text-sm">Target: {goal.targetDefaults}</p>
                  </div>
                )
              })}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function GoalsPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
          </div>
        }
      >
        <GoalsContent />
      </Suspense>
    </main>
  )
}

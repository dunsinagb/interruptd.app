"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bell, Clock, Calendar, Zap } from "lucide-react"

interface Trigger {
  id: string
  type: "time" | "location" | "pattern"
  title: string
  description: string
  enabled: boolean
  details: string[]
  icon: any
}

export function TriggersContent() {
  const [triggers, setTriggers] = useState<Trigger[]>([
    {
      id: "1",
      type: "time",
      title: "Evening Risk Period",
      description: "Reminder at 6pm when you typically default on Social Media",
      enabled: true,
      details: ["Mon-Fri", "6:00 PM"],
      icon: Clock,
    },
    {
      id: "2",
      type: "pattern",
      title: "Weekend Pattern Alert",
      description: "You often default on Saturdays. Check-in reminder.",
      enabled: true,
      details: ["Saturday", "10:00 AM"],
      icon: Calendar,
    },
    {
      id: "3",
      type: "time",
      title: "Late Night Screen Time",
      description: "Reminder before bedtime to avoid devices",
      enabled: false,
      details: ["Daily", "9:30 PM"],
      icon: Bell,
    },
  ])

  const toggleTrigger = (id: string) => {
    setTriggers((prev) => prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t)))
  }

  const iconColors: Record<string, string> = {
    time: "from-amber-500 to-orange-600",
    location: "from-blue-500 to-cyan-600",
    pattern: "from-violet-500 to-purple-600",
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Smart Triggers</h1>
        <p className="text-muted-foreground">AI-detected patterns trigger timely check-in reminders</p>
      </div>

      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            How It Works
          </CardTitle>
          <CardDescription>
            Based on your defaulting patterns, we automatically set reminders at high-risk times to help you stay aware
            without judgment
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="space-y-3">
        {triggers.map((trigger) => {
          const Icon = trigger.icon
          return (
            <Card key={trigger.id} className="glass-card hover:border-primary/30 transition-all">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${iconColors[trigger.type]} flex items-center justify-center flex-shrink-0 shadow-lg`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold">{trigger.title}</h3>
                      <Switch checked={trigger.enabled} onCheckedChange={() => toggleTrigger(trigger.id)} />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{trigger.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {trigger.details.map((detail, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {detail}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

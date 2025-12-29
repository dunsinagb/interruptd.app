"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Plus, TrendingUp, Share2 } from "lucide-react"

interface Partner {
  id: string
  name: string
  avatar: string
  defaultsThisWeek: number
  currentCycle: number
  defaultsTracking: string[]
}

export function PartnersContent() {
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: "1",
      name: "Alex Chen",
      avatar: "AC",
      defaultsThisWeek: 12,
      currentCycle: 7,
      defaultsTracking: ["Social Media", "Junk Food"],
    },
    {
      id: "2",
      name: "Maria Silva",
      avatar: "MS",
      defaultsThisWeek: 8,
      currentCycle: 3,
      defaultsTracking: ["Late Night Screen"],
    },
  ])

  const avatarColors = ["from-violet-500 to-purple-600", "from-emerald-500 to-teal-600", "from-rose-500 to-pink-600"]

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Accountability Partners</h1>
        <p className="text-muted-foreground">Connect with others on similar pattern observation journeys</p>
      </div>

      <Card className="glass-card border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share Your Progress
          </CardTitle>
          <CardDescription>Generate a shareable link to your anonymized stats</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-transparent" variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Create Share Link
          </Button>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Your Partners</h2>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Partner
        </Button>
      </div>

      <div className="space-y-3">
        {partners.map((partner, idx) => (
          <Card key={partner.id} className="glass-card hover:border-primary/30 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-full bg-gradient-to-br ${avatarColors[idx % avatarColors.length]} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                >
                  {partner.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{partner.name}</p>
                  <p className="text-sm text-muted-foreground">Tracking: {partner.defaultsTracking.join(", ")}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{partner.currentCycle}</p>
                  <p className="text-xs text-muted-foreground">day cycle</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span>{partner.defaultsThisWeek} defaults this week</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {partners.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <Users className="w-12 h-12 mx-auto text-muted-foreground" />
          <div className="space-y-2">
            <h3 className="font-semibold">No Partners Yet</h3>
            <p className="text-sm text-muted-foreground">Add accountability partners to share your journey</p>
          </div>
        </div>
      )}
    </div>
  )
}

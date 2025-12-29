"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Check, RefreshCw, Award, Calendar, ChevronLeft } from "lucide-react"
import Link from "next/link"

interface Notification {
  id: string
  type: "cycle" | "badge" | "reminder" | "milestone"
  title: string
  message: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "cycle",
    title: "Cycle Alert!",
    message: "You've defaulted 3 days in a row on Morning Routine. Keep observing your patterns!",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "badge",
    title: "New Badge Unlocked",
    message: "You earned the 'Self-Aware' badge for tracking 50 defaulted days.",
    time: "Yesterday",
    read: false,
  },
  {
    id: "3",
    type: "reminder",
    title: "Daily Check-in",
    message: "Don't forget to log today's defaults. How did your routines go?",
    time: "Yesterday",
    read: false,
  },
  {
    id: "4",
    type: "milestone",
    title: "Milestone Reached",
    message: "You've been tracking for 30 days! Check your insights.",
    time: "3 days ago",
    read: true,
  },
  {
    id: "5",
    type: "cycle",
    title: "Pattern Detected",
    message: "You tend to default on Exercise on Mondays. Interesting!",
    time: "1 week ago",
    read: true,
  },
]

const getIcon = (type: Notification["type"]) => {
  switch (type) {
    case "cycle":
      return <RefreshCw className="w-5 h-5 text-orange-500" />
    case "badge":
      return <Award className="w-5 h-5 text-primary" />
    case "reminder":
      return <Calendar className="w-5 h-5 text-sky-500" />
    case "milestone":
      return <Check className="w-5 h-5 text-emerald-500" />
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

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
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
            <p className="text-sm text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllRead}>
              Mark all read
            </Button>
          )}
        </div>

        {/* Notifications list */}
        <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-colors cursor-pointer ${
                notification.read ? "bg-card border-border" : "bg-primary/5 border-primary/20"
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground text-sm">{notification.title}</h3>
                      {!notification.read && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1.5">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {notifications.length === 0 && (
          <Card className="bg-card border-border border-dashed">
            <CardContent className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto">
                <Bell className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">No notifications</h3>
                <p className="text-sm text-muted-foreground">You're all caught up!</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  )
}

"use client"

import { useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  ChevronLeft,
  Bell,
  Moon,
  Globe,
  Shield,
  Trash2,
  ChevronRight,
  User,
  Mail,
  Lock,
  Camera,
  Smartphone,
  Volume2,
  Calendar,
  Eye,
  EyeOff,
  Download,
} from "lucide-react"
import Link from "next/link"

type SettingsTab = "account" | "alerts" | "prefs"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("account")

  // Account states
  const [name, setName] = useState("User")
  const [email, setEmail] = useState("user@example.com")

  // Alert states
  const [pushNotifications, setPushNotifications] = useState(true)
  const [dailyReminder, setDailyReminder] = useState(true)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const [cycleAlerts, setCycleAlerts] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(false)

  // Prefs & Privacy states
  const [darkMode, setDarkMode] = useState(false)
  const [profilePublic, setProfilePublic] = useState(false)
  const [showCycle, setShowCycle] = useState(true)

  const tabs = [
    { id: "account" as const, label: "Account" },
    { id: "alerts" as const, label: "Alerts" },
    { id: "prefs" as const, label: "Prefs & Privacy" },
  ]

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
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        </div>

        <div className="flex gap-1 p-1 bg-muted rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 px-3 text-sm font-medium rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "account" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Profile Photo */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <User className="w-10 h-10 text-primary/60" />
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">Tap to change photo</p>
                </div>
              </CardContent>
            </Card>

            {/* Profile Info */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
                Profile Information
              </h2>
              <Card className="bg-card border-border">
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm text-muted-foreground">
                      Display Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm text-muted-foreground">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Security */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">Security</h2>
              <Card className="bg-card border-border">
                <CardContent className="p-0 divide-y divide-border">
                  <button className="flex items-center justify-between p-4 w-full text-left hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Change Password</span>
                        <p className="text-xs text-muted-foreground">Update your password</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button className="flex items-center justify-between p-4 w-full text-left hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Smartphone className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Two-Factor Auth</span>
                        <p className="text-xs text-muted-foreground">Add extra security</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                </CardContent>
              </Card>
            </div>

            <Button className="w-full" size="lg">
              Save Changes
            </Button>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Push Notifications */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
                Notifications
              </h2>
              <Card className="bg-card border-border">
                <CardContent className="p-0 divide-y divide-border">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <Label className="font-medium">Push Notifications</Label>
                        <p className="text-xs text-muted-foreground">Enable all notifications</p>
                      </div>
                    </div>
                    <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-amber-500/10 flex items-center justify-center">
                        <Volume2 className="w-4 h-4 text-amber-500" />
                      </div>
                      <div>
                        <Label className="font-medium">Sound</Label>
                        <p className="text-xs text-muted-foreground">Play sound with notifications</p>
                      </div>
                    </div>
                    <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reminders */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">Reminders</h2>
              <Card className="bg-card border-border">
                <CardContent className="p-0 divide-y divide-border">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-sky-500/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-sky-500" />
                      </div>
                      <div>
                        <Label className="font-medium">Daily Reminder</Label>
                        <p className="text-xs text-muted-foreground">Remind me to log defaults at 9 PM</p>
                      </div>
                    </div>
                    <Switch checked={dailyReminder} onCheckedChange={setDailyReminder} />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-emerald-500" />
                      </div>
                      <div>
                        <Label className="font-medium">Weekly Report</Label>
                        <p className="text-xs text-muted-foreground">Get insights every Sunday</p>
                      </div>
                    </div>
                    <Switch checked={weeklyReport} onCheckedChange={setWeeklyReport} />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <span className="text-orange-500 text-sm">🔄</span>
                      </div>
                      <div>
                        <Label className="font-medium">Cycle Alerts</Label>
                        <p className="text-xs text-muted-foreground">Notify about cycle milestones</p>
                      </div>
                    </div>
                    <Switch checked={cycleAlerts} onCheckedChange={setCycleAlerts} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "prefs" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Appearance */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">Appearance</h2>
              <Card className="bg-card border-border">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-500/10 flex items-center justify-center">
                        <Moon className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <Label className="font-medium">Dark Mode</Label>
                        <p className="text-xs text-muted-foreground">Switch to dark theme</p>
                      </div>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={setDarkMode} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Privacy */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">Privacy</h2>
              <Card className="bg-card border-border">
                <CardContent className="p-0 divide-y divide-border">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                        {profilePublic ? (
                          <Eye className="w-4 h-4 text-primary" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-primary" />
                        )}
                      </div>
                      <div>
                        <Label className="font-medium">Public Profile</Label>
                        <p className="text-xs text-muted-foreground">Let others see your profile</p>
                      </div>
                    </div>
                    <Switch checked={profilePublic} onCheckedChange={setProfilePublic} />
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-orange-500/10 flex items-center justify-center">
                        <span className="text-orange-500 text-sm">🔄</span>
                      </div>
                      <div>
                        <Label className="font-medium">Show Cycles Publicly</Label>
                        <p className="text-xs text-muted-foreground">Display cycles on your profile</p>
                      </div>
                    </div>
                    <Switch checked={showCycle} onCheckedChange={setShowCycle} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Data Management */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
                Data Management
              </h2>
              <Card className="bg-card border-border">
                <CardContent className="p-0 divide-y divide-border">
                  <button className="flex items-center justify-between p-4 w-full text-left hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-sky-500/10 flex items-center justify-center">
                        <Download className="w-4 h-4 text-sky-500" />
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Export Data</span>
                        <p className="text-xs text-muted-foreground">Download all your data</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button className="flex items-center justify-between p-4 w-full text-left hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-500/10 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-slate-500" />
                      </div>
                      <div>
                        <span className="font-medium text-foreground">Privacy Policy</span>
                        <p className="text-xs text-muted-foreground">Learn how we handle data</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                  <button className="flex items-center justify-between p-4 w-full text-left hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-destructive/10 flex items-center justify-center">
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </div>
                      <div>
                        <span className="font-medium text-destructive">Delete All Data</span>
                        <p className="text-xs text-muted-foreground">Permanently erase everything</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* App info */}
        <div className="text-center pt-4 space-y-1">
          <p className="text-sm text-muted-foreground">
            defaulted<span className="text-primary">.</span> v1.0.0
          </p>
          <p className="text-xs text-muted-foreground/70">Made with care for self-awareness</p>
        </div>
      </div>
    </main>
  )
}

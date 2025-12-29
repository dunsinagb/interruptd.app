"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {
  Menu,
  Bell,
  Award,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  Sparkles,
  BarChart3,
  FileText,
  Target,
  Users,
  Zap,
  TrendingUp,
  MessageCircle,
  Brain,
} from "lucide-react"

interface MenuSheetProps {
  notificationCount?: number
}

export function MenuSheet({ notificationCount = 3 }: MenuSheetProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("defaulted-habits-2025")
    localStorage.removeItem("defaulted-goals-2025")
    localStorage.removeItem("defaulted-onboarding-complete")
    setOpen(false)
    router.push("/")
  }

  const menuItems = [
    { icon: Sparkles, label: "AI Insights", href: "/dashboard/insights", accent: "primary" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics", accent: "accent" },
    { icon: FileText, label: "Weekly Report", href: "/dashboard/weekly-report", accent: "amber" },
    { icon: Target, label: "Goals", href: "/dashboard/goals", accent: "emerald" },
    { icon: Users, label: "Partners", href: "/dashboard/partners", accent: "violet" },
    { icon: Zap, label: "Smart Triggers", href: "/dashboard/triggers", accent: "orange" },
    { icon: TrendingUp, label: "Comparison", href: "/dashboard/comparison", accent: "sky" },
    { icon: MessageCircle, label: "AI Coach", href: "/dashboard/coach", accent: "purple" },
    {
      icon: Bell,
      label: "Notifications",
      href: "/dashboard/notifications",
      badge: notificationCount > 0 ? notificationCount : undefined,
    },
    { icon: Award, label: "Badges", href: "/dashboard/badges" },
  ]

  const settingsItems = [
    { icon: Brain, label: "Learn", href: "/dashboard/learn", accent: "blue" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
    { icon: CreditCard, label: "Subscription", href: "/dashboard/subscription" },
    { icon: HelpCircle, label: "Help", href: "/dashboard/help" },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground hover:bg-white/5 magnetic-btn"
        >
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-3xl px-0 pb-8 glass-strong border-t border-white/10">
        {/* Drag handle */}
        <div className="flex justify-center pt-2 pb-4">
          <div className="w-12 h-1.5 rounded-full bg-muted-foreground/30" />
        </div>

        <SheetHeader className="px-6 pb-6">
          <SheetTitle className="text-center text-xl font-bold tracking-tight">Menu</SheetTitle>
        </SheetHeader>

        <div className="space-y-1 max-h-[60vh] overflow-y-auto">
          {/* Main menu items */}
          {menuItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors group"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-105 ${
                    item.accent === "primary"
                      ? "bg-primary/20 border border-primary/30"
                      : item.accent === "accent"
                        ? "bg-accent/20 border border-accent/30"
                        : item.accent === "amber"
                          ? "bg-amber-500/20 border border-amber-500/30"
                          : item.accent === "emerald"
                            ? "bg-emerald-500/20 border border-emerald-500/30"
                            : item.accent === "violet"
                              ? "bg-violet-500/20 border border-violet-500/30"
                              : item.accent === "orange"
                                ? "bg-orange-500/20 border border-orange-500/30"
                                : item.accent === "sky"
                                  ? "bg-sky-500/20 border border-sky-500/30"
                                  : item.accent === "purple"
                                    ? "bg-purple-500/20 border border-purple-500/30"
                                    : "bg-muted/50 border border-white/10"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      item.accent === "primary"
                        ? "text-primary"
                        : item.accent === "accent"
                          ? "text-accent"
                          : item.accent === "amber"
                            ? "text-amber-400"
                            : item.accent === "emerald"
                              ? "text-emerald-400"
                              : item.accent === "violet"
                                ? "text-violet-400"
                                : item.accent === "orange"
                                  ? "text-orange-400"
                                  : item.accent === "sky"
                                    ? "text-sky-400"
                                    : item.accent === "purple"
                                      ? "text-purple-400"
                                      : "text-muted-foreground"
                    }`}
                  />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/30">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-foreground font-medium tracking-tight">{item.label}</span>
              </Link>
            </motion.div>
          ))}

          {/* Divider */}
          <div className="mx-6 my-3 border-t border-white/10" />

          {/* Settings items */}
          {settingsItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (menuItems.length + i) * 0.05 }}
            >
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors group"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${
                    item.accent === "blue"
                      ? "bg-blue-500/20 border border-blue-500/30"
                      : "bg-muted/30 border border-white/10"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${item.accent === "blue" ? "text-blue-500" : "text-muted-foreground"}`}
                  />
                </div>
                <span className="text-foreground font-medium tracking-tight">{item.label}</span>
              </Link>
            </motion.div>
          ))}

          {/* Divider */}
          <div className="mx-6 my-3 border-t border-white/10" />

          {/* Logout */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (menuItems.length + settingsItems.length) * 0.05 }}
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 hover:bg-destructive/10 transition-colors w-full text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-destructive/20 border border-destructive/30 flex items-center justify-center group-hover:scale-105 transition-transform">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <span className="text-destructive font-medium tracking-tight">Log out</span>
          </motion.button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

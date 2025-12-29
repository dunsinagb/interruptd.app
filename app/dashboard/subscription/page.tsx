"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  Target,
  BarChart3,
  Calendar,
  Moon,
  Download,
  Lock,
  Headphones,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const featureComparison = [
  {
    icon: Target,
    label: "Defaults",
    free: "Up to 3",
    pro: "Unlimited",
  },
  {
    icon: BarChart3,
    label: "Pattern Insights",
    free: "Basic",
    pro: "Advanced",
  },
  {
    icon: Calendar,
    label: "History View",
    free: "30 days",
    pro: "Full year",
  },
  {
    icon: Moon,
    label: "Dark mode",
    free: "Locked",
    pro: "Included",
  },
  {
    icon: Download,
    label: "Data export",
    free: "Locked",
    pro: "Included",
  },
  {
    icon: Lock,
    label: "Private profile",
    free: "Public only",
    pro: "Your choice",
  },
  {
    icon: Headphones,
    label: "Support",
    free: "Standard",
    pro: "Priority",
  },
]

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly")

  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Back button */}
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Current plan usage card */}
        <Card className="bg-muted/30 border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-foreground text-background text-xs font-semibold px-2 py-1 rounded">Free Plan</span>
              <span className="text-sm text-muted-foreground">Level 1</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-foreground">
                  1<span className="text-muted-foreground">/3</span>
                </p>
                <p className="text-xs text-muted-foreground">Defaults</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  180<span className="text-muted-foreground">/365</span>
                </p>
                <p className="text-xs text-muted-foreground">Days Tracked</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  15<span className="text-muted-foreground">/30</span>
                </p>
                <p className="text-xs text-muted-foreground">Days Defaulted</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Limits increase as you level up. Pro removes all limits.
            </p>
          </CardContent>
        </Card>

        {/* Headline */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Remove all limits</h1>
          <p className="text-muted-foreground">Stop waiting to unlock features. Get unlimited everything today.</p>
        </div>

        {/* Pricing cards */}
        <div className="space-y-3">
          {/* Monthly */}
          <Card
            className={`cursor-pointer transition-all ${
              selectedPlan === "monthly" ? "border-2 border-primary" : "border-border hover:border-muted-foreground/50"
            }`}
            onClick={() => setSelectedPlan("monthly")}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Monthly</p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  $7.00<span className="text-base font-normal text-muted-foreground">/mo</span>
                </p>
                <p className="text-sm text-muted-foreground">Flexible, cancel anytime</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>

          {/* Yearly */}
          <div className="relative">
            <div className="absolute -top-2 right-4 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded z-10">
              SAVE $36.00
            </div>
            <Card
              className={`cursor-pointer transition-all ${
                selectedPlan === "yearly"
                  ? "border-2 border-primary bg-primary text-primary-foreground"
                  : "border-border hover:border-muted-foreground/50"
              }`}
              onClick={() => setSelectedPlan("yearly")}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wide ${
                      selectedPlan === "yearly" ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    Yearly
                  </p>
                  <p
                    className={`text-3xl font-bold mt-1 ${
                      selectedPlan === "yearly" ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    $48.00
                    <span
                      className={`text-base font-normal ${
                        selectedPlan === "yearly" ? "text-primary-foreground/80" : "text-muted-foreground"
                      }`}
                    >
                      /year
                    </span>
                  </p>
                  <p
                    className={`text-sm ${
                      selectedPlan === "yearly" ? "text-primary-foreground/80" : "text-muted-foreground"
                    }`}
                  >
                    $4.00/mo — 43% off
                  </p>
                </div>
                <ChevronRight
                  className={`w-5 h-5 ${
                    selectedPlan === "yearly" ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Money-back guarantee */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>14-day money-back guarantee</span>
        </div>

        {/* What changes with Pro */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-foreground text-center">What changes with Pro</h2>

          <div className="space-y-0">
            {featureComparison.map((feature, index) => (
              <div
                key={feature.label}
                className={`flex items-center justify-between py-4 ${
                  index !== featureComparison.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{feature.label}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-muted-foreground line-through">{feature.free}</span>
                  <span className="text-primary font-medium">{feature.pro}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="space-y-3 pt-2">
          <Button className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90">
            Upgrade to Pro — {selectedPlan === "yearly" ? "$48.00/year" : "$7.00/mo"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">14-day money-back guarantee. Cancel anytime.</p>
        </div>

        {/* FAQ link */}
        <div className="text-center pb-4">
          <Link href="/dashboard/help" className="text-sm text-primary hover:underline">
            Have questions? Visit our Help Center
          </Link>
        </div>
      </div>
    </main>
  )
}

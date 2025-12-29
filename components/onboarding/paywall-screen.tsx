"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Shield, Brain, Layers, BarChart3, Lock, Moon, Headphones } from "lucide-react"

interface PaywallScreenProps {
  onComplete: () => void
  onSkip: () => void
}

export function PaywallScreen({ onComplete, onSkip }: PaywallScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly")

  const features = [
    { icon: Layers, label: "Defaults", free: "Up to 3", pro: "Unlimited" },
    { icon: Brain, label: "AI Insights", free: "Locked", pro: "Included" },
    { icon: BarChart3, label: "Pattern Reports", free: "Basic", pro: "Advanced" },
    { icon: Lock, label: "Data Export", free: "Locked", pro: "Included" },
    { icon: Moon, label: "Dark Mode", free: "Locked", pro: "Included" },
    { icon: Headphones, label: "Support", free: "Standard", pro: "Priority" },
  ]

  return (
    <div className="flex-1 flex flex-col px-4 py-6 overflow-y-auto">
      <div className="max-w-md mx-auto w-full">
        {/* Usage Card */}
        <Card className="border-border bg-muted/50 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded">Free Plan</span>
              <span className="text-xs text-muted-foreground">Level 1</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-foreground">
                  0<span className="text-muted-foreground">/3</span>
                </p>
                <p className="text-xs text-muted-foreground">Defaults</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  0<span className="text-muted-foreground">/5</span>
                </p>
                <p className="text-xs text-muted-foreground">Insights</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">
                  0<span className="text-muted-foreground">/10</span>
                </p>
                <p className="text-xs text-muted-foreground">Reports</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Limits increase as you level up. Pro removes all limits.
            </p>
          </CardContent>
        </Card>

        {/* Headline */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Remove all limits</h2>
          <p className="text-muted-foreground text-sm">
            Stop waiting to unlock features. Get unlimited everything today.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="space-y-3 mb-4">
          <Card
            className={`cursor-pointer transition-all ${
              selectedPlan === "monthly"
                ? "border-primary ring-2 ring-primary"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setSelectedPlan("monthly")}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase font-medium">Monthly</p>
                <p className="text-2xl font-bold text-foreground">
                  $7.00<span className="text-sm font-normal text-muted-foreground">/mo</span>
                </p>
                <p className="text-xs text-muted-foreground">Flexible, cancel anytime</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </CardContent>
          </Card>

          <div className="relative">
            <div className="absolute -top-2 right-4 bg-accent text-accent-foreground text-xs font-semibold px-2 py-0.5 rounded z-10">
              SAVE $36
            </div>
            <Card
              className={`cursor-pointer transition-all ${
                selectedPlan === "yearly"
                  ? "border-primary bg-primary/5 ring-2 ring-primary"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedPlan("yearly")}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-medium">Yearly</p>
                  <p className="text-2xl font-bold text-foreground">
                    $48.00<span className="text-sm font-normal text-muted-foreground">/year</span>
                  </p>
                  <p className="text-xs text-accent font-medium">$4.00/mo - 43% off</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Guarantee */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
          <Shield className="w-4 h-4 text-accent" />
          <span>14-day money-back guarantee</span>
        </div>

        {/* Features Comparison */}
        <div className="mb-6">
          <h3 className="text-center font-semibold text-foreground mb-4">What changes with Pro</h3>
          <div className="space-y-0">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <feature.icon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{feature.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground line-through">{feature.free}</span>
                  <span className="text-sm text-primary font-medium">{feature.pro}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3 pb-6">
          <Button size="lg" className="w-full" onClick={onComplete}>
            Upgrade to Pro - ${selectedPlan === "yearly" ? "48.00/year" : "7.00/mo"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">14-day money-back guarantee. Cancel anytime.</p>
          <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={onSkip}>
            Continue with Free
          </Button>
        </div>
      </div>
    </div>
  )
}

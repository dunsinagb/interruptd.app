"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Zap, RefreshCw, Target, Lightbulb, TrendingUp } from "lucide-react"
import { MotionWrapper } from "@/components/motion-wrapper"

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold">The Science of Interrupting Patterns</h1>
          <p className="text-muted-foreground text-lg">
            Understanding the neuroscience behind automatic behaviors and why awareness creates space for change
          </p>
        </div>

        <MotionWrapper delay={0.1}>
          <Card className="glass-card border-primary/20">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold">What Are "Defaults"?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    In behavioral psychology, your "defaults" are the automatic responses your brain falls back on to
                    conserve energy. These are the habitual behaviors that happen without conscious thought—reaching for
                    your phone, scrolling social media, eating junk food when stressed.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    When you repeat a behavior enough times, neural pathways between brain cells strengthen. Eventually,
                    effortful decision-making isn't needed—the behavior becomes your default setting. This is
                    efficiency, not laziness.
                  </p>
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-4 mt-4">
                    <p className="text-sm font-medium text-foreground">
                      interruptd. tracks when you <strong>interrupt</strong> these automatic behaviors—when you
                      consciously step away from your defaults.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>

        <MotionWrapper delay={0.2}>
          <Card className="glass-card border-accent/20">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-6 h-6 text-accent" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">The Pattern Loop</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    MIT researchers identified a specific loop that drives automated behavior:
                  </p>

                  <div className="grid gap-4 pl-4 border-l-2 border-primary/20">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold">Cue (Trigger)</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        A specific time, feeling, or situation that prompts the behavior. Example: "10pm every night" or
                        "feeling stressed."
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5 text-accent" />
                        <h3 className="font-semibold">Behavior (Action)</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The automatic response that happens without conscious thought. Example: reaching for your phone
                        or opening social media.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        <h3 className="font-semibold">Reward (Payoff)</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        The feeling or result that reinforces the loop. Example: temporary distraction, dopamine hit,
                        relief from boredom.
                      </p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed pt-2">
                    Once this loop repeats enough times, your basal ganglia (the brain region that controls automated
                    behavior) takes over, making the pattern feel effortless and inevitable.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>

        <MotionWrapper delay={0.3}>
          <Card className="glass-card border-amber-500/20">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-amber-500" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold">Why interruptd. Focuses on Pattern Interruptions</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Traditional habit trackers assume you want to build new behaviors through willpower. But
                    neuroscience shows that willpower is a limited resource—other demands quickly divert your attention.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    interruptd. takes a different approach. We don't track your habits. We track when you{" "}
                    <strong>interrupt them</strong>. When you observe these interruptions—these moments when the
                    automatic pattern didn't fire—you make the invisible visible.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Research shows that this awareness—simply observing when and why patterns break—creates space
                    between cue and behavior. In that space, conscious choice becomes possible. Not guaranteed, but
                    possible.
                  </p>
                  <div className="bg-amber-500/5 border border-amber-500/10 rounded-lg p-4 mt-4">
                    <p className="text-sm font-medium text-foreground">
                      "You can't change what you can't see. interruptd. shows you when your defaults don't fire—and over
                      time, patterns emerge."
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>

        <MotionWrapper delay={0.4}>
          <Card className="glass-card border-blue-500/20">
            <CardContent className="p-8 space-y-4">
              <h2 className="text-2xl font-bold">The Timeline</h2>
              <p className="text-muted-foreground leading-relaxed">
                Research shows it can take anywhere from 18 to 254 days for a new pattern to become automatic—with the
                average around 66 days. The key factors? Frequency of the cue and consistency of the behavior.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                interruptd. isn't about reaching day 66. It's about observing the process. Some patterns shift quickly.
                Others take longer. Some never fully change—and that's data too.
              </p>
              <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4">
                <p className="text-sm font-medium text-foreground">
                  Your job: observe. The app's job: show you what's there.
                </p>
              </div>
            </CardContent>
          </Card>
        </MotionWrapper>
      </div>
    </main>
  )
}

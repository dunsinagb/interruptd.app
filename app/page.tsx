"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Target, TrendingUp, Brain, Users, Zap, MessageSquare, Calendar } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { FadeIn, FadeInStagger, FadeInStaggerItem, ScaleIn } from "@/components/motion-wrapper"
import { Logo, LogoIcon } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const onboardingComplete = localStorage.getItem("interruptd_onboarding_complete")
    if (!onboardingComplete) {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        <AnimatedBackground />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 relative z-10"
        >
          <LogoIcon size="md" className="animate-pulse" />
          <span className="font-semibold text-foreground text-lg tracking-tight">Loading...</span>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <AnimatedBackground />

      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/5">
        <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Logo />
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="text-foreground hover:bg-white/10 rounded-full"
              onClick={() => router.push("/dashboard")}
            >
              Login
            </Button>
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-full shadow-lg shadow-blue-500/20"
              onClick={() => router.push("/onboarding")}
            >
              Start Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-primary text-sm font-medium mb-8">
                <Target className="w-4 h-4" />
                <span className="tracking-wide">Observe. Understand. Evolve.</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight text-balance leading-[0.95] mb-6">
                Make patterns visible.
                <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent glow-text">
                  Choose deliberately.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto text-pretty leading-relaxed mb-4 font-light">
                Observe when you step away from defaults. Track patterns without judgment.
              </p>
              <p className="text-foreground/70 text-base max-w-xl mx-auto text-pretty mb-10 font-light">
                Awareness over achievement. Observation over motivation.
              </p>
            </FadeIn>

            <FadeIn>
              <div className="max-w-5xl mx-auto text-center space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-blue-500/20 border-0"
                    onClick={() => router.push("/onboarding")}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Preview Section */}
        <section className="px-6 pb-32 relative z-10">
          <ScaleIn delay={0.5}>
            <div className="max-w-6xl mx-auto">
              <Card className="glass-strong border-white/10 overflow-hidden tilt-card">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-600 flex items-center justify-center shadow-lg shadow-rose-500/25">
                        <span className="text-white font-bold text-lg">DS</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">Doom Scrolling</h3>
                        <p className="text-sm text-muted-foreground font-mono">Daily pattern observation</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20">
                      <span className="text-xl">🔄</span>
                      <span className="font-bold text-rose-400">12</span>
                      <span className="text-xs text-rose-400/70 font-mono">day cycle</span>
                    </div>
                  </div>

                  <motion.div
                    className="space-y-4 p-6 rounded-xl bg-background/50 border border-white/5 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="font-mono font-medium">2025 Activity</span>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-muted"></div>
                          <span className="font-mono text-xs">Norm</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></div>
                          <span className="font-bold text-rose-400">Interrupted</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
                        (month, mi) => (
                          <motion.div
                            key={month}
                            className="min-w-0"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 + mi * 0.08, duration: 0.4, ease: "easeOut" }}
                          >
                            <p className="text-[9px] text-muted-foreground mb-2 text-center font-mono font-medium truncate">
                              {month}
                            </p>
                            <div className="grid grid-rows-5 gap-[2px]">
                              {Array.from({ length: 5 }).map((_, row) => (
                                <div key={row} className="flex gap-[2px] justify-center">
                                  {Array.from({ length: 6 }).map((_, col) => {
                                    const isDefaulted = Math.random() > 0.65
                                    const isPast = mi < 11 || (mi === 11 && row < 4)
                                    const delay = 0.9 + mi * 0.08 + (row * 6 + col) * 0.005
                                    return (
                                      <motion.div
                                        key={col}
                                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                                          !isPast
                                            ? "bg-muted/30 border border-white/5"
                                            : isDefaulted
                                              ? "bg-rose-500 shadow-md shadow-rose-500/50 ring-1 ring-rose-400/30"
                                              : "bg-muted/70 border border-white/5"
                                        }`}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                          delay,
                                          duration: 0.3,
                                          type: "spring",
                                          stiffness: 260,
                                          damping: 20,
                                        }}
                                        whileHover={{
                                          scale: 1.8,
                                          transition: { duration: 0.15 },
                                        }}
                                      />
                                    )
                                  })}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ),
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className="text-xs text-muted-foreground font-mono">124 times interrupted this year</span>
                      <span className="text-xs text-rose-400 font-mono">358 / 365 days tracked</span>
                    </div>
                  </motion.div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4 mt-6">
                    <div className="text-center p-4 rounded-xl bg-background/30 border border-white/5">
                      <p className="text-2xl font-bold text-foreground">124</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">Interrupted</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-background/30 border border-white/5">
                      <p className="text-2xl font-bold text-primary">2.9</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">Avg Cycle</p>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-background/30 border border-white/5">
                      <p className="text-2xl font-bold text-rose-400">98%</p>
                      <p className="text-xs text-muted-foreground font-mono mt-1">Tracked</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScaleIn>
        </section>

        {/* How it Works - Inspired by loggd.life */}
        <section className="px-6 pb-32 relative z-10">
          <div className="max-w-4xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                  Simple daily routine
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto text-lg font-light">
                  A 5-minute practice that reveals patterns you never knew existed
                </p>
              </div>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <FadeIn delay={0.3}>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl glass border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                      1
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Patterns exist</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Your patterns run automatically. They don't need tracking—they're already happening.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl glass border border-accent/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold bg-gradient-to-br from-accent to-primary bg-clip-text text-transparent">
                      2
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Observe deviations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Log when you step away from the pattern. Make the invisible visible.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl glass border border-primary/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">
                      3
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Choose deliberately</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Once you see the pattern, you can decide what to do. Not before.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Features Section - Restructured Bento Grid */}
        <section className="px-6 pb-32 relative z-10">
          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
                  Pro features for <span className="text-primary">deeper insights</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-light">
                  Advanced tools designed to help you discover hidden patterns and understand the rhythms of your
                  behavior
                </p>
              </div>
            </FadeIn>

            <FadeInStagger className="grid md:grid-cols-12 gap-4">
              {/* AI Pattern Insights - Hero feature spanning full width */}
              <FadeInStaggerItem className="md:col-span-12">
                <Card className="glass border-white/10 group tilt-card hover:border-primary/30 transition-all duration-300">
                  <CardContent className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/40 border border-primary/30 flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                        <Brain className="w-10 h-10 text-primary" />
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="font-semibold text-foreground text-2xl mb-3">AI Pattern Recognition</h3>
                        <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                          Intelligent analysis reveals when defaults happen most. Visual analytics show day-of-week
                          patterns, monthly trends, and cycling behaviors you never noticed.
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          <span className="px-4 py-2 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
                            Temporal Analysis
                          </span>
                          <span className="px-4 py-2 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
                            Trigger Detection
                          </span>
                          <span className="px-4 py-2 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
                            Cycle Prediction
                          </span>
                          <span className="px-4 py-2 rounded-full text-xs font-mono bg-primary/10 text-primary border border-primary/20">
                            Reason Analytics
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </FadeInStaggerItem>

              {/* AI Coach - Large feature */}
              <FadeInStaggerItem className="md:col-span-7">
                <Card className="glass border-white/10 h-full group tilt-card hover:border-rose-500/30 transition-colors">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500/20 to-rose-600/20 border border-rose-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <MessageSquare className="w-7 h-7 text-rose-400" />
                    </div>
                    <h3 className="font-semibold text-foreground text-xl mb-3">AI Coach</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      Get personalized, non-judgmental reflections on your patterns. The AI coach helps you understand
                      the "why" behind your deviations.
                    </p>
                    <div className="mt-4 text-sm text-muted-foreground/70 font-mono">
                      "Your Friday patterns suggest..."
                    </div>
                  </CardContent>
                </Card>
              </FadeInStaggerItem>

              {/* Trend Comparison */}
              <FadeInStaggerItem className="md:col-span-5">
                <Card className="glass border-white/10 h-full group tilt-card hover:border-teal-500/30 transition-colors">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 border border-teal-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <TrendingUp className="w-7 h-7 text-teal-400" />
                    </div>
                    <h3 className="font-semibold text-foreground text-xl mb-3">Trend Comparison</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      Month-over-month and quarter-over-quarter visual comparisons with percentage changes.
                    </p>
                  </CardContent>
                </Card>
              </FadeInStaggerItem>

              {/* Partners */}
              <FadeInStaggerItem className="md:col-span-4">
                <Card className="glass border-white/10 h-full group tilt-card hover:border-violet-500/30 transition-colors">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-600/20 border border-violet-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Users className="w-7 h-7 text-violet-400" />
                    </div>
                    <h3 className="font-semibold text-foreground text-xl mb-3">Partners</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      Connect with accountability partners and share progress safely.
                    </p>
                  </CardContent>
                </Card>
              </FadeInStaggerItem>

              {/* Smart Triggers */}
              <FadeInStaggerItem className="md:col-span-4">
                <Card className="glass border-white/10 h-full group tilt-card hover:border-amber-500/30 transition-colors">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Zap className="w-7 h-7 text-amber-400" />
                    </div>
                    <h3 className="font-semibold text-foreground text-xl mb-3">Smart Triggers</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      AI-detected reminders at high-risk times based on your historical patterns.
                    </p>
                  </CardContent>
                </Card>
              </FadeInStaggerItem>

              {/* Weekly Reports */}
              <FadeInStaggerItem className="md:col-span-4">
                <Card className="glass border-white/10 h-full group tilt-card hover:border-blue-500/30 transition-colors">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Calendar className="w-7 h-7 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-foreground text-xl mb-3">Weekly Insights</h3>
                    <p className="text-muted-foreground leading-relaxed flex-1">
                      Automated weekly summaries with AI-generated pattern observations.
                    </p>
                  </CardContent>
                </Card>
              </FadeInStaggerItem>
            </FadeInStagger>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 pb-32 relative z-10">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <Card className="overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-accent opacity-90" />
                <div className="absolute inset-0 noise opacity-10" />
                <CardContent className="p-12 text-center space-y-6 relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                    Start understanding yourself
                  </h2>
                  <p className="text-white/80 max-w-md mx-auto text-lg font-light">
                    Free to use. No account required. Your data stays on your device.
                  </p>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="gap-2 px-8 py-6 text-base bg-white text-primary hover:bg-white/90 magnetic-btn shadow-lg"
                    >
                      Open Dashboard <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        </section>

        {/* Marquee Footer */}
        <footer className="border-t border-white/5 relative z-10 overflow-hidden">
          <div className="py-6 bg-gradient-to-r from-transparent via-primary/5 to-transparent">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="text-2xl font-bold text-muted-foreground/30 flex items-center gap-4">
                  <span>observe your patterns</span>
                  <span className="text-primary/30">•</span>
                  <span>know when you interrupt</span>
                  <span className="text-primary/30">•</span>
                  <span>interruptd.</span>
                  <span className="text-primary/30">•</span>
                </span>
              ))}
            </motion.div>
          </div>
          <div className="py-8 px-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <Logo size="sm" />
              <p className="text-sm text-muted-foreground font-mono">© 2025 interruptd. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}

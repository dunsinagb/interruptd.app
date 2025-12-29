"use client"

import { useState, Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft, ChevronDown, Search, MessageCircle, Mail, BookOpen, Lightbulb } from "lucide-react"
import Link from "next/link"

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: "What does 'interruptd' mean?",
    answer:
      "interruptd. helps you track when you interrupt your automatic behavioral patterns. It's not about success or failure—it's about awareness. By observing when you step away from defaults, you gain insights into the cue-behavior-reward loops that run your life.",
  },
  {
    question: "What's the science behind this approach?",
    answer:
      "Neuroscience research shows that repeated behaviors strengthen neural pathways until they become automatic defaults controlled by your basal ganglia. interruptd. helps you observe these automated patterns by tracking interruptions. This creates awareness—the space between cue and behavior where conscious choice becomes possible. Learn more in our Learn section.",
  },
  {
    question: "How are cycles calculated?",
    answer:
      "Cycles count consecutive days where you logged interrupting from your default. This helps you identify when you tend to make conscious choices versus operating on autopilot.",
  },
  {
    question: "Can I edit past days?",
    answer:
      "No, past days are locked to maintain data integrity. You can only log today's status. This ensures honest reflection and prevents retroactive changes that might skew your patterns.",
  },
  {
    question: "What happens to my data?",
    answer:
      "Your data stays yours. We store it locally on your device. Pro users get cloud backup for cross-device sync. We never sell your personal information. Privacy-first, always.",
  },
  {
    question: "How do I add a new default?",
    answer:
      "From the dashboard, tap the 'Add' button in the top right corner. Enter a name, description, and choose a color for your new default. It will immediately appear in your list.",
  },
  {
    question: "What are badges?",
    answer:
      "Badges are achievements you earn as you use the app. They celebrate milestones like tracking your first interruptd day, discovering patterns, or maintaining consistency in your logging.",
  },
  {
    question: "How is this different from habit trackers?",
    answer:
      "Most trackers assume you're building new habits. interruptd. assumes your patterns already exist automatically. Instead of tracking what you want to do, you track when you interrupt from what you normally do. It's about awareness, not achievement.",
  },
  {
    question: "Why track when I interrupt patterns?",
    answer:
      "We don't use 'break' or 'fail.' When you interrupt, you're observing a deviation from your automatic pattern. Tracking it makes it visible. That visibility creates space between cue and behavior where intentional choice becomes possible. Research shows awareness alone can interrupt automated loops.",
  },
  {
    question: "How long until I see change?",
    answer:
      "Research shows it takes 18-254 days (average 66) for new patterns to become automatic. But interruptd. isn't about reaching a specific day count. It's about observing the cue-behavior-reward loop in your life. Some patterns shift quickly. Others take longer. The timeline matters less than the awareness you're building.",
  },
]

function HelpContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Back button and title */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
          <p className="text-sm text-muted-foreground">How can we help you?</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search for answers..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-medium text-foreground text-sm">Getting Started</h3>
            <p className="text-xs text-muted-foreground">Learn the basics</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer">
          <CardContent className="p-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
              <Lightbulb className="w-5 h-5 text-amber-500" />
            </div>
            <h3 className="font-medium text-foreground text-sm">Tips & Tricks</h3>
            <p className="text-xs text-muted-foreground">Get more from the app</p>
          </CardContent>
        </Card>
      </div>

      {/* FAQs */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide px-1">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {filteredFaqs.map((faq, index) => (
            <Card key={index} className="bg-card border-border overflow-hidden">
              <button
                className="w-full p-4 text-left flex items-center justify-between gap-3"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <span className="font-medium text-foreground text-sm">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    openFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === index && (
                <div className="px-4 pb-4 pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Contact support */}
      <Card className="bg-sidebar border-sidebar-border">
        <CardContent className="p-5 text-center space-y-4">
          <h3 className="font-semibold text-foreground">Still need help?</h3>
          <p className="text-sm text-muted-foreground">Our support team is here to assist you</p>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" className="gap-2 bg-transparent">
              <MessageCircle className="w-4 h-4" />
              Chat
            </Button>
            <Button className="gap-2">
              <Mail className="w-4 h-4" />
              Email Us
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <Suspense fallback={null}>
        <HelpContent />
      </Suspense>
    </main>
  )
}

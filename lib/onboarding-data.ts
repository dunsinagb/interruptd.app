// Onboarding quiz questions and flow data for interruptd. app

export interface QuizQuestion {
  id: string
  question: string
  options: { label: string; value: string }[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "goal",
    question: "What brings you to interruptd.?",
    options: [
      { label: "Break a bad habit", value: "break" },
      { label: "Understand my patterns", value: "understand" },
      { label: "Track multiple behaviors", value: "multiple" },
      { label: "Just curious", value: "curious" },
    ],
  },
  {
    id: "behavior",
    question: "What type of behavior do you want to observe?",
    options: [
      { label: "Screen time / Social media", value: "screen" },
      { label: "Food / Diet related", value: "food" },
      { label: "Sleep / Energy", value: "sleep" },
      { label: "Other / Multiple", value: "other" },
    ],
  },
  {
    id: "frequency",
    question: "How often do you typically deviate?",
    options: [
      { label: "Daily", value: "daily" },
      { label: "Few times a week", value: "weekly" },
      { label: "Occasionally", value: "occasionally" },
      { label: "Not sure yet", value: "unsure" },
    ],
  },
  {
    id: "tracking",
    question: "Have you tried tracking this before?",
    options: [
      { label: "Yes, but apps felt judgmental", value: "judgmental" },
      { label: "Yes, but I couldn't stick with it", value: "inconsistent" },
      { label: "No, this is my first time", value: "first" },
      { label: "Yes, with some success", value: "success" },
    ],
  },
]

export const symptoms = [
  { icon: "😓", label: "Feel guilty when you slip up" },
  { icon: "🔄", label: "Stuck in repetitive cycles" },
  { icon: "❓", label: "Don't know your triggers" },
  { icon: "📊", label: "Want data, not judgment" },
  { icon: "🎯", label: "Need clarity on patterns" },
  { icon: "⏰", label: "Lose track of how often you deviate" },
]

export const reviews = [
  {
    name: "Sarah K.",
    avatar: "SK",
    rating: 5,
    text: "Finally an app that doesn't make me feel bad. Just observing my patterns has been eye-opening.",
  },
  {
    name: "Marcus T.",
    avatar: "MT",
    rating: 5,
    text: "The 'assume norm' approach is genius. I only log when I deviate, which takes seconds.",
  },
  {
    name: "Elena R.",
    avatar: "ER",
    rating: 5,
    text: "After 3 months I can clearly see my triggers. Wednesday evenings are my weakness!",
  },
]

export const features = [
  {
    icon: "calendar",
    title: "This Week View",
    description: "Quick horizontal view of your current week",
  },
  {
    icon: "grid",
    title: "Full Year Grid",
    description: "See your entire year at a glance",
  },
  {
    icon: "brain",
    title: "AI Insights",
    description: "Get pattern analysis powered by AI",
  },
  {
    icon: "lock",
    title: "Past is Locked",
    description: "Honest data - no retroactive changes",
  },
  {
    icon: "tag",
    title: "Log Reasons",
    description: "Document why you deviated",
  },
  {
    icon: "layers",
    title: "Multiple Defaults",
    description: "Track several behaviors independently",
  },
]

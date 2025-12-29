export interface DefaultedDay {
  date: string // YYYY-MM-DD
  reason?: string
}

export interface Habit {
  id: string
  name: string
  description: string
  color: string
  createdAt: string
  defaultedDays: DefaultedDay[]
  archived?: boolean
}

// Legacy aliases for backwards compatibility
export type InterruptedDay = DefaultedDay
export type Pattern = Habit
export type Default = Habit

export function generateMockDefaultedDays(): DefaultedDay[] {
  const reasons = [
    "Needed a mental break",
    "Social event",
    "Feeling unwell",
    "Travel day",
    "Family commitment",
    "Work deadline",
    "Self-care day",
    "Special occasion",
    "Weather conditions",
    "Planned rest",
  ]

  const defaultedDays: DefaultedDay[] = []
  const today = new Date()
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`

  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(2025, month + 1, 0).getDate()
    const selectedDays = new Set<number>()

    // Select 15 random days in each month (only past or today)
    let attempts = 0
    while (selectedDays.size < 15 && attempts < 100) {
      const day = Math.floor(Math.random() * daysInMonth) + 1
      const date = `2025-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

      if (date <= todayStr) {
        selectedDays.add(day)
      }
      attempts++
    }

    selectedDays.forEach((day) => {
      const date = `2025-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      defaultedDays.push({
        date,
        reason: reasons[Math.floor(Math.random() * reasons.length)],
      })
    })
  }

  return defaultedDays.sort((a, b) => a.date.localeCompare(b.date))
}

// Legacy alias for backwards compatibility
export const generateMockInterruptedDays = generateMockDefaultedDays

export const defaultHabits: Habit[] = [
  {
    id: "1",
    name: "Social Media Scrolling",
    description: "Mindless browsing on social platforms",
    color: "rose",
    createdAt: "2025-01-01",
    defaultedDays: generateMockDefaultedDays(),
  },
  {
    id: "2",
    name: "Junk Food",
    description: "Eating processed or unhealthy snacks",
    color: "orange",
    createdAt: "2025-01-01",
    defaultedDays: generateMockDefaultedDays(),
  },
  {
    id: "3",
    name: "Late Night Screen Time",
    description: "Using devices before bed",
    color: "violet",
    createdAt: "2025-01-01",
    defaultedDays: generateMockDefaultedDays(),
  },
]

export function getHabitColor(color: string) {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    violet: { bg: "bg-violet-500", border: "border-violet-500", text: "text-violet-600" },
    emerald: { bg: "bg-emerald-500", border: "border-emerald-500", text: "text-emerald-600" },
    amber: { bg: "bg-amber-500", border: "border-amber-500", text: "text-amber-600" },
    rose: { bg: "bg-rose-500", border: "border-rose-500", text: "text-rose-600" },
    sky: { bg: "bg-sky-500", border: "border-sky-500", text: "text-sky-600" },
    orange: { bg: "bg-orange-500", border: "border-orange-500", text: "text-orange-600" },
  }
  return colors[color] || colors.violet
}

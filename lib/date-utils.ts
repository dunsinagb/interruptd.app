// Date utility functions

export function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0)
  const diff = date.getTime() - start.getTime()
  const oneDay = 1000 * 60 * 60 * 24
  return Math.floor(diff / oneDay)
}

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

export function getTodayString(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function isToday(dateString: string): boolean {
  return dateString === getTodayString()
}

export function isPast(dateString: string): boolean {
  const todayString = getTodayString()
  return dateString < todayString
}

export function isFuture(dateString: string): boolean {
  const todayString = getTodayString()
  return dateString > todayString
}

export function getMonthName(month: number): string {
  return new Date(2025, month).toLocaleDateString("en-US", { month: "long" })
}

export function getShortMonthName(month: number): string {
  return new Date(2025, month).toLocaleDateString("en-US", { month: "short" })
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

export function getLast5Days(): string[] {
  const days: string[] = []
  const today = new Date()
  for (let i = 4; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    days.push(date.toISOString().split("T")[0])
  }
  return days
}

export function getWeekDates(weekOffset = 0): string[] {
  const today = new Date()
  // Get Monday of current week
  const dayOfWeek = today.getDay()
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
  const monday = new Date(today)
  monday.setDate(today.getDate() + mondayOffset + weekOffset * 7)

  const days: string[] = []
  for (let i = 0; i < 7; i++) {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const day = String(date.getDate()).padStart(2, "0")
    days.push(`${year}-${month}-${day}`)
  }
  return days
}

export function getWeekDateRange(weekOffset = 0): string {
  const days = getWeekDates(weekOffset)
  const startDate = new Date(days[0])
  const endDate = new Date(days[6])

  const startMonth = startDate.toLocaleDateString("en-US", { month: "short" })
  const endMonth = endDate.toLocaleDateString("en-US", { month: "short" })
  const startDay = startDate.getDate()
  const endDay = endDate.getDate()
  const year = startDate.getFullYear()

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay}-${endDay}, ${year}`
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`
}

export function getDayName(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString("en-US", { weekday: "short" })
}

export function getDayNumber(dateString: string): number {
  return Number.parseInt(dateString.split("-")[2], 10)
}

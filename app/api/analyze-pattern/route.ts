import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { generateText } from "ai"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { habitName, defaultedDays, totalDays, isWeeklySummary, weekRange, habitSummaries } = await req.json()

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY || "",
    })

    // Extract dates and reasons from defaulted days
    const dates = defaultedDays.map((d: { date: string; reason?: string }) => d.date)
    const reasons = defaultedDays.filter((d: { reason?: string }) => d.reason).map((d: { reason: string }) => d.reason)

    // Analyze day of week patterns
    const dayOfWeekCounts = Array(7).fill(0)
    dates.forEach((date: string) => {
      const dayOfWeek = new Date(date + "T12:00:00").getDay()
      dayOfWeekCounts[dayOfWeek]++
    })

    // Analyze reason frequency
    const reasonCounts: Record<string, number> = {}
    reasons.forEach((reason: string) => {
      reasonCounts[reason] = (reasonCounts[reason] || 0) + 1
    })

    let prompt: string

    if (isWeeklySummary) {
      prompt = `You are summarizing a user's weekly pattern data for "${weekRange}".

Data:
- Defaults tracked: ${habitSummaries?.map((h: { name: string; count: number }) => `${h.name}: ${h.count} times`).join(", ")}
- Total defaults this week: ${dates.length}
- Days with defaults by day of week: ${JSON.stringify(
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => ({
          day,
          count: dayOfWeekCounts[i],
        })),
      )}
- Top reasons: ${JSON.stringify(
        Object.entries(reasonCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3),
      )}

Write 3-4 bullet point observations about this week. Each bullet should:
- Start with an emoji (📅 📊 💭 🔄 ⚡)
- Be one concise sentence (max 12 words)
- Be observational, not prescriptive

Focus on: which days were busiest, any patterns, notable reasons.`
    } else {
      // Analyze monthly patterns
      const monthlyCounts: Record<string, number> = {}
      dates.forEach((date: string) => {
        const month = date.substring(0, 7)
        monthlyCounts[month] = (monthlyCounts[month] || 0) + 1
      })

      prompt = `You are analyzing behavioral patterns for a user tracking when they deviate from their default behavior: "${habitName}".

Data:
- Total days elapsed in 2025: ${totalDays}
- Days defaulted (deviated from norm): ${dates.length}
- Defaulted days by day of week: ${JSON.stringify(
        ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, i) => ({
          day,
          count: dayOfWeekCounts[i],
        })),
      )}
- Defaulted days by month: ${JSON.stringify(monthlyCounts)}
- Top reasons given: ${JSON.stringify(
        Object.entries(reasonCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5),
      )}

Provide a brief, scannable analysis in bullet point format. Use 4-6 bullet points maximum.

Each bullet should:
- Start with a category emoji (📅 for temporal, 🔄 for patterns, 💭 for reasons, 📊 for statistics)
- Be one clear, concise sentence (max 15 words)
- Be observational and neutral, not prescriptive

Keep it scannable, data-driven, and non-judgmental. Focus on what the pattern reveals, not what the user should do.`
    }

    const { text } = await generateText({
      model: openrouter("openai/gpt-4o-mini"),
      prompt,
      maxTokens: 300,
      temperature: 0.7,
    })

    return Response.json({ insights: text })
  } catch (error) {
    console.error("[v0] Error analyzing pattern:", error)
    return Response.json({ error: "Failed to analyze pattern" }, { status: 500 })
  }
}

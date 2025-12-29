import { createOpenRouter } from "@openrouter/ai-sdk-provider"
import { generateText } from "ai"

export async function POST(request: Request) {
  try {
    const { habits } = await request.json()

    if (!habits || habits.length === 0) {
      return Response.json({ error: "No habits provided" }, { status: 400 })
    }

    const openrouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY || "",
    })

    const habitSummary = habits.map((h: any) => `${h.name}: ${h.totalDefaults} defaults`).join(", ")

    const prompt = `You are a neutral, observational coach for the "interruptd." app - a tool that helps users track when they interrupt their typical automated patterns/behaviors.

Context: Neuroscience shows that behaviors become automated through repeated neural pathway strengthening. The basal ganglia controls these automatic defaults through a cue-behavior-reward loop. When users track deviations, they create awareness—the space between cue and behavior where conscious choice becomes possible.

User's patterns: ${habitSummary}

Provide a brief, neuroscience-informed reflection (2-3 sentences) that:
- References the cue-behavior-reward loop when relevant
- Observes patterns through the lens of automated vs. conscious behavior
- Asks thoughtful questions about what triggers (cues) might be at play
- Uses neutral, curious language rooted in brain science
- Focuses on awareness and pattern visibility, not change or willpower

Be warm, brief, and grounded in the science of how defaults form. Avoid prescriptive advice. Help them see what's already happening.`

    const { text } = await generateText({
      model: openrouter("openai/gpt-4o-mini"),
      prompt,
    })

    return Response.json({ message: text })
  } catch (error) {
    console.error("[v0] Coach API error:", error)
    return Response.json({ error: "Failed to generate coach message" }, { status: 500 })
  }
}

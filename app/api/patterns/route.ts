import { NextResponse } from "next/server"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const createPatternSchema = z.object({
  name: z.string().trim().min(1).max(80),
  description: z.string().trim().max(280).optional().default(""),
  color: z.string().trim().min(1).max(32),
})

function toYmd(d: Date) {
  return d.toISOString().split("T")[0]
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const patterns = await prisma.pattern.findMany({
    where: { userId: session.user.id },
    include: { defaultedDays: true },
    orderBy: { createdAt: "asc" },
  })

  return NextResponse.json({
    patterns: patterns.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      color: p.color,
      createdAt: toYmd(p.createdAt),
      archived: p.archived,
      defaultedDays: p.defaultedDays.map((d) => ({ date: d.date, reason: d.reason ?? undefined })),
    })),
  })
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = createPatternSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 })

  const subscription = await prisma.subscription.findUnique({ where: { userId: session.user.id } })
  const plan = subscription?.plan ?? "FREE"

  if (plan === "FREE") {
    const activeCount = await prisma.pattern.count({ where: { userId: session.user.id, archived: false } })
    if (activeCount >= 3) {
      return NextResponse.json(
        { error: "Free plan limit reached (max 3 active defaults)." },
        { status: 403 },
      )
    }
  }

  const created = await prisma.pattern.create({
    data: {
      userId: session.user.id,
      name: parsed.data.name,
      description: parsed.data.description ?? "",
      color: parsed.data.color,
    },
    include: { defaultedDays: true },
  })

  return NextResponse.json({
    pattern: {
      id: created.id,
      name: created.name,
      description: created.description,
      color: created.color,
      createdAt: toYmd(created.createdAt),
      archived: created.archived,
      defaultedDays: [],
    },
  })
}


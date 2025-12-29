import { NextResponse } from "next/server"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const updatePatternSchema = z
  .object({
    name: z.string().trim().min(1).max(80).optional(),
    description: z.string().trim().max(280).optional(),
    color: z.string().trim().min(1).max(32).optional(),
    archived: z.boolean().optional(),
  })
  .strict()

function toYmd(d: Date) {
  return d.toISOString().split("T")[0]
}

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const pattern = await prisma.pattern.findFirst({
    where: { id: params.id, userId: session.user.id },
    include: { defaultedDays: true },
  })

  if (!pattern) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json({
    pattern: {
      id: pattern.id,
      name: pattern.name,
      description: pattern.description,
      color: pattern.color,
      createdAt: toYmd(pattern.createdAt),
      archived: pattern.archived,
      defaultedDays: pattern.defaultedDays.map((d) => ({ date: d.date, reason: d.reason ?? undefined })),
    },
  })
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = updatePatternSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 })

  const updated = await prisma.pattern.updateMany({
    where: { id: params.id, userId: session.user.id },
    data: parsed.data,
  })

  if (updated.count === 0) return NextResponse.json({ error: "Not found" }, { status: 404 })

  const pattern = await prisma.pattern.findFirst({
    where: { id: params.id, userId: session.user.id },
    include: { defaultedDays: true },
  })

  if (!pattern) return NextResponse.json({ error: "Not found" }, { status: 404 })

  return NextResponse.json({
    pattern: {
      id: pattern.id,
      name: pattern.name,
      description: pattern.description,
      color: pattern.color,
      createdAt: toYmd(pattern.createdAt),
      archived: pattern.archived,
      defaultedDays: pattern.defaultedDays.map((d) => ({ date: d.date, reason: d.reason ?? undefined })),
    },
  })
}


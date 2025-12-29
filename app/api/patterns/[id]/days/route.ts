import { NextResponse } from "next/server"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

const upsertSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reason: z.string().trim().max(280).optional(),
})

const deleteSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
})

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = upsertSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 })

  const pattern = await prisma.pattern.findFirst({
    where: { id: params.id, userId: session.user.id },
    select: { id: true },
  })
  if (!pattern) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await prisma.defaultedDay.upsert({
    where: { patternId_date: { patternId: params.id, date: parsed.data.date } },
    update: { reason: parsed.data.reason ?? null },
    create: { patternId: params.id, date: parsed.data.date, reason: parsed.data.reason ?? null },
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = deleteSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 })

  const pattern = await prisma.pattern.findFirst({
    where: { id: params.id, userId: session.user.id },
    select: { id: true },
  })
  if (!pattern) return NextResponse.json({ error: "Not found" }, { status: 404 })

  await prisma.defaultedDay.deleteMany({
    where: { patternId: params.id, date: parsed.data.date },
  })

  return NextResponse.json({ ok: true })
}


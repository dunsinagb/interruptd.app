import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().trim().min(1).max(100).optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = signupSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid signup payload" }, { status: 400 })
    }

    const email = parsed.data.email.toLowerCase()
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12)

    const user = await prisma.user.create({
      data: {
        email,
        name: parsed.data.name,
        passwordHash,
        subscription: {
          create: {
            plan: "FREE",
            status: "ACTIVE",
          },
        },
        patterns: {
          create: [
            {
              name: "Social Media Scrolling",
              description: "Mindless browsing on social platforms",
              color: "rose",
            },
            {
              name: "Junk Food",
              description: "Eating processed or unhealthy snacks",
              color: "orange",
            },
            {
              name: "Late Night Screen Time",
              description: "Using devices before bed",
              color: "violet",
            },
          ],
        },
      },
      select: { id: true, email: true },
    })

    return NextResponse.json({ user })
  } catch (err) {
    console.error("[auth/signup] error", err)
    return NextResponse.json({ error: "Failed to sign up" }, { status: 500 })
  }
}


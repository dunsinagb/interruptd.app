import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const sub = await prisma.subscription.findUnique({
    where: { userId: session.user.id },
  })

  const plan = sub?.plan ?? "FREE"

  return NextResponse.json({
    plan,
    status: sub?.status ?? "ACTIVE",
    limits: {
      maxActiveDefaults: plan === "PRO" ? null : 3,
    },
  })
}


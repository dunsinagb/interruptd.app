import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (!stripe) return NextResponse.json({ error: "Stripe is not configured" }, { status: 501 })

  const sub = await prisma.subscription.findUnique({ where: { userId: session.user.id } })
  if (!sub?.stripeCustomerId) return NextResponse.json({ error: "No Stripe customer found" }, { status: 404 })

  const origin = headers().get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3000"

  const portal = await stripe.billingPortal.sessions.create({
    customer: sub.stripeCustomerId,
    return_url: `${origin}/dashboard/subscription`,
  })

  return NextResponse.json({ url: portal.url })
}


import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { z } from "zod"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"

const schema = z.object({
  plan: z.enum(["monthly", "yearly"]),
})

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || !session.user.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  if (!stripe) return NextResponse.json({ error: "Stripe is not configured" }, { status: 501 })

  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid payload" }, { status: 400 })

  const priceId =
    parsed.data.plan === "monthly" ? process.env.STRIPE_PRICE_ID_PRO_MONTHLY : process.env.STRIPE_PRICE_ID_PRO_YEARLY

  if (!priceId) return NextResponse.json({ error: "Missing Stripe price id env vars" }, { status: 500 })

  const sub = await prisma.subscription.findUnique({ where: { userId: session.user.id } })

  let customerId = sub?.stripeCustomerId ?? null
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: session.user.email,
      metadata: { userId: session.user.id },
    })
    customerId = customer.id
    await prisma.subscription.upsert({
      where: { userId: session.user.id },
      create: { userId: session.user.id, stripeCustomerId: customerId },
      update: { stripeCustomerId: customerId },
    })
  }

  const origin = headers().get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3000"

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    success_url: `${origin}/dashboard/subscription?success=1`,
    cancel_url: `${origin}/dashboard/subscription?canceled=1`,
  })

  return NextResponse.json({ url: checkout.url })
}


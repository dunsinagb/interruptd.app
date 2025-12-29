import { NextResponse } from "next/server"
import { headers } from "next/headers"
import type Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { stripe } from "@/lib/stripe"

function mapStatus(status: Stripe.Subscription.Status) {
  switch (status) {
    case "active":
      return "ACTIVE" as const
    case "trialing":
      return "TRIALING" as const
    case "past_due":
      return "PAST_DUE" as const
    case "canceled":
      return "CANCELED" as const
    default:
      return "INCOMPLETE" as const
  }
}

function planForStatus(status: Stripe.Subscription.Status) {
  return status === "active" || status === "trialing" ? ("PRO" as const) : ("FREE" as const)
}

export async function POST(req: Request) {
  if (!stripe) return NextResponse.json({ error: "Stripe is not configured" }, { status: 501 })

  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) return NextResponse.json({ error: "Missing STRIPE_WEBHOOK_SECRET" }, { status: 500 })

  const sig = headers().get("stripe-signature")
  if (!sig) return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })

  const payload = await req.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret)
  } catch (err) {
    console.error("[stripe/webhook] signature verification failed", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription
        const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id

        const record = await prisma.subscription.findFirst({
          where: { stripeCustomerId: customerId },
        })
        if (!record) break

        await prisma.subscription.update({
          where: { userId: record.userId },
          data: {
            stripeSubscriptionId: sub.id,
            status: mapStatus(sub.status),
            plan: planForStatus(sub.status),
            currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
          },
        })
        break
      }
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const customerId = typeof session.customer === "string" ? session.customer : session.customer?.id
        const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id

        if (!customerId) break

        const record = await prisma.subscription.findFirst({
          where: { stripeCustomerId: customerId },
        })
        if (!record) break

        await prisma.subscription.update({
          where: { userId: record.userId },
          data: {
            stripeSubscriptionId: subscriptionId ?? record.stripeSubscriptionId,
            plan: "PRO",
            status: "ACTIVE",
          },
        })
        break
      }
      default:
        break
    }
  } catch (err) {
    console.error("[stripe/webhook] handler failed", err)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}


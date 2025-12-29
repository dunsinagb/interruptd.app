"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"

export default function SignInPage() {
  const [callbackUrl, setCallbackUrl] = useState("/dashboard")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url = new URL(window.location.href)
    const cb = url.searchParams.get("callbackUrl")
    if (cb) setCallbackUrl(cb)
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const res = await signIn("credentials", {
      email,
      password,
      callbackUrl,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      setError("Invalid email or password")
      return
    }

    if (res?.url) {
      window.location.href = res.url
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md glass border-white/10">
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col items-center gap-3">
            <Logo size="md" />
            <div className="text-center">
              <h1 className="text-xl font-bold text-foreground">Sign in</h1>
              <p className="text-sm text-muted-foreground">Access your dashboard</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="text-sm text-muted-foreground text-center">
            Don’t have an account?{" "}
            <Link href="/auth/signup" className="text-primary hover:underline">
              Create one
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}


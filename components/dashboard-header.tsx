"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { MenuSheet } from "@/components/menu-sheet"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"

export function DashboardHeader() {
  const pathname = usePathname()
  const router = useRouter()

  const isSubPage = pathname !== "/dashboard" && pathname.startsWith("/dashboard")

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 glass border-b border-white/5"
    >
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        {isSubPage ? (
          <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")} className="hover:bg-white/10">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        ) : (
          <Link href="/dashboard">
            <Logo size="md" />
          </Link>
        )}

        {isSubPage && (
          <Link href="/dashboard">
            <Logo size="sm" />
          </Link>
        )}

        <MenuSheet notificationCount={3} />
      </div>
    </motion.header>
  )
}

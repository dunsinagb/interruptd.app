import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { PartnersContent } from "@/components/features/partners-content"

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]">Loading...</div>}>
        <PartnersContent />
      </Suspense>
    </main>
  )
}

import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TriggersContent } from "@/components/features/triggers-content"

export default function TriggersPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]">Loading...</div>}>
        <TriggersContent />
      </Suspense>
    </main>
  )
}

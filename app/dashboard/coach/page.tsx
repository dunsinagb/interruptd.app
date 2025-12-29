import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { CoachContent } from "@/components/features/coach-content"

export default function CoachPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]">Loading...</div>}>
        <CoachContent />
      </Suspense>
    </main>
  )
}

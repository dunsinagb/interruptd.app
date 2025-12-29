import { Suspense } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { ComparisonContent } from "@/components/features/comparison-content"

export default function ComparisonPage() {
  return (
    <main className="min-h-screen bg-background">
      <DashboardHeader />
      <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]">Loading...</div>}>
        <ComparisonContent />
      </Suspense>
    </main>
  )
}

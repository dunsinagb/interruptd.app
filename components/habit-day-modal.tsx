"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { type DefaultedDay, getHabitColor } from "@/lib/habit-data"
import { formatDate } from "@/lib/date-utils"
import { cn } from "@/lib/utils"
import { Check, Undo2 } from "lucide-react"

interface HabitDayModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  date: string
  entry?: DefaultedDay
  onSave: (date: string, reason?: string) => void
  onClear: (date: string) => void
  color: string
}

const quickReasons = [
  "Conscious choice",
  "Changed environment",
  "Noticed the pattern",
  "Had support",
  "Pre-planned alternative",
  "Just didn't happen",
  "Self-care day",
  "Special occasion",
]

export function HabitDayModal({ open, onOpenChange, date, entry, onSave, onClear, color }: HabitDayModalProps) {
  const [reason, setReason] = useState("")
  const colors = getHabitColor(color)
  const isAlreadyDefaulted = !!entry

  useEffect(() => {
    if (entry) {
      setReason(entry.reason || "")
    } else {
      setReason("")
    }
  }, [entry, open])

  const handleMarkDefaulted = () => {
    onSave(date, reason.trim() || undefined)
    onOpenChange(false)
  }

  const handleUndo = () => {
    onClear(date)
    onOpenChange(false)
  }

  const handleQuickReason = (r: string) => {
    setReason(r)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="text-muted-foreground text-sm font-normal block mb-1">Today</span>
            {formatDate(date)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {isAlreadyDefaulted ? (
            <div className="space-y-4">
              <div className={cn("p-4 rounded-xl text-center", colors.bg)}>
                <Check className="w-8 h-8 text-white mx-auto mb-2" />
                <p className="text-white font-semibold">Pattern Interrupted</p>
                {entry?.reason && <p className="text-white/80 text-sm mt-1">"{entry.reason}"</p>}
              </div>

              <p className="text-sm text-muted-foreground text-center">
                You interrupted your automatic behavior. No judgment, just observation.
              </p>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
                  Close
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent"
                  onClick={handleUndo}
                >
                  <Undo2 className="w-4 h-4 mr-2" />
                  Undo
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-muted text-center">
                <p className="text-foreground font-medium">Automatic behavior assumed</p>
                <p className="text-muted-foreground text-sm mt-1">Did you interrupt this pattern today?</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-foreground">Why was the pattern interrupted? (optional)</p>
                <div className="flex flex-wrap gap-2">
                  {quickReasons.map((r) => (
                    <button
                      key={r}
                      onClick={() => handleQuickReason(r)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                        reason === r ? `${colors.bg} text-white` : "bg-muted text-muted-foreground hover:bg-muted/80",
                      )}
                    >
                      {r}
                    </button>
                  ))}
                </div>

                <Textarea
                  placeholder="Or write your own reason..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={2}
                  className="text-base resize-none"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button className={cn("flex-1", colors.bg, "hover:opacity-90")} onClick={handleMarkDefaulted}>
                  <Check className="w-4 h-4 mr-2" />
                  Mark Interrupted
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

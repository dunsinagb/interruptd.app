"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Sparkles, X } from "lucide-react"

interface DayEntry {
  defaulted: boolean
  reason?: string
}

interface DayModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dayNumber: number
  date: string
  entry: DayEntry | undefined
  onSave: (dayNumber: number, entry: DayEntry) => void
  onClear: (dayNumber: number) => void
}

const QUICK_REASONS = [
  "Needed a mental break",
  "Social event",
  "Travel",
  "Feeling unwell",
  "Self-care day",
  "Special occasion",
]

export function DayModal({ open, onOpenChange, dayNumber, date, entry, onSave, onClear }: DayModalProps) {
  const [reason, setReason] = useState("")
  const isDefaulted = entry?.defaulted ?? false

  useEffect(() => {
    if (open) {
      setReason(entry?.reason || "")
    }
  }, [open, entry])

  const handleMarkDefaulted = () => {
    onSave(dayNumber, { defaulted: true, reason: reason.trim() || undefined })
    onOpenChange(false)
  }

  const handleMarkNorm = () => {
    onClear(dayNumber)
    onOpenChange(false)
  }

  const handleQuickReason = (quickReason: string) => {
    setReason(quickReason)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-primary" />
            Day {dayNumber}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">{date}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {isDefaulted ? (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Currently marked as Defaulted</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted border border-border">
              <span className="text-sm text-muted-foreground">Currently following the norm</span>
            </div>
          )}

          <div className="space-y-3">
            <Label htmlFor="reason" className="text-sm font-medium">
              Reason for defaulting (optional)
            </Label>
            <Textarea
              id="reason"
              placeholder="Why did you deviate from your norm today?"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[80px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Quick select</Label>
            <div className="flex flex-wrap gap-2">
              {QUICK_REASONS.map((quickReason) => (
                <Badge
                  key={quickReason}
                  variant={reason === quickReason ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() => handleQuickReason(quickReason)}
                >
                  {quickReason}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {isDefaulted ? (
            <>
              <Button variant="outline" onClick={handleMarkNorm} className="w-full sm:w-auto bg-transparent">
                <X className="w-4 h-4 mr-2" />
                Back to Norm
              </Button>
              <Button onClick={handleMarkDefaulted} className="w-full sm:w-auto bg-primary text-primary-foreground">
                <Sparkles className="w-4 h-4 mr-2" />
                Update Reason
              </Button>
            </>
          ) : (
            <Button onClick={handleMarkDefaulted} className="w-full bg-primary text-primary-foreground">
              <Sparkles className="w-4 h-4 mr-2" />
              Mark as Defaulted
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

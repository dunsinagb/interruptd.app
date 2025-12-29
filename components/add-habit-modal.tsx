"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { type Habit, getHabitColor } from "@/lib/habit-data"
import { cn } from "@/lib/utils"

interface AddHabitModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (habit: Omit<Habit, "id" | "createdAt" | "defaultedDays">) => void
}

const colorOptions = ["violet", "emerald", "amber", "rose", "sky", "orange"]

export function AddHabitModal({ open, onOpenChange, onAdd }: AddHabitModalProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [color, setColor] = useState("violet")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    onAdd({
      name: name.trim(),
      description: description.trim(),
      color,
    })

    setName("")
    setDescription("")
    setColor("violet")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-4 rounded-2xl glass-strong border-white/10 p-0 overflow-hidden">
        {/* Header with gradient */}
        <div className="p-6 pb-4 bg-gradient-to-b from-primary/10 to-transparent">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold tracking-tight">Add New Default</DialogTitle>
          </DialogHeader>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-muted-foreground">
              Default Name
            </Label>
            <Input
              id="name"
              placeholder="e.g., Social Media Scrolling"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-base bg-background/50 border-white/10 focus:border-primary/50 h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-muted-foreground">
              Description (optional)
            </Label>
            <Textarea
              id="description"
              placeholder="What does this default involve?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="text-base resize-none bg-background/50 border-white/10 focus:border-primary/50"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium text-muted-foreground">Color</Label>
            <div className="flex gap-3">
              {colorOptions.map((c) => {
                const colors = getHabitColor(c)
                return (
                  <motion.button
                    key={c}
                    type="button"
                    onClick={() => setColor(c)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      "w-11 h-11 rounded-xl transition-all",
                      colors.bg,
                      color === c
                        ? "ring-2 ring-offset-2 ring-offset-background ring-foreground scale-110 shadow-lg"
                        : "opacity-60 hover:opacity-100",
                    )}
                    style={
                      color === c
                        ? {
                            boxShadow: `0 8px 24px ${colors.bg.includes("violet") ? "rgba(139,92,246,0.4)" : colors.bg.includes("rose") ? "rgba(244,63,94,0.4)" : "rgba(139,92,246,0.3)"}`,
                          }
                        : {}
                    }
                  />
                )
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 glass border-white/10 hover:bg-white/5 bg-transparent"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary glow-border magnetic-btn"
              disabled={!name.trim()}
            >
              Add Default
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

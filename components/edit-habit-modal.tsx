"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Habit } from "@/lib/habit-data"

interface EditHabitModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  habit: Habit
  onSave: (habit: Habit) => void
}

const colorOptions = [
  { name: "Rose", value: "rose", class: "bg-rose-500" },
  { name: "Orange", value: "orange", class: "bg-orange-500" },
  { name: "Amber", value: "amber", class: "bg-amber-500" },
  { name: "Emerald", value: "emerald", class: "bg-emerald-500" },
  { name: "Sky", value: "sky", class: "bg-sky-500" },
  { name: "Violet", value: "violet", class: "bg-violet-500" },
]

export function EditHabitModal({ open, onOpenChange, habit, onSave }: EditHabitModalProps) {
  const [name, setName] = useState(habit.name)
  const [description, setDescription] = useState(habit.description)
  const [selectedColor, setSelectedColor] = useState(habit.color)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    onSave({
      ...habit,
      name: name.trim(),
      description: description.trim(),
      color: selectedColor,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Default</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Social Media Scrolling"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Input
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What pattern are you observing?"
            />
          </div>

          <div className="space-y-2">
            <Label>Color</Label>
            <div className="grid grid-cols-6 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`h-10 rounded-lg transition-all ${color.class} ${
                    selectedColor === color.value
                      ? "ring-2 ring-foreground ring-offset-2"
                      : "opacity-60 hover:opacity-100"
                  }`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

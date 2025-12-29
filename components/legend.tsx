export function Legend() {
  const items = [
    { color: "bg-muted-foreground/20", label: "Norm" },
    { color: "bg-primary shadow-[0_0_8px_rgba(74,222,128,0.3)]", label: "Defaulted" },
    { color: "bg-secondary/30", label: "Future" },
    { color: "ring-2 ring-foreground bg-muted-foreground/20", label: "Today" },
  ]

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-sm ${item.color}`} />
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

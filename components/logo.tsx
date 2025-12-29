// Reusable logo component with italic "i" icon and "interruptd." text
import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function Logo({ size = "md", showText = true, className }: LogoProps) {
  const sizeClasses = {
    sm: { icon: "w-7 h-7 text-base", text: "text-sm" },
    md: { icon: "w-9 h-9 text-lg", text: "text-lg" },
    lg: { icon: "w-12 h-12 text-2xl", text: "text-2xl" },
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-border font-serif italic font-bold text-white",
          sizeClasses[size].icon,
        )}
      >
        i
      </div>
      {showText && (
        <span className={cn("font-bold text-foreground tracking-tight", sizeClasses[size].text)}>
          interruptd<span className="text-primary">.</span>
        </span>
      )}
    </div>
  )
}

export function LogoIcon({ size = "md", className }: Omit<LogoProps, "showText">) {
  const sizeClasses = {
    sm: "w-7 h-7 text-sm",
    md: "w-9 h-9 text-lg",
    lg: "w-12 h-12 text-2xl",
  }

  return (
    <div
      className={cn(
        "rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-border font-serif italic font-bold text-white",
        sizeClasses[size],
        className,
      )}
    >
      i
    </div>
  )
}

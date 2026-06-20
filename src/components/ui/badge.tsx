import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-terracotta text-white shadow hover:bg-terracotta/80": variant === "default",
          "border-transparent bg-terracotta/10 text-terracotta hover:bg-terracotta/20": variant === "secondary",
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80": variant === "destructive",
          "text-ink border-slate-200": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }

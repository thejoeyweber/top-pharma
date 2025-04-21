import type React from "react"
import { cn } from "@/lib/utils"

interface TimelineProps {
  children: React.ReactNode
  className?: string
}

export function Timeline({ children, className }: TimelineProps) {
  return <div className={cn("space-y-4", className)}>{children}</div>
}

interface TimelineItemProps {
  title: string
  date: string
  description: string
  className?: string
}

export function TimelineItem({ title, date, description, className }: TimelineItemProps) {
  return (
    <div className={cn("relative pl-6 pb-4 pt-2", className)}>
      <div className="absolute left-0 top-2.5 h-3 w-3 rounded-full border-2 border-primary bg-background"></div>
      <div className="absolute left-1.5 top-5 h-full w-px bg-border"></div>
      <div className="font-medium">{title}</div>
      <time className="text-sm text-muted-foreground">{date}</time>
      <p className="mt-1 text-sm">{description}</p>
    </div>
  )
}

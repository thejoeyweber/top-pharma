"use client"

import * as React from "react"
import { cn } from "@workspace/ui/lib/utils"

import { StatCard, type StatCardProps } from "@workspace/ui/components/patterns/stat-card"

export interface StatCardGridProps {
  /**
   * Array of stat card data
   */
  cards: StatCardProps[];
  
  /**
   * CSS class for the container
   */
  className?: string;
  
  /**
   * Gap between cards (default: "gap-4")
   */
  gap?: string;
  
  /**
   * Padding for the container (default: "px-4 lg:px-6")
   */
  padding?: string;
  
  /**
   * Configuration for responsive columns
   */
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export function StatCardGrid({ 
  cards,
  className,
  gap = "gap-4",
  padding = "px-4 lg:px-6",
  columns = { sm: 1, md: 2, lg: 4 }
}: StatCardGridProps) {
  // Build the grid classes based on provided column configuration
  const gridClasses = [
    `grid-cols-${columns.sm || 1}`,
    columns.md && `md:grid-cols-${columns.md}`,
    columns.lg && `lg:grid-cols-${columns.lg}`,
    columns.xl && `xl:grid-cols-${columns.xl}`,
  ].filter(Boolean).join(" ");
  
  return (
    <div className={cn(
      "grid", 
      gridClasses,
      gap,
      padding,
      className
    )}>
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  )
} 
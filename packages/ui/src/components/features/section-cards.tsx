"use client"

import * as React from "react"
import {
  IconBoxSeam,
  IconClock,
  IconTrophy,
  IconUserCheck,
} from "@tabler/icons-react"

import { StatCardGrid } from "../patterns/stat-card-grid.js"
import type { StatCardProps } from "../patterns/stat-card.js"

export interface SectionCardsProps {
  /**
   * Array of stat card data
   */
  cards?: StatCardProps[];
  
  /**
   * Responsive column configuration
   */
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

// Placeholder cards for development and testing
const placeholderCards: StatCardProps[] = [
  {
    title: "[Example] Total Customers",
    value: "0",
    change: {
      value: "+0%",
      direction: "up" as const,
    },
    icon: <IconUserCheck className="size-4" />,
  },
  {
    title: "[Example] Processing Time",
    value: "0 hrs",
    change: {
      value: "0%",
      direction: "neutral" as const,
    },
    icon: <IconClock className="size-4" />,
  },
  {
    title: "[Example] Total Packages",
    value: "0",
    change: {
      value: "0%",
      direction: "neutral" as const,
    },
    icon: <IconBoxSeam className="size-4" />,
  },
  {
    title: "[Example] Active Campaigns",
    value: "0",
    change: {
      value: "0%",
      direction: "neutral" as const,
    },
    icon: <IconTrophy className="size-4" />,
  },
]

export function SectionCards({ 
  cards,
  columns = { sm: 1, md: 2, lg: 4 }
}: SectionCardsProps) {
  if (!cards?.length) {
    return null;
  }

  return (
    <StatCardGrid 
      cards={cards}
      columns={columns}
    />
  )
} 
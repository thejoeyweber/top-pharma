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
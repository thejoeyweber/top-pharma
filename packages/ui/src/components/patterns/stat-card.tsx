"use client"

import * as React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@workspace/ui/components/ui/card"

export interface StatCardProps {
  /**
   * The title or label for the statistic
   */
  title: string;
  
  /**
   * The primary value to display
   */
  value: React.ReactNode;
  
  /**
   * Optional change indicator showing increase/decrease
   */
  change?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
  };
  
  /**
   * Icon to display in the card header
   */
  icon?: React.ReactNode;
  
  /**
   * Additional description text
   */
  description?: string;
  
  /**
   * Optional CSS class names
   */
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  icon, 
  description = "from last month",
  className 
}: StatCardProps) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(change || description) && (
          <p className="text-xs text-muted-foreground">
            {change && (
              <span className={change.direction === 'up' ? 'text-primary' : change.direction === 'down' ? 'text-destructive' : ''}>
                {change.value}
              </span>
            )}
            {description && ' ' + description}
          </p>
        )}
      </CardContent>
    </Card>
  )
} 
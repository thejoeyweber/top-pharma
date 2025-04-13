import React from "react"
import { AppSidebar } from "@workspace/ui/components/patterns/app-sidebar"
import { SidebarInset, SidebarProvider } from "@workspace/ui/components/ui/sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar appName="Top Pharma" />
      <SidebarInset>
        {/* @PLACEHOLDER - Header will be implemented later */}
        <header className="h-16 border-b border-border/40">
          {/* Header content will go here */}
        </header>
        <main className="flex-1">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

"use client"

import * as React from "react"

import { useIsMobile } from "@workspace/ui/hooks/use-mobile"
import { cn } from "@workspace/ui/lib/utils"
import {
  SidebarTrigger,
  SidebarOverlayTrigger,
  useSidebar,
} from "@workspace/ui/components/ui/sidebar"

export function SiteHeader() {
  const isMobile = useIsMobile()
  const sidebar = useSidebar()

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b bg-background px-6">
      <div className="flex h-16 items-center">
        <div>
          <SidebarTrigger className={cn(!isMobile && "hidden")} />
          <SidebarOverlayTrigger
            className={cn("ml-2", !sidebar.isOpen || !isMobile && "hidden")}
          />
        </div>
      </div>
    </header>
  )
} 
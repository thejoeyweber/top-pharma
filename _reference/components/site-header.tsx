"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { NotificationsPopover } from "@/components/notifications-popover"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { EnhancedSearch } from "@/components/enhanced-search"

export function SiteHeader({ showSidebarTrigger = true }: { showSidebarTrigger?: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname?.startsWith(path)
  }

  const mainNavItems = [
    { name: "Home", href: "/" },
    { name: "Companies", href: "/companies" },
    { name: "Products", href: "/products" },
    { name: "Therapeutic Areas", href: "/therapeutic-areas" },
    { name: "Reports", href: "/reports" },
  ]

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center max-w-screen-xl mx-auto">
        {showSidebarTrigger && (
          <div className="mr-2">
            <SidebarTrigger />
          </div>
        )}
        <div className="mr-4 flex">{/* Spacer for layout balance */}</div>
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(item.href) ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <EnhancedSearch />
          </div>
          <NotificationsPopover />
          <ThemeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pr-0">
              <div className="flex flex-col space-y-4 py-4">
                <div className="flex items-center justify-between px-4">
                  <span className="font-bold text-lg">Menu</span>
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <div className="px-4">
                  <Input placeholder="Search..." className="w-full" />
                </div>
                <nav className="flex flex-col space-y-1">
                  {mainNavItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "px-4 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                        isActive(item.href) ? "bg-accent text-accent-foreground" : "text-foreground",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

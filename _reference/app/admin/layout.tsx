import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import {
  LayoutDashboardIcon,
  UsersIcon,
  Building2Icon,
  FlaskConicalIcon,
  GlobeIcon,
  StethoscopeIcon,
  ShieldAlertIcon,
  SettingsIcon,
  DatabaseIcon,
  LineChartIcon,
  BellIcon,
  AlertTriangleIcon,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Admin Dashboard - Top Pharma",
  description: "Admin dashboard for Top Pharma directory",
}

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Custom Admin Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/admin/dashboard" className="flex items-center space-x-2">
              <ShieldAlertIcon className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">Admin Portal</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                Exit Admin
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Admin Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <div className="flex flex-col space-y-6 py-4">
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
              <div className="space-y-1">
                <Link href="/admin/dashboard">
                  <Button variant="ghost" className="w-full justify-start">
                    <LayoutDashboardIcon className="mr-2 h-4 w-4" />
                    Overview
                  </Button>
                </Link>
                <Link href="/admin/analytics">
                  <Button variant="ghost" className="w-full justify-start">
                    <LineChartIcon className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </Link>
                <Link href="/admin/alerts">
                  <Button variant="ghost" className="w-full justify-start">
                    <AlertTriangleIcon className="mr-2 h-4 w-4" />
                    System Alerts
                  </Button>
                </Link>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Content Management</h2>
              <div className="space-y-1">
                <Link href="/admin/review/companies">
                  <Button variant="ghost" className="w-full justify-start">
                    <Building2Icon className="mr-2 h-4 w-4" />
                    Companies
                  </Button>
                </Link>
                <Link href="/admin/review/products">
                  <Button variant="ghost" className="w-full justify-start">
                    <FlaskConicalIcon className="mr-2 h-4 w-4" />
                    Products
                  </Button>
                </Link>
                <Link href="/admin/review/websites">
                  <Button variant="ghost" className="w-full justify-start">
                    <GlobeIcon className="mr-2 h-4 w-4" />
                    Websites
                  </Button>
                </Link>
                <Link href="/admin/review/therapeutic-areas">
                  <Button variant="ghost" className="w-full justify-start">
                    <StethoscopeIcon className="mr-2 h-4 w-4" />
                    Therapeutic Areas
                  </Button>
                </Link>
              </div>
            </div>
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Administration</h2>
              <div className="space-y-1">
                <Link href="/admin/users">
                  <Button variant="ghost" className="w-full justify-start">
                    <UsersIcon className="mr-2 h-4 w-4" />
                    User Management
                  </Button>
                </Link>
                <Link href="/admin/notifications">
                  <Button variant="ghost" className="w-full justify-start">
                    <BellIcon className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                </Link>
                <Link href="/admin/database">
                  <Button variant="ghost" className="w-full justify-start">
                    <DatabaseIcon className="mr-2 h-4 w-4" />
                    Database
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button variant="ghost" className="w-full justify-start">
                    <SettingsIcon className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

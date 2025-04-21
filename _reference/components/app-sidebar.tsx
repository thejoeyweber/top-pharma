"use client"

import type * as React from "react"
import {
  BarChartIcon,
  Building2Icon,
  FlaskConicalIcon as FlaskIcon,
  GlobeIcon,
  HeartPulseIcon,
  HomeIcon,
  LayoutDashboardIcon,
  LineChartIcon,
  PieChartIcon,
  SearchIcon,
  SettingsIcon,
  StethoscopeIcon,
  UserIcon,
} from "lucide-react"

import { NavDocuments } from "./nav-documents"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "John Smith",
    email: "john@toppharma.com",
    avatar: "/placeholder-user.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: HomeIcon,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Companies",
      url: "/companies",
      icon: Building2Icon,
    },
    {
      title: "Products",
      url: "/products",
      icon: FlaskIcon,
    },
    {
      title: "Websites",
      url: "/websites",
      icon: GlobeIcon,
    },
    {
      title: "Therapeutic Areas",
      url: "/therapeutic-areas",
      icon: StethoscopeIcon,
    },
    {
      title: "Reports",
      url: "/reports",
      icon: PieChartIcon,
    },
  ],
  navInsights: [
    {
      title: "Market Overview",
      icon: PieChartIcon,
      url: "/reports/market-overview",
    },
    {
      title: "Pipeline Analysis",
      icon: BarChartIcon,
      url: "/reports/pipeline-analysis",
    },
    {
      title: "Financial Trends",
      icon: LineChartIcon,
      url: "/reports/financial-trends",
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: UserIcon,
    },
    {
      title: "Search",
      url: "/search",
      icon: SearchIcon,
    },
  ],
  documents: [
    {
      name: "Following",
      url: "/following",
      icon: HeartPulseIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="/">
                <Building2Icon className="h-5 w-5 text-primary" />
                <span className="text-base font-semibold">Top Pharma</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

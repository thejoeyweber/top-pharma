"use client"

import * as React from "react"
import { IconInnerShadowTop } from "@tabler/icons-react"
import type { Icon as TablerIcon } from "@tabler/icons-react"

import { NavDocuments } from "@workspace/ui/components/elements/nav/nav-documents"
import { NavMain } from "@workspace/ui/components/elements/nav/nav-main"
import { NavSecondary } from "@workspace/ui/components/elements/nav/nav-secondary"
import { NavUser } from "@workspace/ui/components/elements/nav/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/ui/sidebar"

export interface UserInfo {
  /**
   * User's display name
   */
  name: string;
  
  /**
   * User's email address
   */
  email: string;
  
  /**
   * URL to user's avatar image
   */
  avatar: string;
}

export interface MenuItem {
  /**
   * Menu item title
   */
  title: string;
  
  /**
   * URL the menu item should link to
   */
  url: string;
  
  /**
   * Icon to display with the menu item
   */
  icon: TablerIcon;
  
  /**
   * Whether this item is currently active
   */
  isActive?: boolean;
  
  /**
   * Sub-items for nested navigation
   */
  items?: Array<Omit<MenuItem, 'icon' | 'items'>>;
}

export interface DocumentItem {
  /**
   * Document name
   */
  name: string;
  
  /**
   * URL the document links to
   */
  url: string;
  
  /**
   * Icon to display with the document
   */
  icon: TablerIcon;
}

export interface AppSidebarProps extends Omit<React.ComponentProps<typeof Sidebar>, 'children'> {
  /**
   * Logo element to display in header
   */
  logo?: React.ReactNode;
  
  /**
   * Organization or app name
   */
  appName?: string;
  
  /**
   * Logo URL or href
   */
  logoUrl?: string;
  
  /**
   * User information for the profile section
   */
  user?: UserInfo;
  
  /**
   * Main navigation items
   */
  mainNavItems?: MenuItem[];
  
  /**
   * Document navigation items
   */
  documentItems?: DocumentItem[];
  
  /**
   * Secondary (bottom) navigation items
   */
  secondaryNavItems?: MenuItem[];
  
  /**
   * Collapse type for the sidebar
   */
  collapsible?: "offcanvas" | "icon" | "none";
}

export function AppSidebar({ 
  logo,
  appName = "App Name",
  logoUrl = "#",
  user,
  mainNavItems = [],
  documentItems = [],
  secondaryNavItems = [],
  collapsible = "offcanvas",
  ...props 
}: AppSidebarProps) {
  return (
    <Sidebar collapsible={collapsible} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href={logoUrl}>
                {logo || <IconInnerShadowTop className="!size-5" />}
                <span className="text-base font-semibold">{appName}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {mainNavItems.length > 0 && (
          <NavMain items={mainNavItems} />
        )}
        
        {documentItems.length > 0 && (
          <NavDocuments items={documentItems} />
        )}
        
        {secondaryNavItems.length > 0 && (
          <NavSecondary items={secondaryNavItems} className="mt-auto" />
        )}
      </SidebarContent>
      
      {user && (
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      )}
    </Sidebar>
  )
} 
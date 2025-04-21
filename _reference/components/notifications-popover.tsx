"use client"

import * as React from "react"
import { Bell, Check, Clock, FileText, Pill, Building, Activity, X } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface Notification {
  id: string
  title: string
  description: string
  time: Date
  read: boolean
  type: "company" | "product" | "report" | "alert" | "system"
  action?: string
  actionUrl?: string
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Pfizer Quarterly Results",
    description: "Pfizer has released their Q1 2023 financial results, exceeding analyst expectations.",
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
    type: "company",
    action: "View Report",
    actionUrl: "/companies/pfizer/financials",
  },
  {
    id: "2",
    title: "New Product Approval",
    description: "FDA has approved Novartis' new treatment for multiple sclerosis.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    read: false,
    type: "product",
    action: "View Details",
    actionUrl: "/products/novartis-ms-treatment",
  },
  {
    id: "3",
    title: "Market Report Updated",
    description: "The Oncology Market Overview report has been updated with the latest data.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    read: true,
    type: "report",
    action: "Read Report",
    actionUrl: "/reports/oncology-market-overview",
  },
  {
    id: "4",
    title: "Price Alert: Keytruda",
    description: "Merck has announced a 5% price increase for Keytruda effective next month.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
    type: "alert",
    action: "View Alert",
    actionUrl: "/products/keytruda/pricing",
  },
  {
    id: "5",
    title: "System Maintenance",
    description:
      "The system will undergo scheduled maintenance this weekend. Some features may be temporarily unavailable.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    read: true,
    type: "system",
  },
]

export function NotificationsPopover() {
  const [open, setOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("all")
  const [notificationState, setNotificationState] = React.useState(notifications)

  const unreadCount = notificationState.filter((notification) => !notification.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "company":
        return <Building className="h-4 w-4" />
      case "product":
        return <Pill className="h-4 w-4" />
      case "report":
        return <FileText className="h-4 w-4" />
      case "alert":
        return <Activity className="h-4 w-4" />
      case "system":
        return <Clock className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const markAsRead = (id: string) => {
    setNotificationState((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationState((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotificationState((prev) => prev.filter((notification) => notification.id !== id))
  }

  const filteredNotifications = React.useMemo(() => {
    if (activeTab === "all") return notificationState
    if (activeTab === "unread") return notificationState.filter((n) => !n.read)
    return notificationState
  }, [activeTab, notificationState])

  const renderNotificationList = () => {
    if (filteredNotifications.length === 0) {
      return (
        <div className="flex h-[150px] items-center justify-center text-center">
          <div className="space-y-1">
            <Bell className="mx-auto h-6 w-6 text-muted-foreground" />
            <div className="text-sm font-medium">No notifications</div>
            <div className="text-xs text-muted-foreground">
              {activeTab === "all"
                ? "You don't have any notifications yet."
                : "You don't have any unread notifications."}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="max-h-[300px] overflow-y-auto">
        {filteredNotifications.map((notification) => (
          <div key={notification.id} className={cn("flex gap-3 p-4", !notification.read && "bg-muted/50")}>
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border",
                !notification.read && "text-primary",
              )}
            >
              {getNotificationIcon(notification.type)}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-start justify-between gap-2">
                <div className={cn("text-sm font-medium", !notification.read && "text-foreground")}>
                  {notification.title}
                </div>
                <div className="flex items-center gap-2">
                  {!notification.read && (
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => markAsRead(notification.id)}>
                      <Check className="h-3 w-3" />
                      <span className="sr-only">Mark as read</span>
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">{notification.description}</div>
              <div className="flex items-center justify-between pt-1">
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(notification.time, { addSuffix: true })}
                </div>
                {notification.action && (
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                    <a href={notification.actionUrl}>{notification.action}</a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="font-semibold">Notifications</div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="border-b">
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="all"
                className={cn(
                  "rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                )}
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="unread"
                className={cn(
                  "rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none",
                )}
              >
                Unread
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-1.5">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all">{renderNotificationList()}</TabsContent>
          <TabsContent value="unread">{renderNotificationList()}</TabsContent>
        </Tabs>
        <Separator />
        <div className="p-4 text-center text-sm">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href="/notifications">View all notifications</a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

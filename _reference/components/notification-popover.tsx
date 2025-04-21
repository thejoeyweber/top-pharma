"use client"

import { useState } from "react"
import { BellIcon, CheckIcon, ClockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

type Notification = {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "info" | "update" | "alert"
}

export function NotificationPopover() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Product Added",
      description: "Pfizer has added a new product: XDR-101",
      time: "5 minutes ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Company Update",
      description: "Novartis updated their financial information",
      time: "1 hour ago",
      read: false,
      type: "update",
    },
    {
      id: "3",
      title: "Merger Announcement",
      description: "AstraZeneca announces merger with BioTech Inc.",
      time: "3 hours ago",
      read: false,
      type: "alert",
    },
    {
      id: "4",
      title: "Product Approval",
      description: "FDA approves Merck's new cancer treatment",
      time: "Yesterday",
      read: true,
      type: "info",
    },
    {
      id: "5",
      title: "Website Update",
      description: "Pfizer.com has been updated with new content",
      time: "2 days ago",
      read: true,
      type: "update",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BellIcon className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[380px] p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Tabs defaultValue="all">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="read">Read</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <NotificationList notifications={notifications} markAsRead={markAsRead} />
          </TabsContent>
          <TabsContent value="unread">
            <NotificationList notifications={notifications.filter((n) => !n.read)} markAsRead={markAsRead} />
          </TabsContent>
          <TabsContent value="read">
            <NotificationList notifications={notifications.filter((n) => n.read)} markAsRead={markAsRead} />
          </TabsContent>
        </Tabs>
        <div className="p-4 text-center border-t">
          <Button variant="ghost" size="sm" asChild>
            <a href="/notifications">View all notifications</a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

function NotificationList({
  notifications,
  markAsRead,
}: {
  notifications: Notification[]
  markAsRead: (id: string) => void
}) {
  if (notifications.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No notifications to display</div>
  }

  return (
    <ScrollArea className="h-[300px]">
      <div className="p-4 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex gap-4 rounded-lg p-2 transition-colors ${notification.read ? "bg-background" : "bg-muted"}`}
            onClick={() => markAsRead(notification.id)}
          >
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                notification.type === "info"
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200"
                  : notification.type === "update"
                    ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200"
                    : "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-200"
              }`}
            >
              {notification.type === "info" && <BellIcon className="h-4 w-4" />}
              {notification.type === "update" && <CheckIcon className="h-4 w-4" />}
              {notification.type === "alert" && <ClockIcon className="h-4 w-4" />}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{notification.title}</p>
              <p className="text-sm text-muted-foreground">{notification.description}</p>
              <p className="text-xs text-muted-foreground">{notification.time}</p>
            </div>
            {!notification.read && (
              <div className="ml-auto flex h-2 w-2 shrink-0 items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-primary"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

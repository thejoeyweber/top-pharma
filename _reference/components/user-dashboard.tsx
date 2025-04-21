"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Bell,
  BookmarkIcon,
  Building,
  Calendar,
  ChevronRight,
  Clock,
  Eye,
  FileText,
  Pill,
  Settings,
  Star,
  TrendingUp,
} from "lucide-react"

interface SavedItem {
  id: string
  title: string
  type: "company" | "product" | "therapeutic" | "report" | "website"
  url: string
  date: string
  icon: React.ReactNode
}

interface RecentActivity {
  id: string
  action: string
  item: string
  itemType: string
  url: string
  date: string
  icon: React.ReactNode
}

interface Alert {
  id: string
  title: string
  description: string
  date: string
  isNew: boolean
  priority: "high" | "medium" | "low"
  url: string
}

const savedItems: SavedItem[] = [
  {
    id: "1",
    title: "Pfizer Inc.",
    type: "company",
    url: "/companies/pfizer",
    date: "2023-04-15T10:30:00.000Z",
    icon: <Building className="h-4 w-4" />,
  },
  {
    id: "2",
    title: "Keytruda",
    type: "product",
    url: "/products/keytruda",
    date: "2023-04-14T15:45:00.000Z",
    icon: <Pill className="h-4 w-4" />,
  },
  {
    id: "3",
    title: "Oncology Market Trends 2023",
    type: "report",
    url: "/reports/oncology-market-trends-2023",
    date: "2023-04-12T09:15:00.000Z",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "4",
    title: "Novartis AG",
    type: "company",
    url: "/companies/novartis",
    date: "2023-04-10T14:20:00.000Z",
    icon: <Building className="h-4 w-4" />,
  },
  {
    id: "5",
    title: "BIO International Convention 2023",
    type: "report",
    url: "/reports/bio-international-2023",
    date: "2023-04-08T11:10:00.000Z",
    icon: <Calendar className="h-4 w-4" />,
  },
]

const recentActivity: RecentActivity[] = [
  {
    id: "1",
    action: "Viewed",
    item: "Pfizer Inc.",
    itemType: "company",
    url: "/companies/pfizer",
    date: "2023-04-15T16:30:00.000Z",
    icon: <Eye className="h-4 w-4" />,
  },
  {
    id: "2",
    action: "Saved",
    item: "Keytruda",
    itemType: "product",
    url: "/products/keytruda",
    date: "2023-04-15T15:45:00.000Z",
    icon: <BookmarkIcon className="h-4 w-4" />,
  },
  {
    id: "3",
    action: "Viewed",
    item: "Oncology Market Trends 2023",
    itemType: "report",
    url: "/reports/oncology-market-trends-2023",
    date: "2023-04-15T14:15:00.000Z",
    icon: <Eye className="h-4 w-4" />,
  },
  {
    id: "4",
    action: "Followed",
    item: "Novartis AG",
    itemType: "company",
    url: "/companies/novartis",
    date: "2023-04-15T11:20:00.000Z",
    icon: <Star className="h-4 w-4" />,
  },
  {
    id: "5",
    action: "Viewed",
    item: "Diabetes",
    itemType: "therapeutic area",
    url: "/therapeutic-areas/diabetes",
    date: "2023-04-15T10:10:00.000Z",
    icon: <Eye className="h-4 w-4" />,
  },
]

const alerts: Alert[] = [
  {
    id: "1",
    title: "Pfizer Quarterly Results Released",
    description: "Q1 2023 financial results now available with 5% revenue growth",
    date: "2023-04-15T09:30:00.000Z",
    isNew: true,
    priority: "high",
    url: "/companies/pfizer/financials",
  },
  {
    id: "2",
    title: "FDA Approves New Indication for Keytruda",
    description: "Merck's Keytruda approved for additional cancer indication",
    date: "2023-04-14T14:45:00.000Z",
    isNew: true,
    priority: "high",
    url: "/products/keytruda/regulatory",
  },
  {
    id: "3",
    title: "New Market Report Available",
    description: "Oncology Market Trends 2023 report has been published",
    date: "2023-04-12T10:15:00.000Z",
    isNew: false,
    priority: "medium",
    url: "/reports/oncology-market-trends-2023",
  },
  {
    id: "4",
    title: "Price Change Alert: Ozempic",
    description: "Novo Nordisk announces 3% price increase for Ozempic",
    date: "2023-04-10T15:30:00.000Z",
    isNew: false,
    priority: "medium",
    url: "/products/ozempic/pricing",
  },
  {
    id: "5",
    title: "Upcoming Maintenance",
    description: "Scheduled maintenance on April 20, 2023 from 2-4 AM EST",
    date: "2023-04-08T11:45:00.000Z",
    isNew: false,
    priority: "low",
    url: "/notifications",
  },
]

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.round(diffMs / 60000)
    const diffHours = Math.round(diffMs / 3600000)
    const diffDays = Math.round(diffMs / 86400000)

    if (diffMins < 60) {
      return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0 pt-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Dashboard</CardTitle>
            <CardDescription>Welcome back! Here's what's happening in your pharma directory.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Customize</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-0 pb-0">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="saved">Saved Items</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Saved Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{savedItems.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {
                      savedItems.filter((item) => new Date(item.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                        .length
                    }{" "}
                    new this week
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="w-full justify-between" asChild>
                    <Link href="/saved">
                      View all saved items
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{recentActivity.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {
                      recentActivity.filter((item) => new Date(item.date) > new Date(Date.now() - 24 * 60 * 60 * 1000))
                        .length
                    }{" "}
                    in the last 24 hours
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="w-full justify-between" asChild>
                    <Link href="/activity">
                      View all activity
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{alerts.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {alerts.filter((alert) => alert.isNew).length} unread alerts
                  </p>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="ghost" size="sm" className="w-full justify-between" asChild>
                    <Link href="/alerts">
                      View all alerts
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[300px] overflow-auto">
                  <div className="space-y-4">
                    {recentActivity.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          {activity.icon}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {activity.action}{" "}
                            <Link href={activity.url} className="text-primary hover:underline">
                              {activity.item}
                            </Link>
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {formatDate(activity.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("activity")}>
                    View all activity
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Latest Alerts</CardTitle>
                </CardHeader>
                <CardContent className="max-h-[300px] overflow-auto">
                  <div className="space-y-4">
                    {alerts
                      .filter((alert) => alert.isNew)
                      .map((alert) => (
                        <div key={alert.id} className="flex items-start gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <Bell className="h-4 w-4" />
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium leading-none">{alert.title}</p>
                              <Badge className={`text-xs ${getPriorityColor(alert.priority)}`}>{alert.priority}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{alert.description}</p>
                            <p className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDate(alert.date)}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full" onClick={() => setActiveTab("alerts")}>
                    View all alerts
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Trending in Pharma</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Oncology Market Growth</p>
                      <p className="text-xs text-muted-foreground">
                        The oncology market is projected to grow at 7.5% CAGR through 2028
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto" asChild>
                      <Link href="/reports/oncology-market-trends-2023">View Report</Link>
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">GLP-1 Receptor Agonists</p>
                      <p className="text-xs text-muted-foreground">
                        GLP-1 receptor agonists seeing rapid adoption beyond diabetes treatment
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="ml-auto" asChild>
                      <Link href="/therapeutic-areas/metabolic-disorders">Explore</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {savedItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{item.title.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">{item.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 capitalize">
                            {item.icon}
                            {item.type}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Saved {formatDate(item.date)}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={item.url}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/saved">View all saved items</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        {activity.icon}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">
                          {activity.action}{" "}
                          <Link href={activity.url} className="text-primary hover:underline">
                            {activity.item}
                          </Link>
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="capitalize">{activity.itemType}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(activity.date)}
                          </span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={activity.url}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/activity">View all activity</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-4 p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{alert.title}</p>
                          {alert.isNew && (
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          )}
                          <Badge className={`text-xs ${getPriorityColor(alert.priority)}`}>{alert.priority}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.description}</p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(alert.date)}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={alert.url}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/alerts">View all alerts</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

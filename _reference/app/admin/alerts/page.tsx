import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangleIcon, XCircleIcon, CheckCircleIcon, BellIcon, ClockIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminAlertsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">System Alerts</h1>
        <p className="text-muted-foreground">Monitor and manage system alerts and notifications.</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Information</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="24h">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">
          <BellIcon className="mr-2 h-4 w-4" />
          Configure Notifications
        </Button>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="current">
              Current <Badge className="ml-2 bg-red-500 text-white">3</Badge>
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved <Badge className="ml-2">12</Badge>
            </TabsTrigger>
            <TabsTrigger value="all">All Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <div className="space-y-4">
              <Card className="border-red-200 bg-red-50 dark:bg-red-950/10">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircleIcon className="h-5 w-5 text-red-500" />
                      <CardTitle className="text-base font-medium">Data Enrichment Service Failed</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-red-500 text-white">
                      Critical
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-1 text-red-700 dark:text-red-400">
                      <ClockIcon className="h-3 w-3" />
                      <span>Occurred 2 hours ago</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700 dark:text-red-400">
                    The data enrichment service failed to process 23 records. Manual intervention required.
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button size="sm" variant="outline">
                      Investigate
                    </Button>
                    <Button size="sm">Resolve</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/10">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />
                      <CardTitle className="text-base font-medium">High CPU Usage Detected</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-yellow-500 text-white">
                      Warning
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-1 text-yellow-700 dark:text-yellow-400">
                      <ClockIcon className="h-3 w-3" />
                      <span>Occurred 4 hours ago</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    The database server experienced high CPU usage (85%) for over 10 minutes.
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button size="sm" variant="outline">
                      Investigate
                    </Button>
                    <Button size="sm">Resolve</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950/10">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />
                      <CardTitle className="text-base font-medium">API Rate Limit Warning</CardTitle>
                    </div>
                    <Badge variant="outline" className="bg-yellow-500 text-white">
                      Warning
                    </Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-1 text-yellow-700 dark:text-yellow-400">
                      <ClockIcon className="h-3 w-3" />
                      <span>Occurred 6 hours ago</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    External API rate limit at 80% of daily allocation. Consider throttling requests.
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button size="sm" variant="outline">
                      Investigate
                    </Button>
                    <Button size="sm">Resolve</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resolved">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <CardTitle className="text-base font-medium">Database Backup Completed</CardTitle>
                    </div>
                    <Badge variant="outline">Resolved</Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" />
                      <span>Resolved yesterday at 2:00 AM</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Weekly database backup completed successfully. Size: 42.8 GB
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <CardTitle className="text-base font-medium">Network Connectivity Issue</CardTitle>
                    </div>
                    <Badge variant="outline">Resolved</Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" />
                      <span>Resolved 2 days ago</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Temporary network connectivity issue with the cloud provider has been resolved.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                      <CardTitle className="text-base font-medium">Storage Space Warning</CardTitle>
                    </div>
                    <Badge variant="outline">Resolved</Badge>
                  </div>
                  <CardDescription>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" />
                      <span>Resolved 3 days ago</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Storage space warning resolved by increasing disk capacity and cleaning up old logs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All System Alerts</CardTitle>
                <CardDescription>Complete history of system alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">All alerts history will be displayed here</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

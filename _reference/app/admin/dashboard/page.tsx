import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle2Icon,
  AlertTriangleIcon,
  XCircleIcon,
  ArrowUpIcon,
  ServerIcon,
  DatabaseIcon,
  GlobeIcon,
  UsersIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor system status and data processing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                  <span className="font-medium">All Systems Operational</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Last checked: 2 minutes ago</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">247</div>
                <Badge className="bg-green-500 text-white">
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                  12%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">24 more than yesterday</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Database Size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">42.8 GB</div>
                <Badge variant="outline" className="bg-yellow-500 text-white">
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                  8%
                </Badge>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Storage Usage</span>
                  <span>42%</span>
                </div>
                <Progress value={42} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">API Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold">1.2M</div>
                <Badge variant="outline" className="bg-green-500 text-white">
                  <ArrowUpIcon className="mr-1 h-3 w-3" />
                  18%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Last 24 hours</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="data">Data Processing</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Airbyte Status</CardTitle>
                  <CardDescription>Data integration service</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Operational</span>
                    </div>
                    <Badge variant="outline">Last sync: 2h ago</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Sync Progress</span>
                      <span>100%</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">n8n Status</CardTitle>
                  <CardDescription>Workflow automation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">Warning</span>
                    </div>
                    <Badge variant="outline">3 workflows failing</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Workflow Health</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Database Status</CardTitle>
                  <CardDescription>PostgreSQL database</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Healthy</span>
                    </div>
                    <Badge variant="outline">CPU: 12%</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Storage Usage</span>
                      <span>42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Record Queue Sizes</CardTitle>
                <CardDescription>Current data processing queue status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Companies</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">12 records</span>
                        <Badge variant="outline" className="bg-green-500 text-white">
                          Healthy
                        </Badge>
                      </div>
                    </div>
                    <Progress value={12} max={100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Products</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">87 records</span>
                        <Badge variant="outline" className="bg-yellow-500 text-white">
                          Warning
                        </Badge>
                      </div>
                    </div>
                    <Progress value={87} max={100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Websites</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">23 records</span>
                        <Badge variant="outline" className="bg-green-500 text-white">
                          Healthy
                        </Badge>
                      </div>
                    </div>
                    <Progress value={23} max={100} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Therapeutic Areas</div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">5 records</span>
                        <Badge variant="outline" className="bg-green-500 text-white">
                          Healthy
                        </Badge>
                      </div>
                    </div>
                    <Progress value={5} max={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Recent system alerts and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-lg border p-4">
                    <AlertTriangleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">High CPU Usage Detected</h4>
                      <p className="text-sm text-muted-foreground">
                        The database server experienced high CPU usage (85%) for over 10 minutes.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Today at 10:23 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-lg border p-4">
                    <XCircleIcon className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Data Enrichment Service Failed</h4>
                      <p className="text-sm text-muted-foreground">
                        The data enrichment service failed to process 23 records. Manual intervention required.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday at 8:45 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-lg border p-4">
                    <AlertTriangleIcon className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">API Rate Limit Warning</h4>
                      <p className="text-sm text-muted-foreground">
                        External API rate limit at 80% of daily allocation. Consider throttling requests.
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday at 3:12 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-lg border p-4">
                    <CheckCircle2Icon className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Database Backup Completed</h4>
                      <p className="text-sm text-muted-foreground">
                        Weekly database backup completed successfully. Size: 42.8 GB
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">April 18, 2023 at 2:00 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Overall system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ServerIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">API Gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                  <Badge variant="outline">100% Uptime</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <UsersIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Authentication Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2Icon className="h-5 w-5 text-green-500" />
                  <Badge variant="outline">100% Uptime</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GlobeIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Web Crawler</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangleIcon className="h-5 w-5 text-yellow-500" />
                  <Badge variant="outline">98.2% Uptime</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DatabaseIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Data Enrichment</span>
                </div>
                <div className="flex items-center gap-2">
                  <XCircleIcon className="h-5 w-5 text-red-500" />
                  <Badge variant="outline">87.5% Uptime</Badge>
                </div>
              </div>

              <div className="flex justify-end">
                <Button>View System Logs</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system and user activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Database backup completed</p>
                  <p className="text-xs text-muted-foreground">Automated system task</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">User John Smith updated company profile for Pfizer</p>
                  <p className="text-xs text-muted-foreground">Manual data entry</p>
                  <p className="text-xs text-muted-foreground">3 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Web crawler completed scan of 128 pharmaceutical websites</p>
                  <p className="text-xs text-muted-foreground">Automated data collection</p>
                  <p className="text-xs text-muted-foreground">5 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">Admin user Sarah Johnson approved 15 product updates</p>
                  <p className="text-xs text-muted-foreground">Content moderation</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 4:23 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">System updated 42 company financial records</p>
                  <p className="text-xs text-muted-foreground">Automated data update</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 2:15 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

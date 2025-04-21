import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { DatabaseIcon, HardDriveIcon, ClockIcon, RefreshCwIcon, DownloadIcon } from "lucide-react"

export default function AdminDatabasePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Database Management</h1>
        <p className="text-muted-foreground">Monitor and manage database operations.</p>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="queries">Query Tool</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Database Status</CardTitle>
                  <CardDescription>PostgreSQL 14.5</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <DatabaseIcon className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Healthy</span>
                    </div>
                    <Badge variant="outline">Uptime: 42 days</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Connection Pool</span>
                      <span>32/100</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
                  <CardDescription>SSD Storage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <HardDriveIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">42.8 GB / 100 GB</span>
                    </div>
                    <Badge variant="outline">42.8%</Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Storage Usage</span>
                      <span>42.8%</span>
                    </div>
                    <Progress value={42.8} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Query Performance</CardTitle>
                  <CardDescription>Average response time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">42ms</span>
                    </div>
                    <Badge variant="outline" className="bg-green-500 text-white">
                      Good
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Queries per second</span>
                      <span>128</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Table Statistics</CardTitle>
                  <CardDescription>Size and row counts for major tables</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">companies</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">1,245 rows</span>
                          <Badge variant="outline">8.2 MB</Badge>
                        </div>
                      </div>
                      <Progress value={25} max={100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">products</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">5,872 rows</span>
                          <Badge variant="outline">12.4 MB</Badge>
                        </div>
                      </div>
                      <Progress value={38} max={100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">websites</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">3,421 rows</span>
                          <Badge variant="outline">6.8 MB</Badge>
                        </div>
                      </div>
                      <Progress value={18} max={100} className="h-2" />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">therapeutic_areas</div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">128 rows</span>
                          <Badge variant="outline">1.2 MB</Badge>
                        </div>
                      </div>
                      <Progress value={5} max={100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Operations</CardTitle>
                  <CardDescription>Latest database operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">Weekly database backup completed</p>
                        <p className="text-xs text-muted-foreground">Automated task</p>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">Index optimization performed</p>
                        <p className="text-xs text-muted-foreground">Maintenance task</p>
                        <p className="text-xs text-muted-foreground">Yesterday at 2:15 AM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">Database schema updated</p>
                        <p className="text-xs text-muted-foreground">Added new columns to products table</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium">Bulk data import completed</p>
                        <p className="text-xs text-muted-foreground">Added 128 new company records</p>
                        <p className="text-xs text-muted-foreground">3 days ago</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button variant="outline">View All Operations</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Database Performance Metrics</CardTitle>
                <CardDescription>Monitor query performance and resource usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-80 flex items-center justify-center bg-muted/20">
                    <div className="text-center text-muted-foreground">
                      [Query Performance Chart]
                      <p className="mt-2">Line chart showing query response times</p>
                    </div>
                  </div>

                  <div className="h-80 flex items-center justify-center bg-muted/20">
                    <div className="text-center text-muted-foreground">
                      [Resource Usage Chart]
                      <p className="mt-2">Area chart showing CPU and memory usage</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="backups">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Database Backups</CardTitle>
                    <CardDescription>Manage database backups and restoration</CardDescription>
                  </div>
                  <Button>
                    <DownloadIcon className="mr-2 h-4 w-4" />
                    Create Backup
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Weekly Backup</h3>
                      <p className="text-sm text-muted-foreground">April 21, 2023 - 2:00 AM</p>
                      <p className="text-sm text-muted-foreground">Size: 42.8 GB</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCwIcon className="mr-2 h-4 w-4" />
                        Restore
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Weekly Backup</h3>
                      <p className="text-sm text-muted-foreground">April 14, 2023 - 2:00 AM</p>
                      <p className="text-sm text-muted-foreground">Size: 41.2 GB</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCwIcon className="mr-2 h-4 w-4" />
                        Restore
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Weekly Backup</h3>
                      <p className="text-sm text-muted-foreground">April 7, 2023 - 2:00 AM</p>
                      <p className="text-sm text-muted-foreground">Size: 40.5 GB</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <DownloadIcon className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCwIcon className="mr-2 h-4 w-4" />
                        Restore
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queries">
            <Card>
              <CardHeader>
                <CardTitle>SQL Query Tool</CardTitle>
                <CardDescription>Execute SQL queries against the database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 bg-muted/20 h-40">
                    <div className="text-sm text-muted-foreground">
                      [SQL Query Editor]
                      <p className="mt-2">Code editor for writing SQL queries</p>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Execute Query</Button>
                  </div>

                  <div className="border rounded-lg p-4 bg-muted/20 h-60">
                    <div className="text-sm text-muted-foreground">
                      [Query Results]
                      <p className="mt-2">Results will be displayed here</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

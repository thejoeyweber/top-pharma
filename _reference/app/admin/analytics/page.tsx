import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function AdminAnalyticsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">System usage and performance metrics.</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline">Export Data</Button>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="usage" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="usage" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Usage
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Performance
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="usage">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Daily active users over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    [User Activity Chart]
                    <p className="mt-2">Line chart showing daily active users</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Page Views</CardTitle>
                  <CardDescription>Most visited pages in the last 30 days</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    [Page Views Chart]
                    <p className="mt-2">Bar chart showing page view counts</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Session Duration</CardTitle>
                  <CardDescription>Average time spent on the platform</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    [Session Duration Chart]
                    <p className="mt-2">Line chart showing average session duration</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Devices</CardTitle>
                  <CardDescription>Breakdown of devices used to access the platform</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    [User Devices Chart]
                    <p className="mt-2">Pie chart showing device distribution</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Response Time</CardTitle>
                  <CardDescription>Average response time in milliseconds</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    [API Response Time Chart]
                    <p className="mt-2">Line chart showing response times</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Server Load</CardTitle>
                  <CardDescription>CPU and memory usage over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    [Server Load Chart]
                    <p className="mt-2">Area chart showing server resource usage</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Error Rates</CardTitle>
                  <CardDescription>System errors and exceptions</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    [Error Rates Chart]
                    <p className="mt-2">Bar chart showing error counts by type</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Database Performance</CardTitle>
                  <CardDescription>Query execution times and throughput</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    [Database Performance Chart]
                    <p className="mt-2">Line chart showing database metrics</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Content Distribution</CardTitle>
                  <CardDescription>Breakdown of content types in the system</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    [Content Distribution Chart]
                    <p className="mt-2">Pie chart showing content type distribution</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Growth</CardTitle>
                  <CardDescription>New content added over time</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    [Content Growth Chart]
                    <p className="mt-2">Line chart showing content growth</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Most Viewed Content</CardTitle>
                  <CardDescription>Top content by view count</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    [Most Viewed Content Chart]
                    <p className="mt-2">Bar chart showing view counts by content</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Updates</CardTitle>
                  <CardDescription>Frequency of content updates</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center bg-muted/20">
                  <div className="text-center text-muted-foreground">
                    [Content Updates Chart]
                    <p className="mt-2">Heatmap showing update frequency</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

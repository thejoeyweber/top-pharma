import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { BellIcon, MailIcon, MessageSquareIcon, AlertTriangleIcon } from "lucide-react"

export default function AdminNotificationsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Notification Management</h1>
        <p className="text-muted-foreground">Configure system notifications and alerts.</p>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="settings" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="settings">Notification Settings</TabsTrigger>
            <TabsTrigger value="templates">Message Templates</TabsTrigger>
            <TabsTrigger value="history">Delivery History</TabsTrigger>
          </TabsList>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                  <CardDescription>Configure system-level notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Critical System Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Notifications for critical system issues requiring immediate attention
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Performance Warnings</Label>
                        <p className="text-sm text-muted-foreground">
                          Alerts when system performance drops below thresholds
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Security Alerts</Label>
                        <p className="text-sm text-muted-foreground">
                          Notifications about security-related events and potential issues
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Maintenance Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Scheduled maintenance and system update notifications
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Content Notifications</CardTitle>
                  <CardDescription>Configure content-related notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">New Content Submissions</Label>
                        <p className="text-sm text-muted-foreground">
                          Notifications when new content is submitted for review
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Content Approval Requests</Label>
                        <p className="text-sm text-muted-foreground">Alerts when content is waiting for approval</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Content Rejection Notifications</Label>
                        <p className="text-sm text-muted-foreground">Notifications when content is rejected</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Bulk Content Updates</Label>
                        <p className="text-sm text-muted-foreground">Notifications for large-scale content changes</p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Methods</CardTitle>
                  <CardDescription>Configure how notifications are delivered</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BellIcon className="h-5 w-5 text-muted-foreground" />
                        <Label className="text-base">In-App Notifications</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MailIcon className="h-5 w-5 text-muted-foreground" />
                        <Label className="text-base">Email Notifications</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquareIcon className="h-5 w-5 text-muted-foreground" />
                        <Label className="text-base">SMS Notifications</Label>
                      </div>
                      <Switch />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangleIcon className="h-5 w-5 text-muted-foreground" />
                        <Label className="text-base">Slack Alerts</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Schedule</CardTitle>
                  <CardDescription>Configure when notifications are sent</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Send Immediately</Label>
                        <p className="text-sm text-muted-foreground">Send notifications as events occur</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Daily Digest</Label>
                        <p className="text-sm text-muted-foreground">Combine notifications into a daily summary</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Weekly Summary</Label>
                        <p className="text-sm text-muted-foreground">Send a weekly summary of all notifications</p>
                      </div>
                      <Switch />
                    </div>
                    <Separator />

                    <div className="flex justify-end mt-4">
                      <Button>Save Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Notification Templates</CardTitle>
                <CardDescription>Manage and customize notification message templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Notification template editor will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Notification History</CardTitle>
                <CardDescription>View history of sent notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  Notification delivery history will be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

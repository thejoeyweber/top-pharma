import type React from "react"
import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PieChartIcon, BarChartIcon, LineChartIcon, PlusIcon, LockIcon } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-bold tracking-tight">Reports & Insights</h1>
                <p className="text-muted-foreground">
                  Explore industry reports and insights on pharmaceutical companies, products, and therapeutic areas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 lg:px-6">
                <ReportCard
                  title="Market Overview"
                  description="Comprehensive analysis of the pharmaceutical market landscape."
                  icon={<PieChartIcon className="h-5 w-5" />}
                  href="/reports/market-overview"
                />

                <ReportCard
                  title="Pipeline Analysis"
                  description="Detailed breakdown of pharmaceutical product pipelines by stage and therapeutic area."
                  icon={<BarChartIcon className="h-5 w-5" />}
                  href="/reports/pipeline-analysis"
                />

                <ReportCard
                  title="Financial Trends"
                  description="Analysis of financial performance and trends across pharmaceutical companies."
                  icon={<LineChartIcon className="h-5 w-5" />}
                  href="/reports/financial-trends"
                />

                <ReportCard
                  title="Therapeutic Area Insights"
                  description="Deep dive into specific therapeutic areas and their market dynamics."
                  icon={<PieChartIcon className="h-5 w-5" />}
                  href="/reports/therapeutic-areas"
                  badge="New"
                />

                <ReportCard
                  title="Digital Presence Analysis"
                  description="Analysis of pharmaceutical companies' digital footprint and website performance."
                  icon={<BarChartIcon className="h-5 w-5" />}
                  href="/reports/digital-presence"
                  comingSoon
                />

                <ReportCard
                  title="Competitive Intelligence"
                  description="Comparative analysis of pharmaceutical companies and their competitive positioning."
                  icon={<LineChartIcon className="h-5 w-5" />}
                  href="/reports/competitive-intelligence"
                  comingSoon
                />

                <Card className="col-span-1 md:col-span-2 lg:col-span-3 bg-muted/50">
                  <CardHeader>
                    <CardTitle>Custom Report</CardTitle>
                    <CardDescription>Create a custom report tailored to your specific needs.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center py-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                        <PlusIcon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">Build Your Own Report</h3>
                      <p className="text-center text-muted-foreground max-w-md mb-4">
                        Select specific metrics, companies, products, or therapeutic areas to create a customized
                        report.
                      </p>
                      <Button>Create Custom Report</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

interface ReportCardProps {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  badge?: string
  comingSoon?: boolean
}

function ReportCard({ title, description, icon, href, badge, comingSoon }: ReportCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">{icon}</div>
            <CardTitle>{title}</CardTitle>
          </div>
          {badge && <Badge>{badge}</Badge>}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {comingSoon ? (
          <div className="flex items-center justify-center py-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <LockIcon className="h-4 w-4" />
              <span>Coming Soon</span>
            </div>
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" asChild disabled={comingSoon}>
          <Link href={comingSoon ? "#" : href}>View Report</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

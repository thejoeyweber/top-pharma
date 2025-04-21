import { AppSidebar } from "../../../components/app-sidebar"
import { SiteHeader } from "../../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartAreaInteractive } from "../../../components/chart-area-interactive"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function MarketOverviewPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-bold tracking-tight">Market Overview</h1>
                <p className="text-muted-foreground">Comprehensive analysis of the pharmaceutical market landscape.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trends</CardTitle>
                    <CardDescription>Top pharmaceutical companies by revenue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartAreaInteractive />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pipeline Stage Distribution</CardTitle>
                    <CardDescription>Products by development stage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge>Phase I</Badge>
                            <span className="text-sm font-medium">342 products</span>
                          </div>
                          <span className="text-sm text-muted-foreground">18%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[18%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge>Phase II</Badge>
                            <span className="text-sm font-medium">528 products</span>
                          </div>
                          <span className="text-sm text-muted-foreground">28%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[28%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge>Phase III</Badge>
                            <span className="text-sm font-medium">412 products</span>
                          </div>
                          <span className="text-sm text-muted-foreground">22%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[22%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Badge>Marketed</Badge>
                            <span className="text-sm font-medium">612 products</span>
                          </div>
                          <span className="text-sm text-muted-foreground">32%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-full w-[32%] rounded-full bg-primary"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 gap-6 px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Deals</CardTitle>
                    <CardDescription>Mergers, acquisitions, and partnerships</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Acquirer</TableHead>
                          <TableHead>Target</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentDeals.map((deal) => (
                          <TableRow key={deal.id}>
                            <TableCell>{deal.date}</TableCell>
                            <TableCell className="font-medium">{deal.acquirer}</TableCell>
                            <TableCell>{deal.target}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{deal.type}</Badge>
                            </TableCell>
                            <TableCell className="text-right">{deal.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Approvals</CardTitle>
                    <CardDescription>Recently approved pharmaceutical products</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Indication</TableHead>
                          <TableHead>Region</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentApprovals.map((approval) => (
                          <TableRow key={approval.id}>
                            <TableCell>{approval.date}</TableCell>
                            <TableCell className="font-medium">{approval.product}</TableCell>
                            <TableCell>{approval.company}</TableCell>
                            <TableCell>{approval.indication}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{approval.region}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Market Share</CardTitle>
                    <CardDescription>Global pharmaceutical market share by company</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Rank</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead className="text-right">Revenue</TableHead>
                          <TableHead className="text-right">Market Share</TableHead>
                          <TableHead className="text-right">YoY Change</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {marketShare.map((company) => (
                          <TableRow key={company.id}>
                            <TableCell>{company.rank}</TableCell>
                            <TableCell className="font-medium">{company.company}</TableCell>
                            <TableCell className="text-right">{company.revenue}</TableCell>
                            <TableCell className="text-right">{company.marketShare}</TableCell>
                            <TableCell className="text-right">
                              <Badge
                                variant={company.yoyChange.startsWith("+") ? "default" : "destructive"}
                                className={
                                  company.yoyChange.startsWith("+")
                                    ? "bg-green-500 hover:bg-green-500"
                                    : "bg-red-500 hover:bg-red-500"
                                }
                              >
                                {company.yoyChange}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
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

// Sample data
const recentDeals = [
  {
    id: "1",
    date: "2023-03-15",
    acquirer: "Pfizer",
    target: "Seagen",
    type: "Acquisition",
    value: "$43B",
  },
  {
    id: "2",
    date: "2023-02-28",
    acquirer: "Merck",
    target: "Prometheus Biosciences",
    type: "Acquisition",
    value: "$10.8B",
  },
  {
    id: "3",
    date: "2023-02-10",
    acquirer: "AbbVie",
    target: "ImmunoGen",
    type: "Acquisition",
    value: "$10.1B",
  },
  {
    id: "4",
    date: "2023-01-25",
    acquirer: "Johnson & Johnson",
    target: "Ambrx",
    type: "Acquisition",
    value: "$2B",
  },
  {
    id: "5",
    date: "2023-01-08",
    acquirer: "Bristol Myers Squibb",
    target: "RayzeBio",
    type: "Acquisition",
    value: "$4.1B",
  },
]

const recentApprovals = [
  {
    id: "1",
    date: "2023-03-20",
    product: "Kisunla",
    company: "Eli Lilly",
    indication: "Type 2 Diabetes",
    region: "US",
  },
  {
    id: "2",
    date: "2023-03-05",
    product: "Omvoh",
    company: "Pfizer",
    indication: "Atopic Dermatitis",
    region: "EU",
  },
  {
    id: "3",
    date: "2023-02-18",
    product: "Rezzayo",
    company: "GSK",
    indication: "Endometrial Cancer",
    region: "US",
  },
  {
    id: "4",
    date: "2023-02-02",
    product: "Columvi",
    company: "Roche",
    indication: "Diffuse Large B-cell Lymphoma",
    region: "US",
  },
  {
    id: "5",
    date: "2023-01-15",
    product: "Jaypirca",
    company: "Eli Lilly",
    indication: "Mantle Cell Lymphoma",
    region: "US",
  },
]

const marketShare = [
  {
    id: "1",
    rank: 1,
    company: "Johnson & Johnson",
    revenue: "$94.9B",
    marketShare: "6.2%",
    yoyChange: "+4.5%",
  },
  {
    id: "2",
    rank: 2,
    company: "Roche",
    revenue: "$68.7B",
    marketShare: "4.5%",
    yoyChange: "+3.2%",
  },
  {
    id: "3",
    rank: 3,
    company: "Pfizer",
    revenue: "$67.3B",
    marketShare: "4.4%",
    yoyChange: "-15.3%",
  },
  {
    id: "4",
    rank: 4,
    company: "Novartis",
    revenue: "$52.5B",
    marketShare: "3.4%",
    yoyChange: "+5.6%",
  },
  {
    id: "5",
    rank: 5,
    company: "Merck",
    revenue: "$59.3B",
    marketShare: "3.9%",
    yoyChange: "+18.2%",
  },
]

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartAreaInteractive } from "./chart-area-interactive"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon, LineChartIcon, PieChartIcon, TrendingUpIcon } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function CompanyFinancials({ companyId }: { companyId: string }) {
  // In a real app, you would fetch financial data based on the company ID
  const financialData = [
    {
      year: "2022",
      revenue: "$81.3B",
      netIncome: "$22.0B",
      rAndD: "$11.4B",
      grossMargin: "65.3%",
      operatingMargin: "31.2%",
    },
    {
      year: "2021",
      revenue: "$81.3B",
      netIncome: "$22.0B",
      rAndD: "$10.5B",
      grossMargin: "63.1%",
      operatingMargin: "29.8%",
    },
    {
      year: "2020",
      revenue: "$41.9B",
      netIncome: "$9.6B",
      rAndD: "$9.4B",
      grossMargin: "52.0%",
      operatingMargin: "25.3%",
    },
    {
      year: "2019",
      revenue: "$51.8B",
      netIncome: "$16.3B",
      rAndD: "$8.7B",
      grossMargin: "58.2%",
      operatingMargin: "27.5%",
    },
    {
      year: "2018",
      revenue: "$53.6B",
      netIncome: "$11.2B",
      rAndD: "$8.0B",
      grossMargin: "57.3%",
      operatingMargin: "26.1%",
    },
  ]

  const revenueByProduct = [
    { product: "Comirnaty (COVID-19 Vaccine)", revenue: "$37.8B", percentage: 46.5, growth: "+120%" },
    { product: "Eliquis", revenue: "$6.5B", percentage: 8.0, growth: "+12%" },
    { product: "Prevnar Family", revenue: "$5.3B", percentage: 6.5, growth: "-3%" },
    { product: "Paxlovid", revenue: "$4.8B", percentage: 5.9, growth: "New" },
    { product: "Vyndaqel/Vyndamax", revenue: "$2.4B", percentage: 3.0, growth: "+45%" },
    { product: "Xeljanz", revenue: "$2.2B", percentage: 2.7, growth: "-5%" },
    { product: "Ibrance", revenue: "$5.4B", percentage: 6.6, growth: "-2%" },
    { product: "Other Products", revenue: "$16.9B", percentage: 20.8, growth: "-8%" },
  ]

  const revenueByRegion = [
    { region: "United States", revenue: "$41.4B", percentage: 51 },
    { region: "Europe", revenue: "$19.5B", percentage: 24 },
    { region: "China", revenue: "$6.5B", percentage: 8 },
    { region: "Japan", revenue: "$3.3B", percentage: 4 },
    { region: "Rest of World", revenue: "$10.6B", percentage: 13 },
  ]

  const keyMetrics = [
    { metric: "Market Cap", value: "$240.5B", change: "+3.2%" },
    { metric: "P/E Ratio", value: "12.4", change: "-0.8%" },
    { metric: "EV/EBITDA", value: "9.8", change: "+1.5%" },
    { metric: "Dividend Yield", value: "3.8%", change: "+0.2%" },
    { metric: "R&D % of Revenue", value: "14.0%", change: "+0.5%" },
    { metric: "Debt-to-Equity", value: "0.48", change: "-0.05" },
  ]

  const analystRatings = {
    buy: 65,
    hold: 30,
    sell: 5,
    priceTarget: "$52.80",
    currentPrice: "$48.25",
    upside: "9.4%",
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
          <TabsTrigger value="valuation">Valuation & Analysts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {keyMetrics.map((item) => (
              <Card key={item.metric} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{item.metric}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl font-bold">{item.value}</div>
                    <Badge
                      variant={item.change.startsWith("+") ? "success" : "destructive"}
                      className="flex items-center gap-1"
                    >
                      {item.change.startsWith("+") ? (
                        <ArrowUpIcon className="h-3 w-3" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3" />
                      )}
                      {item.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
                <CardDescription>Revenue, Net Income, and R&D Expenses (in billions)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartAreaInteractive />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Annual financial data</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Net Income</TableHead>
                      <TableHead>R&D</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialData.slice(0, 4).map((item) => (
                      <TableRow key={item.year}>
                        <TableCell className="font-medium">{item.year}</TableCell>
                        <TableCell>{item.revenue}</TableCell>
                        <TableCell>{item.netIncome}</TableCell>
                        <TableCell>{item.rAndD}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Revenue by Product</CardTitle>
                    <CardDescription>Top products by revenue contribution (2022)</CardDescription>
                  </div>
                  <PieChartIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByProduct.map((item) => (
                    <div key={item.product} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex flex-col">
                          <span className="font-medium">{item.product}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{item.revenue}</span>
                            <Badge
                              variant={
                                item.growth.startsWith("+")
                                  ? "success"
                                  : item.growth.startsWith("-")
                                    ? "destructive"
                                    : "outline"
                              }
                              className="text-xs"
                            >
                              {item.growth}
                            </Badge>
                          </div>
                        </div>
                        <span className="font-semibold">{item.percentage}%</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Revenue by Region</CardTitle>
                    <CardDescription>Geographic revenue distribution (2022)</CardDescription>
                  </div>
                  <LineChartIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByRegion.map((item) => (
                    <div key={item.region} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.region}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{item.revenue}</span>
                          <span className="font-semibold">{item.percentage}%</span>
                        </div>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Quarterly revenue over the past 3 years</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartAreaInteractive />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profitability">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Margin Analysis</CardTitle>
                    <CardDescription>Key profitability margins (2018-2022)</CardDescription>
                  </div>
                  <TrendingUpIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Gross Margin</TableHead>
                      <TableHead>Operating Margin</TableHead>
                      <TableHead>Net Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialData.map((item) => (
                      <TableRow key={item.year}>
                        <TableCell className="font-medium">{item.year}</TableCell>
                        <TableCell>{item.grossMargin}</TableCell>
                        <TableCell>{item.operatingMargin}</TableCell>
                        <TableCell>
                          {(
                            (Number.parseFloat(item.netIncome.replace("$", "").replace("B", "")) /
                              Number.parseFloat(item.revenue.replace("$", "").replace("B", ""))) *
                            100
                          ).toFixed(1)}
                          %
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>R&D Investment</CardTitle>
                    <CardDescription>Research & Development spending analysis</CardDescription>
                  </div>
                  <DollarSignIcon className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">R&D as % of Revenue (2022)</span>
                      <span className="text-sm font-bold">14.0%</span>
                    </div>
                    <Progress value={14} className="h-2" />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>Industry Low: 8%</span>
                      <span>Industry Avg: 15%</span>
                      <span>Industry High: 25%</span>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Year</TableHead>
                        <TableHead>R&D Spend</TableHead>
                        <TableHead>% of Revenue</TableHead>
                        <TableHead>YoY Change</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {financialData.slice(0, 4).map((item, index) => {
                        const rdPercent = (
                          (Number.parseFloat(item.rAndD.replace("$", "").replace("B", "")) /
                            Number.parseFloat(item.revenue.replace("$", "").replace("B", ""))) *
                          100
                        ).toFixed(1)
                        let yoyChange = "—"

                        if (index < financialData.length - 1) {
                          const currentRD = Number.parseFloat(item.rAndD.replace("$", "").replace("B", ""))
                          const prevRD = Number.parseFloat(
                            financialData[index + 1].rAndD.replace("$", "").replace("B", ""),
                          )
                          const change = (((currentRD - prevRD) / prevRD) * 100).toFixed(1)
                          yoyChange = change > 0 ? `+${change}%` : `${change}%`
                        }

                        return (
                          <TableRow key={item.year}>
                            <TableCell className="font-medium">{item.year}</TableCell>
                            <TableCell>{item.rAndD}</TableCell>
                            <TableCell>{rdPercent}%</TableCell>
                            <TableCell>
                              {yoyChange !== "—" && (
                                <Badge
                                  variant={yoyChange.startsWith("+") ? "success" : "destructive"}
                                  className="text-xs"
                                >
                                  {yoyChange}
                                </Badge>
                              )}
                              {yoyChange === "—" && yoyChange}
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Profitability Trends</CardTitle>
              <CardDescription>Gross, Operating, and Net Margins (2018-2022)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartAreaInteractive />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="valuation">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Analyst Consensus</CardTitle>
                <CardDescription>Based on 25 analyst ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Price Target</span>
                      <div className="text-2xl font-bold">{analystRatings.priceTarget}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Current Price</span>
                      <div className="text-2xl font-bold">{analystRatings.currentPrice}</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-sm text-muted-foreground">Upside</span>
                      <div className="text-2xl font-bold text-emerald-600">{analystRatings.upside}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Buy</span>
                      <span className="font-semibold text-emerald-600">{analystRatings.buy}%</span>
                    </div>
                    <Progress value={analystRatings.buy} className="h-2 bg-muted" indicatorClassName="bg-emerald-500" />

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Hold</span>
                      <span className="font-semibold text-amber-600">{analystRatings.hold}%</span>
                    </div>
                    <Progress value={analystRatings.hold} className="h-2 bg-muted" indicatorClassName="bg-amber-500" />

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Sell</span>
                      <span className="font-semibold text-red-600">{analystRatings.sell}%</span>
                    </div>
                    <Progress value={analystRatings.sell} className="h-2 bg-muted" indicatorClassName="bg-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Valuation Metrics</CardTitle>
                <CardDescription>Current vs. 5-Year Average vs. Industry</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Metric</TableHead>
                      <TableHead>Current</TableHead>
                      <TableHead>5Y Avg</TableHead>
                      <TableHead>Industry</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">P/E Ratio</TableCell>
                      <TableCell>12.4</TableCell>
                      <TableCell>14.8</TableCell>
                      <TableCell>15.2</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">EV/EBITDA</TableCell>
                      <TableCell>9.8</TableCell>
                      <TableCell>10.5</TableCell>
                      <TableCell>11.3</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Price/Sales</TableCell>
                      <TableCell>2.9</TableCell>
                      <TableCell>3.5</TableCell>
                      <TableCell>3.8</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Price/Book</TableCell>
                      <TableCell>2.8</TableCell>
                      <TableCell>3.2</TableCell>
                      <TableCell>3.5</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dividend Yield</TableCell>
                      <TableCell>3.8%</TableCell>
                      <TableCell>3.5%</TableCell>
                      <TableCell>2.9%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Upcoming Financial Events</CardTitle>
              <CardDescription>Key dates for investors</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Q2 2023 Earnings Release</TableCell>
                    <TableCell>August 1, 2023</TableCell>
                    <TableCell>Before market open</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Q2 2023 Earnings Call</TableCell>
                    <TableCell>August 1, 2023</TableCell>
                    <TableCell>10:00 AM ET</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Ex-Dividend Date</TableCell>
                    <TableCell>July 28, 2023</TableCell>
                    <TableCell>$0.41 per share</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Investor Day</TableCell>
                    <TableCell>September 15, 2023</TableCell>
                    <TableCell>New York City</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

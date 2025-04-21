import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartAreaInteractive } from "./chart-area-interactive"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function WebsiteTraffic({ websiteId }: { websiteId: string }) {
  // Traffic source data
  const trafficSources = [
    { source: "Organic Search", percentage: 45 },
    { source: "Direct", percentage: 25 },
    { source: "Referral", percentage: 15 },
    { source: "Social", percentage: 10 },
    { source: "Email", percentage: 5 },
  ]

  // Top countries data
  const topCountries = [
    { country: "United States", visits: 45000, percentage: 35 },
    { country: "United Kingdom", visits: 25000, percentage: 20 },
    { country: "Germany", visits: 18000, percentage: 15 },
    { country: "France", visits: 12000, percentage: 10 },
    { country: "Japan", visits: 10000, percentage: 8 },
    { country: "Canada", visits: 8000, percentage: 7 },
    { country: "Australia", visits: 6000, percentage: 5 },
  ]

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Traffic Overview</CardTitle>
          <CardDescription>Website visits over the last 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartAreaInteractive />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>How visitors find the website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources.map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{source.source}</div>
                    <div className="text-sm text-muted-foreground">{source.percentage}%</div>
                  </div>
                  <Progress value={source.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Geographic distribution of visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead className="text-right">Visits</TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topCountries.map((country, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{country.country}</TableCell>
                    <TableCell className="text-right">{country.visits.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{country.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

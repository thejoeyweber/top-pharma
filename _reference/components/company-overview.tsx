import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Timeline, TimelineItem } from "./timeline"

interface CompanyOverviewProps {
  company: {
    name: string
    founded: string
    marketCap: string
    employees: string
    headquarters: string
  }
}

export function CompanyOverview({ company }: CompanyOverviewProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Company Metrics</CardTitle>
          <CardDescription>Key information about {company.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Founded</dt>
              <dd className="text-lg font-semibold">{company.founded}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Market Cap</dt>
              <dd className="text-lg font-semibold">{company.marketCap}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Employees</dt>
              <dd className="text-lg font-semibold">{company.employees}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Headquarters</dt>
              <dd className="text-lg font-semibold">{company.headquarters}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>Recent company events</CardDescription>
        </CardHeader>
        <CardContent>
          <Timeline>
            <TimelineItem
              title="Q1 2023 Financial Results"
              date="April 15, 2023"
              description="Reported $24.3B in revenue, up 5% YoY"
            />
            <TimelineItem
              title="New CEO Appointed"
              date="March 1, 2023"
              description="John Smith named as new Chief Executive Officer"
            />
            <TimelineItem
              title="Acquisition of BioTech Inc."
              date="January 12, 2023"
              description="$2.1B acquisition to expand oncology pipeline"
            />
            <TimelineItem
              title="FDA Approval for XDR-101"
              date="December 5, 2022"
              description="Received approval for pancreatic cancer treatment"
            />
          </Timeline>
        </CardContent>
      </Card>
    </div>
  )
}

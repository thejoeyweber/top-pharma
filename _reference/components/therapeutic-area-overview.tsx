import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartAreaInteractive } from "./chart-area-interactive"

interface TherapeuticAreaOverviewProps {
  therapeuticArea: {
    name: string
    companies: number
    products: number
    websites: number
    marketSize: string
  }
}

export function TherapeuticAreaOverview({ therapeuticArea }: TherapeuticAreaOverviewProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Area Metrics</CardTitle>
          <CardDescription>Key information about {therapeuticArea.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Companies</dt>
              <dd className="text-lg font-semibold">{therapeuticArea.companies}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Products</dt>
              <dd className="text-lg font-semibold">{therapeuticArea.products}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Websites</dt>
              <dd className="text-lg font-semibold">{therapeuticArea.websites}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Market Size</dt>
              <dd className="text-lg font-semibold">{therapeuticArea.marketSize}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Market Trends</CardTitle>
          <CardDescription>Growth over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartAreaInteractive />
        </CardContent>
      </Card>
    </div>
  )
}

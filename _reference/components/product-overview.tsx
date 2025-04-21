import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Building2Icon } from "lucide-react"

interface ProductOverviewProps {
  product: {
    name: string
    genericName: string
    moleculeType: string
    adminRoute: string
    firstApproval: string
    company: string
    companyId: string
  }
}

export function ProductOverview({ product }: ProductOverviewProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Product Metrics</CardTitle>
          <CardDescription>Key information about {product.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Generic Name</dt>
              <dd className="text-lg font-semibold">{product.genericName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Molecule Type</dt>
              <dd className="text-lg font-semibold">{product.moleculeType}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Administration Route</dt>
              <dd className="text-lg font-semibold">{product.adminRoute}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">First Approval</dt>
              <dd className="text-lg font-semibold">{product.firstApproval}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Company</CardTitle>
          <CardDescription>Manufacturer information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center">
              <Building2Icon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{product.company}</h3>
              <p className="text-sm text-muted-foreground">
                Manufacturer of {product.name} since {product.firstApproval}
              </p>
            </div>
          </div>
          <Button asChild className="w-full">
            <Link href={`/companies/${product.companyId}`}>View Company Profile</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

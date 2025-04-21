import { AppSidebar } from "../../components/app-sidebar"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyTable } from "../../components/company-table"
import { ProductTable } from "../../components/product-table"
import { TherapeuticAreaTable } from "../../components/therapeutic-area-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HeartIcon, SearchIcon } from "lucide-react"

export default function FollowingPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-bold tracking-tight">Following</h1>
                <p className="text-muted-foreground">
                  Manage and view entities you're following for quick access and updates.
                </p>
              </div>

              <div className="px-4 lg:px-6">
                <Tabs defaultValue="companies" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="companies">Companies</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="therapeutic-areas">Therapeutic Areas</TabsTrigger>
                  </TabsList>

                  <TabsContent value="companies">
                    {hasFollowedCompanies ? (
                      <CompanyTable />
                    ) : (
                      <EmptyFollowingState
                        title="No Companies Followed"
                        description="You haven't followed any companies yet. Follow companies to get quick access and updates."
                        actionLabel="Browse Companies"
                        actionHref="/companies"
                      />
                    )}
                  </TabsContent>

                  <TabsContent value="products">
                    {hasFollowedProducts ? (
                      <ProductTable />
                    ) : (
                      <EmptyFollowingState
                        title="No Products Followed"
                        description="You haven't followed any products yet. Follow products to get quick access and updates."
                        actionLabel="Browse Products"
                        actionHref="/products"
                      />
                    )}
                  </TabsContent>

                  <TabsContent value="therapeutic-areas">
                    {hasFollowedTherapeuticAreas ? (
                      <TherapeuticAreaTable />
                    ) : (
                      <EmptyFollowingState
                        title="No Therapeutic Areas Followed"
                        description="You haven't followed any therapeutic areas yet. Follow therapeutic areas to get quick access and updates."
                        actionLabel="Browse Therapeutic Areas"
                        actionHref="/therapeutic-areas"
                      />
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

interface EmptyFollowingStateProps {
  title: string
  description: string
  actionLabel: string
  actionHref: string
}

function EmptyFollowingState({ title, description, actionLabel, actionHref }: EmptyFollowingStateProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
          <HeartIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="flex flex-col items-center gap-2 mb-6">
          <p className="text-center text-muted-foreground">
            Follow items to keep track of updates and get quick access to them.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SearchIcon className="h-4 w-4" />
            <span>Use the heart icon to follow items</span>
          </div>
        </div>
        <Button asChild>
          <a href={actionHref}>{actionLabel}</a>
        </Button>
      </CardContent>
    </Card>
  )
}

// For demo purposes, set these to true to show the tables
const hasFollowedCompanies = true
const hasFollowedProducts = false
const hasFollowedTherapeuticAreas = false

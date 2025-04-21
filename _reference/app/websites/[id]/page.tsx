import { AppSidebar } from "../../../components/app-sidebar"
import { SiteHeader } from "../../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { EntityHeader } from "../../../components/entity-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WebsiteOverview } from "../../../components/website-overview"
import { WebsiteContent } from "../../../components/website-content"
import { WebsiteTraffic } from "../../../components/website-traffic"

export default function WebsiteDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the website data based on the ID
  const website = {
    id: params.id,
    domain: "pfizer.com",
    image: "/placeholder.svg?height=100&width=100",
    description:
      "The official website of Pfizer Inc., a leading pharmaceutical company providing information about products, research, and corporate information.",
    company: "Pfizer",
    companyId: "1",
    category: "Corporate",
    ssl: true,
    hostRegion: "US",
    techStack: "Drupal, AWS, Cloudflare",
    lastCrawled: "2023-04-12T12:00:00.000Z",
    traffic: "High",
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <EntityHeader
                title={website.domain}
                description={website.description}
                image={website.image}
                type="website"
                tags={[
                  { label: website.category, variant: "outline" },
                  { label: website.ssl ? "Secure" : "Insecure", variant: website.ssl ? "default" : "destructive" },
                ]}
                ctaLabel="Visit Website"
                ctaUrl={`https://${website.domain}`}
              />

              <div className="px-4 lg:px-6">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="traffic">Traffic</TabsTrigger>
                    <TabsTrigger value="company">Company</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="therapeutic-areas">Therapeutic Areas</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <WebsiteOverview website={website} />
                  </TabsContent>
                  <TabsContent value="content">
                    <WebsiteContent websiteId={website.id} />
                  </TabsContent>
                  <TabsContent value="traffic">
                    <WebsiteTraffic websiteId={website.id} />
                  </TabsContent>
                  <TabsContent value="company">
                    <div className="text-center py-12 text-muted-foreground">Company data coming soon</div>
                  </TabsContent>
                  <TabsContent value="products">
                    <div className="text-center py-12 text-muted-foreground">Products data coming soon</div>
                  </TabsContent>
                  <TabsContent value="therapeutic-areas">
                    <div className="text-center py-12 text-muted-foreground">Therapeutic Areas data coming soon</div>
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

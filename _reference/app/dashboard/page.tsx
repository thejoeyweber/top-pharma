import { AppSidebar } from "../../components/app-sidebar"
import { SectionCards } from "../../components/section-cards"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { ChartAreaInteractive } from "../../components/chart-area-interactive"
import { RecentUpdatesTable } from "../../components/recent-updates-table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="companies" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="companies">Recent Companies</TabsTrigger>
                    <TabsTrigger value="products">Recent Products</TabsTrigger>
                  </TabsList>
                  <TabsContent value="companies">
                    <RecentUpdatesTable type="companies" />
                  </TabsContent>
                  <TabsContent value="products">
                    <RecentUpdatesTable type="products" />
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

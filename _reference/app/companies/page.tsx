import { AppSidebar } from "../../components/app-sidebar"
import { CompanyTable } from "../../components/company-table"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DirectoryHeader } from "../../components/directory-header"
import { FilterPanel } from "../../components/filter-panel"
import { EntityComparison } from "@/components/entity-comparison"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CompaniesPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DirectoryHeader
                title="Companies"
                description="Browse pharmaceutical companies, view their products, pipelines, and financial data."
                icon="Building2"
              />

              <div className="px-4 lg:px-6">
                <Tabs defaultValue="list" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="list">List View</TabsTrigger>
                    <TabsTrigger value="comparison">Comparison</TabsTrigger>
                  </TabsList>

                  <TabsContent value="list">
                    <div className="space-y-4">
                      <FilterPanel />
                      <CompanyTable />
                    </div>
                  </TabsContent>

                  <TabsContent value="comparison">
                    <EntityComparison />
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

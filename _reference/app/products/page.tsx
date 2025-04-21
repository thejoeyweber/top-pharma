import { AppSidebar } from "../../components/app-sidebar"
import { ProductTable } from "../../components/product-table"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DirectoryHeader } from "../../components/directory-header"
import { FilterPanel } from "../../components/filter-panel"

export default function ProductsPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DirectoryHeader
                title="Products"
                description="Explore pharmaceutical products, their indications, clinical data, and regulatory status."
                icon="Flask"
              />
              <div className="px-4 lg:px-6">
                <FilterPanel />
              </div>
              <div className="px-4 lg:px-6">
                <ProductTable />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

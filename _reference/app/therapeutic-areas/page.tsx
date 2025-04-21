import { AppSidebar } from "../../components/app-sidebar"
import { TherapeuticAreaTable } from "../../components/therapeutic-area-table"
import { SiteHeader } from "../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DirectoryHeader } from "../../components/directory-header"
import { FilterPanel } from "../../components/filter-panel"

export default function TherapeuticAreasPage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <DirectoryHeader
                title="Therapeutic Areas"
                description="Discover therapeutic areas, related companies, products, and market insights."
                icon="Stethoscope"
              />
              <div className="px-4 lg:px-6">
                <FilterPanel />
              </div>
              <div className="px-4 lg:px-6">
                <TherapeuticAreaTable />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

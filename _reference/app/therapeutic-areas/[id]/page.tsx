import { AppSidebar } from "../../../components/app-sidebar"
import { SiteHeader } from "../../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { EntityHeader } from "../../../components/entity-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TherapeuticAreaOverview } from "../../../components/therapeutic-area-overview"
import { TherapeuticAreaCompanies } from "../../../components/therapeutic-area-companies"
import { TherapeuticAreaProducts } from "../../../components/therapeutic-area-products"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Share2, Star, Bell, Bookmark, ArrowRight } from "lucide-react"

export default function TherapeuticAreaDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the therapeutic area data based on the ID
  const therapeuticArea = {
    id: params.id,
    name: "Oncology",
    image: "/placeholder.svg?height=100&width=100",
    description:
      "Oncology is a branch of medicine that deals with the prevention, diagnosis, and treatment of cancer. A medical professional who practices oncology is an oncologist. The field of oncology has three major areas: medical, surgical, and radiation.",
    companies: 124,
    products: 532,
    websites: 215,
    marketSize: "$150B",
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <EntityHeader
                    title={therapeuticArea.name}
                    description={therapeuticArea.description}
                    image={therapeuticArea.image}
                    type="therapeutic-area"
                    tags={[
                      { label: `${therapeuticArea.companies} Companies`, variant: "outline" },
                      { label: `${therapeuticArea.products} Products`, variant: "outline" },
                    ]}
                    ctaLabel="View Market Report"
                    ctaUrl={`/reports/therapeutic-areas/${therapeuticArea.id}`}
                  />

                  <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" className="gap-1">
                      <Star className="h-4 w-4" />
                      <span>Follow</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Bell className="h-4 w-4" />
                      <span>Alerts</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Bookmark className="h-4 w-4" />
                      <span>Save</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Share2 className="h-4 w-4" />
                      <span>Share</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </Button>
                  </div>
                </div>

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="companies">Companies</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="related">Related Areas</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <TherapeuticAreaOverview therapeuticArea={therapeuticArea} />
                  </TabsContent>
                  <TabsContent value="companies">
                    <TherapeuticAreaCompanies therapeuticAreaId={therapeuticArea.id} />
                  </TabsContent>
                  <TabsContent value="products">
                    <TherapeuticAreaProducts therapeuticAreaId={therapeuticArea.id} />
                  </TabsContent>
                  <TabsContent value="related">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Related Therapeutic Areas</CardTitle>
                          <CardDescription>Areas with overlapping indications or treatments</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">Hematology</Badge>
                                <span className="text-sm font-medium">High overlap</span>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <a href="/therapeutic-areas/hematology">
                                  <ArrowRight className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </a>
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">Immunology</Badge>
                                <span className="text-sm font-medium">Medium overlap</span>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <a href="/therapeutic-areas/immunology">
                                  <ArrowRight className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </a>
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">Neurology</Badge>
                                <span className="text-sm font-medium">Low overlap</span>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <a href="/therapeutic-areas/neurology">
                                  <ArrowRight className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </a>
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">Radiology</Badge>
                                <span className="text-sm font-medium">High overlap</span>
                              </div>
                              <Button variant="ghost" size="sm" asChild>
                                <a href="/therapeutic-areas/radiology">
                                  <ArrowRight className="h-4 w-4" />
                                  <span className="sr-only">View</span>
                                </a>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Common Indications</CardTitle>
                          <CardDescription>Diseases and conditions treated in this area</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-md border p-3">
                              <h4 className="font-medium">Breast Cancer</h4>
                              <p className="text-sm text-muted-foreground mt-1">142 approved products</p>
                            </div>
                            <div className="rounded-md border p-3">
                              <h4 className="font-medium">Lung Cancer</h4>
                              <p className="text-sm text-muted-foreground mt-1">98 approved products</p>
                            </div>
                            <div className="rounded-md border p-3">
                              <h4 className="font-medium">Colorectal Cancer</h4>
                              <p className="text-sm text-muted-foreground mt-1">76 approved products</p>
                            </div>
                            <div className="rounded-md border p-3">
                              <h4 className="font-medium">Leukemia</h4>
                              <p className="text-sm text-muted-foreground mt-1">64 approved products</p>
                            </div>
                            <div className="rounded-md border p-3">
                              <h4 className="font-medium">Lymphoma</h4>
                              <p className="text-sm text-muted-foreground mt-1">58 approved products</p>
                            </div>
                            <div className="rounded-md border p-3">
                              <h4 className="font-medium">Melanoma</h4>
                              <p className="text-sm text-muted-foreground mt-1">42 approved products</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="md:col-span-2">
                        <CardHeader>
                          <CardTitle>Treatment Approaches</CardTitle>
                          <CardDescription>Common therapeutic modalities in {therapeuticArea.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="rounded-md border p-4">
                              <h4 className="font-medium mb-2">Chemotherapy</h4>
                              <p className="text-sm text-muted-foreground">
                                Traditional cytotoxic agents that target rapidly dividing cells. Includes alkylating
                                agents, antimetabolites, and taxanes.
                              </p>
                              <div className="mt-3">
                                <Badge>187 products</Badge>
                              </div>
                            </div>
                            <div className="rounded-md border p-4">
                              <h4 className="font-medium mb-2">Targeted Therapy</h4>
                              <p className="text-sm text-muted-foreground">
                                Drugs that target specific molecular pathways involved in cancer growth. Includes kinase
                                inhibitors and monoclonal antibodies.
                              </p>
                              <div className="mt-3">
                                <Badge>156 products</Badge>
                              </div>
                            </div>
                            <div className="rounded-md border p-4">
                              <h4 className="font-medium mb-2">Immunotherapy</h4>
                              <p className="text-sm text-muted-foreground">
                                Treatments that enhance the body's immune response against cancer cells. Includes
                                checkpoint inhibitors and CAR-T therapies.
                              </p>
                              <div className="mt-3">
                                <Badge>94 products</Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
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

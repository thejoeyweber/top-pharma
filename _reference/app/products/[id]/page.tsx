import { AppSidebar } from "../../../components/app-sidebar"
import { SiteHeader } from "../../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { EntityHeader } from "../../../components/entity-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductOverview } from "../../../components/product-overview"
import { ProductIndications } from "../../../components/product-indications"
import { ProductClinicalData } from "../../../components/product-clinical-data"
import { ProductRegulatory } from "../../../components/product-regulatory"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Timeline, TimelineItem } from "@/components/ui/timeline"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Share2, Star, Bell, Bookmark } from "lucide-react"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the product data based on the ID
  const product = {
    id: params.id,
    name: "Lipitor",
    image: "/placeholder.svg?height=100&width=100",
    description:
      "Lipitor (atorvastatin) belongs to a group of drugs called HMG CoA reductase inhibitors, or 'statins.' Atorvastatin reduces levels of 'bad' cholesterol (low-density lipoprotein, or LDL) and triglycerides in the blood, while increasing levels of 'good' cholesterol (high-density lipoprotein, or HDL).",
    company: "Pfizer",
    companyId: "1",
    genericName: "Atorvastatin",
    moleculeType: "Small Molecule",
    adminRoute: "Oral",
    firstApproval: "1996",
    stage: "Marketed",
    type: "Small Molecule",
    indications: ["Hypercholesterolemia", "Cardiovascular Disease"],
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
                    title={product.name}
                    description={product.description}
                    image={product.image}
                    type="product"
                    tags={[
                      { label: product.stage, variant: "default" },
                      { label: product.type, variant: "outline" },
                    ]}
                    ctaLabel="Visit Product Website"
                    ctaUrl={`https://${product.name.toLowerCase()}.com`}
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
                    <TabsTrigger value="indications">Indications</TabsTrigger>
                    <TabsTrigger value="clinical-data">Clinical Data</TabsTrigger>
                    <TabsTrigger value="regulatory">Regulatory</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="websites">Websites</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <ProductOverview product={product} />
                  </TabsContent>
                  <TabsContent value="indications">
                    <ProductIndications productId={product.id} />
                  </TabsContent>
                  <TabsContent value="clinical-data">
                    <ProductClinicalData productId={product.id} />
                  </TabsContent>
                  <TabsContent value="regulatory">
                    <ProductRegulatory productId={product.id} />
                  </TabsContent>
                  <TabsContent value="timeline">
                    <Card>
                      <CardHeader>
                        <CardTitle>Product Timeline</CardTitle>
                        <CardDescription>Key milestones in the history of {product.name}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Timeline>
                          <TimelineItem
                            title="Initial FDA Approval"
                            date="December 17, 1996"
                            description="Approved for treatment of hypercholesterolemia and mixed dyslipidemia"
                          />
                          <TimelineItem
                            title="European Approval"
                            date="March 5, 1997"
                            description="Received marketing authorization in the European Union"
                          />
                          <TimelineItem
                            title="Indication Expansion"
                            date="July 12, 2004"
                            description="Approval for primary prevention of cardiovascular disease"
                          />
                          <TimelineItem
                            title="Pediatric Approval"
                            date="November 18, 2008"
                            description="Approved for use in pediatric patients with familial hypercholesterolemia"
                          />
                          <TimelineItem
                            title="Patent Expiration"
                            date="May 28, 2012"
                            description="Loss of patent exclusivity in the United States"
                          />
                          <TimelineItem
                            title="Generic Competition"
                            date="June 2012"
                            description="First generic versions enter the market"
                          />
                          <TimelineItem
                            title="New Formulation"
                            date="March 2015"
                            description="Introduction of new extended-release formulation"
                          />
                          <TimelineItem
                            title="Combination Product"
                            date="October 2018"
                            description="Launch of combination product with ezetimibe"
                          />
                        </Timeline>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  <TabsContent value="websites">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Product Websites</CardTitle>
                          <CardDescription>Official online presence for {product.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Website</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Region</TableHead>
                                <TableHead>Language</TableHead>
                                <TableHead>Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">lipitor.com</TableCell>
                                <TableCell>
                                  <Badge variant="outline">Brand</Badge>
                                </TableCell>
                                <TableCell>Global</TableCell>
                                <TableCell>English</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" asChild>
                                    <a href="https://lipitor.com" target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                      <span className="sr-only">Visit</span>
                                    </a>
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">lipitor.co.uk</TableCell>
                                <TableCell>
                                  <Badge variant="outline">Brand</Badge>
                                </TableCell>
                                <TableCell>UK</TableCell>
                                <TableCell>English</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" asChild>
                                    <a href="https://lipitor.co.uk" target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                      <span className="sr-only">Visit</span>
                                    </a>
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">atorvastatin.info</TableCell>
                                <TableCell>
                                  <Badge variant="outline">Generic</Badge>
                                </TableCell>
                                <TableCell>Global</TableCell>
                                <TableCell>English</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" asChild>
                                    <a href="https://atorvastatin.info" target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                      <span className="sr-only">Visit</span>
                                    </a>
                                  </Button>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">lipitor-hcp.com</TableCell>
                                <TableCell>
                                  <Badge variant="outline">HCP</Badge>
                                </TableCell>
                                <TableCell>US</TableCell>
                                <TableCell>English</TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" asChild>
                                    <a href="https://lipitor-hcp.com" target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                      <span className="sr-only">Visit</span>
                                    </a>
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Digital Presence Analysis</CardTitle>
                          <CardDescription>Online visibility metrics for {product.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Search Engine Visibility</h4>
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <div className="text-xs text-muted-foreground mb-1">Google Ranking</div>
                                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: "85%" }}></div>
                                  </div>
                                </div>
                                <div className="text-sm font-medium">85/100</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2">Social Media Presence</h4>
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <div className="text-xs text-muted-foreground mb-1">Engagement Score</div>
                                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: "62%" }}></div>
                                  </div>
                                </div>
                                <div className="text-sm font-medium">62/100</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2">Content Quality</h4>
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <div className="text-xs text-muted-foreground mb-1">Information Completeness</div>
                                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: "78%" }}></div>
                                  </div>
                                </div>
                                <div className="text-sm font-medium">78/100</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2">User Experience</h4>
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <div className="text-xs text-muted-foreground mb-1">Mobile Responsiveness</div>
                                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: "91%" }}></div>
                                  </div>
                                </div>
                                <div className="text-sm font-medium">91/100</div>
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

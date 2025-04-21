import { AppSidebar } from "../../../components/app-sidebar"
import { SiteHeader } from "../../../components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { EntityHeader } from "../../../components/entity-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CompanyOverview } from "../../../components/company-overview"
import { CompanyProducts } from "../../../components/company-products"
import { CompanyWebsites } from "../../../components/company-websites"
import { CompanyFinancials } from "../../../components/company-financials"
import { NewsFeed } from "../../../components/news-feed"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Timeline, TimelineItem } from "@/components/ui/timeline"
import { RelationshipGraph } from "@/components/relationship-graph"
import { Button } from "@/components/ui/button"
import { Download, Share2, Star, Bell, Bookmark, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the company data based on the ID
  const company = {
    id: params.id,
    name: "Pfizer",
    logo: "/placeholder.svg?height=100&width=100",
    description:
      "Pfizer Inc. is an American multinational pharmaceutical and biotechnology corporation headquartered in Manhattan, New York City. The company was established in 1849 in New York by German-American cousins Charles Pfizer and Charles F. Erhart.",
    founded: "1849",
    marketCap: "$240B",
    employees: "78,500",
    headquarters: "New York, USA",
    website: "pfizer.com",
    type: "Large Cap",
    status: "Public",
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
                    title={company.name}
                    description={company.description}
                    image={company.logo}
                    type="company"
                    tags={[
                      { label: company.type, variant: "outline" },
                      { label: company.status, variant: "outline" },
                    ]}
                    ctaLabel="Visit Website"
                    ctaUrl={`https://${company.website}`}
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
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                    <TabsTrigger value="websites">Websites</TabsTrigger>
                    <TabsTrigger value="financials">Financials</TabsTrigger>
                    <TabsTrigger value="news">News & Events</TabsTrigger>
                    <TabsTrigger value="relationships">Relationships</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <CompanyOverview company={company} />
                  </TabsContent>
                  <TabsContent value="products">
                    <CompanyProducts companyId={company.id} />
                  </TabsContent>
                  <TabsContent value="pipeline">
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle>Pipeline Overview</CardTitle>
                          <CardDescription>Current development pipeline for {company.name}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge>Phase I</Badge>
                                <span className="text-sm font-medium">12 candidates</span>
                              </div>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge>Phase II</Badge>
                                <span className="text-sm font-medium">8 candidates</span>
                              </div>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge>Phase III</Badge>
                                <span className="text-sm font-medium">5 candidates</span>
                              </div>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Badge>Registration</Badge>
                                <span className="text-sm font-medium">3 candidates</span>
                              </div>
                              <Button variant="ghost" size="sm" className="gap-1">
                                <ChevronRight className="h-4 w-4" />
                                <span className="sr-only">View details</span>
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Recent Pipeline Updates</CardTitle>
                          <CardDescription>Latest changes to development pipeline</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Timeline>
                            <TimelineItem
                              title="PF-06939926 Phase III Trial"
                              date="June 5, 2023"
                              description="Initiated Phase III trial for Duchenne muscular dystrophy gene therapy"
                            />
                            <TimelineItem
                              title="PF-07321332 FDA Approval"
                              date="May 12, 2023"
                              description="Received FDA approval for COVID-19 oral antiviral treatment"
                            />
                            <TimelineItem
                              title="PF-06826647 Phase II Results"
                              date="April 28, 2023"
                              description="Positive Phase II results for TYK2 inhibitor in psoriasis"
                            />
                            <TimelineItem
                              title="PF-06882961 Phase I Completion"
                              date="March 15, 2023"
                              description="Completed Phase I trials for GLP-1 receptor agonist for diabetes"
                            />
                          </Timeline>
                        </CardContent>
                      </Card>

                      <Card className="md:col-span-2">
                        <CardHeader>
                          <CardTitle>Pipeline by Therapeutic Area</CardTitle>
                          <CardDescription>Distribution of pipeline candidates by therapeutic area</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Therapeutic Area</TableHead>
                                <TableHead>Phase I</TableHead>
                                <TableHead>Phase II</TableHead>
                                <TableHead>Phase III</TableHead>
                                <TableHead>Registration</TableHead>
                                <TableHead>Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">Oncology</TableCell>
                                <TableCell>4</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>10</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Immunology</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>7</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Rare Diseases</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>4</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Vaccines</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>5</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">Internal Medicine</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>2</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="websites">
                    <CompanyWebsites companyId={company.id} />
                  </TabsContent>
                  <TabsContent value="financials">
                    <CompanyFinancials companyId={company.id} />
                  </TabsContent>
                  <TabsContent value="news">
                    <div className="grid gap-6 md:grid-cols-2">
                      <NewsFeed companyId={company.id} />
                      <div className="space-y-6">
                        <Card>
                          <CardHeader>
                            <CardTitle>Press Releases</CardTitle>
                            <CardDescription>Official announcements from {company.name}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <Timeline>
                              <TimelineItem
                                title="Q1 2023 Financial Results"
                                date="April 15, 2023"
                                description="Pfizer reports strong Q1 performance with revenue growth across key therapeutic areas."
                              />
                              <TimelineItem
                                title="New Leadership Appointment"
                                date="March 10, 2023"
                                description="Pfizer announces new Chief Scientific Officer to lead research initiatives."
                              />
                              <TimelineItem
                                title="Manufacturing Expansion"
                                date="February 5, 2023"
                                description="$500M investment to expand manufacturing capabilities in Europe and Asia."
                              />
                            </Timeline>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="relationships">
                    <RelationshipGraph />
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

"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowUpDown, ChevronDown, ChevronUp, Download, Plus, Share2, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CompanyData {
  id: string
  name: string
  logo: string
  type: string
  headquarters: string
  founded: string
  employees: string
  revenue: string
  marketCap: string
  products: number
  pipeline: number
  therapeuticAreas: string[]
  revenueGrowth: number
  profitMargin: number
  rdExpense: string
  website: string
}

const companyData: CompanyData[] = [
  {
    id: "pfizer",
    name: "Pfizer Inc.",
    logo: "/placeholder.svg?height=40&width=40",
    type: "Large Cap",
    headquarters: "New York, USA",
    founded: "1849",
    employees: "78,500",
    revenue: "$81.3B",
    marketCap: "$240B",
    products: 96,
    pipeline: 89,
    therapeuticAreas: ["Oncology", "Vaccines", "Immunology", "Rare Disease", "Internal Medicine"],
    revenueGrowth: 23.4,
    profitMargin: 31.2,
    rdExpense: "$10.5B",
    website: "pfizer.com",
  },
  {
    id: "novartis",
    name: "Novartis AG",
    logo: "/placeholder.svg?height=40&width=40",
    type: "Large Cap",
    headquarters: "Basel, Switzerland",
    founded: "1996",
    employees: "108,000",
    revenue: "$51.6B",
    marketCap: "$205B",
    products: 72,
    pipeline: 143,
    therapeuticAreas: ["Oncology", "Neuroscience", "Immunology", "Cardiovascular", "Ophthalmology"],
    revenueGrowth: 4.2,
    profitMargin: 24.8,
    rdExpense: "$9.1B",
    website: "novartis.com",
  },
  {
    id: "roche",
    name: "Roche Holding AG",
    logo: "/placeholder.svg?height=40&width=40",
    type: "Large Cap",
    headquarters: "Basel, Switzerland",
    founded: "1896",
    employees: "101,000",
    revenue: "$63.7B",
    marketCap: "$278B",
    products: 83,
    pipeline: 167,
    therapeuticAreas: ["Oncology", "Neuroscience", "Immunology", "Infectious Diseases", "Ophthalmology"],
    revenueGrowth: 1.5,
    profitMargin: 27.9,
    rdExpense: "$13.7B",
    website: "roche.com",
  },
  {
    id: "merck",
    name: "Merck & Co.",
    logo: "/placeholder.svg?height=40&width=40",
    type: "Large Cap",
    headquarters: "Kenilworth, USA",
    founded: "1891",
    employees: "74,000",
    revenue: "$59.3B",
    marketCap: "$230B",
    products: 57,
    pipeline: 76,
    therapeuticAreas: ["Oncology", "Vaccines", "Infectious Diseases", "Cardiovascular", "Diabetes"],
    revenueGrowth: 16.8,
    profitMargin: 29.1,
    rdExpense: "$12.2B",
    website: "merck.com",
  },
  {
    id: "astrazeneca",
    name: "AstraZeneca PLC",
    logo: "/placeholder.svg?height=40&width=40",
    type: "Large Cap",
    headquarters: "Cambridge, UK",
    founded: "1999",
    employees: "83,100",
    revenue: "$44.4B",
    marketCap: "$215B",
    products: 64,
    pipeline: 183,
    therapeuticAreas: ["Oncology", "Respiratory", "Cardiovascular", "Renal", "Metabolism"],
    revenueGrowth: 41.5,
    profitMargin: 15.3,
    rdExpense: "$9.7B",
    website: "astrazeneca.com",
  },
]

export function EntityComparison() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>(["pfizer", "novartis", "merck"])
  const [sortField, setSortField] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [comparisonType, setComparisonType] = useState<string>("financial")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const sortedCompanies = selectedCompanies
    .map((id) => companyData.find((company) => company.id === id))
    .filter(Boolean) as CompanyData[]
  \
    .sort((a, b) =>
  {
    let aValue: any = a[sortField as keyof CompanyData]
    let bValue: any = b[sortField as keyof CompanyData]

    // Handle special cases for sorting
    if (sortField === "revenue" || sortField === "marketCap" || sortField === "rdExpense") {
      aValue = Number.parseFloat(aValue.replace(/[^0-9.]/g, ""))
      bValue = Number.parseFloat(bValue.replace(/[^0-9.]/g, ""))
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  }
  )

  const availableCompanies = companyData.filter((company) => !selectedCompanies.includes(company.id))

  const handleAddCompany = (id: string) => {
    if (selectedCompanies.length < 5) {
      setSelectedCompanies([...selectedCompanies, id])
    }
  }

  const handleRemoveCompany = (id: string) => {
    setSelectedCompanies(selectedCompanies.filter((companyId) => companyId !== id))
  }

  const renderSortIcon = (field: string) => {
    if (sortField !== field) return <ArrowUpDown className="h-4 w-4" />
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Company Comparison</CardTitle>
            <CardDescription>Compare key metrics across pharmaceutical companies</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={comparisonType} onValueChange={setComparisonType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Comparison type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financial">Financial Metrics</SelectItem>
                <SelectItem value="pipeline">Pipeline Analysis</SelectItem>
                <SelectItem value="products">Product Portfolio</SelectItem>
                <SelectItem value="research">R&D Focus</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share comparison
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {selectedCompanies.length < 5 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Company
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {availableCompanies.map((company) => (
                    <DropdownMenuItem key={company.id} onClick={() => handleAddCompany(company.id)}>
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                        <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      {company.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {sortedCompanies.map((company) => (
              <Badge key={company.id} variant="outline" className="flex items-center gap-1 px-3 py-1">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                  <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <span>{company.name}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-1 hover:bg-transparent"
                  onClick={() => handleRemoveCompany(company.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]" onClick={() => handleSort("name")}>
                    <div className="flex items-center gap-1 cursor-pointer">Company {renderSortIcon("name")}</div>
                  </TableHead>

                  {comparisonType === "financial" && (
                    <>
                      <TableHead onClick={() => handleSort("revenue")}>
                        <div className="flex items-center gap-1 cursor-pointer">
                          Revenue {renderSortIcon("revenue")}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort("marketCap")}>
                        <div className="flex items-center gap-1 cursor-pointer">
                          Market Cap {renderSortIcon("marketCap")}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort("revenueGrowth")}>
                        <div className="flex items-center gap-1 cursor-pointer">
                          Growth {renderSortIcon("revenueGrowth")}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort("profitMargin")}>
                        <div className="flex items-center gap-1 cursor-pointer">
                          Margin {renderSortIcon("profitMargin")}
                        </div>
                      </TableHead>
                      <TableHead onClick={() => handleSort("rdExpense")}>
                        <div className="flex items-center gap-1 cursor-pointer">
                          R&D Expense {renderSortIcon("rdExpense")}
                        </div>
                      </TableHead>
                    </>
                  )}

                  {comparisonType === "pipeline" && (
                    <>
                      <TableHead onClick={() => handleSort("pipeline")}>
                        <div className="flex items-center gap-1 cursor-pointer">
                          Pipeline Assets {renderSortIcon("pipeline")}
                        </div>
                      </TableHead>
                      <TableHead>Phase 1</TableHead>
                      <TableHead>Phase 2</TableHead>
                      <TableHead>Phase 3</TableHead>
                      <TableHead>Filed</TableHead>
                    </>
                  )}

                  {comparisonType === "products" && (
                    <>
                      <TableHead onClick={() => handleSort("products")}>
                        <div className="flex items-center gap-1 cursor-pointer">
                          Products {renderSortIcon("products")}
                        </div>
                      </TableHead>
                      <TableHead>Blockbusters</TableHead>
                      <TableHead>Patent Expiry</TableHead>
                      <TableHead>New Launches</TableHead>
                      <TableHead>Top Therapeutic Areas</TableHead>
                    </>
                  )}

                  {comparisonType === "research" && (
                    <>
                      <TableHead onClick={() => handleSort("rdExpense")}>
                        <div className="flex items-center gap-1 cursor-pointer">
                          R&D Expense {renderSortIcon("rdExpense")}
                        </div>
                      </TableHead>
                      <TableHead>R&D as % of Revenue</TableHead>
                      <TableHead>Focus Areas</TableHead>
                      <TableHead>Collaborations</TableHead>
                      <TableHead>Innovation Index</TableHead>
                    </>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCompanies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                          <AvatarFallback>{company.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <Link href={`/companies/${company.id}`} className="hover:underline">
                          {company.name}
                        </Link>
                      </div>
                    </TableCell>

                    {comparisonType === "financial" && (
                      <>
                        <TableCell>{company.revenue}</TableCell>
                        <TableCell>{company.marketCap}</TableCell>
                        <TableCell className={company.revenueGrowth > 0 ? "text-green-600" : "text-red-600"}>
                          {company.revenueGrowth > 0 ? "+" : ""}
                          {company.revenueGrowth}%
                        </TableCell>
                        <TableCell>{company.profitMargin}%</TableCell>
                        <TableCell>{company.rdExpense}</TableCell>
                      </>
                    )}

                    {comparisonType === "pipeline" && (
                      <>
                        <TableCell>{company.pipeline}</TableCell>
                        <TableCell>{Math.floor(company.pipeline * 0.3)}</TableCell>
                        <TableCell>{Math.floor(company.pipeline * 0.4)}</TableCell>
                        <TableCell>{Math.floor(company.pipeline * 0.2)}</TableCell>
                        <TableCell>{Math.floor(company.pipeline * 0.1)}</TableCell>
                      </>
                    )}

                    {comparisonType === "products" && (
                      <>
                        <TableCell>{company.products}</TableCell>
                        <TableCell>{Math.floor(company.products * 0.15)}</TableCell>
                        <TableCell>{Math.floor(Math.random() * 10) + 1} in next 5 years</TableCell>
                        <TableCell>{Math.floor(company.products * 0.08)} in past year</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {company.therapeuticAreas.slice(0, 3).map((area) => (
                              <Badge key={area} variant="outline" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                      </>
                    )}

                    {comparisonType === "research" && (
                      <>
                        <TableCell>{company.rdExpense}</TableCell>
                        <TableCell>
                          {Math.round(
                            (Number.parseFloat(company.rdExpense.replace(/[^0-9.]/g, "")) /
                              Number.parseFloat(company.revenue.replace(/[^0-9.]/g, ""))) *
                              100,
                          )}
                          %
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {company.therapeuticAreas.slice(0, 2).map((area) => (
                              <Badge key={area} variant="outline" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{Math.floor(Math.random() * 20) + 10} active</TableCell>
                        <TableCell>{["High", "Medium", "Very High"][Math.floor(Math.random() * 3)]}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          Reset Comparison
        </Button>
        <Button size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </CardFooter>
    </Card>
  )
}

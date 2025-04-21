"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Command as CommandPrimitive } from "cmdk"
import {
  Search,
  FileText,
  Building,
  Pill,
  Activity,
  Globe,
  Calendar,
  Star,
  Filter,
  X,
  ChevronDown,
  Save,
  History,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SearchResult {
  id: string
  title: string
  type: "company" | "product" | "therapeutic" | "website" | "report" | "event"
  subtitle?: string
  url: string
  tags?: string[]
  date?: string
  isNew?: boolean
  isSaved?: boolean
}

const recentSearches = [
  "oncology market trends",
  "pfizer pipeline",
  "diabetes products",
  "merck keytruda",
  "covid-19 vaccines",
]

const savedSearches = [
  {
    name: "Top Oncology Companies",
    query: "companies therapeutic:oncology revenue:>1B",
    filters: { type: "company", therapeuticArea: "oncology", revenue: ">1B" },
  },
  {
    name: "Upcoming Drug Approvals",
    query: "products status:pending approval:2023",
    filters: { type: "product", status: "pending", approvalYear: "2023" },
  },
  {
    name: "Diabetes Market Leaders",
    query: "companies products:diabetes market-share:>5%",
    filters: { type: "company", productArea: "diabetes", marketShare: ">5%" },
  },
]

const searchResults: SearchResult[] = [
  {
    id: "1",
    title: "Pfizer Inc.",
    type: "company",
    subtitle: "Global pharmaceutical company headquartered in New York",
    url: "/companies/pfizer",
    tags: ["Large Cap", "USA", "NYSE: PFE"],
  },
  {
    id: "2",
    title: "Keytruda",
    type: "product",
    subtitle: "Pembrolizumab - Merck's immunotherapy treatment",
    url: "/products/keytruda",
    tags: ["Oncology", "Immunotherapy", "Blockbuster"],
    isNew: true,
  },
  {
    id: "3",
    title: "Oncology",
    type: "therapeutic",
    subtitle: "Cancer treatment therapeutic area",
    url: "/therapeutic-areas/oncology",
    tags: ["Cancer", "Immunotherapy", "Targeted Therapy"],
  },
  {
    id: "4",
    title: "pfizer.com",
    type: "website",
    subtitle: "Official corporate website of Pfizer Inc.",
    url: "/websites/pfizer",
    tags: ["Corporate", "English", "Global"],
  },
  {
    id: "5",
    title: "Oncology Market Trends 2023",
    type: "report",
    subtitle: "Comprehensive analysis of the global oncology market",
    url: "/reports/oncology-market-trends-2023",
    tags: ["Market Analysis", "Forecasting", "Competitive Landscape"],
    date: "2023-03-15",
    isNew: true,
  },
  {
    id: "6",
    title: "BIO International Convention 2023",
    type: "event",
    subtitle: "Global biotechnology conference in Boston",
    url: "/events/bio-international-2023",
    tags: ["Conference", "Networking", "Boston"],
    date: "2023-06-05",
  },
  {
    id: "7",
    title: "Novartis AG",
    type: "company",
    subtitle: "Swiss multinational pharmaceutical company",
    url: "/companies/novartis",
    tags: ["Large Cap", "Switzerland", "NYSE: NVS"],
  },
  {
    id: "8",
    title: "Ozempic",
    type: "product",
    subtitle: "Semaglutide - Novo Nordisk's GLP-1 receptor agonist",
    url: "/products/ozempic",
    tags: ["Diabetes", "Weight Management", "Blockbuster"],
  },
  {
    id: "9",
    title: "Diabetes",
    type: "therapeutic",
    subtitle: "Metabolic disorder therapeutic area",
    url: "/therapeutic-areas/diabetes",
    tags: ["Metabolic", "Chronic Disease", "Endocrinology"],
  },
  {
    id: "10",
    title: "Pharmaceutical R&D Investment Report",
    type: "report",
    subtitle: "Analysis of R&D spending trends in pharma",
    url: "/reports/pharma-rd-investment",
    tags: ["R&D", "Investment", "Innovation"],
    date: "2023-02-28",
  },
]

export function EnhancedSearch() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("all")
  const [showFilters, setShowFilters] = React.useState(false)
  const [filters, setFilters] = React.useState({
    types: {
      company: true,
      product: true,
      therapeutic: true,
      website: true,
      report: true,
      event: true,
    },
    date: "any",
    status: "any",
  })
  const [saveSearchOpen, setSaveSearchOpen] = React.useState(false)
  const [savedSearchName, setSavedSearchName] = React.useState("")

  // Handle keyboard shortcut to open search dialog
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(true)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false)
    command()
  }, [])

  const filteredResults = React.useMemo(() => {
    let results = searchResults

    // Filter by search query
    if (searchQuery) {
      results = results.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (result.subtitle && result.subtitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (result.tags && result.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))),
      )
    }

    // Filter by type
    results = results.filter((result) => filters.types[result.type])

    // Filter by tab
    if (activeTab !== "all") {
      results = results.filter((result) => result.type === activeTab)
    }

    // Filter by date
    if (filters.date === "new" && activeTab === "all") {
      results = results.filter((result) => result.isNew)
    }

    return results
  }, [searchQuery, activeTab, filters])

  const getResultIcon = (type: string) => {
    switch (type) {
      case "company":
        return <Building className="h-4 w-4" />
      case "product":
        return <Pill className="h-4 w-4" />
      case "therapeutic":
        return <Activity className="h-4 w-4" />
      case "website":
        return <Globe className="h-4 w-4" />
      case "report":
        return <FileText className="h-4 w-4" />
      case "event":
        return <Calendar className="h-4 w-4" />
      default:
        return <Search className="h-4 w-4" />
    }
  }

  const handleSaveSearch = () => {
    // In a real app, this would save the search to the user's profile
    console.log("Saving search:", {
      name: savedSearchName,
      query: searchQuery,
      filters,
    })
    setSaveSearchOpen(false)
    setSavedSearchName("")
  }

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-sm text-muted-foreground md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search everything...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="gap-0 p-0 outline-none sm:max-w-xl">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandPrimitive
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search everything..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            {searchQuery && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSearchQuery("")}>
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
            <div className="flex items-center gap-1 pl-2">
              <Popover open={showFilters} onOpenChange={setShowFilters}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-8 w-8", showFilters && "bg-accent text-accent-foreground")}
                  >
                    <Filter className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="end" side="bottom">
                  <div className="p-2">
                    <h4 className="font-medium text-sm mb-2">Filter by type</h4>
                    <div className="space-y-2">
                      {Object.keys(filters.types).map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`filter-${type}`}
                            checked={filters.types[type]}
                            onCheckedChange={(checked) => {
                              setFilters({
                                ...filters,
                                types: {
                                  ...filters.types,
                                  [type]: !!checked,
                                },
                              })
                            }}
                          />
                          <label
                            htmlFor={`filter-${type}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>

                    <h4 className="font-medium text-sm mt-4 mb-2">Date added</h4>
                    <div className="space-y-2">
                      {["any", "new", "last week", "last month"].map((dateOption) => (
                        <div key={dateOption} className="flex items-center space-x-2">
                          <Checkbox
                            id={`date-${dateOption}`}
                            checked={filters.date === dateOption}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters({
                                  ...filters,
                                  date: dateOption,
                                })
                              }
                            }}
                          />
                          <label
                            htmlFor={`date-${dateOption}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                          >
                            {dateOption}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between mt-4 pt-4 border-t">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setFilters({
                            types: {
                              company: true,
                              product: true,
                              therapeutic: true,
                              website: true,
                              report: true,
                              event: true,
                            },
                            date: "any",
                            status: "any",
                          })
                        }}
                      >
                        Reset
                      </Button>
                      <Button size="sm" onClick={() => setShowFilters(false)}>
                        Apply
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSaveSearchOpen(true)}>
                <Save className="h-4 w-4" />
                <span className="sr-only">Save search</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b">
              <TabsList className="h-12 px-2 bg-transparent">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-3"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="company"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-3"
                >
                  Companies
                </TabsTrigger>
                <TabsTrigger
                  value="product"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-3"
                >
                  Products
                </TabsTrigger>
                <TabsTrigger
                  value="therapeutic"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-3"
                >
                  Therapeutic
                </TabsTrigger>
                <TabsTrigger
                  value="report"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-3"
                >
                  Reports
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="min-h-[300px] max-h-[60vh]">
              {!searchQuery && (
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <History className="h-4 w-4 mr-1" /> Recent Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search) => (
                        <Badge
                          key={search}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => setSearchQuery(search)}
                        >
                          {search}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2 flex items-center">
                      <Star className="h-4 w-4 mr-1" /> Saved Searches
                    </h3>
                    <div className="space-y-2">
                      {savedSearches.map((search) => (
                        <div
                          key={search.name}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-accent cursor-pointer"
                          onClick={() => setSearchQuery(search.query)}
                        >
                          <div>
                            <div className="font-medium text-sm">{search.name}</div>
                            <div className="text-xs text-muted-foreground">{search.query}</div>
                          </div>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {searchQuery && filteredResults.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
                  <Search className="h-8 w-8 mb-2 text-muted-foreground" />
                  <h3 className="font-medium text-lg">No results found</h3>
                  <p className="text-muted-foreground text-sm max-w-md">
                    We couldn't find anything matching "{searchQuery}". Try adjusting your search terms or filters.
                  </p>
                </div>
              )}

              {searchQuery && filteredResults.length > 0 && (
                <ScrollArea className="h-[300px]">
                  <div className="p-2">
                    {filteredResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-start gap-3 p-2 rounded-md hover:bg-accent cursor-pointer"
                        onClick={() => runCommand(() => router.push(result.url))}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-md border bg-background">
                          {getResultIcon(result.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{result.title}</span>
                            {result.isNew && (
                              <Badge variant="default" className="text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          {result.subtitle && (
                            <p className="text-sm text-muted-foreground line-clamp-1">{result.subtitle}</p>
                          )}
                          {result.tags && result.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {result.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <Badge variant="secondary" className="capitalize text-xs">
                          {result.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </Tabs>

          <div className="border-t p-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex gap-2">
                <kbd className="rounded border bg-muted px-1.5 font-mono">↑</kbd>
                <kbd className="rounded border bg-muted px-1.5 font-mono">↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex gap-2">
                <kbd className="rounded border bg-muted px-1.5 font-mono">Enter</kbd>
                <span>Select</span>
              </div>
              <div className="flex gap-2">
                <kbd className="rounded border bg-muted px-1.5 font-mono">Esc</kbd>
                <span>Close</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={saveSearchOpen} onOpenChange={setSaveSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Save search</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label
                htmlFor="search-name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Search name
              </label>
              <Input
                id="search-name"
                placeholder="My saved search"
                value={savedSearchName}
                onChange={(e) => setSavedSearchName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Search query
              </label>
              <div className="rounded-md border px-3 py-2 text-sm">{searchQuery || "No search query"}</div>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setSaveSearchOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSearch} disabled={!savedSearchName}>
              Save search
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

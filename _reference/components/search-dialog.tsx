"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import type { DialogProps } from "@radix-ui/react-dialog"
import { Command as CommandPrimitive } from "cmdk"
import { Search, FileText, Building, Pill, Activity, Globe, BarChart3, Calendar } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function SearchDialog({ open, onOpenChange }: DialogProps) {
  const router = useRouter()
  const [value, setValue] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("all")

  // Handle keyboard shortcut to open search dialog
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange?.(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onOpenChange, open])

  const runCommand = React.useCallback(
    (command: () => void) => {
      onOpenChange?.(false)
      command()
    },
    [onOpenChange],
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 outline-none">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <CommandPrimitive
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Search everything..."
            value={value}
            onValueChange={setValue}
          />
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-7 p-1">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="therapeutic">Therapeutic</TabsTrigger>
            <TabsTrigger value="websites">Websites</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>

          <div className="max-h-[50vh] overflow-y-auto">
            <TabsContent value="all">
              <CommandPrimitive.Group className="text-sm" heading="Companies">
                {["Pfizer", "Novartis", "Roche", "Merck", "AstraZeneca", "Johnson & Johnson"].map((company) => (
                  <CommandPrimitive.Item
                    key={company}
                    value={company}
                    onSelect={() => runCommand(() => router.push(`/companies/${company.toLowerCase()}`))}
                    className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-default hover:bg-accent"
                  >
                    <Building className="mr-2 h-4 w-4" />
                    <span>{company}</span>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
              <CommandPrimitive.Group className="text-sm" heading="Products">
                {["Lipitor", "Humira", "Keytruda", "Ozempic", "Eliquis", "Jardiance"].map((product) => (
                  <CommandPrimitive.Item
                    key={product}
                    value={product}
                    onSelect={() => runCommand(() => router.push(`/products/${product.toLowerCase()}`))}
                    className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-default hover:bg-accent"
                  >
                    <Pill className="mr-2 h-4 w-4" />
                    <span>{product}</span>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
              <CommandPrimitive.Group className="text-sm" heading="Therapeutic Areas">
                {["Oncology", "Neurology", "Cardiology", "Immunology", "Infectious Diseases"].map((area) => (
                  <CommandPrimitive.Item
                    key={area}
                    value={area}
                    onSelect={() => runCommand(() => router.push(`/therapeutic-areas/${area.toLowerCase()}`))}
                    className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-default hover:bg-accent"
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    <span>{area}</span>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
              <CommandPrimitive.Group className="text-sm" heading="Reports">
                {["Market Overview", "Pipeline Analysis", "Competitive Landscape", "Regulatory Trends"].map(
                  (report) => (
                    <CommandPrimitive.Item
                      key={report}
                      value={report}
                      onSelect={() =>
                        runCommand(() => router.push(`/reports/${report.toLowerCase().replace(/\s+/g, "-")}`))
                      }
                      className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-default hover:bg-accent"
                    >
                      <BarChart3 className="mr-2 h-4 w-4" />
                      <span>{report}</span>
                    </CommandPrimitive.Item>
                  ),
                )}
              </CommandPrimitive.Group>
            </TabsContent>

            <TabsContent value="companies">
              <CommandPrimitive.Group className="text-sm">
                {[
                  "Pfizer",
                  "Novartis",
                  "Roche",
                  "Merck",
                  "AstraZeneca",
                  "Johnson & Johnson",
                  "Bristol Myers Squibb",
                  "Sanofi",
                  "GlaxoSmithKline",
                  "Eli Lilly",
                ].map((company) => (
                  <CommandPrimitive.Item
                    key={company}
                    value={company}
                    onSelect={() => runCommand(() => router.push(`/companies/${company.toLowerCase()}`))}
                    className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-default hover:bg-accent"
                  >
                    <Building className="mr-2 h-4 w-4" />
                    <span>{company}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      Company
                    </Badge>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            </TabsContent>

            <TabsContent value="products">
              <CommandPrimitive.Group className="text-sm">
                {[
                  "Lipitor",
                  "Humira",
                  "Keytruda",
                  "Ozempic",
                  "Eliquis",
                  "Jardiance",
                  "Dupixent",
                  "Revlimid",
                  "Xarelto",
                  "Imbruvica",
                ].map((product) => (
                  <CommandPrimitive.Item
                    key={product}
                    value={product}
                    onSelect={() => runCommand(() => router.push(`/products/${product.toLowerCase()}`))}
                    className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-default hover:bg-accent"
                  >
                    <Pill className="mr-2 h-4 w-4" />
                    <span>{product}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      Product
                    </Badge>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            </TabsContent>

            <TabsContent value="therapeutic">
              <CommandPrimitive.Group className="text-sm">
                {[
                  "Oncology",
                  "Neurology",
                  "Cardiology",
                  "Immunology",
                  "Infectious Diseases",
                  "Endocrinology",
                  "Respiratory",
                  "Gastroenterology",
                  "Hematology",
                  "Dermatology",
                ].map((area) => (
                  <CommandPrimitive.Item
                    key={area}
                    value={area}
                    onSelect={() => runCommand(() => router.push(`/therapeutic-areas/${area.toLowerCase()}`))}
                    className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-default hover:bg-accent"
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    <span>{area}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      Therapeutic Area
                    </Badge>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            </TabsContent>

            <TabsContent value="websites">
              <CommandPrimitive.Group className="text-sm">
                {[
                  "pfizer.com",
                  "novartis.com",
                  "roche.com",
                  "merck.com",
                  "astrazeneca.com",
                  "jnj.com",
                  "bms.com",
                  "sanofi.com",
                  "gsk.com",
                  "lilly.com",
                ].map((website) => (
                  <CommandPrimitive.Item
                    key={website}
                    value={website}
                    onSelect={() => runCommand(() => router.push(`/websites/${website.replace(".com", "")}`))}
                    className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-default hover:bg-accent"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    <span>{website}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      Website
                    </Badge>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            </TabsContent>

            <TabsContent value="reports">
              <CommandPrimitive.Group className="text-sm">
                {[
                  "Market Overview",
                  "Pipeline Analysis",
                  "Competitive Landscape",
                  "Regulatory Trends",
                  "Emerging Technologies",
                  "Pricing Analysis",
                  "Patent Expirations",
                  "M&A Activity",
                  "Clinical Trial Landscape",
                  "Market Access Strategies",
                ].map((report) => (
                  <CommandPrimitive.Item
                    key={report}
                    value={report}
                    onSelect={() =>
                      runCommand(() => router.push(`/reports/${report.toLowerCase().replace(/\s+/g, "-")}`))
                    }
                    className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-default hover:bg-accent"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{report}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      Report
                    </Badge>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            </TabsContent>

            <TabsContent value="events">
              <CommandPrimitive.Group className="text-sm">
                {[
                  "BIO International Convention",
                  "European Pharma Summit",
                  "Digital Health Innovation in Pharma",
                  "Clinical Trial Innovation Summit",
                  "Pharmaceutical Manufacturing Excellence",
                  "Global Pharma R&D Congress",
                  "AI in Drug Discovery Symposium",
                  "Regulatory Affairs Masterclass",
                  "Pharmaceutical Supply Chain Forum",
                  "Biopharma Sustainability Summit",
                ].map((event) => (
                  <CommandPrimitive.Item
                    key={event}
                    value={event}
                    onSelect={() =>
                      runCommand(() => router.push(`/events/${event.toLowerCase().replace(/\s+/g, "-")}`))
                    }
                    className="flex items-center px-2 py-1.5 text-sm rounded-sm cursor-default hover:bg-accent"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{event}</span>
                    <Badge variant="outline" className="ml-auto text-xs">
                      Event
                    </Badge>
                  </CommandPrimitive.Item>
                ))}
              </CommandPrimitive.Group>
            </TabsContent>
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
  )
}

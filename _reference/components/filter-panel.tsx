import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, SlidersIcon, GridIcon, ListIcon } from "lucide-react"

export function FilterPanel() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="pl-8 w-full md:w-80" />
        </div>
        <Button variant="outline" size="icon">
          <SlidersIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Select defaultValue="updated">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="updated">Last Updated</SelectItem>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="size">Size (Largest)</SelectItem>
            <SelectItem value="products">Products (Most)</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center rounded-md border">
          <Button variant="ghost" size="icon" className="rounded-r-none border-r">
            <GridIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-l-none">
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ExternalLink, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const data: Website[] = [
  {
    id: "1",
    domain: "pfizer.com",
    company: "Pfizer",
    type: "Corporate",
    ssl: true,
    lastCrawled: "2023-04-12T12:00:00.000Z",
    traffic: "High",
  },
  {
    id: "2",
    domain: "lipitor.com",
    company: "Pfizer",
    type: "Product",
    ssl: true,
    lastCrawled: "2023-04-10T12:00:00.000Z",
    traffic: "Medium",
  },
  {
    id: "3",
    domain: "novartis.com",
    company: "Novartis",
    type: "Corporate",
    ssl: true,
    lastCrawled: "2023-04-15T12:00:00.000Z",
    traffic: "High",
  },
  {
    id: "4",
    domain: "cosentyx.com",
    company: "Novartis",
    type: "Product",
    ssl: true,
    lastCrawled: "2023-04-11T12:00:00.000Z",
    traffic: "Medium",
  },
  {
    id: "5",
    domain: "merck.com",
    company: "Merck",
    type: "Corporate",
    ssl: true,
    lastCrawled: "2023-04-14T12:00:00.000Z",
    traffic: "High",
  },
  {
    id: "6",
    domain: "keytruda.com",
    company: "Merck",
    type: "Product",
    ssl: true,
    lastCrawled: "2023-04-13T12:00:00.000Z",
    traffic: "High",
  },
  {
    id: "7",
    domain: "jnj.com",
    company: "Johnson & Johnson",
    type: "Corporate",
    ssl: true,
    lastCrawled: "2023-04-09T12:00:00.000Z",
    traffic: "High",
  },
  {
    id: "8",
    domain: "tremfya.com",
    company: "Johnson & Johnson",
    type: "Product",
    ssl: true,
    lastCrawled: "2023-04-08T12:00:00.000Z",
    traffic: "Medium",
  },
  {
    id: "9",
    domain: "astrazeneca.com",
    company: "AstraZeneca",
    type: "Corporate",
    ssl: true,
    lastCrawled: "2023-04-07T12:00:00.000Z",
    traffic: "High",
  },
  {
    id: "10",
    domain: "tagrisso.com",
    company: "AstraZeneca",
    type: "Product",
    ssl: true,
    lastCrawled: "2023-04-06T12:00:00.000Z",
    traffic: "Medium",
  },
]

export type Website = {
  id: string
  domain: string
  company: string
  type: string
  ssl: boolean
  lastCrawled: string
  traffic: string
}

export const columns: ColumnDef<Website>[] = [
  {
    accessorKey: "domain",
    header: "Domain",
    cell: ({ row }) => (
      <div className="font-medium">
        <a href={`/websites/${row.original.id}`} className="hover:underline text-primary">
          {row.getValue("domain")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <div>
        <a
          href={`/companies/${row.getValue("company").toLowerCase().replace(/\s+/g, "-")}`}
          className="hover:underline"
        >
          {row.getValue("company")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.getValue("type")}
      </Badge>
    ),
  },
  {
    accessorKey: "ssl",
    header: "SSL",
    cell: ({ row }) => (
      <div className="text-center">
        {row.getValue("ssl") ? (
          <Badge variant="default" className="bg-green-500 hover:bg-green-500">
            Secure
          </Badge>
        ) : (
          <Badge variant="destructive">Insecure</Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "traffic",
    header: "Traffic",
    cell: ({ row }) => {
      const traffic = row.getValue("traffic") as string
      let badgeVariant = "outline"

      if (traffic === "High") {
        badgeVariant = "default"
      } else if (traffic === "Medium") {
        badgeVariant = "secondary"
      } else if (traffic === "Low") {
        badgeVariant = "outline"
      }

      return (
        <Badge variant={badgeVariant as any} className="px-1.5">
          {traffic}
        </Badge>
      )
    },
  },
  {
    accessorKey: "lastCrawled",
    header: "Last Crawled",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastCrawled"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "visit",
    cell: ({ row }) => {
      const website = row.original

      return (
        <a
          href={`https://${website.domain}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-primary hover:underline"
        >
          Visit <ExternalLink className="ml-1 h-3 w-3" />
        </a>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const website = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(website.id)}>Copy ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Website</DropdownMenuItem>
            <DropdownMenuItem>View Company</DropdownMenuItem>
            <DropdownMenuItem>View Products</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function WebsiteTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

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
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

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

const data: Company[] = [
  {
    id: "1",
    name: "Pfizer",
    hq: "New York, USA",
    marketCap: "$240B",
    products: 94,
    type: "Large Cap",
    status: "Public",
    lastUpdated: "2023-04-12T12:00:00.000Z",
  },
  {
    id: "2",
    name: "Novartis",
    hq: "Basel, Switzerland",
    marketCap: "$210B",
    products: 87,
    type: "Large Cap",
    status: "Public",
    lastUpdated: "2023-04-10T12:00:00.000Z",
  },
  {
    id: "3",
    name: "Roche",
    hq: "Basel, Switzerland",
    marketCap: "$290B",
    products: 112,
    type: "Large Cap",
    status: "Public",
    lastUpdated: "2023-04-15T12:00:00.000Z",
  },
  {
    id: "4",
    name: "Johnson & Johnson",
    hq: "New Jersey, USA",
    marketCap: "$430B",
    products: 134,
    type: "Large Cap",
    status: "Public",
    lastUpdated: "2023-04-11T12:00:00.000Z",
  },
  {
    id: "5",
    name: "Merck",
    hq: "New Jersey, USA",
    marketCap: "$220B",
    products: 76,
    type: "Large Cap",
    status: "Public",
    lastUpdated: "2023-04-14T12:00:00.000Z",
  },
  {
    id: "6",
    name: "AstraZeneca",
    hq: "Cambridge, UK",
    marketCap: "$180B",
    products: 65,
    type: "Large Cap",
    status: "Public",
    lastUpdated: "2023-04-13T12:00:00.000Z",
  },
  {
    id: "7",
    name: "Sanofi",
    hq: "Paris, France",
    marketCap: "$130B",
    products: 58,
    type: "Large Cap",
    status: "Public",
    lastUpdated: "2023-04-09T12:00:00.000Z",
  },
  {
    id: "8",
    name: "GlaxoSmithKline",
    hq: "London, UK",
    marketCap: "$110B",
    products: 72,
    type: "Large Cap",
    status: "Public",
    lastUpdated: "2023-04-08T12:00:00.000Z",
  },
  {
    id: "9",
    name: "Gilead Sciences",
    hq: "California, USA",
    marketCap: "$90B",
    products: 41,
    type: "Mid Cap",
    status: "Public",
    lastUpdated: "2023-04-07T12:00:00.000Z",
  },
  {
    id: "10",
    name: "Amgen",
    hq: "California, USA",
    marketCap: "$120B",
    products: 38,
    type: "Large Cap",
    status: "Public",
    lastUpdated: "2023-04-06T12:00:00.000Z",
  },
]

export type Company = {
  id: string
  name: string
  hq: string
  marketCap: string
  products: number
  type: string
  status: string
  lastUpdated: string
}

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">
        <a href={`/companies/${row.original.id}`} className="hover:underline text-primary">
          {row.getValue("name")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "hq",
    header: "Headquarters",
    cell: ({ row }) => <div>{row.getValue("hq")}</div>,
  },
  {
    accessorKey: "marketCap",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Market Cap
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("marketCap")}</div>,
  },
  {
    accessorKey: "products",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Products
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("products")}</div>,
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-muted-foreground">
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastUpdated"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const company = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(company.id)}>Copy ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Company</DropdownMenuItem>
            <DropdownMenuItem>View Products</DropdownMenuItem>
            <DropdownMenuItem>View Websites</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function CompanyTable() {
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

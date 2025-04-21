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

const data: TherapeuticArea[] = [
  {
    id: "1",
    name: "Oncology",
    companies: 124,
    products: 532,
    websites: 215,
    marketSize: "$150B",
    lastUpdated: "2023-04-12T12:00:00.000Z",
  },
  {
    id: "2",
    name: "Cardiology",
    companies: 98,
    products: 412,
    websites: 178,
    marketSize: "$120B",
    lastUpdated: "2023-04-10T12:00:00.000Z",
  },
  {
    id: "3",
    name: "Neurology",
    companies: 87,
    products: 356,
    websites: 145,
    marketSize: "$95B",
    lastUpdated: "2023-04-15T12:00:00.000Z",
  },
  {
    id: "4",
    name: "Immunology",
    companies: 76,
    products: 298,
    websites: 132,
    marketSize: "$85B",
    lastUpdated: "2023-04-11T12:00:00.000Z",
  },
  {
    id: "5",
    name: "Infectious Diseases",
    companies: 92,
    products: 387,
    websites: 156,
    marketSize: "$78B",
    lastUpdated: "2023-04-14T12:00:00.000Z",
  },
  {
    id: "6",
    name: "Endocrinology",
    companies: 65,
    products: 276,
    websites: 118,
    marketSize: "$65B",
    lastUpdated: "2023-04-13T12:00:00.000Z",
  },
  {
    id: "7",
    name: "Gastroenterology",
    companies: 58,
    products: 245,
    websites: 102,
    marketSize: "$55B",
    lastUpdated: "2023-04-09T12:00:00.000Z",
  },
  {
    id: "8",
    name: "Respiratory",
    companies: 54,
    products: 228,
    websites: 95,
    marketSize: "$48B",
    lastUpdated: "2023-04-08T12:00:00.000Z",
  },
  {
    id: "9",
    name: "Dermatology",
    companies: 47,
    products: 198,
    websites: 82,
    marketSize: "$42B",
    lastUpdated: "2023-04-07T12:00:00.000Z",
  },
  {
    id: "10",
    name: "Hematology",
    companies: 43,
    products: 182,
    websites: 76,
    marketSize: "$38B",
    lastUpdated: "2023-04-06T12:00:00.000Z",
  },
]

export type TherapeuticArea = {
  id: string
  name: string
  companies: number
  products: number
  websites: number
  marketSize: string
  lastUpdated: string
}

export const columns: ColumnDef<TherapeuticArea>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">
        <a href={`/therapeutic-areas/${row.original.id}`} className="hover:underline text-primary">
          {row.getValue("name")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "companies",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Companies
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("companies")}</div>,
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
    accessorKey: "websites",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Websites
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-center">{row.getValue("websites")}</div>,
  },
  {
    accessorKey: "marketSize",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Market Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium">{row.getValue("marketSize")}</div>,
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
      const ta = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(ta.id)}>Copy ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Therapeutic Area</DropdownMenuItem>
            <DropdownMenuItem>View Companies</DropdownMenuItem>
            <DropdownMenuItem>View Products</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function TherapeuticAreaTable() {
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

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
import { MoreHorizontal } from "lucide-react"

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

const data: Product[] = [
  {
    id: "1",
    name: "Lipitor",
    company: "Pfizer",
    stage: "Marketed",
    type: "Small Molecule",
    indications: ["Hypercholesterolemia", "Cardiovascular Disease"],
    lastUpdated: "2023-04-12T12:00:00.000Z",
  },
  {
    id: "2",
    name: "Humira",
    company: "AbbVie",
    stage: "Marketed",
    type: "Biologic",
    indications: ["Rheumatoid Arthritis", "Psoriasis", "Crohn's Disease"],
    lastUpdated: "2023-04-10T12:00:00.000Z",
  },
  {
    id: "3",
    name: "Keytruda",
    company: "Merck",
    stage: "Marketed",
    type: "Biologic",
    indications: ["Melanoma", "Lung Cancer", "Hodgkin Lymphoma"],
    lastUpdated: "2023-04-15T12:00:00.000Z",
  },
  {
    id: "4",
    name: "Ozempic",
    company: "Novo Nordisk",
    stage: "Marketed",
    type: "Peptide",
    indications: ["Type 2 Diabetes", "Weight Management"],
    lastUpdated: "2023-04-11T12:00:00.000Z",
  },
  {
    id: "5",
    name: "Eliquis",
    company: "Bristol Myers Squibb",
    stage: "Marketed",
    type: "Small Molecule",
    indications: ["Atrial Fibrillation", "Deep Vein Thrombosis"],
    lastUpdated: "2023-04-14T12:00:00.000Z",
  },
  {
    id: "6",
    name: "Revlimid",
    company: "Bristol Myers Squibb",
    stage: "Marketed",
    type: "Small Molecule",
    indications: ["Multiple Myeloma", "Myelodysplastic Syndrome"],
    lastUpdated: "2023-04-13T12:00:00.000Z",
  },
  {
    id: "7",
    name: "Opdivo",
    company: "Bristol Myers Squibb",
    stage: "Marketed",
    type: "Biologic",
    indications: ["Melanoma", "Lung Cancer", "Renal Cell Carcinoma"],
    lastUpdated: "2023-04-09T12:00:00.000Z",
  },
  {
    id: "8",
    name: "Aduhelm",
    company: "Biogen",
    stage: "Marketed",
    type: "Biologic",
    indications: ["Alzheimer's Disease"],
    lastUpdated: "2023-04-08T12:00:00.000Z",
  },
  {
    id: "9",
    name: "BNT162b2",
    company: "Pfizer/BioNTech",
    stage: "Marketed",
    type: "mRNA Vaccine",
    indications: ["COVID-19"],
    lastUpdated: "2023-04-07T12:00:00.000Z",
  },
  {
    id: "10",
    name: "XDR-101",
    company: "Xenetic Biosciences",
    stage: "Phase II",
    type: "Small Molecule",
    indications: ["Pancreatic Cancer"],
    lastUpdated: "2023-04-06T12:00:00.000Z",
  },
]

export type Product = {
  id: string
  name: string
  company: string
  stage: string
  type: string
  indications: string[]
  lastUpdated: string
}

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">
        <a href={`/products/${row.original.id}`} className="hover:underline text-primary">
          {row.getValue("name")}
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
    accessorKey: "stage",
    header: "Stage",
    cell: ({ row }) => {
      const stage = row.getValue("stage") as string
      let badgeVariant = "outline"

      if (stage === "Marketed") {
        badgeVariant = "default"
      } else if (stage.includes("Phase")) {
        badgeVariant = "secondary"
      }

      return (
        <Badge variant={badgeVariant as any} className="px-1.5">
          {stage}
        </Badge>
      )
    },
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
    accessorKey: "indications",
    header: "Indications",
    cell: ({ row }) => {
      const indications = row.getValue("indications") as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {indications.slice(0, 2).map((indication, i) => (
            <Badge key={i} variant="outline" className="px-1.5 text-xs">
              {indication}
            </Badge>
          ))}
          {indications.length > 2 && (
            <Badge variant="outline" className="px-1.5 text-xs">
              +{indications.length - 2} more
            </Badge>
          )}
        </div>
      )
    },
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
      const product = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(product.id)}>Copy ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Product</DropdownMenuItem>
            <DropdownMenuItem>View Clinical Data</DropdownMenuItem>
            <DropdownMenuItem>View Company</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ProductTable() {
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

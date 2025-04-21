"use client"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
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

type Company = {
  id: string
  name: string
  hq: string
  marketCap: string
  products: number
  type: string
  focus: string
}

const companies: Company[] = [
  {
    id: "1",
    name: "Pfizer",
    hq: "New York, USA",
    marketCap: "$240B",
    products: 12,
    type: "Large Cap",
    focus: "High",
  },
  {
    id: "2",
    name: "Novartis",
    hq: "Basel, Switzerland",
    marketCap: "$210B",
    products: 8,
    type: "Large Cap",
    focus: "Medium",
  },
  {
    id: "3",
    name: "Roche",
    hq: "Basel, Switzerland",
    marketCap: "$290B",
    products: 15,
    type: "Large Cap",
    focus: "High",
  },
  {
    id: "4",
    name: "Johnson & Johnson",
    hq: "New Jersey, USA",
    marketCap: "$430B",
    products: 7,
    type: "Large Cap",
    focus: "Medium",
  },
  {
    id: "5",
    name: "Merck",
    hq: "New Jersey, USA",
    marketCap: "$220B",
    products: 9,
    type: "Large Cap",
    focus: "High",
  },
  {
    id: "6",
    name: "AstraZeneca",
    hq: "Cambridge, UK",
    marketCap: "$180B",
    products: 11,
    type: "Large Cap",
    focus: "High",
  },
  {
    id: "7",
    name: "Bristol Myers Squibb",
    hq: "New York, USA",
    marketCap: "$140B",
    products: 14,
    type: "Large Cap",
    focus: "High",
  },
  {
    id: "8",
    name: "Gilead Sciences",
    hq: "California, USA",
    marketCap: "$90B",
    products: 6,
    type: "Mid Cap",
    focus: "Medium",
  },
]

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
    accessorKey: "focus",
    header: "Focus Level",
    cell: ({ row }) => {
      const focus = row.getValue("focus") as string
      let badgeVariant = "outline"

      if (focus === "High") {
        badgeVariant = "default"
      } else if (focus === "Medium") {
        badgeVariant = "secondary"
      } else if (focus === "Low") {
        badgeVariant = "outline"
      }

      return (
        <Badge variant={badgeVariant as any} className="px-1.5">
          {focus}
        </Badge>
      )
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
            <DropdownMenuItem>View Pipeline</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function TherapeuticAreaCompanies({ therapeuticAreaId }: { therapeuticAreaId: string }) {
  const table = useReactTable({
    data: companies,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
    </div>
  )
}

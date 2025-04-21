"use client"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
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

type Indication = {
  id: string
  condition: string
  population: string
  status: string
  region: string
  updated: string
}

const indications: Indication[] = [
  {
    id: "1",
    condition: "Hypercholesterolemia",
    population: "Adults",
    status: "Approved",
    region: "Global",
    updated: "2023-01-15T12:00:00.000Z",
  },
  {
    id: "2",
    condition: "Primary Hypercholesterolemia",
    population: "Adults",
    status: "Approved",
    region: "US",
    updated: "2022-11-10T12:00:00.000Z",
  },
  {
    id: "3",
    condition: "Mixed Dyslipidemia",
    population: "Adults",
    status: "Approved",
    region: "US, EU",
    updated: "2022-09-22T12:00:00.000Z",
  },
  {
    id: "4",
    condition: "Homozygous Familial Hypercholesterolemia",
    population: "Adults and Children ≥10 years",
    status: "Approved",
    region: "US, EU",
    updated: "2022-08-05T12:00:00.000Z",
  },
  {
    id: "5",
    condition: "Heterozygous Familial Hypercholesterolemia",
    population: "Children 10-17 years",
    status: "Approved",
    region: "US, EU",
    updated: "2022-07-18T12:00:00.000Z",
  },
  {
    id: "6",
    condition: "Primary Prevention of Cardiovascular Disease",
    population: "Adults with multiple risk factors",
    status: "Approved",
    region: "US, EU",
    updated: "2022-06-30T12:00:00.000Z",
  },
]

export const columns: ColumnDef<Indication>[] = [
  {
    accessorKey: "condition",
    header: "Condition",
    cell: ({ row }) => <div className="font-medium">{row.getValue("condition")}</div>,
  },
  {
    accessorKey: "population",
    header: "Population",
    cell: ({ row }) => <div>{row.getValue("population")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let badgeVariant = "outline"

      if (status === "Approved") {
        badgeVariant = "default"
      } else if (status === "Pending") {
        badgeVariant = "secondary"
      } else if (status === "Rejected") {
        badgeVariant = "destructive"
      }

      return (
        <Badge variant={badgeVariant as any} className="px-1.5">
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "region",
    header: "Region",
    cell: ({ row }) => <div>{row.getValue("region")}</div>,
  },
  {
    accessorKey: "updated",
    header: "Last Updated",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updated"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const indication = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(indication.id)}>Copy ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>View Clinical Data</DropdownMenuItem>
            <DropdownMenuItem>View Regulatory History</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ProductIndications({ productId }: { productId: string }) {
  const table = useReactTable({
    data: indications,
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

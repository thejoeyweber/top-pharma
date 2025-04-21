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

type Product = {
  id: string
  name: string
  stage: string
  type: string
  indications: string[]
  lastUpdated: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Lipitor",
    stage: "Marketed",
    type: "Small Molecule",
    indications: ["Hypercholesterolemia", "Cardiovascular Disease"],
    lastUpdated: "2023-04-12T12:00:00.000Z",
  },
  {
    id: "2",
    name: "Viagra",
    stage: "Marketed",
    type: "Small Molecule",
    indications: ["Erectile Dysfunction", "Pulmonary Arterial Hypertension"],
    lastUpdated: "2023-04-10T12:00:00.000Z",
  },
  {
    id: "3",
    name: "Prevnar 13",
    stage: "Marketed",
    type: "Vaccine",
    indications: ["Pneumococcal Disease"],
    lastUpdated: "2023-04-15T12:00:00.000Z",
  },
  {
    id: "4",
    name: "Xeljanz",
    stage: "Marketed",
    type: "Small Molecule",
    indications: ["Rheumatoid Arthritis", "Psoriatic Arthritis", "Ulcerative Colitis"],
    lastUpdated: "2023-04-11T12:00:00.000Z",
  },
  {
    id: "5",
    name: "Ibrance",
    stage: "Marketed",
    type: "Small Molecule",
    indications: ["Breast Cancer"],
    lastUpdated: "2023-04-14T12:00:00.000Z",
  },
]

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
            <DropdownMenuItem>View Indications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function CompanyProducts({ companyId }: { companyId: string }) {
  const table = useReactTable({
    data: products,
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
      <div className="flex justify-end mt-4">
        <Button variant="outline" size="sm">
          View All Products
        </Button>
      </div>
    </div>
  )
}

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
  company: string
  companyId: string
  stage: string
  type: string
  indications: string[]
}

const products: Product[] = [
  {
    id: "1",
    name: "Keytruda",
    company: "Merck",
    companyId: "5",
    stage: "Marketed",
    type: "Biologic",
    indications: ["Melanoma", "Lung Cancer", "Hodgkin Lymphoma"],
  },
  {
    id: "2",
    name: "Opdivo",
    company: "Bristol Myers Squibb",
    companyId: "7",
    stage: "Marketed",
    type: "Biologic",
    indications: ["Melanoma", "Lung Cancer", "Renal Cell Carcinoma"],
  },
  {
    id: "3",
    name: "Tecentriq",
    company: "Roche",
    companyId: "3",
    stage: "Marketed",
    type: "Biologic",
    indications: ["Bladder Cancer", "Lung Cancer"],
  },
  {
    id: "4",
    name: "Imfinzi",
    company: "AstraZeneca",
    companyId: "6",
    stage: "Marketed",
    type: "Biologic",
    indications: ["Lung Cancer", "Bladder Cancer"],
  },
  {
    id: "5",
    name: "Ibrance",
    company: "Pfizer",
    companyId: "1",
    stage: "Marketed",
    type: "Small Molecule",
    indications: ["Breast Cancer"],
  },
  {
    id: "6",
    name: "Tagrisso",
    company: "AstraZeneca",
    companyId: "6",
    stage: "Marketed",
    type: "Small Molecule",
    indications: ["Lung Cancer"],
  },
  {
    id: "7",
    name: "Revlimid",
    company: "Bristol Myers Squibb",
    companyId: "7",
    stage: "Marketed",
    type: "Small Molecule",
    indications: ["Multiple Myeloma", "Myelodysplastic Syndrome"],
  },
  {
    id: "8",
    name: "XDR-101",
    company: "Xenetic Biosciences",
    companyId: "10",
    stage: "Phase II",
    type: "Small Molecule",
    indications: ["Pancreatic Cancer"],
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
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => (
      <div>
        <a href={`/companies/${row.original.companyId}`} className="hover:underline">
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

export function TherapeuticAreaProducts({ therapeuticAreaId }: { therapeuticAreaId: string }) {
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
    </div>
  )
}

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

type RegulatoryEvent = {
  id: string
  date: string
  region: string
  agency: string
  indication: string
  type: string
  notes: string
}

const regulatoryEvents: RegulatoryEvent[] = [
  {
    id: "1",
    date: "1996-12-17",
    region: "US",
    agency: "FDA",
    indication: "Hypercholesterolemia",
    type: "Approval",
    notes: "Initial approval for treatment of hypercholesterolemia",
  },
  {
    id: "2",
    date: "1997-03-05",
    region: "EU",
    agency: "EMA",
    indication: "Hypercholesterolemia",
    type: "Approval",
    notes: "Initial approval in European Union",
  },
  {
    id: "3",
    date: "2004-07-12",
    region: "US",
    agency: "FDA",
    indication: "Primary Prevention of Cardiovascular Disease",
    type: "Label Extension",
    notes: "Approval for primary prevention of cardiovascular disease in patients with multiple risk factors",
  },
  {
    id: "4",
    date: "2005-03-02",
    region: "EU",
    agency: "EMA",
    indication: "Primary Prevention of Cardiovascular Disease",
    type: "Label Extension",
    notes: "Approval for primary prevention of cardiovascular disease in patients with multiple risk factors",
  },
  {
    id: "5",
    date: "2008-11-18",
    region: "US",
    agency: "FDA",
    indication: "Pediatric Patients",
    type: "Label Extension",
    notes: "Approval for use in pediatric patients with familial hypercholesterolemia",
  },
  {
    id: "6",
    date: "2012-05-28",
    region: "Global",
    agency: "Multiple",
    indication: "All",
    type: "Patent Expiry",
    notes: "Patent expiry leading to generic competition",
  },
]

export const columns: ColumnDef<RegulatoryEvent>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return <div className="font-medium">{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "region",
    header: "Region",
    cell: ({ row }) => <div>{row.getValue("region")}</div>,
  },
  {
    accessorKey: "agency",
    header: "Agency",
    cell: ({ row }) => <div>{row.getValue("agency")}</div>,
  },
  {
    accessorKey: "indication",
    header: "Indication",
    cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("indication")}</div>,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      let badgeVariant = "outline"

      if (type === "Approval") {
        badgeVariant = "default"
      } else if (type === "Label Extension") {
        badgeVariant = "secondary"
      } else if (type === "Patent Expiry") {
        badgeVariant = "destructive"
      }

      return (
        <Badge variant={badgeVariant as any} className="px-1.5">
          {type}
        </Badge>
      )
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue("notes")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(event.id)}>Copy ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>View Related Documents</DropdownMenuItem>
            <DropdownMenuItem>View Timeline</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ProductRegulatory({ productId }: { productId: string }) {
  const table = useReactTable({
    data: regulatoryEvents,
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

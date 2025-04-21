"use client"
import { type ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table"
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

type Website = {
  id: string
  domain: string
  type: string
  ssl: boolean
  lastCrawled: string
  traffic: string
}

const websites: Website[] = [
  {
    id: "1",
    domain: "pfizer.com",
    type: "Corporate",
    ssl: true,
    lastCrawled: "2023-04-12T12:00:00.000Z",
    traffic: "High",
  },
  {
    id: "2",
    domain: "lipitor.com",
    type: "Product",
    ssl: true,
    lastCrawled: "2023-04-10T12:00:00.000Z",
    traffic: "Medium",
  },
  {
    id: "3",
    domain: "viagra.com",
    type: "Product",
    ssl: true,
    lastCrawled: "2023-04-15T12:00:00.000Z",
    traffic: "High",
  },
  {
    id: "4",
    domain: "prevnar13.com",
    type: "Product",
    ssl: true,
    lastCrawled: "2023-04-11T12:00:00.000Z",
    traffic: "Medium",
  },
  {
    id: "5",
    domain: "xeljanz.com",
    type: "Product",
    ssl: true,
    lastCrawled: "2023-04-14T12:00:00.000Z",
    traffic: "Medium",
  },
]

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
            <DropdownMenuItem>View Content</DropdownMenuItem>
            <DropdownMenuItem>View Traffic</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function CompanyWebsites({ companyId }: { companyId: string }) {
  const table = useReactTable({
    data: websites,
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
          View All Websites
        </Button>
      </div>
    </div>
  )
}

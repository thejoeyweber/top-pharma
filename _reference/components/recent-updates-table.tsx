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

type RecentUpdate = {
  id: string
  name: string
  type: string
  updateType: string
  details: string
  lastUpdated: string
}

const companyUpdates: RecentUpdate[] = [
  {
    id: "1",
    name: "Pfizer",
    type: "Financial Update",
    updateType: "Quarterly Results",
    details: "Q1 2023 revenue increased by 14% YoY to $25.4B, exceeding analyst expectations",
    lastUpdated: "2023-04-12T12:00:00.000Z",
  },
  {
    id: "2",
    name: "Novartis",
    type: "Pipeline Update",
    updateType: "Phase III Results",
    details: "Positive Phase III results for leqvio in cardiovascular disease prevention",
    lastUpdated: "2023-04-10T12:00:00.000Z",
  },
  {
    id: "3",
    name: "Roche",
    type: "Acquisition",
    updateType: "Company Purchase",
    details: "Acquired GenMark Diagnostics for $1.8B to expand molecular diagnostics portfolio",
    lastUpdated: "2023-04-15T12:00:00.000Z",
  },
  {
    id: "4",
    name: "Johnson & Johnson",
    type: "Financial Update",
    updateType: "Guidance Update",
    details: "Raised FY2023 guidance following strong performance in pharmaceutical division",
    lastUpdated: "2023-04-11T12:00:00.000Z",
  },
  {
    id: "5",
    name: "Merck",
    type: "Pipeline Update",
    updateType: "FDA Submission",
    details: "Submitted sBLA for Keytruda in adjuvant treatment of renal cell carcinoma",
    lastUpdated: "2023-04-14T12:00:00.000Z",
  },
  {
    id: "6",
    name: "AstraZeneca",
    type: "Regulatory Update",
    updateType: "FDA Approval",
    details: "Received FDA approval for Imfinzi in extensive-stage small cell lung cancer",
    lastUpdated: "2023-04-08T09:30:00.000Z",
  },
  {
    id: "7",
    name: "Bristol Myers Squibb",
    type: "Partnership",
    updateType: "Strategic Alliance",
    details: "Formed $3.2B strategic partnership with Evotec for targeted protein degradation",
    lastUpdated: "2023-04-05T14:15:00.000Z",
  },
]

const productUpdates: RecentUpdate[] = [
  {
    id: "1",
    name: "Lipitor",
    type: "Regulatory Approval",
    updateType: "Label Extension",
    details: "Received approval for expanded use in pediatric patients aged 8-17",
    lastUpdated: "2023-04-12T12:00:00.000Z",
  },
  {
    id: "2",
    name: "Humira",
    type: "Clinical Trial Results",
    updateType: "Phase IV Data",
    details: "Long-term safety data shows favorable risk-benefit profile over 10 years of use",
    lastUpdated: "2023-04-10T12:00:00.000Z",
  },
  {
    id: "3",
    name: "Keytruda",
    type: "New Indication",
    updateType: "FDA Approval",
    details: "Approved for first-line treatment of advanced endometrial carcinoma",
    lastUpdated: "2023-04-15T12:00:00.000Z",
  },
  {
    id: "4",
    name: "Ozempic",
    type: "Regulatory Submission",
    updateType: "sNDA Filing",
    details: "Supplemental application filed for use in obesity management",
    lastUpdated: "2023-04-11T12:00:00.000Z",
  },
  {
    id: "5",
    name: "Eliquis",
    type: "Clinical Trial Results",
    updateType: "Phase III Data",
    details: "Met primary endpoint in trial for prevention of VTE in high-risk ambulatory cancer patients",
    lastUpdated: "2023-04-14T12:00:00.000Z",
  },
  {
    id: "6",
    name: "Jardiance",
    type: "Market Performance",
    updateType: "Sales Milestone",
    details: "Reached $5B in annual global sales, becoming a blockbuster diabetes treatment",
    lastUpdated: "2023-04-07T10:45:00.000Z",
  },
  {
    id: "7",
    name: "Dupixent",
    type: "Clinical Trial Initiation",
    updateType: "Phase III Launch",
    details: "Initiated Phase III trial for chronic obstructive pulmonary disease (COPD)",
    lastUpdated: "2023-04-03T15:20:00.000Z",
  },
]

export const columns: ColumnDef<RecentUpdate>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">
        <a
          href={`/${row.original.type === "Financial Update" || row.original.type === "Pipeline Update" || row.original.type === "Acquisition" || row.original.type === "Regulatory Update" || row.original.type === "Partnership" ? "companies" : "products"}/${row.original.id}`}
          className="hover:underline text-primary"
        >
          {row.getValue("name")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="px-1.5 text-xs text-muted-foreground">
        {row.getValue("type")}
      </Badge>
    ),
  },
  {
    accessorKey: "updateType",
    header: "Update Type",
    cell: ({ row }) => <div className="text-sm">{row.getValue("updateType")}</div>,
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => (
      <div className="text-sm max-w-[300px] truncate" title={row.getValue("details")}>
        {row.getValue("details")}
      </div>
    ),
  },
  {
    accessorKey: "lastUpdated",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastUpdated"))
      return <div className="text-sm text-muted-foreground">{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const update = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(update.id)}>Copy ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>View History</DropdownMenuItem>
            <DropdownMenuItem>Set Alert</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function RecentUpdatesTable({ type }: { type: "companies" | "products" }) {
  const data = type === "companies" ? companyUpdates : productUpdates

  const table = useReactTable({
    data,
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
        <Button variant="outline" size="sm" asChild>
          <a href={`/${type}`}>View All</a>
        </Button>
      </div>
    </div>
  )
}

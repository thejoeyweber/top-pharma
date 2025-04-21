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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type ClinicalTrial = {
  id: string
  trialId: string
  phase: string
  enrollment: number
  primaryEndpoints: string
  status: string
  updated: string
}

const clinicalTrials: ClinicalTrial[] = [
  {
    id: "1",
    trialId: "NCT00000001",
    phase: "Phase III",
    enrollment: 2502,
    primaryEndpoints: "LDL-C reduction from baseline",
    status: "Completed",
    updated: "2022-05-15T12:00:00.000Z",
  },
  {
    id: "2",
    trialId: "NCT00000002",
    phase: "Phase III",
    enrollment: 1873,
    primaryEndpoints: "Cardiovascular events reduction",
    status: "Completed",
    updated: "2022-04-10T12:00:00.000Z",
  },
  {
    id: "3",
    trialId: "NCT00000003",
    phase: "Phase II",
    enrollment: 845,
    primaryEndpoints: "Safety and efficacy in pediatric population",
    status: "Completed",
    updated: "2022-03-22T12:00:00.000Z",
  },
  {
    id: "4",
    trialId: "NCT00000004",
    phase: "Phase IV",
    enrollment: 3250,
    primaryEndpoints: "Long-term safety monitoring",
    status: "Active",
    updated: "2022-02-05T12:00:00.000Z",
  },
  {
    id: "5",
    trialId: "NCT00000005",
    phase: "Phase I",
    enrollment: 120,
    primaryEndpoints: "Pharmacokinetics in special populations",
    status: "Completed",
    updated: "2022-01-18T12:00:00.000Z",
  },
]

export const columns: ColumnDef<ClinicalTrial>[] = [
  {
    accessorKey: "trialId",
    header: "Trial ID",
    cell: ({ row }) => (
      <div className="font-medium">
        <a
          href={`https://clinicaltrials.gov/study/${row.getValue("trialId")}`}
          className="hover:underline text-primary"
        >
          {row.getValue("trialId")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "phase",
    header: "Phase",
    cell: ({ row }) => {
      const phase = row.getValue("phase") as string
      let badgeVariant = "outline"

      if (phase === "Phase III" || phase === "Phase IV") {
        badgeVariant = "default"
      } else if (phase === "Phase II") {
        badgeVariant = "secondary"
      } else if (phase === "Phase I") {
        badgeVariant = "outline"
      }

      return (
        <Badge variant={badgeVariant as any} className="px-1.5">
          {phase}
        </Badge>
      )
    },
  },
  {
    accessorKey: "enrollment",
    header: "Enrollment",
    cell: ({ row }) => <div className="text-right">{row.getValue("enrollment")}</div>,
  },
  {
    accessorKey: "primaryEndpoints",
    header: "Primary Endpoints",
    cell: ({ row }) => <div className="max-w-[300px] truncate">{row.getValue("primaryEndpoints")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      let badgeVariant = "outline"

      if (status === "Completed") {
        badgeVariant = "default"
      } else if (status === "Active") {
        badgeVariant = "secondary"
      } else if (status === "Terminated") {
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const trial = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(trial.id)}>Copy ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Trial Details</DropdownMenuItem>
            <DropdownMenuItem>View Results</DropdownMenuItem>
            <DropdownMenuItem>View Publications</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function ProductClinicalData({ productId }: { productId: string }) {
  const table = useReactTable({
    data: clinicalTrials,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // Calculate trial counts by phase
  const phaseI = clinicalTrials.filter((trial) => trial.phase === "Phase I").length
  const phaseII = clinicalTrials.filter((trial) => trial.phase === "Phase II").length
  const phaseIII = clinicalTrials.filter((trial) => trial.phase === "Phase III").length
  const phaseIV = clinicalTrials.filter((trial) => trial.phase === "Phase IV").length
  const total = clinicalTrials.length

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Clinical Trial Phases</CardTitle>
          <CardDescription>Distribution of clinical trials by phase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Phase I</Badge>
                  <span className="text-sm font-medium">{phaseI} trials</span>
                </div>
                <span className="text-sm text-muted-foreground">{Math.round((phaseI / total) * 100)}%</span>
              </div>
              <Progress value={(phaseI / total) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Phase II</Badge>
                  <span className="text-sm font-medium">{phaseII} trials</span>
                </div>
                <span className="text-sm text-muted-foreground">{Math.round((phaseII / total) * 100)}%</span>
              </div>
              <Progress value={(phaseII / total) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge>Phase III</Badge>
                  <span className="text-sm font-medium">{phaseIII} trials</span>
                </div>
                <span className="text-sm text-muted-foreground">{Math.round((phaseIII / total) * 100)}%</span>
              </div>
              <Progress value={(phaseIII / total) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge>Phase IV</Badge>
                  <span className="text-sm font-medium">{phaseIV} trials</span>
                </div>
                <span className="text-sm text-muted-foreground">{Math.round((phaseIV / total) * 100)}%</span>
              </div>
              <Progress value={(phaseIV / total) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Clinical Trials</CardTitle>
          <CardDescription>List of clinical trials for this product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
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
        </CardContent>
      </Card>
    </div>
  )
}

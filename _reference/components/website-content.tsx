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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type WebsitePage = {
  id: string
  url: string
  title: string
  wordCount: number
  readability: string
  lastCrawled: string
}

const websitePages: WebsitePage[] = [
  {
    id: "1",
    url: "https://pfizer.com/",
    title: "Home | Pfizer",
    wordCount: 1250,
    readability: "Good",
    lastCrawled: "2023-04-12T12:00:00.000Z",
  },
  {
    id: "2",
    url: "https://pfizer.com/about",
    title: "About Pfizer | Pfizer",
    wordCount: 2340,
    readability: "Good",
    lastCrawled: "2023-04-10T12:00:00.000Z",
  },
  {
    id: "3",
    url: "https://pfizer.com/products",
    title: "Products | Pfizer",
    wordCount: 1870,
    readability: "Excellent",
    lastCrawled: "2023-04-15T12:00:00.000Z",
  },
  {
    id: "4",
    url: "https://pfizer.com/research",
    title: "Research & Development | Pfizer",
    wordCount: 3120,
    readability: "Moderate",
    lastCrawled: "2023-04-11T12:00:00.000Z",
  },
  {
    id: "5",
    url: "https://pfizer.com/investors",
    title: "Investor Relations | Pfizer",
    wordCount: 2780,
    readability: "Good",
    lastCrawled: "2023-04-14T12:00:00.000Z",
  },
  {
    id: "6",
    url: "https://pfizer.com/news",
    title: "News & Media | Pfizer",
    wordCount: 1950,
    readability: "Good",
    lastCrawled: "2023-04-13T12:00:00.000Z",
  },
  {
    id: "7",
    url: "https://pfizer.com/careers",
    title: "Careers | Pfizer",
    wordCount: 1680,
    readability: "Excellent",
    lastCrawled: "2023-04-09T12:00:00.000Z",
  },
]

export const columns: ColumnDef<WebsitePage>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium max-w-[300px] truncate">
        <a href={row.original.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
          {row.getValue("title")}
        </a>
      </div>
    ),
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => <div className="max-w-[200px] truncate">{row.getValue("url")}</div>,
  },
  {
    accessorKey: "wordCount",
    header: "Word Count",
    cell: ({ row }) => <div className="text-right">{row.getValue("wordCount")}</div>,
  },
  {
    accessorKey: "readability",
    header: "Readability",
    cell: ({ row }) => {
      const readability = row.getValue("readability") as string
      let badgeVariant = "outline"

      if (readability === "Excellent") {
        badgeVariant = "default"
      } else if (readability === "Good") {
        badgeVariant = "secondary"
      } else if (readability === "Moderate") {
        badgeVariant = "outline"
      } else if (readability === "Poor") {
        badgeVariant = "destructive"
      }

      return (
        <Badge variant={badgeVariant as any} className="px-1.5">
          {readability}
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
      const page = row.original

      return (
        <a
          href={page.url}
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
      const page = row.original

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
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(page.id)}>Copy ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>View Content Analysis</DropdownMenuItem>
            <DropdownMenuItem>View SEO Analysis</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function WebsiteContent({ websiteId }: { websiteId: string }) {
  const table = useReactTable({
    data: websitePages,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  // Content distribution data for pie chart
  const contentDistribution = [
    { type: "Product Information", percentage: 35 },
    { type: "Corporate Information", percentage: 25 },
    { type: "Research & Development", percentage: 20 },
    { type: "Investor Relations", percentage: 15 },
    { type: "News & Media", percentage: 5 },
  ]

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Distribution</CardTitle>
          <CardDescription>Breakdown of content types on the website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-center">
              <div className="h-48 w-48 rounded-full border-8 border-primary relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{websitePages.length}</div>
                    <div className="text-sm text-muted-foreground">Pages Indexed</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ul className="space-y-2">
                {contentDistribution.map((item, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: `hsl(var(--chart-${(index % 5) + 1}))`,
                        }}
                      ></div>
                      <span>{item.type}</span>
                    </div>
                    <span className="font-medium">{item.percentage}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Pages</CardTitle>
          <CardDescription>Most important pages on the website</CardDescription>
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

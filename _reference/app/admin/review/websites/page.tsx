import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, CheckIcon, XIcon, EyeIcon, ExternalLinkIcon } from "lucide-react"

export default function AdminReviewWebsitesPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Website Review</h1>
        <p className="text-muted-foreground">Review and approve website data updates.</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search websites..." className="w-full min-w-[200px] pl-8 md:w-[300px]" />
          </div>
          <Select defaultValue="pending">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Website Reviews</CardTitle>
          <CardDescription>Websites waiting for review and approval</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Website URL</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {websiteReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {review.url}
                      <a href={`https://${review.url}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
                      </a>
                    </div>
                  </TableCell>
                  <TableCell>{review.company}</TableCell>
                  <TableCell>{review.type}</TableCell>
                  <TableCell>{review.submittedBy}</TableCell>
                  <TableCell>{review.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        review.status === "Pending"
                          ? "bg-yellow-500 text-white"
                          : review.status === "Approved"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                      }
                    >
                      {review.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="text-green-600">
                        <CheckIcon className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <XIcon className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Sample website review data
const websiteReviews = [
  {
    id: "1",
    url: "www.pfizer.com/products/newdrug",
    company: "Pfizer Inc.",
    type: "Product Website",
    submittedBy: "John Smith",
    date: "Today at 11:30 AM",
    status: "Pending",
  },
  {
    id: "2",
    url: "www.novartis.com/research",
    company: "Novartis AG",
    type: "Research Portal",
    submittedBy: "Sarah Johnson",
    date: "Yesterday at 4:15 PM",
    status: "Pending",
  },
  {
    id: "3",
    url: "www.merck.com/pipeline",
    company: "Merck & Co.",
    type: "Pipeline Website",
    submittedBy: "Michael Brown",
    date: "Apr 18, 2023",
    status: "Approved",
  },
  {
    id: "4",
    url: "www.jnj.com/investors",
    company: "Johnson & Johnson",
    type: "Investor Relations",
    submittedBy: "Emily Davis",
    date: "Apr 17, 2023",
    status: "Rejected",
  },
  {
    id: "5",
    url: "www.astrazeneca.com/covid",
    company: "AstraZeneca PLC",
    type: "Product Website",
    submittedBy: "David Wilson",
    date: "Apr 16, 2023",
    status: "Pending",
  },
  {
    id: "6",
    url: "www.bms.com/clinical-trials",
    company: "Bristol-Myers Squibb",
    type: "Clinical Trials",
    submittedBy: "Jennifer Taylor",
    date: "Apr 15, 2023",
    status: "Pending",
  },
  {
    id: "7",
    url: "www.lilly.com/diabetes",
    company: "Eli Lilly and Company",
    type: "Disease Area",
    submittedBy: "Robert Martinez",
    date: "Apr 14, 2023",
    status: "Approved",
  },
]

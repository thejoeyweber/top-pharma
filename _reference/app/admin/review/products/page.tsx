import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SearchIcon, CheckIcon, XIcon, EyeIcon } from "lucide-react"

export default function AdminReviewProductsPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Product Review</h1>
        <p className="text-muted-foreground">Review and approve product data updates.</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search products..." className="w-full min-w-[200px] pl-8 md:w-[300px]" />
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
          <CardTitle>Pending Product Reviews</CardTitle>
          <CardDescription>Products waiting for review and approval</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Update Type</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="font-medium">{review.productName}</TableCell>
                  <TableCell>{review.company}</TableCell>
                  <TableCell>{review.updateType}</TableCell>
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

// Sample product review data
const productReviews = [
  {
    id: "1",
    productName: "Lipitor",
    company: "Pfizer Inc.",
    updateType: "Clinical Data Update",
    submittedBy: "John Smith",
    date: "Today at 9:15 AM",
    status: "Pending",
  },
  {
    id: "2",
    productName: "Humira",
    company: "AbbVie Inc.",
    updateType: "New Indication",
    submittedBy: "Sarah Johnson",
    date: "Yesterday at 3:30 PM",
    status: "Pending",
  },
  {
    id: "3",
    productName: "Keytruda",
    company: "Merck & Co.",
    updateType: "New Product",
    submittedBy: "Michael Brown",
    date: "Apr 18, 2023",
    status: "Approved",
  },
  {
    id: "4",
    productName: "Eliquis",
    company: "Bristol-Myers Squibb",
    updateType: "Regulatory Update",
    submittedBy: "Emily Davis",
    date: "Apr 17, 2023",
    status: "Rejected",
  },
  {
    id: "5",
    productName: "Ozempic",
    company: "Novo Nordisk",
    updateType: "Clinical Data Update",
    submittedBy: "David Wilson",
    date: "Apr 16, 2023",
    status: "Pending",
  },
  {
    id: "6",
    productName: "Januvia",
    company: "Merck & Co.",
    updateType: "Pricing Update",
    submittedBy: "Jennifer Taylor",
    date: "Apr 15, 2023",
    status: "Pending",
  },
  {
    id: "7",
    productName: "Trulicity",
    company: "Eli Lilly and Company",
    updateType: "New Indication",
    submittedBy: "Robert Martinez",
    date: "Apr 14, 2023",
    status: "Approved",
  },
]

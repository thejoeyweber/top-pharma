import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusIcon, SearchIcon, MoreHorizontalIcon, ShieldIcon, UserIcon } from "lucide-react"

export default function AdminUsersPage() {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage user accounts and permissions.</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search users..." className="w-full min-w-[200px] pl-8 md:w-[300px]" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Administrators</SelectItem>
              <SelectItem value="editor">Editors</SelectItem>
              <SelectItem value="viewer">Viewers</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">
              All Users <Badge className="ml-2">125</Badge>
            </TabsTrigger>
            <TabsTrigger value="active">
              Active <Badge className="ml-2">112</Badge>
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive <Badge className="ml-2">13</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader className="px-6 py-4">
                <CardTitle>User Accounts</CardTitle>
                <CardDescription>Manage all user accounts in the system.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {user.role === "Admin" ? (
                              <ShieldIcon className="h-4 w-4 text-primary" />
                            ) : (
                              <UserIcon className="h-4 w-4 text-muted-foreground" />
                            )}
                            <span>{user.role}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={user.status === "Active" ? "bg-green-500 text-white" : "bg-gray-500 text-white"}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon">
                            <MoreHorizontalIcon className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex items-center justify-between px-6 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>10</strong> of <strong>125</strong> users
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Currently active user accounts.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">Active users will be displayed here</div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inactive">
            <Card>
              <CardHeader>
                <CardTitle>Inactive Users</CardTitle>
                <CardDescription>Disabled or inactive user accounts.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">Inactive users will be displayed here</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Sample user data
const users = [
  {
    id: "1",
    name: "John Smith",
    email: "john@toppharma.com",
    role: "Admin",
    status: "Active",
    lastActive: "Just now",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@toppharma.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael@toppharma.com",
    role: "Editor",
    status: "Active",
    lastActive: "Yesterday",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@toppharma.com",
    role: "Editor",
    status: "Active",
    lastActive: "3 days ago",
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david@toppharma.com",
    role: "Viewer",
    status: "Active",
    lastActive: "1 week ago",
  },
  {
    id: "6",
    name: "Jennifer Taylor",
    email: "jennifer@toppharma.com",
    role: "Editor",
    status: "Active",
    lastActive: "2 days ago",
  },
  {
    id: "7",
    name: "Robert Martinez",
    email: "robert@toppharma.com",
    role: "Viewer",
    status: "Inactive",
    lastActive: "1 month ago",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisa@toppharma.com",
    role: "Viewer",
    status: "Active",
    lastActive: "5 days ago",
  },
  {
    id: "9",
    name: "James Thomas",
    email: "james@toppharma.com",
    role: "Editor",
    status: "Active",
    lastActive: "Yesterday",
  },
  {
    id: "10",
    name: "Patricia White",
    email: "patricia@toppharma.com",
    role: "Viewer",
    status: "Inactive",
    lastActive: "2 months ago",
  },
]

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon } from "lucide-react"

interface WebsiteOverviewProps {
  website: {
    domain: string
    category: string
    ssl: boolean
    hostRegion: string
    techStack: string
    lastCrawled: string
  }
}

export function WebsiteOverview({ website }: WebsiteOverviewProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Website Metadata</CardTitle>
          <CardDescription>Technical information about {website.domain}</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Domain</dt>
              <dd className="text-lg font-semibold">{website.domain}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Category</dt>
              <dd className="text-lg font-semibold">{website.category}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">SSL</dt>
              <dd className="text-lg font-semibold">
                <Badge variant={website.ssl ? "default" : "destructive"} className="bg-green-500 hover:bg-green-500">
                  {website.ssl ? "Secure" : "Insecure"}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Host Region</dt>
              <dd className="text-lg font-semibold">{website.hostRegion}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Tech Stack</dt>
              <dd className="text-lg font-semibold">{website.techStack}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-muted-foreground">Last Crawled</dt>
              <dd className="text-lg font-semibold">{new Date(website.lastCrawled).toLocaleDateString()}</dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Screenshots</CardTitle>
          <CardDescription>Visual preview of the website</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative overflow-hidden rounded-lg border">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Desktop Screenshot"
                width={300}
                height={200}
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 text-xs font-medium">
                Desktop View
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border">
              <Image
                src="/placeholder.svg?height=200&width=300"
                alt="Mobile Screenshot"
                width={300}
                height={200}
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-2 text-xs font-medium">
                Mobile View
              </div>
            </div>
            <div className="col-span-2 mt-2">
              <a
                href={`https://${website.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 text-sm text-primary hover:underline"
              >
                Visit Website <ExternalLinkIcon className="h-3 w-3" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

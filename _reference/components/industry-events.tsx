"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, UsersIcon } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  organizer: string
  startDate: string
  endDate: string
  location: string
  type: "Conference" | "Webinar" | "Workshop" | "Summit" | "Exhibition"
  description: string
  url: string
  isFeatured?: boolean
}

const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "BIO International Convention 2023",
    organizer: "Biotechnology Innovation Organization",
    startDate: "2023-06-05T00:00:00.000Z",
    endDate: "2023-06-08T00:00:00.000Z",
    location: "Boston, MA, USA",
    type: "Conference",
    description:
      "The world's largest biotechnology gathering, bringing together industry leaders for networking and partnership opportunities.",
    url: "https://example.com/events/bio-international",
    isFeatured: true,
  },
  {
    id: "2",
    title: "European Pharma Summit",
    organizer: "European Federation of Pharmaceutical Industries",
    startDate: "2023-05-18T00:00:00.000Z",
    endDate: "2023-05-20T00:00:00.000Z",
    location: "Barcelona, Spain",
    type: "Summit",
    description:
      "A premier gathering of European pharmaceutical executives focusing on regulatory changes and market access strategies.",
    url: "https://example.com/events/european-pharma-summit",
    isFeatured: true,
  },
  {
    id: "3",
    title: "Digital Health Innovation in Pharma",
    organizer: "Healthcare Technology Association",
    startDate: "2023-05-10T00:00:00.000Z",
    endDate: "2023-05-10T00:00:00.000Z",
    location: "Virtual",
    type: "Webinar",
    description:
      "Exploring the latest digital health technologies and their applications in pharmaceutical development and patient care.",
    url: "https://example.com/events/digital-health-webinar",
  },
  {
    id: "4",
    title: "Clinical Trial Innovation Summit",
    organizer: "Clinical Research Society",
    startDate: "2023-06-12T00:00:00.000Z",
    endDate: "2023-06-14T00:00:00.000Z",
    location: "San Diego, CA, USA",
    type: "Summit",
    description:
      "Focusing on innovative approaches to clinical trial design, patient recruitment, and data management.",
    url: "https://example.com/events/clinical-trial-summit",
  },
  {
    id: "5",
    title: "Pharmaceutical Manufacturing Excellence",
    organizer: "International Society for Pharmaceutical Engineering",
    startDate: "2023-05-25T00:00:00.000Z",
    endDate: "2023-05-26T00:00:00.000Z",
    location: "Frankfurt, Germany",
    type: "Workshop",
    description:
      "Hands-on workshop covering advanced manufacturing technologies, quality control, and regulatory compliance.",
    url: "https://example.com/events/manufacturing-workshop",
  },
]

const pastEvents: Event[] = [
  {
    id: "6",
    title: "Global Pharma R&D Congress",
    organizer: "International Pharmaceutical Federation",
    startDate: "2023-03-15T00:00:00.000Z",
    endDate: "2023-03-17T00:00:00.000Z",
    location: "Singapore",
    type: "Conference",
    description:
      "A comprehensive congress covering the latest advances in pharmaceutical R&D, from discovery to clinical development.",
    url: "https://example.com/events/global-rd-congress",
  },
  {
    id: "7",
    title: "AI in Drug Discovery Symposium",
    organizer: "Artificial Intelligence in Healthcare Institute",
    startDate: "2023-04-05T00:00:00.000Z",
    endDate: "2023-04-06T00:00:00.000Z",
    location: "Cambridge, MA, USA",
    type: "Summit",
    description:
      "Exploring the transformative potential of artificial intelligence and machine learning in accelerating drug discovery.",
    url: "https://example.com/events/ai-drug-discovery",
  },
  {
    id: "8",
    title: "Regulatory Affairs Masterclass",
    organizer: "Regulatory Affairs Professionals Society",
    startDate: "2023-04-12T00:00:00.000Z",
    endDate: "2023-04-12T00:00:00.000Z",
    location: "Virtual",
    type: "Webinar",
    description: "Expert insights on navigating complex regulatory landscapes for pharmaceutical products globally.",
    url: "https://example.com/events/regulatory-masterclass",
  },
  {
    id: "9",
    title: "Pharmaceutical Supply Chain Forum",
    organizer: "Supply Chain Management Association",
    startDate: "2023-03-28T00:00:00.000Z",
    endDate: "2023-03-29T00:00:00.000Z",
    location: "Amsterdam, Netherlands",
    type: "Conference",
    description:
      "Addressing challenges and innovations in pharmaceutical supply chain management, logistics, and distribution.",
    url: "https://example.com/events/supply-chain-forum",
  },
  {
    id: "10",
    title: "Biopharma Sustainability Summit",
    organizer: "Sustainable Healthcare Coalition",
    startDate: "2023-02-22T00:00:00.000Z",
    endDate: "2023-02-23T00:00:00.000Z",
    location: "Copenhagen, Denmark",
    type: "Summit",
    description:
      "Focusing on environmental sustainability practices and initiatives within the biopharmaceutical industry.",
    url: "https://example.com/events/sustainability-summit",
  },
]

export function IndustryEvents() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)

    // Same day event
    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    }

    // Same month event
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { day: "numeric", year: "numeric" })}`
    }

    // Different month event
    return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
  }

  const getEventsForTab = () => {
    return activeTab === "upcoming" ? upcomingEvents : pastEvents
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Industry Events</CardTitle>
        <CardDescription>Conferences, webinars, and workshops in the pharmaceutical industry</CardDescription>
        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming" className="mt-4 space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                      {event.isFeatured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-semibold leading-tight">
                      <Link href={event.url} className="hover:underline" target="_blank">
                        {event.title}
                      </Link>
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {formatDateRange(event.startDate, event.endDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-3 w-3" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <UsersIcon className="h-3 w-3" />
                    {event.organizer}
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="past" className="mt-4 space-y-4">
            {pastEvents.map((event) => (
              <div key={event.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {event.type}
                      </Badge>
                      {event.isFeatured && (
                        <Badge variant="secondary" className="text-xs">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <h4 className="font-semibold leading-tight">
                      <Link href={event.url} className="hover:underline" target="_blank">
                        {event.title}
                      </Link>
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {formatDateRange(event.startDate, event.endDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPinIcon className="h-3 w-3" />
                    {event.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <UsersIcon className="h-3 w-3" />
                    {event.organizer}
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent className="px-2">{/* Empty CardContent to maintain layout */}</CardContent>
      <CardFooter className="border-t p-4">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/events">View All Events</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

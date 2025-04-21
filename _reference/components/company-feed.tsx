"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, ExternalLinkIcon, TrendingUpIcon, FileTextIcon } from "lucide-react"

interface CompanyUpdate {
  id: string
  companyId: string
  companyName: string
  companyLogo: string
  updateType: "news" | "financial" | "pipeline" | "regulatory" | "partnership"
  title: string
  date: string
  summary: string
  url: string
  source?: string
  impact?: "positive" | "negative" | "neutral"
}

const companyUpdates: CompanyUpdate[] = [
  {
    id: "1",
    companyId: "pfizer",
    companyName: "Pfizer",
    companyLogo: "/placeholder.svg?height=40&width=40",
    updateType: "pipeline",
    title: "Pfizer Advances Novel COVID-19 Oral Antiviral to Phase 3 Clinical Trials",
    date: "2023-04-10T09:30:00.000Z",
    summary:
      "Pfizer has announced the advancement of its novel COVID-19 oral antiviral candidate to Phase 3 clinical trials following promising results in earlier studies that demonstrated potent antiviral activity against SARS-CoV-2.",
    url: "https://example.com/pfizer-covid-antiviral",
    impact: "positive",
  },
  {
    id: "2",
    companyId: "novartis",
    companyName: "Novartis",
    companyLogo: "/placeholder.svg?height=40&width=40",
    updateType: "financial",
    title: "Novartis Reports Strong Q1 2023 Results, Raises Full-Year Guidance",
    date: "2023-04-12T08:15:00.000Z",
    summary:
      "Novartis has reported Q1 2023 net sales of $12.9 billion, representing a 5% increase year-over-year in constant currencies, driven by strong performance of key growth brands including Entresto, Kesimpta, and Kisqali.",
    url: "https://example.com/novartis-q1-2023",
    source: "Novartis Investor Relations",
    impact: "positive",
  },
  {
    id: "3",
    companyId: "merck",
    companyName: "Merck",
    companyLogo: "/placeholder.svg?height=40&width=40",
    updateType: "regulatory",
    title: "FDA Approves Merck's KEYTRUDA for New Indication in Advanced Melanoma",
    date: "2023-04-08T14:45:00.000Z",
    summary:
      "The U.S. Food and Drug Administration has approved Merck's KEYTRUDA for adjuvant treatment of patients with stage IIB and IIC melanoma following complete resection, expanding its use in earlier stages of the disease.",
    url: "https://example.com/merck-keytruda-approval",
    source: "FDA News Release",
    impact: "positive",
  },
  {
    id: "4",
    companyId: "astrazeneca",
    companyName: "AstraZeneca",
    companyLogo: "/placeholder.svg?height=40&width=40",
    updateType: "partnership",
    title: "AstraZeneca and Daiichi Sankyo Enter $6B Collaboration for Novel ADC Technology",
    date: "2023-04-05T10:00:00.000Z",
    summary:
      "AstraZeneca and Daiichi Sankyo have announced a new global development and commercialization agreement worth up to $6 billion for Daiichi Sankyo's novel antibody-drug conjugate (ADC) targeting multiple solid tumors.",
    url: "https://example.com/astrazeneca-daiichi-partnership",
    source: "AstraZeneca Press Release",
    impact: "positive",
  },
  {
    id: "5",
    companyId: "gsk",
    companyName: "GSK",
    companyLogo: "/placeholder.svg?height=40&width=40",
    updateType: "news",
    title: "GSK Opens New AI-Powered R&D Center in Boston's Seaport District",
    date: "2023-04-11T11:30:00.000Z",
    summary:
      "GSK has inaugurated a new state-of-the-art research and development center in Boston's Seaport District, focusing on leveraging artificial intelligence and machine learning to accelerate drug discovery and development.",
    url: "https://example.com/gsk-boston-rd-center",
    source: "Boston Business Journal",
    impact: "neutral",
  },
  {
    id: "6",
    companyId: "roche",
    companyName: "Roche",
    companyLogo: "/placeholder.svg?height=40&width=40",
    updateType: "pipeline",
    title: "Roche's Gantenerumab Fails to Meet Primary Endpoints in Alzheimer's Trials",
    date: "2023-04-07T15:20:00.000Z",
    summary:
      "Roche has announced that its investigational anti-amyloid antibody gantenerumab did not meet the primary endpoints in two Phase III studies evaluating its efficacy in early Alzheimer's disease, representing a setback for the company's neuroscience portfolio.",
    url: "https://example.com/roche-gantenerumab-results",
    source: "Roche Media",
    impact: "negative",
  },
  {
    id: "7",
    companyId: "bms",
    companyName: "Bristol Myers Squibb",
    companyLogo: "/placeholder.svg?height=40&width=40",
    updateType: "financial",
    title: "Bristol Myers Squibb Increases Quarterly Dividend by 5.6%",
    date: "2023-04-13T09:00:00.000Z",
    summary:
      "Bristol Myers Squibb's Board of Directors has approved a 5.6% increase in the company's quarterly dividend, reflecting confidence in the company's long-term growth prospects and strong cash flow generation.",
    url: "https://example.com/bms-dividend-increase",
    source: "Bristol Myers Squibb Investor Relations",
    impact: "positive",
  },
  {
    id: "8",
    companyId: "jnj",
    companyName: "Johnson & Johnson",
    companyLogo: "/placeholder.svg?height=40&width=40",
    updateType: "news",
    title: "Johnson & Johnson Completes Separation of Consumer Health Business",
    date: "2023-04-09T12:15:00.000Z",
    summary:
      "Johnson & Johnson has completed the separation of its Consumer Health business, now operating as Kenvue, an independent, publicly traded company. The separation allows J&J to focus on its pharmaceutical and medical device businesses.",
    url: "https://example.com/jnj-kenvue-separation",
    source: "Johnson & Johnson Press Release",
    impact: "neutral",
  },
]

interface FinancialUpdate {
  id: string
  companyId: string
  companyName: string
  companyLogo: string
  quarter: string
  fiscalYear: string
  revenue: number
  revenueChange: number
  eps: number
  epsChange: number
  date: string
  highlights: string[]
}

const financialUpdates: FinancialUpdate[] = [
  {
    id: "1",
    companyId: "pfizer",
    companyName: "Pfizer",
    companyLogo: "/placeholder.svg?height=40&width=40",
    quarter: "Q1",
    fiscalYear: "2023",
    revenue: 25.4,
    revenueChange: 14.2,
    eps: 1.23,
    epsChange: 8.7,
    date: "2023-04-02T00:00:00.000Z",
    highlights: [
      "COVID-19 vaccine revenue reached $8.8 billion",
      "Paxlovid antiviral treatment contributed $4.1 billion",
      "Non-COVID product portfolio grew 5% operationally",
    ],
  },
  {
    id: "2",
    companyId: "novartis",
    companyName: "Novartis",
    companyLogo: "/placeholder.svg?height=40&width=40",
    quarter: "Q1",
    fiscalYear: "2023",
    revenue: 12.9,
    revenueChange: 5.0,
    eps: 1.56,
    epsChange: 7.2,
    date: "2023-04-12T00:00:00.000Z",
    highlights: [
      "Entresto sales increased 32% to $1.4 billion",
      "Kesimpta reached blockbuster status with $372 million in quarterly sales",
      "Raised full-year guidance for both sales and core operating income",
    ],
  },
  {
    id: "3",
    companyId: "merck",
    companyName: "Merck",
    companyLogo: "/placeholder.svg?height=40&width=40",
    quarter: "Q1",
    fiscalYear: "2023",
    revenue: 14.5,
    revenueChange: 3.2,
    eps: 1.87,
    epsChange: 5.6,
    date: "2023-03-28T00:00:00.000Z",
    highlights: [
      "Keytruda sales grew 19% to $5.8 billion",
      "Gardasil vaccine sales increased 25% to $2.1 billion",
      "Animal Health segment showed resilience with 4% growth",
    ],
  },
  {
    id: "4",
    companyId: "astrazeneca",
    companyName: "AstraZeneca",
    companyLogo: "/placeholder.svg?height=40&width=40",
    quarter: "Q1",
    fiscalYear: "2023",
    revenue: 10.9,
    revenueChange: 6.8,
    eps: 1.92,
    epsChange: 12.3,
    date: "2023-04-06T00:00:00.000Z",
    highlights: [
      "Oncology portfolio grew 15% with strong performance from Tagrisso and Imfinzi",
      "Rare disease medicines contributed $2.1 billion, up 9%",
      "Emerging markets revenue increased 8%, led by China growth of 13%",
    ],
  },
  {
    id: "5",
    companyId: "bms",
    companyName: "Bristol Myers Squibb",
    companyLogo: "/placeholder.svg?height=40&width=40",
    quarter: "Q1",
    fiscalYear: "2023",
    revenue: 11.3,
    revenueChange: -2.1,
    eps: 2.05,
    epsChange: 4.1,
    date: "2023-04-13T00:00:00.000Z",
    highlights: [
      "Eliquis maintained market leadership with $3.2 billion in sales",
      "New product portfolio, including Reblozyl and Breyanzi, grew 76%",
      "Opdivo returned to growth with 11% increase to $2.1 billion",
    ],
  },
]

interface PipelineUpdate {
  id: string
  companyId: string
  companyName: string
  companyLogo: string
  drugName: string
  indication: string
  phase: "Preclinical" | "Phase 1" | "Phase 2" | "Phase 3" | "Filed" | "Approved"
  updateType: "Initiation" | "Results" | "Milestone" | "Submission" | "Approval" | "Setback"
  date: string
  summary: string
}

const pipelineUpdates: PipelineUpdate[] = [
  {
    id: "1",
    companyId: "pfizer",
    companyName: "Pfizer",
    companyLogo: "/placeholder.svg?height=40&width=40",
    drugName: "PF-07321332",
    indication: "COVID-19",
    phase: "Phase 3",
    updateType: "Initiation",
    date: "2023-04-10T00:00:00.000Z",
    summary: "Initiated Phase 3 trial for novel oral SARS-CoV-2 antiviral with 3,000 participants across 20 countries.",
  },
  {
    id: "2",
    companyId: "novartis",
    companyName: "Novartis",
    companyLogo: "/placeholder.svg?height=40&width=40",
    drugName: "Leqvio",
    indication: "Cardiovascular Disease",
    phase: "Phase 3",
    updateType: "Results",
    date: "2023-04-11T00:00:00.000Z",
    summary:
      "Phase 3 ORION-4 study met primary endpoint, demonstrating significant reduction in major adverse cardiovascular events in patients with atherosclerotic cardiovascular disease.",
  },
  {
    id: "3",
    companyId: "merck",
    companyName: "Merck",
    companyLogo: "/placeholder.svg?height=40&width=40",
    drugName: "Keytruda",
    indication: "Renal Cell Carcinoma",
    phase: "Filed",
    updateType: "Submission",
    date: "2023-04-14T00:00:00.000Z",
    summary:
      "Submitted supplemental Biologics License Application to FDA for adjuvant treatment of patients with renal cell carcinoma following nephrectomy.",
  },
  {
    id: "4",
    companyId: "astrazeneca",
    companyName: "AstraZeneca",
    companyLogo: "/placeholder.svg?height=40&width=40",
    drugName: "Imfinzi",
    indication: "Small Cell Lung Cancer",
    phase: "Approved",
    updateType: "Approval",
    date: "2023-04-08T00:00:00.000Z",
    summary:
      "Received FDA approval for extensive-stage small cell lung cancer in combination with standard-of-care chemotherapy based on CASPIAN trial results.",
  },
  {
    id: "5",
    companyId: "roche",
    companyName: "Roche",
    companyLogo: "/placeholder.svg?height=40&width=40",
    drugName: "Gantenerumab",
    indication: "Alzheimer's Disease",
    phase: "Phase 3",
    updateType: "Setback",
    date: "2023-04-07T00:00:00.000Z",
    summary:
      "Phase 3 GRADUATE I and II studies did not meet primary endpoints of slowing clinical decline in people with early Alzheimer's disease.",
  },
  {
    id: "6",
    companyId: "gsk",
    companyName: "GSK",
    companyLogo: "/placeholder.svg?height=40&width=40",
    drugName: "Blenrep",
    indication: "Multiple Myeloma",
    phase: "Phase 2",
    updateType: "Results",
    date: "2023-04-09T00:00:00.000Z",
    summary:
      "DREAMM-5 platform study showed promising results for novel combination regimen in heavily pre-treated multiple myeloma patients.",
  },
  {
    id: "7",
    companyId: "jnj",
    companyName: "Johnson & Johnson",
    companyLogo: "/placeholder.svg?height=40&width=40",
    drugName: "Tremfya",
    indication: "Ulcerative Colitis",
    phase: "Phase 2",
    updateType: "Results",
    date: "2023-04-12T00:00:00.000Z",
    summary:
      "Phase 2b QUASAR study met primary endpoint of clinical remission at week 12 in patients with moderate to severe ulcerative colitis.",
  },
]

export function CompanyFeed() {
  const [activeTab, setActiveTab] = useState("updates")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getImpactColor = (impact?: "positive" | "negative" | "neutral") => {
    switch (impact) {
      case "positive":
        return "text-green-600 dark:text-green-400"
      case "negative":
        return "text-red-600 dark:text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Filed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Phase 3":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Phase 2":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "Phase 1":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Preclinical":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getUpdateTypeColor = (type: string) => {
    switch (type) {
      case "Approval":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Submission":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Results":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "Initiation":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300"
      case "Milestone":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "Setback":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Company Activity Feed</CardTitle>
        <CardDescription>Latest updates from pharmaceutical companies</CardDescription>
        <Tabs defaultValue="updates" value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="updates">Recent Updates</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          </TabsList>
          <TabsContent value="updates" className="mt-4 space-y-4">
            {companyUpdates.map((update) => (
              <div key={update.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={update.companyLogo || "/placeholder.svg"} alt={update.companyName} />
                    <AvatarFallback>{update.companyName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {update.updateType.charAt(0).toUpperCase() + update.updateType.slice(1)}
                      </Badge>
                      {update.impact && (
                        <span className={`text-xs font-medium flex items-center ${getImpactColor(update.impact)}`}>
                          {update.impact === "positive" && <TrendingUpIcon className="h-3 w-3 mr-1" />}
                          {update.impact === "negative" && <TrendingUpIcon className="h-3 w-3 mr-1 rotate-180" />}
                          {update.impact.charAt(0).toUpperCase() + update.impact.slice(1)} Impact
                        </span>
                      )}
                    </div>
                    <h4 className="font-semibold leading-tight">
                      <Link href={`/companies/${update.companyId}`} className="hover:underline">
                        {update.companyName}
                      </Link>
                      {" - "}
                      <Link href={update.url} className="hover:underline" target="_blank">
                        {update.title}
                      </Link>
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{update.summary}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {formatDate(update.date)}
                    </span>
                    {update.source && (
                      <>
                        <span>•</span>
                        <span>{update.source}</span>
                      </>
                    )}
                  </div>
                  <Link href={update.url} className="flex items-center hover:underline" target="_blank">
                    Read more <ExternalLinkIcon className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="financial" className="mt-4 space-y-4">
            {financialUpdates.map((update) => (
              <div key={update.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={update.companyLogo || "/placeholder.svg"} alt={update.companyName} />
                    <AvatarFallback>{update.companyName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {update.quarter} {update.fiscalYear}
                      </Badge>
                      <span
                        className={`text-xs font-medium flex items-center ${update.revenueChange >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                      >
                        <TrendingUpIcon className={`h-3 w-3 mr-1 ${update.revenueChange < 0 ? "rotate-180" : ""}`} />
                        Revenue {update.revenueChange >= 0 ? "+" : ""}
                        {update.revenueChange}%
                      </span>
                    </div>
                    <h4 className="font-semibold leading-tight">
                      <Link href={`/companies/${update.companyId}`} className="hover:underline">
                        {update.companyName} Financial Results
                      </Link>
                    </h4>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 py-2">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Revenue</span>
                    <span className="text-lg font-semibold">${update.revenue}B</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">EPS</span>
                    <span className="text-lg font-semibold">${update.eps.toFixed(2)}</span>
                    <span
                      className={`text-xs ${update.epsChange >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {update.epsChange >= 0 ? "+" : ""}
                      {update.epsChange}%
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-medium flex items-center gap-1">
                    <FileTextIcon className="h-3 w-3" /> Key Highlights
                  </h5>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {update.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-1.5 mt-1 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {formatDate(update.date)}
                  </span>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="pipeline" className="mt-4 space-y-4">
            {pipelineUpdates.map((update) => (
              <div key={update.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={update.companyLogo || "/placeholder.svg"} alt={update.companyName} />
                    <AvatarFallback>{update.companyName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={`text-xs ${getPhaseColor(update.phase)}`}>{update.phase}</Badge>
                      <Badge variant="outline" className={`text-xs ${getUpdateTypeColor(update.updateType)}`}>
                        {update.updateType}
                      </Badge>
                    </div>
                    <h4 className="font-semibold leading-tight">
                      <Link href={`/companies/${update.companyId}`} className="hover:underline">
                        {update.companyName}
                      </Link>
                      {" - "}
                      <span className="font-bold">{update.drugName}</span> for {update.indication}
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{update.summary}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3 w-3" />
                    {formatDate(update.date)}
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
          <Link href="/companies">View All Companies</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

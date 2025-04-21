"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, ExternalLinkIcon } from "lucide-react"
import Link from "next/link"

interface NewsItem {
  id: string
  title: string
  source: string
  sourceUrl: string
  date: string
  summary: string
  category: string
  url: string
  isNew?: boolean
  relatedCompanies?: string[] // Add this property
}

interface NewsFeedProps {
  companyId?: string
}

const industryNews: NewsItem[] = [
  {
    id: "1",
    title: "FDA Approves Pfizer's New Breakthrough Cancer Therapy",
    source: "BioPharma Journal",
    sourceUrl: "https://example.com/biopharma",
    date: "2023-04-15T08:30:00.000Z",
    summary:
      "The FDA has granted approval for Pfizer's revolutionary CAR-T cell therapy for treatment of multiple myeloma, marking a significant advancement in cancer treatment options.",
    category: "Regulatory",
    url: "https://example.com/news/1",
    isNew: true,
  },
  {
    id: "2",
    title: "Novartis Announces Positive Phase III Results for Alzheimer's Drug",
    source: "MedNews Today",
    sourceUrl: "https://example.com/mednews",
    date: "2023-04-14T14:45:00.000Z",
    summary:
      "Novartis has reported promising results from its Phase III clinical trial for a new Alzheimer's treatment, showing significant cognitive improvement in patients with early-stage disease.",
    category: "Clinical Trials",
    url: "https://example.com/news/2",
    isNew: true,
  },
  {
    id: "3",
    title: "AstraZeneca and Moderna Form Strategic Partnership for mRNA Therapeutics",
    source: "Pharma Business Review",
    sourceUrl: "https://example.com/pbr",
    date: "2023-04-12T09:15:00.000Z",
    summary:
      "AstraZeneca and Moderna have announced a $1.5 billion collaboration to develop and commercialize mRNA therapeutics for various disease targets, expanding beyond vaccines.",
    category: "Business",
    url: "https://example.com/news/3",
  },
  {
    id: "4",
    title: "Johnson & Johnson Divests Consumer Health Division in $35B Deal",
    source: "Financial Pharma",
    sourceUrl: "https://example.com/finpharma",
    date: "2023-04-10T11:20:00.000Z",
    summary:
      "Johnson & Johnson has completed the separation of its consumer health business, now operating as an independent company called Kenvue, in a deal valued at $35 billion.",
    category: "Business",
    url: "https://example.com/news/4",
  },
  {
    id: "5",
    title: "EU Approves Roche's Bispecific Antibody for Rare Blood Disorder",
    source: "European Medical Journal",
    sourceUrl: "https://example.com/emj",
    date: "2023-04-08T15:30:00.000Z",
    summary:
      "The European Medicines Agency has approved Roche's novel bispecific antibody for the treatment of paroxysmal nocturnal hemoglobinuria, offering a new option for patients with this rare blood disorder.",
    category: "Regulatory",
    url: "https://example.com/news/5",
  },
  {
    id: "i1",
    title: "Pfizer Announces Breakthrough in Cancer Treatment Research",
    source: "PharmaTimes",
    sourceUrl: "https://example.com/pfizer-cancer-breakthrough",
    date: "2023-04-15T09:30:00.000Z",
    summary:
      "Pfizer has announced a significant breakthrough in cancer treatment research, with promising results from early-stage clinical trials.",
    category: "R&D",
    relatedCompanies: ["pfizer"],
  },
]

const marketNews: NewsItem[] = [
  {
    id: "6",
    title: "Global Pharmaceutical Market Expected to Reach $1.8 Trillion by 2026",
    source: "Market Research Pro",
    sourceUrl: "https://example.com/mrp",
    date: "2023-04-14T10:15:00.000Z",
    summary:
      "A new comprehensive market analysis predicts the global pharmaceutical market will grow at a CAGR of 5.8% over the next three years, reaching $1.8 trillion by 2026.",
    category: "Market Analysis",
    url: "https://example.com/news/6",
    isNew: true,
  },
  {
    id: "7",
    title: "Biotech Stocks Rally Following Breakthrough Gene Therapy Announcements",
    source: "Financial Times",
    sourceUrl: "https://example.com/ft",
    date: "2023-04-13T16:45:00.000Z",
    summary:
      "Biotech stocks have seen a significant rally this week following several breakthrough announcements in gene therapy, with the sector index up 7.2% since Monday.",
    category: "Financial",
    url: "https://example.com/news/7",
  },
  {
    id: "8",
    title: "Pharmaceutical Supply Chain Challenges Expected to Ease by Q3 2023",
    source: "Supply Chain Digest",
    sourceUrl: "https://example.com/scd",
    date: "2023-04-11T09:30:00.000Z",
    summary:
      "Industry experts predict that the global pharmaceutical supply chain disruptions experienced over the past year will begin to normalize by the third quarter of 2023.",
    category: "Supply Chain",
    url: "https://example.com/news/8",
  },
  {
    id: "9",
    title: "Emerging Markets Drive Growth in Generic Pharmaceuticals Sector",
    source: "Global Pharma Economics",
    sourceUrl: "https://example.com/gpe",
    date: "2023-04-09T14:20:00.000Z",
    summary:
      "Emerging markets, particularly in Asia and Latin America, are driving significant growth in the generic pharmaceuticals sector, with a projected 8.4% CAGR through 2025.",
    category: "Market Analysis",
    url: "https://example.com/news/9",
  },
  {
    id: "10",
    title: "Pharmaceutical R&D Spending Reaches Record $220 Billion Globally",
    source: "R&D Magazine",
    sourceUrl: "https://example.com/rdmag",
    date: "2023-04-07T11:10:00.000Z",
    summary:
      "Global pharmaceutical R&D spending has reached a record $220 billion in 2022, representing a 7.9% increase from the previous year as companies accelerate innovation post-pandemic.",
    category: "R&D",
    url: "https://example.com/news/10",
  },
]

const researchNews: NewsItem[] = [
  {
    id: "11",
    title: "Breakthrough in CRISPR Technology Enhances Precision for Genetic Disorders",
    source: "Science Today",
    sourceUrl: "https://example.com/scitoday",
    date: "2023-04-15T09:45:00.000Z",
    summary:
      "Researchers have developed an enhanced CRISPR-Cas9 system that significantly reduces off-target effects, potentially accelerating gene therapy applications for rare genetic disorders.",
    category: "Research",
    url: "https://example.com/news/11",
    isNew: true,
  },
  {
    id: "12",
    title: "Novel AI Platform Predicts Drug-Target Interactions with 94% Accuracy",
    source: "AI in Medicine",
    sourceUrl: "https://example.com/aimedj",
    date: "2023-04-13T13:20:00.000Z",
    summary:
      "A new artificial intelligence platform developed by researchers at Stanford has demonstrated 94% accuracy in predicting drug-target interactions, potentially accelerating drug discovery timelines.",
    category: "Technology",
    url: "https://example.com/news/12",
    isNew: true,
  },
  {
    id: "13",
    title: "Researchers Identify New Biomarkers for Early Parkinson's Detection",
    source: "Neurology Research Journal",
    sourceUrl: "https://example.com/neuro",
    date: "2023-04-11T10:30:00.000Z",
    summary:
      "A team of international researchers has identified a panel of blood-based biomarkers that can detect Parkinson's disease up to five years before clinical symptoms appear.",
    category: "Research",
    url: "https://example.com/news/13",
  },
  {
    id: "14",
    title: "Innovative mRNA Delivery System Shows Promise for Targeted Cancer Therapy",
    source: "Cancer Research Weekly",
    sourceUrl: "https://example.com/crw",
    date: "2023-04-09T15:15:00.000Z",
    summary:
      "Scientists have developed a novel lipid nanoparticle system for delivering mRNA specifically to cancer cells, showing remarkable efficacy in preclinical models of solid tumors.",
    category: "Research",
    url: "https://example.com/news/14",
  },
  {
    id: "15",
    title: "Machine Learning Algorithm Predicts Antibiotic Resistance with High Accuracy",
    source: "Microbiology Advances",
    sourceUrl: "https://example.com/microadv",
    date: "2023-04-07T12:40:00.000Z",
    summary:
      "A new machine learning algorithm can predict antibiotic resistance patterns with over 90% accuracy, potentially helping clinicians make more informed treatment decisions for bacterial infections.",
    category: "Technology",
    url: "https://example.com/news/15",
  },
]

export function NewsFeed({ companyId }: NewsFeedProps) {
  const [activeTab, setActiveTab] = useState("industry")

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getNewsForTab = () => {
    switch (activeTab) {
      case "industry":
        return industryNews
      case "market":
        return marketNews
      case "research":
        return researchNews
      default:
        return industryNews
    }
  }

  // If companyId is provided, filter news items related to that company
  const filteredNews = companyId
    ? {
        industry: industryNews.filter((item) => item.relatedCompanies?.includes(companyId) || !item.relatedCompanies),
        market: marketNews.filter((item) => item.relatedCompanies?.includes(companyId) || !item.relatedCompanies),
        research: researchNews.filter((item) => item.relatedCompanies?.includes(companyId) || !item.relatedCompanies),
      }
    : { industry: industryNews, market: marketNews, research: researchNews }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Pharmaceutical News</CardTitle>
        <CardDescription>Latest updates from the pharmaceutical industry</CardDescription>
        <Tabs defaultValue="industry" value={activeTab} onValueChange={setActiveTab} className="mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="industry">Industry</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="research">Research</TabsTrigger>
          </TabsList>
          <TabsContent value="industry" className="mt-4 space-y-4">
            {filteredNews.industry.map((item) => (
              <div key={item.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {item.isNew && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <h4 className="font-semibold leading-tight">
                      <Link href={item.url} className="hover:underline" target="_blank">
                        {item.title}
                      </Link>
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {formatDate(item.date)}
                    </span>
                    <span>•</span>
                    <a href={item.sourceUrl} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      {item.source}
                    </a>
                  </div>
                  <Link href={item.url} className="flex items-center hover:underline" target="_blank">
                    Read more <ExternalLinkIcon className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="market" className="mt-4 space-y-4">
            {filteredNews.market.map((item) => (
              <div key={item.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {item.isNew && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <h4 className="font-semibold leading-tight">
                      <Link href={item.url} className="hover:underline" target="_blank">
                        {item.title}
                      </Link>
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {formatDate(item.date)}
                    </span>
                    <span>•</span>
                    <a href={item.sourceUrl} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      {item.source}
                    </a>
                  </div>
                  <Link href={item.url} className="flex items-center hover:underline" target="_blank">
                    Read more <ExternalLinkIcon className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="research" className="mt-4 space-y-4">
            {filteredNews.research.map((item) => (
              <div key={item.id} className="flex flex-col space-y-2 rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {item.isNew && (
                        <Badge variant="default" className="text-xs">
                          New
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                    <h4 className="font-semibold leading-tight">
                      <Link href={item.url} className="hover:underline" target="_blank">
                        {item.title}
                      </Link>
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.summary}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" />
                      {formatDate(item.date)}
                    </span>
                    <span>•</span>
                    <a href={item.sourceUrl} className="hover:underline" target="_blank" rel="noopener noreferrer">
                      {item.source}
                    </a>
                  </div>
                  <Link href={item.url} className="flex items-center hover:underline" target="_blank">
                    Read more <ExternalLinkIcon className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent className="px-2">{/* Empty CardContent to maintain layout */}</CardContent>
      <CardFooter className="border-t p-4">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href="/news">View All News</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

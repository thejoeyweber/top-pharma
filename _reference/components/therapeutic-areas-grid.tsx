"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUpIcon, ArrowRightIcon } from "lucide-react"

interface TherapeuticArea {
  id: string
  name: string
  description: string
  productCount: number
  companyCount: number
  growthRate: number
  marketSize: string
  icon: string
  color: string
  trending?: boolean
}

const therapeuticAreas: TherapeuticArea[] = [
  {
    id: "oncology",
    name: "Oncology",
    description: "Cancer treatments including immunotherapies, targeted therapies, and traditional approaches.",
    productCount: 428,
    companyCount: 156,
    growthRate: 12.4,
    marketSize: "$185B",
    icon: "🧬",
    color: "bg-red-100 dark:bg-red-900",
    trending: true,
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Treatments for neurological disorders including Alzheimer's, Parkinson's, and multiple sclerosis.",
    productCount: 312,
    companyCount: 98,
    growthRate: 9.8,
    marketSize: "$92B",
    icon: "🧠",
    color: "bg-purple-100 dark:bg-purple-900",
    trending: true,
  },
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Medications and devices for heart disease, hypertension, and other cardiovascular conditions.",
    productCount: 385,
    companyCount: 124,
    growthRate: 7.2,
    marketSize: "$138B",
    icon: "❤️",
    color: "bg-pink-100 dark:bg-pink-900",
  },
  {
    id: "immunology",
    name: "Immunology",
    description: "Therapies for autoimmune disorders, allergies, and immune system dysfunctions.",
    productCount: 276,
    companyCount: 87,
    growthRate: 14.5,
    marketSize: "$110B",
    icon: "🛡️",
    color: "bg-blue-100 dark:bg-blue-900",
    trending: true,
  },
  {
    id: "infectious-diseases",
    name: "Infectious Diseases",
    description: "Antibiotics, antivirals, vaccines, and other treatments for bacterial and viral infections.",
    productCount: 342,
    companyCount: 103,
    growthRate: 11.2,
    marketSize: "$125B",
    icon: "🦠",
    color: "bg-green-100 dark:bg-green-900",
  },
  {
    id: "endocrinology",
    name: "Endocrinology",
    description: "Treatments for diabetes, thyroid disorders, and other hormonal conditions.",
    productCount: 198,
    companyCount: 76,
    growthRate: 8.9,
    marketSize: "$78B",
    icon: "⚗️",
    color: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    id: "respiratory",
    name: "Respiratory",
    description: "Medications for asthma, COPD, pulmonary fibrosis, and other respiratory conditions.",
    productCount: 215,
    companyCount: 68,
    growthRate: 6.8,
    marketSize: "$65B",
    icon: "🫁",
    color: "bg-cyan-100 dark:bg-cyan-900",
  },
  {
    id: "gastroenterology",
    name: "Gastroenterology",
    description: "Treatments for inflammatory bowel disease, GERD, and other digestive disorders.",
    productCount: 187,
    companyCount: 59,
    growthRate: 7.5,
    marketSize: "$52B",
    icon: "�胃",
    color: "bg-orange-100 dark:bg-orange-900",
  },
]

export function TherapeuticAreasGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {therapeuticAreas.map((area) => (
        <Card key={area.id} className={`h-full border-l-4 ${area.color}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="text-2xl mb-1">{area.icon}</div>
              {area.trending && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <TrendingUpIcon className="h-3 w-3" />
                  Trending
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg">{area.name}</CardTitle>
            <CardDescription className="line-clamp-2">{area.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Products</p>
                <p className="font-medium">{area.productCount}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Companies</p>
                <p className="font-medium">{area.companyCount}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Growth</p>
                <p className="font-medium text-green-600 dark:text-green-400">+{area.growthRate}%</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Market Size</p>
                <p className="font-medium">{area.marketSize}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <Button variant="ghost" size="sm" className="w-full justify-between" asChild>
              <Link href={`/therapeutic-areas/${area.id}`}>
                View Details <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

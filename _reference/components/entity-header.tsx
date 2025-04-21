import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { HeartIcon } from "lucide-react"
import Image from "next/image"

interface Tag {
  label: string
  variant: "default" | "secondary" | "outline" | "destructive"
}

interface EntityHeaderProps {
  title: string
  description: string
  image: string
  type: "company" | "product" | "website" | "therapeutic-area"
  tags: Tag[]
  ctaLabel: string
  ctaUrl: string
}

export function EntityHeader({ title, description, image, type, tags, ctaLabel, ctaUrl }: EntityHeaderProps) {
  return (
    <div className="flex flex-col gap-4 px-4 lg:px-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-shrink-0">
          <Image src={image || "/placeholder.svg"} alt={title} width={100} height={100} className="rounded-lg border" />
        </div>
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant={tag.variant as any}>
                  {tag.label}
                </Badge>
              ))}
            </div>
          </div>
          <p className="mt-2 text-muted-foreground line-clamp-2">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <HeartIcon className="h-4 w-4" />
              Follow
            </Button>
            <Button size="sm" asChild>
              <a href={ctaUrl} target="_blank" rel="noopener noreferrer">
                {ctaLabel}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

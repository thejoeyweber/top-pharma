import { Building2Icon, FlaskConicalIcon as FlaskIcon, GlobeIcon, StethoscopeIcon } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface DirectoryHeaderProps {
  title: string
  description: string
  icon: string
}

export function DirectoryHeader({ title, description, icon }: DirectoryHeaderProps) {
  const IconComponent = getIconComponent(icon)

  return (
    <div className="flex flex-col gap-2 px-4 lg:px-6">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <IconComponent className="h-5 w-5 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

function getIconComponent(iconName: string): LucideIcon {
  switch (iconName) {
    case "Building2":
      return Building2Icon
    case "Flask":
      return FlaskIcon
    case "Globe":
      return GlobeIcon
    case "Stethoscope":
      return StethoscopeIcon
    default:
      return Building2Icon
  }
}

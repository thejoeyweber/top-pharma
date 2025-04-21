"use client"

import { useState, useEffect } from "react"
import { CommandIcon, PlusIcon } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

export function QuickActions() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "." && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <>
      <Button variant="outline" size="sm" className="h-8 gap-1" onClick={() => setOpen(true)}>
        <CommandIcon className="h-3.5 w-3.5" />
        <span className="hidden sm:inline-block">Quick Actions</span>
        <span className="hidden sm:inline-block text-xs text-muted-foreground">⌘.</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem onSelect={() => runCommand(() => (window.location.href = "/"))}>
              <span>Go to Home</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => (window.location.href = "/dashboard"))}>
              <span>Go to Dashboard</span>
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => (window.location.href = "/companies"))}>
              <span>Go to Companies</span>
              <CommandShortcut>⌘C</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => (window.location.href = "/products"))}>
              <span>Go to Products</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => (window.location.href = "/reports"))}>
              <span>Go to Reports</span>
              <CommandShortcut>⌘R</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions">
            <CommandItem onSelect={() => runCommand(() => (window.location.href = "/companies/new"))}>
              <PlusIcon className="mr-2 h-4 w-4" />
              <span>Add New Company</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => (window.location.href = "/products/new"))}>
              <PlusIcon className="mr-2 h-4 w-4" />
              <span>Add New Product</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => (window.location.href = "/reports/new"))}>
              <PlusIcon className="mr-2 h-4 w-4" />
              <span>Create New Report</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem onSelect={() => runCommand(() => (window.location.href = "/profile"))}>
              <span>Edit Profile</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => (window.location.href = "/settings"))}>
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

"use client"

import React from "react"

import { useState, useEffect } from "react"
import { HelpCircleIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export function KeyboardShortcutsDialog() {
  const [open, setOpen] = useState(false)

  // Handle keyboard shortcut (Shift+?)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key === "?") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircleIcon className="h-5 w-5" />
          <span className="sr-only">Keyboard Shortcuts</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>Keyboard shortcuts to help you navigate the application faster.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            <ShortcutSection
              title="Navigation"
              shortcuts={[
                { keys: ["g", "h"], description: "Go to Home" },
                { keys: ["g", "d"], description: "Go to Dashboard" },
                { keys: ["g", "c"], description: "Go to Companies" },
                { keys: ["g", "p"], description: "Go to Products" },
                { keys: ["g", "w"], description: "Go to Websites" },
                { keys: ["g", "t"], description: "Go to Therapeutic Areas" },
                { keys: ["g", "r"], description: "Go to Reports" },
                { keys: ["g", "f"], description: "Go to Following" },
              ]}
            />

            <ShortcutSection
              title="Actions"
              shortcuts={[
                { keys: ["⌘", "k"], description: "Open Search" },
                { keys: ["⌘", "."], description: "Open Quick Actions" },
                { keys: ["⌘", "b"], description: "Toggle Sidebar" },
                { keys: ["Shift", "?"], description: "Show Keyboard Shortcuts" },
              ]}
            />

            <ShortcutSection
              title="Tables"
              shortcuts={[
                { keys: ["j"], description: "Next row" },
                { keys: ["k"], description: "Previous row" },
                { keys: ["o"], description: "Open selected item" },
                { keys: ["f"], description: "Follow/unfollow item" },
                { keys: ["s"], description: "Sort column" },
                { keys: ["1-9"], description: "Go to page" },
              ]}
            />

            <ShortcutSection
              title="Forms"
              shortcuts={[
                { keys: ["⌘", "Enter"], description: "Submit form" },
                { keys: ["Esc"], description: "Cancel/close" },
                { keys: ["Tab"], description: "Next field" },
                { keys: ["Shift", "Tab"], description: "Previous field" },
              ]}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

interface ShortcutSectionProps {
  title: string
  shortcuts: {
    keys: string[]
    description: string
  }[]
}

function ShortcutSection({ title, shortcuts }: ShortcutSectionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm">{shortcut.description}</span>
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key, keyIndex) => (
                <React.Fragment key={keyIndex}>
                  <kbd className="rounded border bg-muted px-2 py-1 font-mono text-xs">{key}</kbd>
                  {keyIndex < shortcut.keys.length - 1 && <span className="text-muted-foreground">+</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

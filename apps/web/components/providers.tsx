"use client"

/**
 * @description
 * Centralizes application-wide providers for the 'web' app.
 * Includes NextThemesProvider for theme management and ClerkProvider for authentication.
 * Assumes NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is correctly passed via next.config.js.
 *
 * @dependencies
 * - next-themes: Handles theme switching (light/dark/system).
 * - @clerk/nextjs: Provides authentication context and hooks (<ClerkProvider>).
 */
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ClerkProvider } from "@clerk/nextjs"

// Check if Clerk publishable key is available in the environment (primarily for logging)
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
const hasClerkKeys = Boolean(clerkPubKey)

if (typeof window !== "undefined") {
  // Runtime check (client-side)
  console.log(
    "Web App Providers (Client-side): NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY available?",
    hasClerkKeys ? `Yes (Starts with: ${clerkPubKey?.substring(0, 5)}...)` : "No"
  )
  if (!hasClerkKeys) {
    console.error(
      "CRITICAL: Clerk Publishable Key is MISSING on the client-side. Check .env.local and next.config.mjs `env` block."
    )
  }
}

/**
 * Provides application-wide context, including theme and authentication.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to wrap with providers.
 * @returns {React.ReactElement} The providers wrapping the children.
 */
export function Providers({
  children,
}: {
  children: React.ReactNode
}): React.ReactElement {
  return (
    <ClerkProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    </ClerkProvider>
  )
}

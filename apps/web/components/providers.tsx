"use client"

/**
 * @description
 * This component centralizes application-wide providers for the 'web' app.
 * It currently includes the NextThemesProvider for theme management and
 * the ClerkProvider for authentication.
 * Conditionally renders ClerkProvider based on the presence of the publishable key
 * to handle build environments where keys might not be available.
 *
 * @dependencies
 * - next-themes: Handles theme switching (light/dark/system).
 * - @clerk/nextjs: Provides authentication context and hooks.
 */
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ClerkProvider } from "@clerk/nextjs"

// Check if Clerk publishable key is available in the environment
const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const hasClerkKeys = Boolean(clerkPubKey);

if (typeof window !== "undefined") {
  // Runtime check (client-side)
  console.log(
    "Web App Providers (Client-side): Clerk Publishable Key available?",
    hasClerkKeys ? "Yes" : "No"
  );
} else {
  // Build-time/Server-side check
  console.log(
    "Web App Providers (Server-side/Build): Clerk Publishable Key available?",
    hasClerkKeys ? "Yes" : "No"
  );
}

/**
 * Provides application-wide context, including theme and authentication.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to wrap with providers.
 * @returns {React.ReactElement} The providers wrapping the children.
 */
export function Providers({ children }: { children: React.ReactNode }): React.ReactElement {
  // If Clerk keys are missing (e.g., during build without env vars set),
  // render without ClerkProvider to avoid errors.
  if (!hasClerkKeys) {
    console.warn(
      "Web App Providers: Clerk keys not found. Rendering without ClerkProvider. This is expected during build if keys are not set."
    );
    return (
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        enableColorScheme
      >
        {children}
      </NextThemesProvider>
    );
  }
  
  // Normal runtime with Clerk authentication
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
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

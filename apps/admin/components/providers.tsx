"use client"

/**
 * @description
 * This component centralizes application-wide providers for the 'admin' app.
 * It currently includes the NextThemesProvider for theme management and
 * the ClerkProvider for authentication.
 *
 * @dependencies
 * - next-themes: Handles theme switching (light/dark/system).
 * - @clerk/nextjs: Provides authentication context and hooks.
 */
import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ClerkProvider } from "@clerk/nextjs"

// Check if Clerk keys are available
const hasClerkKeys = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

/**
 * Provides application-wide context, including theme and authentication.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to wrap with providers.
 * @returns {React.ReactElement} The providers wrapping the children.
 */
export function Providers({ children }: { children: React.ReactNode }): React.ReactElement {
  // During build, use a simplified provider chain if Clerk keys aren't available
  if (!hasClerkKeys) {
    console.log('Building without Clerk authentication - keys not available');
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
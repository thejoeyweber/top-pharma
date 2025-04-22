/**
 * @description
 * Renders the sign-in page for the 'web' application using Clerk's pre-built UI component.
 * This page handles the user sign-in flow.
 *
 * @dependencies
 * - @clerk/nextjs: Provides the <SignIn> component.
 */
import { SignIn } from "@clerk/nextjs"

/**
 * Sign-in page component.
 * Uses Clerk's <SignIn> component to render the sign-in form and handle authentication.
 * The `path` prop ensures Clerk correctly routes within the sign-in flow.
 * @returns {JSX.Element} The Clerk SignIn component.
 */
export default function SignInPage(): JSX.Element {
  return <SignIn path="/sign-in" />
} 
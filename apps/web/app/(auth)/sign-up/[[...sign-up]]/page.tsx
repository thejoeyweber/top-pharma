/**
 * @description
 * Renders the sign-up page for the 'web' application using Clerk's pre-built UI component.
 * This page handles the user registration flow.
 *
 * @dependencies
 * - @clerk/nextjs: Provides the <SignUp> component.
 */
import { SignUp } from "@clerk/nextjs"

/**
 * Sign-up page component.
 * Uses Clerk's <SignUp> component to render the registration form and handle user creation.
 * The `path` prop ensures Clerk correctly routes within the sign-up flow.
 * @returns {JSX.Element} The Clerk SignUp component.
 */
export default function SignUpPage(): JSX.Element {
  return <SignUp path="/sign-up" />
} 
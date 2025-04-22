import * as React from "react"

/**
 * @description
 * Layout component for authentication-related pages (sign-in, sign-up, user-profile)
 * within the 'web' application. It provides a centered container for the auth forms/components.
 */

/**
 * Renders the layout for authentication pages.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The specific auth page component (e.g., SignIn, SignUp).
 * @returns {JSX.Element} A div structure that centers the authentication content.
 */
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>): JSX.Element {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {children}
    </div>
  )
}

/**
 * @description
 * Renders the user profile management page for the 'web' application using Clerk's
 * pre-built UI component. Authenticated users can manage their profile details here.
 *
 * @dependencies
 * - @clerk/nextjs: Provides the <UserProfile> component.
 */
import { UserProfile } from "@clerk/nextjs"

/**
 * User profile page component.
 * Uses Clerk's <UserProfile> component to render the profile management interface.
 * The `path` prop ensures Clerk correctly routes within the profile management flow.
 * @returns {JSX.Element} The Clerk UserProfile component.
 */
export default function UserProfilePage(): JSX.Element {
  return <UserProfile path="/user-profile" />
} 
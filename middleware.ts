/**
 * @description
 * Next.js middleware using Clerk for authentication and route protection.
 * This middleware runs before requests are processed and determines access based on
 * authentication status and defined public/protected routes.
 *
 * Key Responsibilities:
 * - Initializes Clerk authentication context for requests.
 * - Protects routes by default, requiring authentication unless explicitly marked public.
 * - Defines public routes accessible to everyone (e.g., marketing pages, API endpoints, Clerk auth pages).
 * - Specifically enforces authentication for the entire `/admin` application path.
 *
 * @dependencies
 */
import { NextResponse } from "next/server"
import type { NextMiddleware } from "next/server"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Define routes that should be publicly accessible without authentication.
// This includes marketing pages, API routes, and Clerk's own authentication flow pages.
const isPublicRoute = createRouteMatcher([
  "/", // Public homepage for the web app
  "/ui-test", // Public UI test page
  "/sign-in(.*)", // Clerk sign-in routes
  "/sign-up(.*)", // Clerk sign-up routes
  "/api/(.*)", // Allow access to all API routes (specific protection can be added within routes)
])

// Define routes specifically for the admin application.
const isAdminRoute = createRouteMatcher([
  "/admin(.*)", // All routes under /admin
])

/**
 * Clerk middleware configuration.
 *
 * It checks if the requested route is public. If not, it requires authentication.
 * It also specifically checks if the route is an admin route. If it is and the user
 * is not authenticated, they will be redirected to the sign-in page defined
 * in the environment variables (NEXT_PUBLIC_CLERK_SIGN_IN_URL).
 *
 * The `afterAuth` function could be used for role-based checks in the future,
 * but for now, it simply ensures authenticated access to admin routes.
 */
export default clerkMiddleware(async (auth, req) => {
  const session = await auth();
  
  // If the route is not public, enforce authentication.
  if (!isPublicRoute(req)) {
    if (!session.userId) {
      return session.redirectToSignIn({ returnBackUrl: req.url });
    }
  }

  // Additional check: If it's an admin route, ensure the user is authenticated.
  // While the above check already handles this for non-public routes,
  // this explicitly covers the /admin path regardless of its public status setting (belt and suspenders).
  // In the future, role checks can be added here using session.has.
  if (isAdminRoute(req)) {
    if (!session.userId) {
      return session.redirectToSignIn({ returnBackUrl: req.url });
    }
    // Example for future role check:
    // if (!session.has({ role: "admin" })) {
    //   return NextResponse.redirect(new URL("/unauthorized", req.url));
    // }
  }
}) as NextMiddleware

// Configuration for the Next.js middleware matcher.
// This specifies which routes the middleware should run on.
// It's configured to run on all routes except for static assets and internal Next.js paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/trpc (tRPC routes - if you were using tRPC) - Keeping pattern for potential future use
     * - api/auth (potential custom auth routes - if needed)
     * - api/webhooks (webhook routes)
     * Match all routes including api routes unless specifically excluded
     */
    "/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)",
    "/", // Ensure the root is matched
  ],
} 
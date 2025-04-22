/**
 * @description
 * Root Next.js middleware using Clerk for authentication and route protection
 * across the entire monorepo (web and admin apps).
 *
 * Key Responsibilities:
 * - Initializes Clerk authentication context for requests.
 * - Handles build-time vs. runtime: Acts as a no-op during build to prevent
 *   SSG/ISR errors when Clerk keys might be unavailable. Applies protection at runtime.
 * - Defines public routes accessible without authentication.
 * - Protects all non-public routes by default, redirecting unauthenticated users
 *   to the sign-in page.
 * - Provides a structure for future role-based access control (RBAC) for admin routes.
 */
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Determine if running during the build phase (keys might be missing)
// Vercel sets CI=true during builds. Locally, check if keys are missing.
const isBuildTime =
  process.env.CI === "true" || !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (isBuildTime) {
  console.log("Middleware: Running in build mode or keys missing, skipping auth checks.");
}

// Define routes that should be publicly accessible without authentication.
const isPublicRoute = createRouteMatcher([
  "/", // Public homepage for the web app
  "/ui-test", // Public UI test page (if exists and intended public)
  "/sign-in(.*)", // Clerk sign-in flow routes
  "/sign-up(.*)", // Clerk sign-up flow routes
  "/api/webhooks(.*)", // Public webhooks (e.g., Stripe)
  // Add other specific public marketing pages if needed, e.g., '/about', '/contact'
  // '/(marketing)(.*)', // Example if using a marketing route group that's public
]);

// Define routes specifically for the admin application (for potential future RBAC).
const isAdminRoute = createRouteMatcher([
  "/admin(.*)", // All routes under /admin
]);

/**
 * Clerk middleware configuration.
 *
 * During build time (isBuildTime = true), it returns NextResponse.next() immediately,
 * effectively disabling auth checks to allow static generation.
 *
 * At runtime, it uses clerkMiddleware:
 * - If a route is NOT public (`!isPublicRoute`), `auth().protect()` is called,
 *   redirecting unauthenticated users to sign-in.
 * - The `afterAuth` hook can be used for role checks (example commented out).
 */
export default clerkMiddleware(async (auth, req: NextRequest) => {
  // --- Build Time Check ---
  // If in build mode or keys are missing, bypass auth checks.
  if (isBuildTime) {
    return NextResponse.next();
  }

  // --- Runtime Auth Checks ---
  const { userId, sessionClaims, redirectToSignIn } = await auth();

  // Protect non-public routes
  if (!isPublicRoute(req) && !userId) {
    console.log(`Middleware: Protecting non-public route: ${req.nextUrl.pathname}`);
    // Redirect guest users to sign-in page
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Optional: Role-based access control for admin routes (example)
  if (isAdminRoute(req)) {
    // Ensure user is authenticated (already covered by !isPublicRoute check, but explicit)
    if (!userId) {
      console.log(`Middleware: Redirecting unauthenticated user from admin route: ${req.nextUrl.pathname}`);
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Example RBAC: Check for 'admin' role in Clerk metadata
    // const isAdmin = sessionClaims?.metadata?.role === 'admin';
    // if (!isAdmin) {
    //   console.log(`Middleware: Unauthorized access attempt to admin route by user ${userId}`);
    //   const unauthorizedUrl = new URL('/unauthorized', req.url); // Or redirect to web app home
    //   return NextResponse.redirect(unauthorizedUrl);
    // }
  }

  // Allow request to proceed if public or authenticated & authorized
  return NextResponse.next();
});

// Configuration for the Next.js middleware matcher.
// This specifies which routes the middleware should run on.
// It excludes static assets, image optimization files, and specific API routes like webhooks.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/webhooks (explicitly public webhooks)
     * Match all routes including api routes unless specifically excluded.
     * The Clerk middleware itself handles ignoring internal /_next paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)",
    "/", // Ensure the root is matched even if excluded by the negative lookahead
  ],
}; 
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

/**
 * Auth middleware configuration
 * - In development: Only sign-in and sign-up pages are public
 * - In production: All routes are public during build, then protected at runtime
 */

// Special case for build time
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/", 
  "/sign-in(.*)", 
  "/sign-up(.*)", 
  "/api/webhooks(.*)", 
  "/(marketing)(.*)"
]);

// Handle build-time gracefully
// During build, all routes are public to avoid SSG issues
// At runtime, protect all non-public routes
export default isBuildTime
  ? (req: NextRequest) => NextResponse.next() // No-op during build
  : clerkMiddleware(async (auth, req) => {
      if (!isPublicRoute(req)) {
        await auth.protect();
      }
    });

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.[\\w]+$|_next).*)", 
    "/",
    // Include all API routes
    "/(api|trpc)(.*)"
  ],
}; 
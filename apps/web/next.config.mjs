/** @type {import('next').NextConfig} */

// Debug logging for build-time environment variables
// This checks what Turborepo has passed to the build process
console.log("Web app build-time env vars check:", {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    ? "Exists"
    : "MISSING",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? "Exists" : "MISSING",
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "MISSING",
});

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@workspace/ui"],
  // No explicit 'env' block needed here. Next.js automatically handles
  // NEXT_PUBLIC_ variables present in process.env during build time.
};

export default nextConfig;

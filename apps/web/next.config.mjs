/** @type {import('next').NextConfig} */
// Corrected import for @next/env based on error message
import nextEnv from "@next/env";
import { fileURLToPath } from "url";
import path from "path";

// Destructure loadEnvConfig from the default import
const { loadEnvConfig } = nextEnv;

// Explicitly load environment variables from the root directory
const projectDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");
loadEnvConfig(projectDir);

// Debug logging for build-time environment variables AFTER loading
console.log("Web app build-time env vars check (after loadEnvConfig):", {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    ? "Exists"
    : "MISSING",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? "Exists" : "MISSING",
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "MISSING",
});

const nextConfig = {
  reactStrictMode: true, // Recommended for development
  transpilePackages: ["@workspace/ui"],
  // Explicitly define environment variables to be exposed to the browser.
  // This ensures Next.js includes them in the client-side bundle.
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    // Add other NEXT_PUBLIC_ variables needed client-side here
    // Example: NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  },
  // Note: Server-only variables (like CLERK_SECRET_KEY) are accessed directly
  // via process.env in server-side code (Server Components, API routes, middleware)
  // and don't need to be listed in the `env` block here.
};

export default nextConfig;

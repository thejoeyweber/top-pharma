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
console.log("Admin app build-time env vars check (after loadEnvConfig):", {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    ? "Exists"
    : "MISSING",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? "Exists" : "MISSING",
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL || "MISSING",
});

const config = {
  reactStrictMode: true, // Recommended for development
  transpilePackages: ["@workspace/ui"],
  // Explicitly define environment variables to be exposed to the browser.
  // This ensures Next.js includes them in the client-side bundle.
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    // Admin app might redirect to web app's sign-in/up, so these might still be needed client-side
    // depending on how redirects or links are handled. Keep them for safety unless confirmed otherwise.
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL,
    // Add other NEXT_PUBLIC_ variables needed client-side here
  },
  // Note: Server-only variables (like CLERK_SECRET_KEY) are accessed directly
  // via process.env in server-side code and don't need to be listed here.
};

export default config; 
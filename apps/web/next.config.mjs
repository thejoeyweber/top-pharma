/** @type {import('next').NextConfig} */
import { loadEnvConfig } from "@next/env";
import { fileURLToPath } from "url";
import path from "path";

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
  reactStrictMode: true,
  transpilePackages: ["@workspace/ui"],
  // Explicitly define environment variables to be exposed to the browser.
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
  },
};

export default nextConfig;

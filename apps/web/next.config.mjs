/** @type {import('next').NextConfig} */

// Debug logging for build-time environment variables
console.log("Web app build-time env vars check:", {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    ? "Exists"
    : "MISSING",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? "Exists" : "MISSING",
  NODE_ENV: process.env.NODE_ENV,
});

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@workspace/ui"],
};

export default nextConfig;

/** @type {import('next').NextConfig} */

// Debug logging for build-time environment variables
console.log("Admin app build-time env vars:", {
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 
    `${process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY.substring(0, 5)}...` : 'undefined',
  NODE_ENV: process.env.NODE_ENV
});

const config = {
  reactStrictMode: true,
  transpilePackages: ["@workspace/ui"],
  // Explicitly tell Next.js to use environment variables from the root
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
  },
}

export default config 
import { loadEnvConfig } from '@next/env'

// Load environment variables from root .env files
loadEnvConfig(process.cwd(), process.env.NODE_ENV !== 'production')

// Export environment variables with types
export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  NODE_ENV: process.env.NODE_ENV as 'development' | 'production' | 'test'
} as const

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL'] as const
for (const envVar of requiredEnvVars) {
  if (!env[envVar as keyof typeof env]) {
    throw new Error(`Missing required environment variable: ${envVar}`)
  }
} 
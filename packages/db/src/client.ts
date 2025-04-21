import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { env } from './env.js'

// Create postgres connection
const connectionString = env.DATABASE_URL
const client = postgres(connectionString)

// Create drizzle database instance
export const db = drizzle(client)

// Export raw client for operations that need it
export const sql = client 
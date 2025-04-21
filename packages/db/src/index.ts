import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema/index.js"

// Ensure DATABASE_URL is set
const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set.")
}

// Initialize postgres client
// Use `max: 1` for serverless environments like Vercel
const client = postgres(databaseUrl, { max: 1 })

// Initialize drizzle with the client and the combined schema
export const db = drizzle(client, { schema })

// Export the consolidated schema object
export { schema } 
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

// Initialize postgres client
const client = postgres(process.env.DATABASE_URL!)

// Initialize drizzle with the client
export const db = drizzle(client)

// Export schema types (to be added later)
export type * from "./schema" 
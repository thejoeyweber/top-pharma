/**
 * @description
 * Configuration file for Drizzle Kit, the migration tool for Drizzle ORM.
 * Specifies the location of the database schema, the output directory for migration files,
 * the database driver to use (PostgreSQL), and the connection string.
 *
 * @dependencies
 * - drizzle-kit: The command-line tool that uses this configuration.
 * - dotenv: Used implicitly by drizzle-kit to load environment variables.
 */
import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// Load environment variables from .env file at the project root
dotenv.config({ path: "../../.env.local" }); // Adjust path relative to this config file

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required for Drizzle Kit");
}

export default {
  schema: "./src/schema/index.ts", // Path to the main schema export file
  out: "./src/migrations", // Directory to store migration files
  driver: "pg", // Specify PostgreSQL driver
  dbCredentials: {
    connectionString: process.env.DATABASE_URL, // Get connection string from environment
  },
  verbose: true, // Enable verbose logging from Drizzle Kit
  strict: true, // Enable strict mode for migration generation
} satisfies Config; 
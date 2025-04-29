import { pgSchema } from "drizzle-orm/pg-core";

// Define and export the staging schema instance to be used across all staging table definitions
export const stagingSchema = pgSchema("staging"); 
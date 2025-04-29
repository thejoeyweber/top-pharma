import { pgSchema } from "drizzle-orm/pg-core";

// Import but don't export the schema instance
const stagingSchema = pgSchema("staging");

// ... existing code ... 
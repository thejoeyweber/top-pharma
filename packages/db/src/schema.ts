import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core"

// Example schema - to be expanded based on requirements
export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}) 
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { productsTable } from "./products-schema.js";
import { websitesTable } from "./websites-schema.js";
import { entityVersionsTable } from "./entity-versions-schema.js";

/**
 * @description Schema for the public `companies` table.
 * Stores curated information about pharmaceutical and biotechnology companies.
 */
export const companiesTable = pgTable("companies", {
  // Core Fields
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  // Optional Org ID for multi-tenancy
  orgId: uuid("org_id"),

  // Company Specific Fields
  name: text("name").notNull(),
  description: text("description"),
  websiteUrl: text("website_url"),
  location: text("location"),
  ticker: varchar("ticker", { length: 10 }),
  size: text("size"),
  cik: varchar("cik", { length: 10 }),

  // Internal Fields
  normalizedNameHash: varchar("normalized_name_hash", { length: 64 }),
});

// Define relations for the companies table
export const companiesRelations = relations(companiesTable, ({ many }) => ({
  products: many(productsTable),
  websites: many(websitesTable),
  versions: many(entityVersionsTable, { relationName: "entity" }),
}));

// Define TypeScript types for inference
export type Company = typeof companiesTable.$inferSelect;
export type InsertCompany = typeof companiesTable.$inferInsert; 
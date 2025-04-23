/**
 * @description Schema for the public `companies` table.
 * Stores curated information about pharmaceutical and biotechnology companies.
 * This table represents the master record for companies after data ingestion,
 * enrichment, and potential admin review.
 *
 * @dependencies
 * - drizzle-orm: Provides core ORM functions and types.
 * - drizzle-orm/pg-core: Provides PostgreSQL specific column types.
 */
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  // tsvector, // Import when FTS is implemented
  // vector, // Import when pgvector is implemented
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { productsTable } from "./products-schema";
import { websitesTable } from "./websites-schema";
import { entityVersionsTable } from "./entity-versions-schema";

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
  ticker: varchar("ticker", { length: 10 }), // Standard ticker length
  size: text("size"), // Consider using an enum later if categories stabilize
  cik: varchar("cik", { length: 10 }), // SEC CIK is 10 digits

  // Internal Fields for Search and Deduplication
  normalizedNameHash: varchar("normalized_name_hash", { length: 64 }), // SHA-256 hash length

  // --- Placeholder Columns for Future Features ---
  // Full-Text Search Vector (Uncomment and add index when implementing FTS)
  // fts_vector: tsvector("fts_vector"),

  // Vector Embedding (Uncomment and add index when implementing vector search)
  // embedding: vector("embedding", { dimensions: 1536 }), // Example dimension for OpenAI Ada v2
});

// Define relations for the companies table
export const companiesRelations = relations(companiesTable, ({ many }) => ({
  // One company can have many products
  products: many(productsTable),
  // One company can have many websites
  websites: many(websitesTable),
  // One company can have many versions tracked in entity_versions
  versions: many(entityVersionsTable, { relationName: "entity" }),
}));

// Define TypeScript types for inference based on the schema
export type SelectCompany = typeof companiesTable.$inferSelect;
export type InsertCompany = typeof companiesTable.$inferInsert; 
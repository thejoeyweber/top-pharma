import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { productsTable } from "./products-schema.js";
import { entityVersionsTable } from "./entity-versions-schema.js";

/**
 * @description Schema for the public `therapeutic_areas` table.
 * Stores the taxonomy of therapeutic areas (e.g., Cardiology, Oncology).
 */
export const therapeuticAreasTable = pgTable("therapeutic_areas", {
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

  // Therapeutic Area Specific Fields
  name: text("name").notNull().unique(),
  description: text("description"),
});

// Define relations for the therapeutic areas table
export const therapeuticAreasRelations = relations(
  therapeuticAreasTable,
  ({ many }) => ({
    products: many(productsTable),
    versions: many(entityVersionsTable, { relationName: "entity" }),
  })
);

// Define TypeScript types for inference
export type TherapeuticArea = typeof therapeuticAreasTable.$inferSelect;
export type InsertTherapeuticArea = typeof therapeuticAreasTable.$inferInsert; 
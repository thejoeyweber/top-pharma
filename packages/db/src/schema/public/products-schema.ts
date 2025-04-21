import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { companiesTable } from "./companies-schema.js";
import { therapeuticAreasTable } from "./therapeutic-areas-schema.js";
import { websitesTable } from "./websites-schema.js";
import { productPhaseEnum } from "../enums.js";
import { entityVersionsTable } from "./entity-versions-schema.js";

/**
 * @description Schema for the public `products` table.
 * Stores curated information about pharmaceutical products.
 */
export const productsTable = pgTable("products", {
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

  // Foreign Keys
  companyId: uuid("company_id").references(() => companiesTable.id, {
    onDelete: "set null",
  }),
  therapeuticAreaId: uuid("therapeutic_area_id").references(
    () => therapeuticAreasTable.id,
    { onDelete: "set null" }
  ),

  // Product Specific Fields
  name: text("name").notNull(),
  description: text("description"),
  phase: productPhaseEnum("phase").default("unknown"),
  status: text("status"),
  approvalStatus: text("approval_status"),
  ndcCode: varchar("ndc_code", { length: 20 }),
});

// Define relations for the products table
export const productsRelations = relations(productsTable, ({ one, many }) => ({
  company: one(companiesTable, {
    fields: [productsTable.companyId],
    references: [companiesTable.id],
  }),
  therapeuticArea: one(therapeuticAreasTable, {
    fields: [productsTable.therapeuticAreaId],
    references: [therapeuticAreasTable.id],
  }),
  websites: many(websitesTable),
  versions: many(entityVersionsTable, { relationName: "entity" }),
}));

// Define TypeScript types for inference
export type Product = typeof productsTable.$inferSelect;
export type InsertProduct = typeof productsTable.$inferInsert; 
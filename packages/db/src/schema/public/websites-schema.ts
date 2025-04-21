import {
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { companiesTable } from "./companies-schema.js";
import { productsTable } from "./products-schema.js";
import { websiteCategoryEnum } from "../enums.js";
import { entityVersionsTable } from "./entity-versions-schema.js";

/**
 * @description Schema for the public `websites` table.
 * Stores information about websites discovered and categorized.
 */
export const websitesTable = pgTable("websites", {
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
    onDelete: "cascade",
  }),
  productId: uuid("product_id").references(() => productsTable.id, {
    onDelete: "cascade",
  }),

  // Website Specific Fields
  url: text("url").notNull().unique(),
  title: text("title"),
  category: websiteCategoryEnum("category").default("other"),
  screenshotPath: text("screenshot_path"),
  lastCrawledAt: timestamp("last_crawled_at", { withTimezone: true }),
});

// Define relations for the websites table
export const websitesRelations = relations(websitesTable, ({ one, many }) => ({
  company: one(companiesTable, {
    fields: [websitesTable.companyId],
    references: [companiesTable.id],
  }),
  product: one(productsTable, {
    fields: [websitesTable.productId],
    references: [productsTable.id],
  }),
  versions: many(entityVersionsTable, { relationName: "entity" }),
}));

// Define TypeScript types for inference
export type Website = typeof websitesTable.$inferSelect;
export type InsertWebsite = typeof websitesTable.$inferInsert; 
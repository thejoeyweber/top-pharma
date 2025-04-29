/**
 * @description Schema for the public `company_financials` table.
 * Stores curated financial metrics for companies.
 * This table links to the `companies` table.
 *
 * @dependencies
 * - drizzle-orm: Provides core ORM functions and types.
 * - drizzle-orm/pg-core: Provides PostgreSQL specific column types (uuid, timestamp, numeric, varchar, text).
 * - ./companies-schema: Defines the related companies table for the foreign key relationship.
 */
import {
  pgTable,
  uuid,
  timestamp,
  numeric,
  varchar,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { companiesTable } from "./companies-schema";

export const companyFinancialsTable = pgTable("company_financials", {
  // Core Fields (following backend.mdc rules)
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  // Foreign Key to companies table
  companyId: uuid("company_id")
    .references(() => companiesTable.id, { onDelete: "cascade" }) // Cascade delete if company is deleted
    .notNull(), // Financials must belong to a company

  // Financial Metrics Fields
  asOfDate: timestamp("as_of_date", { withTimezone: true }).notNull(), // Date the financial data is relevant for
  marketCap: numeric("market_cap", { precision: 38, scale: 2 }), // Large precision for market capitalization
  stockPrice: numeric("stock_price", { precision: 10, scale: 2 }), // Standard stock price precision
  beta: numeric("beta", { precision: 5, scale: 2 }), // Beta value precision
  priceChangePercent: numeric("price_change_percent", {
    precision: 5,
    scale: 2,
  }), // Percentage change
  averageVolume: numeric("average_volume", { precision: 38, scale: 0 }), // Trading volume (integer)
  dividendYield: numeric("dividend_yield", { precision: 5, scale: 2 }), // Dividend yield percentage
  dcfValue: numeric("dcf_value", { precision: 38, scale: 2 }), // Discounted Cash Flow value
  currency: varchar("currency", { length: 3 }), // ISO 4217 currency code (e.g., USD)
  dataSource: text("data_source"), // Source of the financial data (e.g., FMP, SEC)
});

// Define relations for the company financials table
export const companyFinancialsRelations = relations(
  companyFinancialsTable,
  ({ one }) => ({
    // Each financial record belongs to one company
    company: one(companiesTable, {
      fields: [companyFinancialsTable.companyId],
      references: [companiesTable.id],
    }),
  })
);

// Define TypeScript types for inference based on the schema
export type SelectCompanyFinancials = typeof companyFinancialsTable.$inferSelect;
export type InsertCompanyFinancials = typeof companyFinancialsTable.$inferInsert; 
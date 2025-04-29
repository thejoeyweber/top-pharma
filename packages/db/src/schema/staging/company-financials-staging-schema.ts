/**
 * @description Schema for the `staging.company_financials_staging` table.
 * Stores raw or intermediate company financial data ingested from various sources.
 *
 * @dependencies
 * - drizzle-orm/pg-core: Provides PostgreSQL specific column types and schema definition helpers.
 * - ../enums: Provides the `processingStatusEnum`.
 * - ../public/company-financials-schema: Provides the base structure mirrored from the public table.
 * - ./companies-staging-schema: Defines the related staging companies table.
 */
import {
  uuid,
  timestamp,
  numeric,
  varchar,
  text,
  jsonb,
} from "drizzle-orm/pg-core";
import { processingStatusEnum } from "../enums";
import { companiesStagingTable } from "./companies-staging-schema";
import { companyFinancialsTable } from "../public/company-financials-schema";
import { stagingSchema } from "./_common";

export const companyFinancialsStagingTable = stagingSchema.table(
  "company_financials_staging",
  {
    // Internal Staging ID
    stagingId: uuid("staging_id").primaryKey().defaultRandom(),

    // Link to Staging Company
    stagingCompanyId: uuid("staging_company_id")
      .references(() => companiesStagingTable.stagingId, { onDelete: "cascade" })
      .notNull(),

    // Mirror of public.company_financials fields
    asOfDate: timestamp("as_of_date", { withTimezone: true }),
    marketCap: numeric("market_cap", { precision: 38, scale: 2 }),
    stockPrice: numeric("stock_price", { precision: 10, scale: 2 }),
    beta: numeric("beta", { precision: 5, scale: 2 }),
    priceChangePercent: numeric("price_change_percent", {
      precision: 5,
      scale: 2,
    }),
    averageVolume: numeric("average_volume", { precision: 38, scale: 0 }),
    dividendYield: numeric("dividend_yield", { precision: 5, scale: 2 }),
    dcfValue: numeric("dcf_value", { precision: 38, scale: 2 }),
    currency: varchar("currency", { length: 3 }),
    dataSource: text("data_source"),

    // Processing and Enrichment Fields
    status: processingStatusEnum("status").default("new").notNull(),
    rawDataSources: jsonb("raw_data_sources"),
    processingNotes: text("processing_notes"),
    aiEnrichmentData: jsonb("ai_enrichment_data"),
    aiConfidence: numeric("ai_confidence", { precision: 3, scale: 2 }),
    publicFinancialsId: uuid("public_financials_id").references(
      () => companyFinancialsTable.id
    ),
    processedAt: timestamp("processed_at", { withTimezone: true }),

    // Standard Timestamps
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),

    // Airbyte Metadata
    _airbyte_extracted_at: timestamp("_airbyte_extracted_at", {
      withTimezone: true,
    }),
    _airbyte_raw_id: varchar("_airbyte_raw_id", { length: 255 }),
    _airbyte_source_name: text("_airbyte_source_name"),
  }
);

// Define TypeScript types for inference
export type SelectCompanyFinancialsStaging =
  typeof companyFinancialsStagingTable.$inferSelect;
export type InsertCompanyFinancialsStaging =
  typeof companyFinancialsStagingTable.$inferInsert; 
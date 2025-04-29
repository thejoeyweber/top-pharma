/**
 * @description
 * Defines the schema for staging company data within the 'staging' PostgreSQL schema.
 * This table is intended to receive raw data ingested from various external sources (e.g., SEC EDGAR, FDA)
 * via Airbyte before processing, enrichment, and promotion to the public `companies` table.
 *
 * Per the plan adjustment, it's likely that source-specific staging tables (e.g., `staging.sec_filings`, `staging.fda_establishments`)
 * will be created by Airbyte. This schema serves as a reference or a potential target for a unified staging view/process.
 * The user should adapt this or create specific schemas based on Airbyte connector configurations.
 *
 * @dependencies
 * - drizzle-orm/pg-core: Provides PostgreSQL specific column types (`pgSchema`, `uuid`, `timestamp`, `varchar`, `jsonb`, `integer`, `text`, `boolean`, `date`).
 * - ../enums: Imports shared enums like `processingStatusEnum`.
 * - ../public/companies-schema: Provides the base structure mirrored from the public table.
 */
import {
  uuid,
  timestamp,
  text,
  varchar,
  jsonb,
  numeric,
  integer,
  boolean,
  date,
} from "drizzle-orm/pg-core";
import { processingStatusEnum } from "../enums";
import { companiesTable } from "../public/companies-schema";
import { stagingSchema } from "./_common";

/**
 * @description Schema for the `staging.companies_staging` table.
 * Stores raw or intermediate company data ingested from various sources before
 * being processed, potentially enriched by AI, reviewed by admins, and promoted
 * to the public `companies` table.
 *
 * @dependencies
 * - drizzle-orm/pg-core: Provides PostgreSQL specific column types and schema definition helpers.
 * - ../enums: Provides the `processingStatusEnum`.
 * - ../public/companies-schema: Provides the base structure mirrored from the public table.
 */
export const companiesStagingTable = stagingSchema.table("companies_staging", {
  // Internal Staging ID
  stagingId: uuid("staging_id").primaryKey().defaultRandom(),

  // Mirror of public.companies fields
  name: text("name"),
  description: text("description"),
  websiteUrl: text("website_url"),
  mainPhone: text("main_phone"),
  imageUrl: text("image_url"),

  // Classification Fields
  sicCode: varchar("sic_code", { length: 4 }),
  sector: text("sector"),
  industry: text("industry"),
  exchange: text("exchange"),

  // Company Details
  ticker: varchar("ticker", { length: 10 }),
  ipoDate: date("ipo_date"),
  employeeCount: integer("employee_count"),
  fiscalYearEnd: varchar("fiscal_year_end", { length: 5 }), // MM-DD format
  incorporationStateCountry: text("incorporation_state_country"),

  // Status Flags
  isAdr: boolean("is_adr").default(false),
  isEtf: boolean("is_etf").default(false),
  isFund: boolean("is_fund").default(false),
  isActivelyTrading: boolean("is_actively_trading").default(true),
  isWksi: boolean("is_wksi").default(false),

  // Internal Fields for Search and Deduplication
  normalizedNameHash: varchar("normalized_name_hash", { length: 64 }),

  // Processing and Enrichment Fields
  status: processingStatusEnum("status").default("new").notNull(),
  rawDataSources: jsonb("raw_data_sources"), // Store raw data from source(s) as JSON
  processingNotes: text("processing_notes"), // Notes from automated processing or admin review
  aiEnrichmentData: jsonb("ai_enrichment_data"), // Store results from AI enrichment
  aiConfidence: numeric("ai_confidence", { precision: 3, scale: 2 }), // Confidence score from AI (0.00 to 1.00)
  publicCompanyId: uuid("public_company_id").references(() => companiesTable.id), // Link to public record if approved
  processedAt: timestamp("processed_at", { withTimezone: true }), // When processing finished

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
});

// Define TypeScript types for inference
export type SelectCompanyStaging = typeof companiesStagingTable.$inferSelect;
export type InsertCompanyStaging = typeof companiesStagingTable.$inferInsert; 
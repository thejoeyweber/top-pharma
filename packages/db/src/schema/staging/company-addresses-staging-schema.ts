/**
 * @description
 * Defines the schema for staging company address data within the 'staging' PostgreSQL schema.
 * This table receives raw address data from various sources before processing and promotion
 * to the public `company_addresses` table.
 *
 * @dependencies
 * - drizzle-orm/pg-core: Provides PostgreSQL specific column types.
 * - ../enums: Provides shared enums like addressTypeEnum and processingStatusEnum.
 * - ../public/company-addresses-schema: Provides the base structure mirrored from the public table.
 */
import {
  uuid,
  timestamp,
  text,
  varchar,
  boolean,
  jsonb,
  numeric,
  index,
  unique,
} from "drizzle-orm/pg-core";
import { addressTypeEnum, processingStatusEnum } from "../enums";
import { companyAddressesTable } from "../public/company-addresses-schema";
import { companiesStagingTable } from "./companies-staging-schema";
import { stagingSchema } from "./_common";

export const companyAddressesStagingTable = stagingSchema.table("company_addresses_staging", {
  // Internal Staging ID
  stagingId: uuid("staging_id").primaryKey().defaultRandom(),

  // Link to Staging Company
  stagingCompanyId: uuid("staging_company_id")
    .references(() => companiesStagingTable.stagingId, { onDelete: "cascade" }),

  // Mirror of public.company_addresses fields
  addressType: addressTypeEnum("address_type").default("BUSINESS"),
  streetLine1: text("street_line_1"),
  streetLine2: text("street_line_2"),
  city: text("city"),
  stateProvince: text("state_province"),
  postalCode: varchar("postal_code", { length: 20 }),
  countryCode: varchar("country_code", { length: 2 }),
  phone: text("phone"),
  isPrimary: boolean("is_primary").default(false),
  source: text("source"),

  // Processing and Enrichment Fields
  status: processingStatusEnum("status").default("new").notNull(),
  rawDataSources: jsonb("raw_data_sources"), // Store raw data from source(s) as JSON
  processingNotes: text("processing_notes"), // Notes from automated processing or admin review
  aiEnrichmentData: jsonb("ai_enrichment_data"), // Store results from AI enrichment
  aiConfidence: numeric("ai_confidence", { precision: 3, scale: 2 }), // Confidence score from AI (0.00 to 1.00)
  publicAddressId: uuid("public_address_id").references(() => companyAddressesTable.id), // Link to public record if approved
  processedAt: timestamp("processed_at", { withTimezone: true }), // When processing finished

  // Standard Timestamps
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  // Airbyte Metadata
  _airbyte_extracted_at: timestamp("_airbyte_extracted_at", { withTimezone: true }),
  _airbyte_raw_id: varchar("_airbyte_raw_id", { length: 255 }),
  _airbyte_source_name: text("_airbyte_source_name"),
}, (table) => ({
  // Index for faster lookups on staging company ID
  stagingCompanyIdIdx: index("idx_company_addresses_staging_company_id").on(table.stagingCompanyId),
  // Unique constraint for address upsert - one address per staging company
  uniqueStagingCompanyAddress: unique("unique_staging_company_address").on(table.stagingCompanyId),
}));

// Define TypeScript types for inference
export type SelectCompanyAddressStaging = typeof companyAddressesStagingTable.$inferSelect;
export type InsertCompanyAddressStaging = typeof companyAddressesStagingTable.$inferInsert; 
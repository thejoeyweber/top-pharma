/**
 * @description
 * Defines the schema for staging company identifier data within the 'staging' PostgreSQL schema.
 * This table receives raw identifier data from various sources before processing and promotion
 * to the public `company_identifiers` table.
 *
 * @dependencies
 * - drizzle-orm/pg-core: Provides PostgreSQL specific column types.
 * - ../enums: Provides shared enums like identifierTypeEnum and processingStatusEnum.
 * - ../public/company-identifiers-schema: Provides the base structure mirrored from the public table.
 */
import {
  uuid,
  timestamp,
  text,
  varchar,
  jsonb,
  numeric,
} from "drizzle-orm/pg-core";
import { identifierTypeEnum, processingStatusEnum } from "../enums";
import { companyIdentifiersTable } from "../public/company-identifiers-schema";
import { stagingSchema } from "./_common";

export const companyIdentifiersStagingTable = stagingSchema.table("company_identifiers_staging", {
  // Internal Staging ID
  stagingId: uuid("staging_id").primaryKey().defaultRandom(),

  // Mirror of public.company_identifiers fields
  companyId: uuid("company_id"),
  identifierType: identifierTypeEnum("identifier_type").notNull(),
  identifierValue: text("identifier_value").notNull(),
  source: text("source"),

  // Processing and Enrichment Fields
  status: processingStatusEnum("status").default("new").notNull(),
  rawDataSources: jsonb("raw_data_sources"), // Store raw data from source(s) as JSON
  processingNotes: text("processing_notes"), // Notes from automated processing or admin review
  aiEnrichmentData: jsonb("ai_enrichment_data"), // Store results from AI enrichment
  aiConfidence: numeric("ai_confidence", { precision: 3, scale: 2 }), // Confidence score from AI (0.00 to 1.00)
  publicIdentifierId: uuid("public_identifier_id").references(() => companyIdentifiersTable.id), // Link to public record if approved
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
});

// Define TypeScript types for inference
export type SelectCompanyIdentifierStaging = typeof companyIdentifiersStagingTable.$inferSelect;
export type InsertCompanyIdentifierStaging = typeof companyIdentifiersStagingTable.$inferInsert; 
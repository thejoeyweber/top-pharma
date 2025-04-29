/**
 * @description Schema for the `staging.company_people_staging` table.
 * Stores raw or intermediate data about company personnel ingested from various sources.
 *
 * @dependencies
 * - drizzle-orm/pg-core: Provides PostgreSQL specific column types and schema definition helpers.
 * - ../enums: Provides the `processingStatusEnum`.
 * - ../public/company-people-schema: Provides the base structure mirrored from the public table.
 * - ./companies-staging-schema: Defines the related staging companies table.
 */
import {
  uuid,
  timestamp,
  text,
  date,
  jsonb,
  numeric,
  varchar,
} from "drizzle-orm/pg-core";
import { processingStatusEnum } from "../enums";
import { companiesStagingTable } from "./companies-staging-schema";
import { companyPeopleTable } from "../public/company-people-schema";
import { stagingSchema } from "./_common";

export const companyPeopleStagingTable = stagingSchema.table(
  "company_people_staging",
  {
    // Internal Staging ID
    stagingId: uuid("staging_id").primaryKey().defaultRandom(),

    // Link to Staging Company
    stagingCompanyId: uuid("staging_company_id")
      .references(() => companiesStagingTable.stagingId, { onDelete: "cascade" })
      .notNull(),

    // Mirror of public.company_people fields
    name: text("name"),
    title: text("title"),
    roleType: text("role_type"),
    startDate: date("start_date"),
    endDate: date("end_date"),
    bio: text("bio"),
    photoUrl: text("photo_url"),

    // Processing and Enrichment Fields
    status: processingStatusEnum("status").default("new").notNull(),
    rawDataSources: jsonb("raw_data_sources"),
    processingNotes: text("processing_notes"),
    aiEnrichmentData: jsonb("ai_enrichment_data"),
    aiConfidence: numeric("ai_confidence", { precision: 3, scale: 2 }),
    publicPersonId: uuid("public_person_id").references(
      () => companyPeopleTable.id
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
export type SelectCompanyPeopleStaging =
  typeof companyPeopleStagingTable.$inferSelect;
export type InsertCompanyPeopleStaging =
  typeof companyPeopleStagingTable.$inferInsert; 
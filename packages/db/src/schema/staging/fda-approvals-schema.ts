import {
  integer,
  jsonb,
  pgSchema,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { processingStatusEnum } from "../enums.js";

/**
 * @description Defines the 'staging' schema in PostgreSQL.
 */
export const stagingSchema = pgSchema("staging");

/**
 * @description Schema for the `staging.fda_approvals` table.
 * Stores raw data ingested from FDA approvals source.
 */
export const fdaApprovalsStagingTable = stagingSchema.table("fda_approvals", {
  // Internal Primary Key
  id: uuid("id").primaryKey().defaultRandom(),

  // Airbyte Metadata Columns
  _airbyte_extracted_at: timestamp("_airbyte_extracted_at", {
    withTimezone: true,
  }),
  _airbyte_raw_id: varchar("_airbyte_raw_id", { length: 255 }),

  // Raw Data Storage
  rawDataSource: jsonb("raw_data_source"),

  // Processing and Enrichment Fields
  status: processingStatusEnum("status").default("new").notNull(),
  aiConfidence: integer("ai_confidence"),
  aiResult: jsonb("ai_result"),
  processedAt: timestamp("processed_at", { withTimezone: true }),
  errorMessage: text("error_message"),
});

// Define TypeScript types for inference
export type FdaApprovalStaging = typeof fdaApprovalsStagingTable.$inferSelect;
export type InsertFdaApprovalStaging = typeof fdaApprovalsStagingTable.$inferInsert; 
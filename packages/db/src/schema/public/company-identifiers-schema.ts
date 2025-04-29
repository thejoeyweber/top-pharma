/**
 * @description Schema for the public `company_identifiers` table.
 * Stores various unique identifiers and aliases for companies, including
 * standard identifiers (CIK, TICKER, etc.) and alternative names (ALIAS).
 *
 * @dependencies
 * - drizzle-orm/pg-core: Provides PostgreSQL specific column types.
 * - ../enums: Provides the identifierTypeEnum.
 * - ./companies-schema: Provides the base companies table for foreign key.
 */
import {
  pgTable,
  uuid,
  timestamp,
  text,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { identifierTypeEnum } from "../enums";
import { companiesTable } from "./companies-schema";

export const companyIdentifiersTable = pgTable(
  "company_identifiers",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    companyId: uuid("company_id")
      .references(() => companiesTable.id, { onDelete: "cascade" })
      .notNull(),
    identifierType: identifierTypeEnum("identifier_type").notNull(),
    identifierValue: text("identifier_value").notNull(),
    source: text("source"), // e.g., 'FMP', 'SEC'
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    unq: uniqueIndex("company_identifier_unique_idx").on(
      table.companyId,
      table.identifierType,
      table.identifierValue
    ),
  })
);

// Define TypeScript types for inference
export type SelectCompanyIdentifier = typeof companyIdentifiersTable.$inferSelect;
export type InsertCompanyIdentifier = typeof companyIdentifiersTable.$inferInsert; 
/**
 * @description Schema for the public `company_addresses` table.
 * Stores structured address information for companies, including type classification
 * and contact details specific to each location.
 *
 * @dependencies
 * - drizzle-orm/pg-core: Provides PostgreSQL specific column types.
 * - ../enums: Provides the addressTypeEnum.
 * - ./companies-schema: Provides the base companies table for foreign key.
 */
import {
  pgTable,
  uuid,
  timestamp,
  text,
  varchar,
  boolean,
} from "drizzle-orm/pg-core";
import { addressTypeEnum } from "../enums";
import { companiesTable } from "./companies-schema";

export const companyAddressesTable = pgTable("company_addresses", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .references(() => companiesTable.id, { onDelete: "cascade" })
    .notNull(),
  addressType: addressTypeEnum("address_type").default("BUSINESS"),
  streetLine1: text("street_line_1"),
  streetLine2: text("street_line_2"),
  city: text("city"),
  stateProvince: text("state_province"),
  postalCode: varchar("postal_code", { length: 20 }),
  countryCode: varchar("country_code", { length: 2 }), // ISO 3166-1 alpha-2
  phone: text("phone"),
  isPrimary: boolean("is_primary").default(false),
  source: text("source"), // e.g., 'FMP', 'SEC-BA', 'SEC-MA'
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

// Define TypeScript types for inference
export type SelectCompanyAddress = typeof companyAddressesTable.$inferSelect;
export type InsertCompanyAddress = typeof companyAddressesTable.$inferInsert; 
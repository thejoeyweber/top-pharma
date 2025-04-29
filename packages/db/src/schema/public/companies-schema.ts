/**
 * @description Schema for the public `companies` table.
 * Stores curated information about pharmaceutical and biotechnology companies.
 * This table represents the master record for companies after data ingestion,
 * enrichment, and potential admin review.
 *
 * @dependencies
 * - drizzle-orm: Provides core ORM functions and types.
 * - drizzle-orm/pg-core: Provides PostgreSQL specific column types.
 * - ./company-financials-schema: Defines the related company financials table.
 * - ./company-people-schema: Defines the related company people table.
 */
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer,
  boolean,
  date,
  // tsvector, // Import when FTS is implemented
  // vector, // Import when pgvector is implemented
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { companyAddressesTable, type SelectCompanyAddress } from "./company-addresses-schema";
import { companyIdentifiersTable, type SelectCompanyIdentifier } from "./company-identifiers-schema";
import { companyFinancialsTable, type SelectCompanyFinancials } from "./company-financials-schema";
import { companyPeopleTable, type SelectCompanyPerson } from "./company-people-schema";
import { productsTable, type SelectProduct } from "./products-schema";
import { websitesTable, type SelectWebsite } from "./websites-schema";
import { entityVersionsTable, type SelectEntityVersion } from "./entity-versions-schema";

export const companiesTable = pgTable("companies", {
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

  // Company Profile Fields
  name: text("name").notNull(),
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
  normalizedNameHash: varchar("normalized_name_hash", { length: 64 }), // SHA-256 hash length

  // --- Placeholder Columns for Future Features ---
  // Full-Text Search Vector (Uncomment and add index when implementing FTS)
  // fts_vector: tsvector("fts_vector"),

  // Vector Embedding (Uncomment and add index when implementing vector search)
  // embedding: vector("embedding", { dimensions: 1536 }), // Example dimension for OpenAI Ada v2
});

// Define relations for the companies table
export const companiesRelations = relations(companiesTable, ({ many }) => ({
  // One company can have many addresses
  addresses: many(companyAddressesTable),
  // One company can have many identifiers
  identifiers: many(companyIdentifiersTable),
  // One company can have many financial records
  financials: many(companyFinancialsTable),
  // One company can have many people associated
  people: many(companyPeopleTable),
  // One company can have many products
  products: many(productsTable),
  // One company can have many websites
  websites: many(websitesTable),
  // One company can have many versions tracked in entity_versions
  versions: many(entityVersionsTable, { relationName: "entity" }),
}));

// Define TypeScript types for inference based on the schema
export type SelectCompany = typeof companiesTable.$inferSelect;
export type InsertCompany = typeof companiesTable.$inferInsert;

// Define type including relations for easier querying
export type CompanyWithRelations = SelectCompany & {
  addresses?: SelectCompanyAddress[];
  identifiers?: SelectCompanyIdentifier[];
  financials?: SelectCompanyFinancials[];
  people?: SelectCompanyPerson[];
  products?: SelectProduct[];
  websites?: SelectWebsite[];
  versions?: SelectEntityVersion[];
}; 
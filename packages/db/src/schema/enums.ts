/**
 * @description
 * Defines shared PostgreSQL enums used across the Top Pharma database schema.
 * These enums provide controlled vocabularies for specific fields, ensuring data consistency.
 *
 * @dependencies
 * - drizzle-orm/pg-core: Provides the `pgEnum` function for defining PostgreSQL enums.
 */
import { pgEnum } from "drizzle-orm/pg-core";

/**
 * @description Defines the possible processing statuses for records in the staging schema.
 */
export const processingStatusEnum = pgEnum("processing_status", [
  "new",
  "processing",
  "pending_review",
  "approved",
  "rejected",
  "error",
]);

/**
 * @description Defines the categories for classifying websites associated with companies or products.
 */
export const websiteCategoryEnum = pgEnum("website_category", [
  "corporate",
  "product_hcp",
  "product_dtc",
  "disease_state_unbranded",
  "investor_relations",
  "careers",
  "other",
]);

/**
 * @description Defines the clinical or market phases of a pharmaceutical product.
 */
export const productPhaseEnum = pgEnum("product_phase", [
  "preclinical",
  "phase_1",
  "phase_2",
  "phase_3",
  "submitted",
  "approved",
  "marketed",
  "discontinued",
  "unknown",
]);

/**
 * @description Defines the frequency options for user notifications/alerts regarding followed entities.
 */
export const notificationFrequencyEnum = pgEnum("notification_frequency", [
  "immediate",
  "daily",
  "weekly",
]);

/**
 * @description Defines the types of entities within the system that can be versioned or subscribed to.
 */
export const entityTypeEnum = pgEnum("entity_type", [
  "company",
  "product",
  "therapeutic_area",
  "website",
]);

/**
 * @description Defines the types of addresses that can be associated with a company.
 */
export const addressTypeEnum = pgEnum("address_type", [
  "HEADQUARTERS",
  "MANUFACTURING",
  "R_AND_D",
  "MAILING",
  "BUSINESS",
  "OTHER",
]);

/**
 * @description Defines the types of identifiers that can be associated with a company.
 */
export const identifierTypeEnum = pgEnum("identifier_type", [
  "CIK",
  "TICKER",
  "ISIN",
  "CUSIP",
  "EIN",
  "ALIAS",
]); 
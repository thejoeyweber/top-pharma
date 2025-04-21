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
 * @description Defines the frequency options for user notifications/alerts.
 */
export const notificationFrequencyEnum = pgEnum("notification_frequency", [
  "immediate",
  "daily",
  "weekly",
]);

/**
 * @description Defines the types of entities that users can subscribe to or that can be versioned.
 */
export const entityTypeEnum = pgEnum("entity_type", [
  "company",
  "product",
  "therapeutic_area",
  "website",
]); 
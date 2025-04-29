/**
 * @description
 * Main entry point for the database schema definitions within the `@workspace/db` package.
 * It re-exports all defined enums, public table schemas, staging table schemas,
 * and their associated TypeScript types and relations. This provides a single,
 * consistent import path for accessing any part of the database schema.
 *
 * @exports Enums - All PostgreSQL enums used in the schema (`processingStatusEnum`, etc.).
 * @exports Public Schemas - Definitions and types for tables in the `public` schema (`companiesTable`, `productsTable`, etc.).
 * @exports Staging Schemas - Definitions and types for tables in the `staging` schema (`fdaApprovalsStagingTable`, etc.).
 */

// Re-export all enums
export * from "./enums";

// Re-export all public schema tables and relations
export * from "./public/companies-schema";
export * from "./public/company-addresses-schema";
export * from "./public/company-identifiers-schema";
export * from "./public/products-schema";
export * from "./public/therapeutic-areas-schema";
export * from "./public/websites-schema";
export * from "./public/entity-versions-schema";
export * from "./public/user-subscriptions-schema";
export * from "./public/api-keys-schema";
export * from "./public/company-financials-schema";
export * from "./public/company-people-schema";

// Re-export all staging schema tables
export * from "./staging/fda-approvals-schema";
export * from "./staging/companies-staging-schema";
export * from "./staging/company-addresses-staging-schema";
export * from "./staging/company-identifiers-staging-schema";
export * from "./staging/company-financials-staging-schema";
export * from "./staging/company-people-staging-schema";
// Add exports for other staging tables as they are created
// export * from "./staging/companies-staging-schema";
// export * from "./staging/company-financials-staging-schema";
// export * from "./staging/company-people-staging-schema"; 
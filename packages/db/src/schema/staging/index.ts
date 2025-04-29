/**
 * @description
 * Main entry point for the staging database schema definitions within the `@workspace/db` package.
 * It re-exports all defined staging table schemas and their associated TypeScript types.
 * This provides a single, consistent import path for accessing staging tables.
 *
 * @exports Staging Schemas - Definitions and types for tables in the `staging` schema.
 */

// Re-export all staging schema tables
export * from "./fda-approvals-schema"; // Example existing staging table
export * from "./companies-staging-schema"; // Newly added companies staging table
// Add exports for other source-specific staging tables as they are created
// e.g., export * from "./sec-filings-schema"; 
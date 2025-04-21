import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * @description Schema for the `api_keys` table.
 * Stores API keys for external partner access.
 */
export const apiKeysTable = pgTable("api_keys", {
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
  // Optional User ID if keys are tied to specific users
  userId: text("user_id"),

  // API Key Specific Fields
  keyName: text("key_name").notNull(),
  hashedKey: varchar("hashed_key", { length: 255 }).notNull().unique(),
  keyPrefix: varchar("key_prefix", { length: 8 }).notNull().unique(),
  scopes: text("scopes"),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  isTestKey: boolean("is_test_key").default(false),
});

// Define TypeScript types for inference
export type ApiKey = typeof apiKeysTable.$inferSelect;
export type InsertApiKey = typeof apiKeysTable.$inferInsert; 
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { entityTypeEnum, notificationFrequencyEnum } from "../enums";

/**
 * @description Schema for the `user_subscriptions` table.
 * Stores records of users following specific entities for alerts.
 */
export const userSubscriptionsTable = pgTable("user_subscriptions", {
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

  // User and Entity Linking
  userId: text("user_id").notNull(),
  entityId: uuid("entity_id").notNull(),
  entityType: entityTypeEnum("entity_type").notNull(),

  // Subscription Preferences
  frequency: notificationFrequencyEnum("frequency").default("daily").notNull(),
  lastNotifiedAt: timestamp("last_notified_at", { withTimezone: true }),
});

// Define TypeScript types for inference
export type UserSubscription = typeof userSubscriptionsTable.$inferSelect;
export type InsertUserSubscription = typeof userSubscriptionsTable.$inferInsert; 
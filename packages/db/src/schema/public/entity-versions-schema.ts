import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { entityTypeEnum } from "../enums.js";
import { companiesTable } from "./companies-schema.js";

/**
 * @description Schema for the `entity_versions` table.
 * Tracks changes and versions of records in other public tables.
 */
export const entityVersionsTable = pgTable("entity_versions", {
  // Core Fields
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  // Polymorphic Relation Fields
  entityId: uuid("entity_id").notNull(),
  entityType: entityTypeEnum("entity_type").notNull(),

  // Versioning Fields
  versionNumber: integer("version_number").notNull(),
  dataSnapshot: jsonb("data_snapshot"),
  changeDescription: text("change_description"),
  userId: text("user_id"),
});

// Define relations for the entity versions table (Polymorphic)
export const entityVersionsRelations = relations(
  entityVersionsTable,
  ({ one }) => ({
    // Define relation based on entityType - requires conditional fetching logic
    entity: one(companiesTable, {
      fields: [entityVersionsTable.entityId],
      references: [companiesTable.id],
      relationName: "entity",
    }),
  })
);

// Define TypeScript types for inference
export type EntityVersion = typeof entityVersionsTable.$inferSelect;
export type InsertEntityVersion = typeof entityVersionsTable.$inferInsert; 
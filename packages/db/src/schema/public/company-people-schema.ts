/**
 * @description Schema for the public `company_people` table.
 * Stores information about key personnel (executives, board members) associated with companies.
 * This table links to the `companies` table.
 *
 * @dependencies
 * - drizzle-orm: Provides core ORM functions and types.
 * - drizzle-orm/pg-core: Provides PostgreSQL specific column types (uuid, timestamp, text, date).
 * - ./companies-schema: Defines the related companies table for the foreign key relationship.
 */
import {
  pgTable,
  uuid,
  timestamp,
  text,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { companiesTable } from "./companies-schema";

export const companyPeopleTable = pgTable("company_people", {
  // Core Fields (following backend.mdc rules)
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),

  // Foreign Key to companies table
  companyId: uuid("company_id")
    .references(() => companiesTable.id, { onDelete: "cascade" }) // Cascade delete if company is deleted
    .notNull(), // Person must belong to a company

  // Person Specific Fields
  name: text("name").notNull(),
  title: text("title").notNull(),
  roleType: text("role_type"), // e.g., 'Executive', 'Board Member', 'Founder'
  startDate: date("start_date"), // Date the person started in this role
  endDate: date("end_date"), // Date the person ended this role (if applicable)
  bio: text("bio"), // Short biography
  photoUrl: text("photo_url"), // URL to a photo of the person
});

// Define relations for the company people table
export const companyPeopleRelations = relations(companyPeopleTable, ({ one }) => ({
  // Each person record belongs to one company
  company: one(companiesTable, {
    fields: [companyPeopleTable.companyId],
    references: [companiesTable.id],
  }),
}));

// Define TypeScript types for inference based on the schema
export type SelectCompanyPerson = typeof companyPeopleTable.$inferSelect;
export type InsertCompanyPerson = typeof companyPeopleTable.$inferInsert; 
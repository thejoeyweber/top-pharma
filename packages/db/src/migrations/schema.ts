import { pgTable, pgEnum, uuid, timestamp, text, varchar, unique, integer, jsonb, boolean, foreignKey, numeric, date } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"

export const requestStatus = pgEnum("request_status", ['PENDING', 'SUCCESS', 'ERROR'])
export const equalityOp = pgEnum("equality_op", ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'])
export const action = pgEnum("action", ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'ERROR'])
export const factorType = pgEnum("factor_type", ['totp', 'webauthn', 'phone'])
export const factorStatus = pgEnum("factor_status", ['unverified', 'verified'])
export const aalLevel = pgEnum("aal_level", ['aal1', 'aal2', 'aal3'])
export const codeChallengeMethod = pgEnum("code_challenge_method", ['s256', 'plain'])
export const oneTimeTokenType = pgEnum("one_time_token_type", ['confirmation_token', 'reauthentication_token', 'recovery_token', 'email_change_token_new', 'email_change_token_current', 'phone_change_token'])
export const entityType = pgEnum("entity_type", ['company', 'product', 'therapeutic_area', 'website'])
export const notificationFrequency = pgEnum("notification_frequency", ['immediate', 'daily', 'weekly'])
export const processingStatus = pgEnum("processing_status", ['new', 'processing', 'pending_review', 'approved', 'rejected', 'error'])
export const productPhase = pgEnum("product_phase", ['preclinical', 'phase_1', 'phase_2', 'phase_3', 'submitted', 'approved', 'marketed', 'discontinued', 'unknown'])
export const websiteCategory = pgEnum("website_category", ['corporate', 'product_hcp', 'product_dtc', 'disease_state_unbranded', 'investor_relations', 'careers', 'other'])


export const companies = pgTable("companies", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	orgId: uuid("org_id"),
	name: text("name").notNull(),
	description: text("description"),
	websiteUrl: text("website_url"),
	location: text("location"),
	ticker: varchar("ticker", { length: 10 }),
	size: text("size"),
	cik: varchar("cik", { length: 10 }),
	normalizedNameHash: varchar("normalized_name_hash", { length: 64 }),
});

export const therapeuticAreas = pgTable("therapeutic_areas", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	orgId: uuid("org_id"),
	name: text("name").notNull(),
	description: text("description"),
},
(table) => {
	return {
		therapeuticAreasNameUnique: unique("therapeutic_areas_name_unique").on(table.name),
	}
});

export const entityVersions = pgTable("entity_versions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	entityId: uuid("entity_id").notNull(),
	entityType: entityType("entity_type").notNull(),
	versionNumber: integer("version_number").notNull(),
	dataSnapshot: jsonb("data_snapshot"),
	changeDescription: text("change_description"),
	userId: text("user_id"),
});

export const userSubscriptions = pgTable("user_subscriptions", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	orgId: uuid("org_id"),
	userId: text("user_id").notNull(),
	entityId: uuid("entity_id").notNull(),
	entityType: entityType("entity_type").notNull(),
	frequency: notificationFrequency("frequency").default('daily').notNull(),
	lastNotifiedAt: timestamp("last_notified_at", { withTimezone: true, mode: 'string' }),
});

export const apiKeys = pgTable("api_keys", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	orgId: uuid("org_id"),
	userId: text("user_id"),
	keyName: text("key_name").notNull(),
	hashedKey: varchar("hashed_key", { length: 255 }).notNull(),
	keyPrefix: varchar("key_prefix", { length: 8 }).notNull(),
	scopes: text("scopes"),
	expiresAt: timestamp("expires_at", { withTimezone: true, mode: 'string' }),
	lastUsedAt: timestamp("last_used_at", { withTimezone: true, mode: 'string' }),
	revokedAt: timestamp("revoked_at", { withTimezone: true, mode: 'string' }),
	isTestKey: boolean("is_test_key").default(false),
},
(table) => {
	return {
		apiKeysHashedKeyUnique: unique("api_keys_hashed_key_unique").on(table.hashedKey),
		apiKeysKeyPrefixUnique: unique("api_keys_key_prefix_unique").on(table.keyPrefix),
	}
});

export const products = pgTable("products", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	orgId: uuid("org_id"),
	companyId: uuid("company_id").references(() => companies.id, { onDelete: "set null" } ),
	therapeuticAreaId: uuid("therapeutic_area_id").references(() => therapeuticAreas.id, { onDelete: "set null" } ),
	name: text("name").notNull(),
	description: text("description"),
	phase: productPhase("phase").default('unknown'),
	status: text("status"),
	approvalStatus: text("approval_status"),
	ndcCode: varchar("ndc_code", { length: 20 }),
});

export const websites = pgTable("websites", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	orgId: uuid("org_id"),
	companyId: uuid("company_id").references(() => companies.id, { onDelete: "cascade" } ),
	productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" } ),
	url: text("url").notNull(),
	title: text("title"),
	category: websiteCategory("category").default('other'),
	screenshotPath: text("screenshot_path"),
	lastCrawledAt: timestamp("last_crawled_at", { withTimezone: true, mode: 'string' }),
},
(table) => {
	return {
		websitesUrlUnique: unique("websites_url_unique").on(table.url),
	}
});

export const companyFinancials = pgTable("company_financials", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" } ),
	asOfDate: timestamp("as_of_date", { withTimezone: true, mode: 'string' }).notNull(),
	marketCap: numeric("market_cap", { precision: 38, scale:  2 }),
	stockPrice: numeric("stock_price", { precision: 10, scale:  2 }),
	beta: numeric("beta", { precision: 5, scale:  2 }),
	priceChangePercent: numeric("price_change_percent", { precision: 5, scale:  2 }),
	averageVolume: numeric("average_volume", { precision: 38, scale:  0 }),
	dividendYield: numeric("dividend_yield", { precision: 5, scale:  2 }),
	dcfValue: numeric("dcf_value", { precision: 38, scale:  2 }),
	currency: varchar("currency", { length: 3 }),
	dataSource: text("data_source"),
});

export const companyPeople = pgTable("company_people", {
	id: uuid("id").defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	companyId: uuid("company_id").notNull().references(() => companies.id, { onDelete: "cascade" } ),
	name: text("name").notNull(),
	title: text("title").notNull(),
	roleType: text("role_type"),
	startDate: date("start_date"),
	endDate: date("end_date"),
	bio: text("bio"),
	photoUrl: text("photo_url"),
});
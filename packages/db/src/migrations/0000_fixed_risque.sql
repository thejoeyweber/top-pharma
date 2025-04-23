CREATE SCHEMA "staging";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "entity_type" AS ENUM('company', 'product', 'therapeutic_area', 'website');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "notification_frequency" AS ENUM('immediate', 'daily', 'weekly');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "processing_status" AS ENUM('new', 'processing', 'pending_review', 'approved', 'rejected', 'error');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "product_phase" AS ENUM('preclinical', 'phase_1', 'phase_2', 'phase_3', 'submitted', 'approved', 'marketed', 'discontinued', 'unknown');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "website_category" AS ENUM('corporate', 'product_hcp', 'product_dtc', 'disease_state_unbranded', 'investor_relations', 'careers', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"org_id" uuid,
	"name" text NOT NULL,
	"description" text,
	"website_url" text,
	"location" text,
	"ticker" varchar(10),
	"size" text,
	"cik" varchar(10),
	"normalized_name_hash" varchar(64)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"org_id" uuid,
	"company_id" uuid,
	"therapeutic_area_id" uuid,
	"name" text NOT NULL,
	"description" text,
	"phase" "product_phase" DEFAULT 'unknown',
	"status" text,
	"approval_status" text,
	"ndc_code" varchar(20)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "therapeutic_areas" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"org_id" uuid,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "therapeutic_areas_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "websites" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"org_id" uuid,
	"company_id" uuid,
	"product_id" uuid,
	"url" text NOT NULL,
	"title" text,
	"category" "website_category" DEFAULT 'other',
	"screenshot_path" text,
	"last_crawled_at" timestamp with time zone,
	CONSTRAINT "websites_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "entity_versions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"entity_id" uuid NOT NULL,
	"entity_type" "entity_type" NOT NULL,
	"version_number" integer NOT NULL,
	"data_snapshot" jsonb,
	"change_description" text,
	"user_id" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"org_id" uuid,
	"user_id" text NOT NULL,
	"entity_id" uuid NOT NULL,
	"entity_type" "entity_type" NOT NULL,
	"frequency" "notification_frequency" DEFAULT 'daily' NOT NULL,
	"last_notified_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "api_keys" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"org_id" uuid,
	"user_id" text,
	"key_name" text NOT NULL,
	"hashed_key" varchar(255) NOT NULL,
	"key_prefix" varchar(8) NOT NULL,
	"scopes" text,
	"expires_at" timestamp with time zone,
	"last_used_at" timestamp with time zone,
	"revoked_at" timestamp with time zone,
	"is_test_key" boolean DEFAULT false,
	CONSTRAINT "api_keys_hashed_key_unique" UNIQUE("hashed_key"),
	CONSTRAINT "api_keys_key_prefix_unique" UNIQUE("key_prefix")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staging"."fda_approvals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"_airbyte_extracted_at" timestamp with time zone,
	"_airbyte_raw_id" varchar(255),
	"raw_data_source" jsonb,
	"status" "processing_status" DEFAULT 'new' NOT NULL,
	"ai_confidence" integer,
	"ai_result" jsonb,
	"processed_at" timestamp with time zone,
	"error_message" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_therapeutic_area_id_therapeutic_areas_id_fk" FOREIGN KEY ("therapeutic_area_id") REFERENCES "therapeutic_areas"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "websites" ADD CONSTRAINT "websites_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "websites" ADD CONSTRAINT "websites_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

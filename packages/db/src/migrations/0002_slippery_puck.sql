CREATE TABLE IF NOT EXISTS "company_financials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"company_id" uuid NOT NULL,
	"as_of_date" timestamp with time zone NOT NULL,
	"market_cap" numeric(38, 2),
	"stock_price" numeric(10, 2),
	"beta" numeric(5, 2),
	"price_change_percent" numeric(5, 2),
	"average_volume" numeric(38, 0),
	"dividend_yield" numeric(5, 2),
	"dcf_value" numeric(38, 2),
	"currency" varchar(3),
	"data_source" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_people" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"company_id" uuid NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"role_type" text,
	"start_date" date,
	"end_date" date,
	"bio" text,
	"photo_url" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staging"."company_financials_staging" (
	"staging_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"staging_company_id" uuid NOT NULL,
	"as_of_date" timestamp with time zone,
	"market_cap" numeric(38, 2),
	"stock_price" numeric(10, 2),
	"beta" numeric(5, 2),
	"price_change_percent" numeric(5, 2),
	"average_volume" numeric(38, 0),
	"dividend_yield" numeric(5, 2),
	"dcf_value" numeric(38, 2),
	"currency" varchar(3),
	"data_source" text,
	"status" "processing_status" DEFAULT 'new' NOT NULL,
	"raw_data_sources" jsonb,
	"processing_notes" text,
	"ai_enrichment_data" jsonb,
	"ai_confidence" numeric(3, 2),
	"public_financials_id" uuid,
	"processed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"_airbyte_extracted_at" timestamp with time zone,
	"_airbyte_raw_id" varchar(255),
	"_airbyte_source_name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staging"."company_people_staging" (
	"staging_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"staging_company_id" uuid NOT NULL,
	"name" text,
	"title" text,
	"role_type" text,
	"start_date" date,
	"end_date" date,
	"bio" text,
	"photo_url" text,
	"status" "processing_status" DEFAULT 'new' NOT NULL,
	"raw_data_sources" jsonb,
	"processing_notes" text,
	"ai_enrichment_data" jsonb,
	"ai_confidence" numeric(3, 2),
	"public_person_id" uuid,
	"processed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"_airbyte_extracted_at" timestamp with time zone,
	"_airbyte_raw_id" varchar(255),
	"_airbyte_source_name" text
);
--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ALTER COLUMN "ai_confidence" SET DATA TYPE numeric(3, 2);--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "staging_id" uuid DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "name" text;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "website_url" text;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "ticker" varchar(10);--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "size" text;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "cik" varchar(10);--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "normalized_name_hash" varchar(64);--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "raw_data_sources" jsonb;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "processing_notes" text;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "ai_enrichment_data" jsonb;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staging"."companies_staging" ADD CONSTRAINT "companies_staging_public_company_id_companies_id_fk" FOREIGN KEY ("public_company_id") REFERENCES "companies"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" DROP COLUMN IF EXISTS "id";--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" DROP COLUMN IF EXISTS "raw_data_source";--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" DROP COLUMN IF EXISTS "ai_result";--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" DROP COLUMN IF EXISTS "error_message";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_financials" ADD CONSTRAINT "company_financials_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_people" ADD CONSTRAINT "company_people_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staging"."company_financials_staging" ADD CONSTRAINT "company_financials_staging_staging_company_id_companies_staging_staging_id_fk" FOREIGN KEY ("staging_company_id") REFERENCES "staging"."companies_staging"("staging_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staging"."company_financials_staging" ADD CONSTRAINT "company_financials_staging_public_financials_id_company_financials_id_fk" FOREIGN KEY ("public_financials_id") REFERENCES "company_financials"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staging"."company_people_staging" ADD CONSTRAINT "company_people_staging_staging_company_id_companies_staging_staging_id_fk" FOREIGN KEY ("staging_company_id") REFERENCES "staging"."companies_staging"("staging_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staging"."company_people_staging" ADD CONSTRAINT "company_people_staging_public_person_id_company_people_id_fk" FOREIGN KEY ("public_person_id") REFERENCES "company_people"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 CREATE TYPE "address_type" AS ENUM('HEADQUARTERS', 'MANUFACTURING', 'R_AND_D', 'MAILING', 'BUSINESS', 'OTHER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "identifier_type" AS ENUM('CIK', 'TICKER', 'ISIN', 'CUSIP', 'EIN', 'ALIAS');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"address_type" "address_type" DEFAULT 'BUSINESS',
	"street_line_1" text,
	"street_line_2" text,
	"city" text,
	"state_province" text,
	"postal_code" varchar(20),
	"country_code" varchar(2),
	"phone" text,
	"is_primary" boolean DEFAULT false,
	"source" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_identifiers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"identifier_type" "identifier_type" NOT NULL,
	"identifier_value" text NOT NULL,
	"source" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staging"."company_addresses_staging" (
	"staging_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid,
	"address_type" "address_type" DEFAULT 'BUSINESS',
	"street_line_1" text,
	"street_line_2" text,
	"city" text,
	"state_province" text,
	"postal_code" varchar(20),
	"country_code" varchar(2),
	"phone" text,
	"is_primary" boolean DEFAULT false,
	"source" text,
	"status" "processing_status" DEFAULT 'new' NOT NULL,
	"raw_data_sources" jsonb,
	"processing_notes" text,
	"ai_enrichment_data" jsonb,
	"ai_confidence" numeric(3, 2),
	"public_address_id" uuid,
	"processed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"_airbyte_extracted_at" timestamp with time zone,
	"_airbyte_raw_id" varchar(255),
	"_airbyte_source_name" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "staging"."company_identifiers_staging" (
	"staging_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid,
	"identifier_type" "identifier_type" NOT NULL,
	"identifier_value" text NOT NULL,
	"source" text,
	"status" "processing_status" DEFAULT 'new' NOT NULL,
	"raw_data_sources" jsonb,
	"processing_notes" text,
	"ai_enrichment_data" jsonb,
	"ai_confidence" numeric(3, 2),
	"public_identifier_id" uuid,
	"processed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"_airbyte_extracted_at" timestamp with time zone,
	"_airbyte_raw_id" varchar(255),
	"_airbyte_source_name" text
);
--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "main_phone" text;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "sic_code" varchar(4);--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "sector" text;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "industry" text;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "exchange" text;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "ipo_date" date;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "employee_count" integer;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "fiscal_year_end" varchar(5);--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "incorporation_state_country" text;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "is_adr" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "is_etf" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "is_fund" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "is_actively_trading" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "companies" ADD COLUMN "is_wksi" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "main_phone" text;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "image_url" text;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "sic_code" varchar(4);--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "sector" text;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "industry" text;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "exchange" text;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "ipo_date" date;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "employee_count" integer;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "fiscal_year_end" varchar(5);--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "incorporation_state_country" text;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "is_adr" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "is_etf" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "is_fund" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "is_actively_trading" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" ADD COLUMN "is_wksi" boolean DEFAULT false;--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "company_identifier_unique_idx" ON "company_identifiers" ("company_id","identifier_type","identifier_value");--> statement-breakpoint
ALTER TABLE "companies" DROP COLUMN IF EXISTS "location";--> statement-breakpoint
ALTER TABLE "companies" DROP COLUMN IF EXISTS "size";--> statement-breakpoint
ALTER TABLE "companies" DROP COLUMN IF EXISTS "cik";--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" DROP COLUMN IF EXISTS "location";--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" DROP COLUMN IF EXISTS "size";--> statement-breakpoint
ALTER TABLE "staging"."companies_staging" DROP COLUMN IF EXISTS "cik";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_addresses" ADD CONSTRAINT "company_addresses_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_identifiers" ADD CONSTRAINT "company_identifiers_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staging"."company_addresses_staging" ADD CONSTRAINT "company_addresses_staging_public_address_id_company_addresses_id_fk" FOREIGN KEY ("public_address_id") REFERENCES "company_addresses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staging"."company_identifiers_staging" ADD CONSTRAINT "company_identifiers_staging_public_identifier_id_company_identifiers_id_fk" FOREIGN KEY ("public_identifier_id") REFERENCES "company_identifiers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

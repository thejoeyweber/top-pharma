CREATE TABLE IF NOT EXISTS "staging"."companies_staging" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"_airbyte_extracted_at" timestamp with time zone,
	"_airbyte_raw_id" varchar(255),
	"_airbyte_source_name" text,
	"raw_data_source" jsonb,
	"status" "processing_status" DEFAULT 'new' NOT NULL,
	"ai_confidence" integer,
	"ai_result" jsonb,
	"processed_at" timestamp with time zone,
	"error_message" text,
	"public_company_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

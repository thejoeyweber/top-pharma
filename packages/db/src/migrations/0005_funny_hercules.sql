ALTER TABLE "staging"."company_addresses_staging" DROP COLUMN IF EXISTS "company_id";--> statement-breakpoint
ALTER TABLE "staging"."company_identifiers_staging" DROP COLUMN IF EXISTS "company_id";--> statement-breakpoint
ALTER TABLE "staging"."company_financials_staging" ADD CONSTRAINT "unique_staging_company_financials" UNIQUE("staging_company_id");--> statement-breakpoint
ALTER TABLE "staging"."company_people_staging" ADD CONSTRAINT "unique_staging_company_person_name" UNIQUE("staging_company_id","name");
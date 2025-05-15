ALTER TABLE "staging"."company_addresses_staging" ADD COLUMN "staging_company_id" uuid;--> statement-breakpoint
ALTER TABLE "staging"."company_identifiers_staging" ADD COLUMN "staging_company_id" uuid;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_company_addresses_staging_company_id" ON "staging"."company_addresses_staging" ("staging_company_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_company_identifiers_staging_company_id" ON "staging"."company_identifiers_staging" ("staging_company_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staging"."company_addresses_staging" ADD CONSTRAINT "company_addresses_staging_staging_company_id_companies_staging_staging_id_fk" FOREIGN KEY ("staging_company_id") REFERENCES "staging"."companies_staging"("staging_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "staging"."company_identifiers_staging" ADD CONSTRAINT "company_identifiers_staging_staging_company_id_companies_staging_staging_id_fk" FOREIGN KEY ("staging_company_id") REFERENCES "staging"."companies_staging"("staging_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "staging"."company_addresses_staging" ADD CONSTRAINT "unique_staging_company_address" UNIQUE("staging_company_id");--> statement-breakpoint
ALTER TABLE "staging"."company_identifiers_staging" ADD CONSTRAINT "unique_staging_company_identifier_type" UNIQUE("staging_company_id","identifier_type");
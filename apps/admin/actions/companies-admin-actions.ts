"use server";

/**
 * @description
 * Server Actions for administrative tasks related to company data, primarily interacting
 * with the staging tables. These actions are intended for use within the `/admin`
 * application and require appropriate admin privileges.
 *
 * @dependencies
 * - @clerk/nextjs/server: Provides `auth` for retrieving user authentication and session claims.
 * - @workspace/db: Provides the Drizzle ORM client and schema definitions.
 * - @workspace/utils: Provides the `ActionState` type for standardized action responses.
 * - drizzle-orm: Provides query building functions (`desc`, `sql`).
 */

import { auth } from "@clerk/nextjs/server";
import { db } from "@workspace/db";
import { companiesStagingTable } from "@workspace/db/src/schema/staging/companies-staging-schema";
import { companyAddressesStagingTable } from "@workspace/db/src/schema/staging/company-addresses-staging-schema";
import { companyIdentifiersStagingTable } from "@workspace/db/src/schema/staging/company-identifiers-staging-schema";
import type { SelectCompanyStaging } from "@workspace/db/src/schema/staging/companies-staging-schema";
import type { SelectCompanyAddressStaging } from "@workspace/db/src/schema/staging/company-addresses-staging-schema";
import type { SelectCompanyIdentifierStaging } from "@workspace/db/src/schema/staging/company-identifiers-staging-schema";
import type { ActionState } from "@workspace/utils";
import { desc, sql } from "drizzle-orm";

/**
 * @description Lists records from the `staging.companies_staging` table.
 * Requires the user to be authenticated and have an 'admin' role (placeholder check).
 * Supports basic pagination.
 *
 * @param {object} [options] - Optional parameters for pagination.
 * @param {number} [options.limit=10] - Maximum number of records to return.
 * @param {number} [options.offset=0] - Number of records to skip for pagination.
 * @returns {Promise<ActionState<{ companies: CompanyStaging[]; totalCount: number }>>}
 *          An ActionState object containing the list of staging records and total count on success,
 *          or an error message on failure.
 */
export async function listStagingCompaniesAction(options?: {
  limit?: number;
  offset?: number;
}): Promise<ActionState<{ companies: SelectCompanyStaging[]; totalCount: number }>> {
  const { userId, sessionClaims } = auth();

  // 1. Authentication Check
  if (!userId) {
    return {
      isSuccess: false,
      message: "Authentication required. Please sign in.",
    };
  }

  // 2. Authorization Check (Admin Role - Placeholder)
  // TODO: Implement robust role checking based on Clerk sessionClaims or custom logic
  const isAdmin = sessionClaims?.metadata?.role === "admin"; // Example check
  if (!isAdmin) {
    console.warn(
      `Unauthorized access attempt to listStagingCompaniesAction by user ${userId}`
    );
    return {
      isSuccess: false,
      message: "Unauthorized: Admin privileges required.",
    };
  }

  const limit = options?.limit ?? 10;
  const offset = options?.offset ?? 0;

  try {
    // 3. Fetch Total Count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(companiesStagingTable);
    const totalCount = countResult[0]?.count ?? 0;

    // 4. Fetch Paginated Staging Records
    const companies = await db
      .select()
      .from(companiesStagingTable)
      .orderBy(desc(companiesStagingTable.createdAt))
      .limit(limit)
      .offset(offset);

    // 5. Return Success State
    return {
      isSuccess: true,
      message: "Staging company records listed successfully.",
      data: { companies, totalCount },
    };
  } catch (error) {
    // 6. Handle Errors
    console.error("Error listing staging companies:", error);
    return {
      isSuccess: false,
      message: "Failed to list staging companies. Please try again later.",
    };
  }
}

/**
 * @description Lists records from the `staging.company_addresses_staging` table.
 * Requires the user to be authenticated and have an 'admin' role.
 * Supports basic pagination.
 *
 * @param {object} [options] - Optional parameters for pagination.
 * @param {number} [options.limit=10] - Maximum number of records to return.
 * @param {number} [options.offset=0] - Number of records to skip for pagination.
 * @returns {Promise<ActionState<{ addresses: SelectCompanyAddressStaging[]; totalCount: number }>>}
 */
export async function listStagingAddressesAction(options?: {
  limit?: number;
  offset?: number;
}): Promise<ActionState<{ addresses: SelectCompanyAddressStaging[]; totalCount: number }>> {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    return {
      isSuccess: false,
      message: "Authentication required. Please sign in.",
    };
  }

  const isAdmin = sessionClaims?.metadata?.role === "admin";
  if (!isAdmin) {
    console.warn(
      `Unauthorized access attempt to listStagingAddressesAction by user ${userId}`
    );
    return {
      isSuccess: false,
      message: "Unauthorized: Admin privileges required.",
    };
  }

  const limit = options?.limit ?? 10;
  const offset = options?.offset ?? 0;

  try {
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(companyAddressesStagingTable);
    const totalCount = countResult[0]?.count ?? 0;

    const addresses = await db
      .select()
      .from(companyAddressesStagingTable)
      .orderBy(desc(companyAddressesStagingTable.createdAt))
      .limit(limit)
      .offset(offset);

    return {
      isSuccess: true,
      message: "Staging address records listed successfully.",
      data: { addresses, totalCount },
    };
  } catch (error) {
    console.error("Error listing staging addresses:", error);
    return {
      isSuccess: false,
      message: "Failed to list staging addresses. Please try again later.",
    };
  }
}

/**
 * @description Lists records from the `staging.company_identifiers_staging` table.
 * Requires the user to be authenticated and have an 'admin' role.
 * Supports basic pagination.
 *
 * @param {object} [options] - Optional parameters for pagination.
 * @param {number} [options.limit=10] - Maximum number of records to return.
 * @param {number} [options.offset=0] - Number of records to skip for pagination.
 * @returns {Promise<ActionState<{ identifiers: SelectCompanyIdentifierStaging[]; totalCount: number }>>}
 */
export async function listStagingIdentifiersAction(options?: {
  limit?: number;
  offset?: number;
}): Promise<ActionState<{ identifiers: SelectCompanyIdentifierStaging[]; totalCount: number }>> {
  const { userId, sessionClaims } = auth();

  if (!userId) {
    return {
      isSuccess: false,
      message: "Authentication required. Please sign in.",
    };
  }

  const isAdmin = sessionClaims?.metadata?.role === "admin";
  if (!isAdmin) {
    console.warn(
      `Unauthorized access attempt to listStagingIdentifiersAction by user ${userId}`
    );
    return {
      isSuccess: false,
      message: "Unauthorized: Admin privileges required.",
    };
  }

  const limit = options?.limit ?? 10;
  const offset = options?.offset ?? 0;

  try {
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(companyIdentifiersStagingTable);
    const totalCount = countResult[0]?.count ?? 0;

    const identifiers = await db
      .select()
      .from(companyIdentifiersStagingTable)
      .orderBy(desc(companyIdentifiersStagingTable.createdAt))
      .limit(limit)
      .offset(offset);

    return {
      isSuccess: true,
      message: "Staging identifier records listed successfully.",
      data: { identifiers, totalCount },
    };
  } catch (error) {
    console.error("Error listing staging identifiers:", error);
    return {
      isSuccess: false,
      message: "Failed to list staging identifiers. Please try again later.",
    };
  }
}

// Placeholder for future admin actions:
// - approveStagingCompanyAction(stagingId: string, edits?: Partial<InsertCompany>)
// - rejectStagingCompanyAction(stagingId: string, reason: string)
// - mergeStagingCompanyAction(stagingId: string, targetPublicId: string)
// - approveStagingAddressAction(stagingId: string, edits?: Partial<InsertCompanyAddress>)
// - approveStagingIdentifierAction(stagingId: string, edits?: Partial<InsertCompanyIdentifier>) 
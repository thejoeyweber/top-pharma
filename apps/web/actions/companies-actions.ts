"use server";

/**
 * @description
 * Server Actions for interacting with public company data.
 * These actions are designed to be called from Server Components or Client Components
 * within the 'web' application to fetch company information securely.
 * All actions include authentication checks using Clerk.
 *
 * @dependencies
 * - @clerk/nextjs/server: Provides `auth` for retrieving user authentication status.
 * - @workspace/db: Provides the Drizzle ORM client and schema definitions.
 * - @workspace/utils: Provides the `ActionState` type for standardized action responses.
 * - drizzle-orm: Provides query building functions.
 */

import { auth } from "@clerk/nextjs/server";
import { db } from "@workspace/db";
import { companiesTable } from "@workspace/db/src/schema/public/companies-schema";
import type { SelectCompany } from "@workspace/db/src/schema/public/companies-schema";
import type { ActionState } from "@workspace/utils";
import { eq, desc, sql } from "drizzle-orm";

/**
 * @description Fetches a single company by its ID.
 * Requires the user to be authenticated.
 */
export async function getCompanyByIdAction(
  companyId: string
): Promise<ActionState<SelectCompany | null>> {
  const { userId } = auth();

  // Authentication Check
  if (!userId) {
    return {
      isSuccess: false,
      message: "Authentication required. Please sign in.",
    };
  }

  // Validate input
  if (!companyId) {
    return { isSuccess: false, message: "Company ID is required." };
  }

  try {
    // Fetch the company from the database
    const company = await db.query.companiesTable.findFirst({
      where: eq(companiesTable.id, companyId),
    });

    if (!company) {
      return {
        isSuccess: true, // Operation succeeded, but no data found
        message: "Company not found.",
        data: null,
      };
    }

    // Return success state with the company data
    return {
      isSuccess: true,
      message: "Company fetched successfully.",
      data: company,
    };
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching company by ID:", error);
    // Return failure state
    return {
      isSuccess: false,
      message: "Failed to fetch company. Please try again later.",
    };
  }
}

/**
 * @description Lists companies, optionally filtered and paginated.
 * Requires the user to be authenticated.
 */
export async function listCompaniesAction(options?: {
  limit?: number;
  offset?: number;
  searchTerm?: string;
}): Promise<ActionState<{ companies: SelectCompany[]; totalCount: number }>> {
  const { userId } = auth();

  // Authentication Check
  if (!userId) {
    return {
      isSuccess: false,
      message: "Authentication required. Please sign in.",
    };
  }

  const limit = options?.limit ?? 10;
  const offset = options?.offset ?? 0;

  try {
    // Base query
    let query = db.select().from(companiesTable);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(companiesTable);
    const totalCount = countResult[0]?.count ?? 0;

    // Get paginated results
    const companies = await query
      .orderBy(desc(companiesTable.createdAt))
      .limit(limit)
      .offset(offset);

    return {
      isSuccess: true,
      message: "Companies listed successfully.",
      data: { companies, totalCount },
    };
  } catch (error) {
    console.error("Error listing companies:", error);
    return {
      isSuccess: false,
      message: "Failed to list companies. Please try again later.",
    };
  }
} 
"use server";

/**
 * @description
 * Server Actions for interacting with public company data, including related financials and people.
 * These actions are designed to be called from Server Components or Client Components
 * within the 'web' application to fetch company information securely.
 * All actions include authentication checks using Clerk.
 *
 * @dependencies
 * - @clerk/nextjs/server: Provides `auth` for retrieving user authentication status.
 * - @workspace/db: Provides the Drizzle ORM client (`db`) and schema definitions (`schema`).
 * - @workspace/utils: Provides the `ActionState` type for standardized action responses.
 * - drizzle-orm: Provides query building functions (`eq`, `desc`, `sql`).
 */

import { auth } from "@clerk/nextjs/server";
import { db, schema } from "@workspace/db";
import type {
  SelectCompany,
  CompanyWithRelations,
  SelectCompanyFinancials,
  SelectCompanyPerson,
  SelectCompanyAddress,
  SelectCompanyIdentifier,
} from "@workspace/db/schema";
import type { ActionState } from "@workspace/utils";
import { eq, desc, sql } from "drizzle-orm";

/**
 * @description Fetches a single company by its ID, optionally including related data.
 * Requires the user to be authenticated.
 * @param {string} companyId - The UUID of the company to fetch.
 * @param {object} [options] - Options for including related data.
 * @param {boolean} [options.includeFinancials=false] - Whether to include financial data.
 * @param {boolean} [options.includePeople=false] - Whether to include people data.
 * @returns {Promise<ActionState<CompanyWithRelations | null>>} Action state with company data or null if not found.
 */
export async function getCompanyByIdAction(
  companyId: string,
  options?: {
    includeFinancials?: boolean;
    includePeople?: boolean;
  }
): Promise<ActionState<CompanyWithRelations | null>> {
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
    // Fetch the company from the database, conditionally including relations
    const company = await db.query.companiesTable.findFirst({
      where: eq(schema.companiesTable.id, companyId),
      with: {
        financials: options?.includeFinancials ? true : undefined,
        people: options?.includePeople ? true : undefined,
      },
    });

    if (!company) {
      return {
        isSuccess: true, // Operation succeeded, but no data found
        message: "Company not found.",
        data: null,
      };
    }

    // Return success state with the company data (including relations if requested)
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
 * @param {object} [options] - Options for pagination and searching.
 * @param {number} [options.limit=10] - Maximum number of companies to return.
 * @param {number} [options.offset=0] - Number of companies to skip.
 * @param {string} [options.searchTerm] - Term to search for (currently not implemented).
 * @returns {Promise<ActionState<{ companies: SelectCompany[]; totalCount: number }>>} Action state with list of companies and total count.
 */
export async function listCompaniesAction(options?: {
  limit?: number;
  offset?: number;
  searchTerm?: string; // Placeholder for future search implementation
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
  // const searchTerm = options?.searchTerm; // For future use

  try {
    // Base query
    let query = db.select().from(schema.companiesTable);
    let countQuery = db
      .select({ count: sql<number>`count(*)` })
      .from(schema.companiesTable);

    // Apply search term filter (future implementation)
    // if (searchTerm) {
    //   query = query.where(ilike(schema.companiesTable.name, `%${searchTerm}%`));
    //   countQuery = countQuery.where(ilike(schema.companiesTable.name, `%${searchTerm}%`));
    // }

    // Get total count based on filters
    const countResult = await countQuery;
    const totalCount = countResult[0]?.count ?? 0;

    // Get paginated results
    const companies = await query
      .orderBy(desc(schema.companiesTable.createdAt))
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

/**
 * @description Fetches financial records for a specific company.
 * Requires the user to be authenticated.
 * @param {string} companyId - The UUID of the company.
 * @returns {Promise<ActionState<SelectCompanyFinancials[]>>} Action state with an array of financial records.
 */
export async function getCompanyFinancialsAction(
  companyId: string
): Promise<ActionState<SelectCompanyFinancials[]>> {
  const { userId } = auth();

  if (!userId) {
    return {
      isSuccess: false,
      message: "Authentication required.",
    };
  }

  if (!companyId) {
    return { isSuccess: false, message: "Company ID is required." };
  }

  try {
    const financials = await db.query.companyFinancialsTable.findMany({
      where: eq(schema.companyFinancialsTable.companyId, companyId),
      orderBy: desc(schema.companyFinancialsTable.asOfDate), // Order by most recent date
    });

    return {
      isSuccess: true,
      message: "Company financials fetched successfully.",
      data: financials,
    };
  } catch (error) {
    console.error("Error fetching company financials:", error);
    return {
      isSuccess: false,
      message: "Failed to fetch company financials.",
    };
  }
}

/**
 * @description Fetches people records (executives, board members) for a specific company.
 * Requires the user to be authenticated.
 * @param {string} companyId - The UUID of the company.
 * @returns {Promise<ActionState<SelectCompanyPerson[]>>} Action state with an array of people records.
 */
export async function getCompanyPeopleAction(
  companyId: string
): Promise<ActionState<SelectCompanyPerson[]>> {
  const { userId } = auth();

  if (!userId) {
    return {
      isSuccess: false,
      message: "Authentication required.",
    };
  }

  if (!companyId) {
    return { isSuccess: false, message: "Company ID is required." };
  }

  try {
    const people = await db.query.companyPeopleTable.findMany({
      where: eq(schema.companyPeopleTable.companyId, companyId),
      orderBy: desc(schema.companyPeopleTable.createdAt), // Order by creation date
    });

    return {
      isSuccess: true,
      message: "Company people fetched successfully.",
      data: people,
    };
  } catch (error) {
    console.error("Error fetching company people:", error);
    return {
      isSuccess: false,
      message: "Failed to fetch company people.",
    };
  }
}

/**
 * @description Fetches addresses for a specific company.
 * Requires the user to be authenticated.
 * @param {string} companyId - The UUID of the company.
 * @returns {Promise<ActionState<SelectCompanyAddress[]>>} Action state with an array of address records.
 */
export async function getCompanyAddressesAction(
  companyId: string
): Promise<ActionState<SelectCompanyAddress[]>> {
  const { userId } = auth();

  if (!userId) {
    return {
      isSuccess: false,
      message: "Authentication required.",
    };
  }

  if (!companyId) {
    return { isSuccess: false, message: "Company ID is required." };
  }

  try {
    const addresses = await db.query.companyAddressesTable.findMany({
      where: eq(schema.companyAddressesTable.companyId, companyId),
      orderBy: desc(schema.companyAddressesTable.createdAt),
    });

    return {
      isSuccess: true,
      message: "Company addresses fetched successfully.",
      data: addresses,
    };
  } catch (error) {
    console.error("Error fetching company addresses:", error);
    return {
      isSuccess: false,
      message: "Failed to fetch company addresses.",
    };
  }
}

/**
 * @description Fetches identifiers for a specific company.
 * Requires the user to be authenticated.
 * @param {string} companyId - The UUID of the company.
 * @returns {Promise<ActionState<SelectCompanyIdentifier[]>>} Action state with an array of identifier records.
 */
export async function getCompanyIdentifiersAction(
  companyId: string
): Promise<ActionState<SelectCompanyIdentifier[]>> {
  const { userId } = auth();

  if (!userId) {
    return {
      isSuccess: false,
      message: "Authentication required.",
    };
  }

  if (!companyId) {
    return { isSuccess: false, message: "Company ID is required." };
  }

  try {
    const identifiers = await db.query.companyIdentifiersTable.findMany({
      where: eq(schema.companyIdentifiersTable.companyId, companyId),
      orderBy: desc(schema.companyIdentifiersTable.createdAt),
    });

    return {
      isSuccess: true,
      message: "Company identifiers fetched successfully.",
      data: identifiers,
    };
  } catch (error) {
    console.error("Error fetching company identifiers:", error);
    return {
      isSuccess: false,
      message: "Failed to fetch company identifiers.",
    };
  }
} 
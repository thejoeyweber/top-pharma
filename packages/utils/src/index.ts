/**
 * @description
 * This is the main entry point for the shared utility package (@workspace/utils).
 * It exports common types and utility functions used across different applications
 * and packages within the monorepo.
 *
 * @exports ActionState - A standardized type for Server Action return values.
 * @exports hashPassword - Utility function for hashing passwords.
 * @exports comparePassword - Utility function for comparing passwords.
 * @exports generateApiKey - Utility function for generating secure API keys.
 */

export * from "./types.js";
export * from "./security.js"; 
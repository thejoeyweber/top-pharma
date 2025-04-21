/**
 * @description
 * Defines shared TypeScript types used across the Top Pharma application.
 */

/**
 * @description Represents the standardized state returned by Server Actions.
 * This allows components to easily handle success and error states,
 * display appropriate messages, and access returned data if successful.
 *
 * @template T - The type of the data returned on success. Defaults to `never` if no data is expected.
 *
 * @property {boolean} isSuccess - Indicates whether the action completed successfully.
 * @property {string} message - A user-friendly message describing the outcome (success or error).
 * @property {T | undefined} data - The data returned by the action upon success. Undefined on failure.
 */
export type ActionState<T = never> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: undefined }; // Ensure data is undefined on failure 
/**
 * @description
 * Provides utility functions for common security operations like password hashing
 * and API key generation.
 *
 * @dependencies
 * - bcryptjs: Used for hashing and comparing passwords securely.
 */
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10; // Standard number of salt rounds for bcrypt

/**
 * @description Hashes a plain text password using bcrypt.
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} A promise that resolves with the hashed password.
 * @throws {Error} Throws an error if hashing fails.
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Password hashing failed.");
  }
}

/**
 * @description Compares a plain text password with a stored hash using bcrypt.
 * @param {string} password - The plain text password to compare.
 * @param {string} hash - The stored password hash to compare against.
 * @returns {Promise<boolean>} A promise that resolves with `true` if the password matches the hash, `false` otherwise.
 * @throws {Error} Throws an error if comparison fails.
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.error("Error comparing password:", error);
    throw new Error("Password comparison failed.");
  }
}

/**
 * @description Generates a secure random string suitable for use as an API key prefix or secret.
 * Note: This is a basic example. For production, consider using a dedicated library
 * like `crypto.randomBytes` for stronger randomness and specific formatting.
 *
 * @param {number} [length=32] - The desired length of the key.
 * @returns {string} A randomly generated string.
 */
export function generateApiKey(length: number = 32): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

/**
 * @description Generates a unique API key prefix.
 * @param {string} [prefix="tpk_"] - The prefix string.
 * @returns {string} A unique prefix string.
 */
export function generateApiKeyPrefix(prefix: string = "tpk_"): string {
  return prefix + generateApiKey(8); // Append a short random string
} 
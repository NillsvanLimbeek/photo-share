/**
 * Throws a new error with the given message.
 *
 * @param error - The error message to throw.
 * @throws An error with the given message.
 * @example
 * // Throws an error with the message "Invalid input"
 * const user = userFunc ?? raise("Invalid input");
 *
 * if (!user) raise("Invalid input");
 *
 */
export function raise(error: string): never {
	throw new Error(error);
}

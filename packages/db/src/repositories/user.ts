import { eq } from "drizzle-orm";
import { db } from "../client.js";
import * as schema from "../schema/index.js";

/**
 * Retrieves a user from the database by their ID.
 * @param userId - The Discord user ID
 * @returns The user record or undefined if not found
 */
export async function getUser(userId: string) {
	const [user] = await db.select().from(schema.users).where(eq(schema.users.id, userId)).limit(1);
	return user;
}

/**
 * Ensures a user exists in the database, creating it if necessary.
 * @param userId - The Discord user ID
 * @param username - The Discord username
 * @returns The existing or newly created user record
 */
export async function ensureUser(userId: string, username: string) {
	const user = await getUser(userId);
	if (user) return user;

	const [newUser] = await db
		.insert(schema.users)
		.values({
			id: userId,
			username,
		})
		.returning();
	return newUser;
}

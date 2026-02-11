import { env } from "@repo/env";
import { eq } from "drizzle-orm";
import { db } from "../client.js";
import * as schema from "../schema/index.js";

/**
 * Retrieves a guild from the database by its ID.
 * @param guildId - The Discord guild ID
 * @returns The guild record or undefined if not found
 */
export async function getGuild(guildId: string) {
	const [guild] = await db.select().from(schema.guilds).where(eq(schema.guilds.id, guildId)).limit(1);
	return guild;
}

/**
 * Ensures a guild exists in the database, creating it if necessary.
 * @param guildId - The Discord guild ID
 * @returns The existing or newly created guild record
 */
export async function ensureGuild(guildId: string) {
	const guild = await getGuild(guildId);
	if (guild) return guild;

	const [newGuild] = await db
		.insert(schema.guilds)
		.values({
			id: guildId,
			prefix: env.DEFAULT_PREFIX,
		})
		.returning();
	return newGuild;
}

/**
 * Retrieves the command prefix for a guild.
 * @param guildId - The Discord guild ID (optional for DMs)
 * @returns The guild's custom prefix or the default prefix
 */
export async function getPrefix(guildId: string | undefined): Promise<string> {
	if (!guildId) return env.DEFAULT_PREFIX;
	const guild = await ensureGuild(guildId);
	return guild?.prefix ?? env.DEFAULT_PREFIX;
}

/**
 * Updates the command prefix for a guild.
 * @param guildId - The Discord guild ID
 * @param prefix - The new prefix to set
 * @returns The updated guild record
 */
export async function setPrefix(guildId: string, prefix: string) {
	const [updatedGuild] = await db
		.update(schema.guilds)
		.set({ prefix, updatedAt: new Date() })
		.where(eq(schema.guilds.id, guildId))
		.returning();
	return updatedGuild;
}

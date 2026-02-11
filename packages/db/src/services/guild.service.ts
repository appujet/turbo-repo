import { env } from "@repo/env";
import { eq } from "drizzle-orm";
import { singleton } from "tsyringe";
import { db } from "../client.js";
import * as schema from "../schema/index.js";

@singleton()
export class GuildService {
	private db = db;

	public async getGuild(guildId: string) {
		const [guild] = await this.db.select().from(schema.guilds).where(eq(schema.guilds.id, guildId)).limit(1);
		return guild;
	}

	public async ensureGuild(guildId: string) {
		const guild = await this.getGuild(guildId);
		if (guild) return guild;

		const [newGuild] = await this.db
			.insert(schema.guilds)
			.values({
				id: guildId,
				prefix: env.DEFAULT_PREFIX,
			})
			.returning();
		return newGuild;
	}

	public async getPrefix(guildId: string | undefined): Promise<string> {
		if (!guildId) return env.DEFAULT_PREFIX;
		const guild = await this.ensureGuild(guildId);
		return guild?.prefix ?? env.DEFAULT_PREFIX;
	}

	public async setPrefix(guildId: string, prefix: string) {
		const [updatedGuild] = await this.db
			.update(schema.guilds)
			.set({ prefix, updatedAt: new Date() })
			.where(eq(schema.guilds.id, guildId))
			.returning();
		return updatedGuild;
	}
}

import { Client, Events, GatewayIntentBits } from "discord.js";
import { env } from "@repo/env";
import { db, users, eq } from "@repo/db";
import { logger } from "@repo/core";

const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, (readyClient) => {
	logger.info(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
	if (message.author.bot) return;

	if (message.content === "!ping") {
		await message.reply("Pong!");
		
		// Example DB usage: Upsert user
		await db
			.insert(users)
			.values({
				id: message.author.id,
				username: message.author.username,
			})
			.onConflictDoUpdate({
				target: users.id,
				set: { username: message.author.username },
			});
	}
});

client.login(env.DISCORD_TOKEN);

import { logger } from "@repo/core";
import { env } from "@repo/env";
import { Client, type ClientOptions, GatewayIntentBits } from "discord.js";
import { singleton } from "tsyringe";

@singleton()
export class BotClient extends Client {
	constructor() {
		const options: ClientOptions = {
			intents: [
				GatewayIntentBits.Guilds,
				GatewayIntentBits.GuildMessages,
				GatewayIntentBits.MessageContent,
				GatewayIntentBits.GuildMembers,
			],
		};
		super(options);
	}

	public async start(): Promise<void> {
		try {
			await this.login(env.DISCORD_TOKEN);
		} catch (error) {
			logger.error(error, "Failed to start bot:");
			process.exit(1);
		}
	}
}

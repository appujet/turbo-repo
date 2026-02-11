import { CommandHandler, Event, type IEvent, logger } from "@repo/core";
import { env } from "@repo/env";
import { type Client, Events } from "discord.js";
import { container } from "tsyringe";

@Event({
	name: Events.ClientReady,
	once: true,
})
export class ReadyEvent implements IEvent {
	async run(client: Client<true>): Promise<void> {
		const commandHandler = container.resolve(CommandHandler);
		await commandHandler.deployCommands(
			client.rest,
			client.user.id,
			env.NODE_ENV === "development" ? env.DEV_GUILD_ID : undefined,
		);
		logger.info(`Ready! Logged in as ${client.user.tag}`);
	}
}

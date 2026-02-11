import { Event, type IEvent, logger } from "@repo/core";
import { type Client, Events } from "discord.js";

@Event({
	name: Events.ClientReady,
	once: true,
})
export class ReadyEvent implements IEvent {
	execute(client: Client<true>): void {
		logger.info(`Ready! Logged in as ${client.user.tag}`);
	}
}

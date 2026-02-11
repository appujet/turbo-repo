import { logger } from "@repo/core";
import { Events } from "discord.js";
import { container, singleton } from "tsyringe";
import type { BotClient } from "../client.js";

@singleton()
export class EventService {
	constructor(private client: BotClient) {}

	public init(): void {
		this.client.once(Events.ClientReady, (readyClient) => {
			logger.info(`Ready! Logged in as ${readyClient.user.tag}`);
		});

		logger.info("Event handlers initialized");
	}
}

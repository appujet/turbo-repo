import "reflect-metadata";

import { logger } from "@repo/core";
import { container } from "tsyringe";
import { BotClient } from "./client.js";

import { loadCommands } from "./services/load.commands.js";
import { loadEvents } from "./services/load.events.js";

async function bootstrap() {
	try {
		// Resolve services
		const client = container.resolve(BotClient);

		await loadCommands();
		const events = await loadEvents();
		events.attachTo(client);

		// Start the bot
		await client.start();
	} catch (error) {
		logger.error(error, "Error during bot bootstrap:");
		process.exit(1);
	}
}

bootstrap();

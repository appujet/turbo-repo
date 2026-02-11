import "reflect-metadata";
import { CommandHandler, EventHandler, logger } from "@repo/core";
import { container } from "tsyringe";
import { BotClient } from "./client.js";
import { PingCommand } from "./commands/ping.command.js";
import { MessageCreateEvent } from "./events/message.create.js";
import { ReadyEvent } from "./events/ready.event.js";

async function bootstrap() {
	try {
		// Resolve services
		const client = container.resolve(BotClient);
		const commandHandler = container.resolve(CommandHandler);
		const eventHandler = container.resolve(EventHandler);

		// Register events
		eventHandler.registerEvent(client, ReadyEvent);
		eventHandler.registerEvent(client, MessageCreateEvent);

		// Register commands
		commandHandler.registerCommand(PingCommand);

		// Start the bot
		await client.start();
	} catch (error) {
		logger.error(error, "Error during bot bootstrap:");
		process.exit(1);
	}
}

bootstrap();

import { CommandHandler, type ICommand, logger } from "@repo/core";
import { container } from "tsyringe";
import * as BotCommands from "../commands/index.js";

// biome-ignore lint/suspicious/noExplicitAny: Dynamic resolution requires any for constructor args
type CommandConstructor = new (...args: any[]) => ICommand;

export async function loadCommands() {
	const handler = container.resolve(CommandHandler);

	for (const commandClass of Object.values(BotCommands) as CommandConstructor[]) {
		const instance = container.resolve(commandClass);
		handler.register(instance);
	}

	logger.info(`Loaded ${handler.commands.size} commands`);
	return handler;
}

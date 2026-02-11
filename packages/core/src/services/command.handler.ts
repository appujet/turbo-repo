import type { Message } from "discord.js";
import { container, singleton } from "tsyringe";
import { COMMAND_METADATA, type CommandOptions } from "../decorators/command.decorator.js";
import { logger } from "../index.js";
import type { ICommand } from "../interfaces/command.interface.js";

@singleton()
export class CommandHandler {
	private commands = new Map<string, ICommand>();

	public registerCommand(commandClass: new (...args: unknown[]) => ICommand): void {
		const options: CommandOptions = Reflect.getMetadata(COMMAND_METADATA, commandClass);
		if (!options) {
			throw new Error(`Class ${commandClass.name} is not a valid command (missing @Command decorator)`);
		}

		const instance = container.resolve<ICommand>(commandClass);
		this.commands.set(options.name, instance);
		logger.info(`Registered command: ${options.name}`);
	}

	public async handle(message: Message): Promise<void> {
		if (message.author.bot) return;

		const prefix = "!"; // Could be from config/env
		if (!message.content.startsWith(prefix)) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift()?.toLowerCase();

		if (!commandName) return;

		const command = this.commands.get(commandName);
		if (!command) return;

		try {
			await command.execute(message, args);
		} catch (error) {
			logger.error(error, `Error executing command ${commandName}:`);
			await message.reply("There was an error trying to execute that command!");
		}
	}
}

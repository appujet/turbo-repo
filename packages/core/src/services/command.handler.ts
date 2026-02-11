import { GuildService } from "@repo/db";
import type { Message } from "discord.js";
import { inject, singleton } from "tsyringe";
import type { ICommand } from "../interfaces/command.interface.js";
import { logger } from "../logger.js";

@singleton()
export class CommandHandler {
	public commands = new Map<string, ICommand>();
	public aliases = new Map<string, string>();
	constructor(@inject(GuildService) private guildService: GuildService) {}

	public register(command: ICommand): this {
		if (!command.metadata) {
			logger.warn(`Command ${command.constructor.name} missing metadata, skipping registration.`);
			return this;
		}
		if (!command.metadata.name) {
			logger.warn(`Command ${command.constructor.name} missing metadata, skipping registration.`);
			return this;
		}
		this.commands.set(command.metadata.name, command);

		if (command.metadata.aliases) {
			for (const alias of command.metadata.aliases) {
				this.aliases.set(alias, command.metadata.name);
			}
		}
		return this;
	}
	getCommand(nameOrAlias: string): ICommand | undefined {
		const commandName = this.aliases.get(nameOrAlias) ?? nameOrAlias;
		return this.commands.get(commandName);
	}

	public async handle(message: Message): Promise<void> {
		if (message.author.bot) return;

		const prefix = await this.guildService.getPrefix(message.guildId ?? undefined);
		if (!message.content.startsWith(prefix)) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift()?.toLowerCase();

		if (!commandName) return;

		const command = this.getCommand(commandName);
		if (!command) return;

		try {
			await command.execute(message, args);
		} catch (error) {
			logger.error(error, `Error executing command ${commandName}:`);
			await message.reply("There was an error trying to execute that command!");
		}
	}
}

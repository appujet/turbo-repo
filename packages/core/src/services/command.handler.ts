import { singleton } from "tsyringe";
import type { ICommand } from "../interfaces/command.interface.js";
import { logger } from "../logger.js";

@singleton()
export class CommandHandler {
	public commands = new Map<string, ICommand>();
	public aliases = new Map<string, string>();

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
}

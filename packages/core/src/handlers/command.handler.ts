import {
	ApplicationCommandType,
	PermissionsBitField,
	type REST,
	type RESTPostAPIChatInputApplicationCommandsJSONBody,
	Routes,
} from "discord.js";
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

	async ApplicationCommandsJSON() {
		const cmds: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
		for (const command of this.commands.values()) {
			if (command.metadata?.slash) {
				const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
					name: command.metadata.name,
					description: command.metadata.description || "",
					type: ApplicationCommandType.ChatInput,
					options: command.metadata.options,
					default_member_permissions:
						Array.isArray(command.metadata.defaultMemberPermissions) &&
						command.metadata.defaultMemberPermissions.length > 0
							? PermissionsBitField.resolve(command.metadata.defaultMemberPermissions).toString()
							: null,
				};
				cmds.push(data);
			}
		}
		return cmds;
	}

	async deployCommands(rest: REST, clientId: string, guildId?: string) {
		const commands = await this.ApplicationCommandsJSON();
		if (guildId) {
			await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
		} else {
			await rest.put(Routes.applicationCommands(clientId), { body: commands });
		}
	}
}

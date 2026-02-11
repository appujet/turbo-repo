import type { APIApplicationCommandOption, CommandInteraction, Message, PermissionResolvable } from "discord.js";

export interface CommandMetadata {
	name: string;
	description?: string;
	aliases?: string[];
	category?: string;
	slash?: boolean;
	options?: APIApplicationCommandOption[];
	defaultMemberPermissions?: PermissionResolvable;
	clientPermissions?: PermissionResolvable;
}

export interface ICommand {
	metadata?: CommandMetadata;
	prefixRun(message: Message, args: string[]): Promise<void> | void;
	slashRun(interaction: CommandInteraction): Promise<void> | void;
}

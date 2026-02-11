import type { ApplicationCommandOptionData, Message } from "discord.js";

export interface CommandMetadata {
	name: string;
	description?: string;
	aliases?: string[];
	category?: string;
	slash?: boolean;
	options?: ApplicationCommandOptionData[];
}

export interface ICommand {
	metadata?: CommandMetadata;
	execute(message: Message, args: string[]): Promise<void> | void;
}

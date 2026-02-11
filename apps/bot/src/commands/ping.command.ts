import { Command, type ICommand } from "@repo/core";
import type { GuildService, UserService } from "@repo/db";
import type { Message } from "discord.js";
import { singleton } from "tsyringe";

@Command({
	name: "ping",
	description: "Replied with Pong!",
})
@singleton()
export class PingCommand implements ICommand {
	constructor(
		private guildService: GuildService,
		private userService: UserService,
	) {}

	async execute(message: Message): Promise<void> {
		// Example of using the new separated service structure
		await this.userService.ensureUser(message.author.id, message.author.username);

		const prefix = await this.guildService.getPrefix(message.guildId ?? undefined);

		await message.reply(`Pong! My prefix here is \`${prefix}\`. I've remembered you, ${message.author.username}!`);
	}
}

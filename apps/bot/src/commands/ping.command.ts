import { Command, type ICommand } from "@repo/core";
import { GuildService, UserService } from "@repo/db";
import type { Message } from "discord.js";
import { container, singleton } from "tsyringe";

@Command({
	name: "ping",
	description: "Replied with Pong!",
})
@singleton()
export class PingCommand implements ICommand {
	async execute(message: Message): Promise<void> {
		const guildService = container.resolve(GuildService);
		const userService = container.resolve(UserService);
		// Example of using the new separated service structure
		await userService.ensureUser(message.author.id, message.author.username);

		const prefix = await guildService.getPrefix(message.guildId ?? undefined);

		await message.reply(`Pong! My prefix here is \`${prefix}\`. I've remembered you, ${message.author.username}!`);
	}
}

import { CommandHandler, Event, type IEvent, logger } from "@repo/core";
import { GuildService } from "@repo/db";
import { Events, type Message } from "discord.js";
import { container, singleton } from "tsyringe";

@Event({
	name: Events.MessageCreate,
})
@singleton()
export class MessageCreateEvent implements IEvent<"messageCreate"> {
	async run(message: Message): Promise<void> {
		if (message.author.bot) return;
		const guildService = container.resolve(GuildService);
		const commandHandler = container.resolve(CommandHandler);
		const prefix = await guildService.getPrefix(message.guildId ?? undefined);
		if (!message.content.startsWith(prefix)) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift()?.toLowerCase();

		if (!commandName) return;

		const command = commandHandler.getCommand(commandName);
		if (!command) return;

		try {
			await command.execute(message, args);
		} catch (error) {
			logger.error(error, `Error executing command ${commandName}:`);
			await message.reply("There was an error trying to execute that command!");
		}
	}
}

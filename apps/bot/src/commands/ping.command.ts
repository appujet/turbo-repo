import { Command, type ICommand } from "@repo/core";
import type { Message } from "discord.js";

@Command({
	name: "ping",
	description: "Replied with Pong!",
})
export class PingCommand implements ICommand {
	name = "ping";
	async execute(message: Message): Promise<void> {
		await message.reply("Pong!");
	}
}

import { Command, type ICommand } from "@repo/core";
import type { CommandInteraction, Message } from "discord.js";

@Command({
	name: "ping",
	description: "Replied with Pong!",
	category: "general",
})
export class PingCommand implements ICommand {
	async prefixRun(message: Message): Promise<void> {
		await message.reply("Pong!");
	}
	async slashRun(interaction: CommandInteraction): Promise<void> {
		await interaction.reply("Pong!");
	}
}

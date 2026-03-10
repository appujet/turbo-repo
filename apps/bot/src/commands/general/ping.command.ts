import { Command, type ICommand } from "@repo/core";
import { type CommandInteraction, MessageFlags } from "discord.js";

@Command({
	name: "ping",
	description: "Replied with Pong!",
	category: "general",
})
export class PingCommand implements ICommand {
	async slashRun(interaction: CommandInteraction): Promise<void> {
		await interaction.reply({ content: "Pong!", flags: MessageFlags.Ephemeral });
	}
}

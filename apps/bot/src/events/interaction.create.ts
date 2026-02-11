import { CommandHandler, Event, type IEvent, logger } from "@repo/core";
import { Events, type Interaction } from "discord.js";
import { container } from "tsyringe";

@Event({
	name: Events.InteractionCreate,
})
export class InteractionCreateEvent implements IEvent<"interactionCreate"> {
	async run(interaction: Interaction): Promise<void> {
		// Handle slash commands
		if (interaction.isChatInputCommand()) {
			const commandHandler = container.resolve(CommandHandler);
			const command = commandHandler.getCommand(interaction.commandName);

			if (!command) {
				logger.warn(`Unknown command: ${interaction.commandName}`);
				return;
			}
			if (!command.slashRun) {
				logger.warn(`Command ${interaction.commandName} does not have a slashRun method`);
				return;
			}
			try {
				await command.slashRun(interaction);
			} catch (error) {
				logger.error(error, `Error executing slash command ${interaction.commandName}:`);

				const errorMessage = "There was an error trying to execute that command!";
				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({ content: errorMessage, ephemeral: true });
				} else {
					await interaction.reply({ content: errorMessage, ephemeral: true });
				}
			}
		}
	}
}

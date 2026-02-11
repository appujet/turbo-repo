import { type CommandHandler, Event, type IEvent } from "@repo/core";
import { Events, type Message } from "discord.js";
import { singleton } from "tsyringe";

@Event({
	name: Events.MessageCreate,
})
@singleton()
export class MessageCreateEvent implements IEvent {
	constructor(private commandHandler: CommandHandler) {}

	async run(message: Message): Promise<void> {
		await this.commandHandler.handle(message);
	}
}

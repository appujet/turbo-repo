import type { Client } from "discord.js";
import { container, singleton } from "tsyringe";
import { EVENT_METADATA, type EventOptions } from "../decorators/event.decorator.js";
import { logger } from "../index.js";
import type { IEvent } from "../interfaces/event.interface.js";

@singleton()
export class EventHandler {
	public registerEvent(client: Client, eventClass: new (...args: any[]) => IEvent): void {
		const options: EventOptions = Reflect.getMetadata(EVENT_METADATA, eventClass);
		if (!options) {
			throw new Error(`Class ${eventClass.name} is not a valid event (missing @Event decorator)`);
		}

		const instance = container.resolve<IEvent>(eventClass);

		if (options.once) {
			client.once(options.name, (...args) => instance.execute(...args));
		} else {
			client.on(options.name, (...args) => instance.execute(...args));
		}

		logger.info(`Registered event: ${options.name} (${options.once ? "once" : "on"})`);
	}
}

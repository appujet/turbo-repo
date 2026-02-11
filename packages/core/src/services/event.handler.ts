import type { Client, ClientEvents } from "discord.js";
import { singleton } from "tsyringe";
import type { IEvent } from "../interfaces/event.interface.js";
import { logger } from "../logger.js";

@singleton()
export class EventHandler {
	public events = new Map<keyof ClientEvents, IEvent[]>();

	registerEvent<K extends keyof ClientEvents>(event: IEvent<K>): this {
		if (!event.metadata || !event.metadata.name) {
			logger.warn(`Event ${event.constructor.name} missing metadata, skipping registration.`);
			return this;
		}
		if (!this.events.has(event.metadata.name)) this.events.set(event.metadata.name, []);
		this.events.get(event.metadata.name)?.push(event);
		return this;
	}

	public getAll() {
		return this.events.entries();
	}

	public attachTo(client: Client) {
		for (const [name, eventList] of this.getAll()) {
			for (const event of eventList) {
				// biome-ignore lint/suspicious/noExplicitAny: Event handler args are dynamic based on Discord.js event type
				const handler = async (...args: any[]) => {
					try {
						await event.run(client, ...args);
					} catch (err) {
						logger.error(err, `Error in event "${name}":`);
					}
				};
				if (event.metadata?.once) {
					client.once(name, handler);
				} else {
					client.on(name, handler);
				}
			}
		}
		logger.info(`Attached ${this.events.size} events to client`);
	}
}

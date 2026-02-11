import { EventHandler, type IEvent, logger } from "@repo/core";
import type { ClientEvents } from "discord.js";
import { container } from "tsyringe";
import * as BotEvents from "../events/index.js";

// biome-ignore lint/suspicious/noExplicitAny: Dynamic resolution requires any for constructor args
type EventConstructor = new (...args: any[]) => IEvent<keyof ClientEvents>;

export async function loadEvents() {
	const handler = container.resolve(EventHandler);
	for (const eventClass of Object.values(BotEvents) as EventConstructor[]) {
		const instance = container.resolve(eventClass);
		handler.registerEvent(instance);
	}
	logger.info(`Loaded ${handler.events.size} events`);
	return handler;
}

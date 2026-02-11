import type { ClientEvents } from "discord.js";

export interface EventMetadata<K extends keyof ClientEvents = keyof ClientEvents> {
	name: K;
	once?: boolean;
}

export interface IEvent<K extends keyof ClientEvents = keyof ClientEvents> {
	metadata?: EventMetadata<K>;
	run(...args: ClientEvents[K]): Promise<void> | void;
}

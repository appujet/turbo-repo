import { injectable } from "tsyringe";

export const EVENT_METADATA = "event_metadata";

export interface EventOptions {
	name: string;
	once?: boolean;
}

export function Event(options: EventOptions): ClassDecorator {
	return (target: any) => {
		injectable()(target);
		Reflect.defineMetadata(EVENT_METADATA, options, target);
	};
}

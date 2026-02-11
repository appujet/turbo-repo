import type { EventMetadata } from "../interfaces/event.interface.js";

export function Event(options: EventMetadata) {
	return <T extends new (...args: any[]) => object>(target: T) =>
		class extends target {
			metadata = {
				...options,
			} satisfies EventMetadata;
		};
}

import type { CommandMetadata } from "../interfaces/command.interface.js";

export function Command(options: CommandMetadata) {
	// biome-ignore lint/suspicious/noExplicitAny: Decorator pattern requires any for constructor args
	return <T extends new (...args: any[]) => object>(target: T) =>
		class extends target {
			metadata = {
				...options,
			} satisfies CommandMetadata;
		};
}

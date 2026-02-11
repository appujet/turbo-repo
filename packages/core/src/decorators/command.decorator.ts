import { injectable } from "tsyringe";

export const COMMAND_METADATA = "command_metadata";

export interface CommandOptions {
	name: string;
	description?: string;
}

export function Command(options: CommandOptions): ClassDecorator {
	return (target: any) => {
		injectable()(target);
		Reflect.defineMetadata(COMMAND_METADATA, options, target);
	};
}

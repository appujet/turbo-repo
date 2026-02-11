import path from "node:path";
import { config } from "dotenv";
import { z } from "zod";

// Load .env from root if it exists
config({ path: path.resolve(process.cwd(), "../../.env") });
config({ path: path.resolve(process.cwd(), ".env") });

const envSchema = z.object({
	DISCORD_TOKEN: z.string().min(1),
	DATABASE_URL: z.string().url(),
	DEFAULT_PREFIX: z.string().min(1).default("!"),
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error("❌ Invalid environment variables:", _env.error.format());
	process.exit(1);
}

export const env = _env.data;

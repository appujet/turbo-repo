import { z } from "zod";
import { config } from "dotenv";
import path from "node:path";

// Load .env from root if it exists
config({ path: path.resolve(process.cwd(), "../../.env") });
config({ path: path.resolve(process.cwd(), ".env") });

const envSchema = z.object({
	DISCORD_TOKEN: z.string().min(1),
	DATABASE_URL: z.string().url(),
	NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.error("❌ Invalid environment variables:", _env.error.format());
	process.exit(1);
}

export const env = _env.data;

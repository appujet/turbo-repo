import { env } from "@repo/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: ["./src/schema/guilds.ts", "./src/schema/users.ts"],
	out: "./drizzle",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});

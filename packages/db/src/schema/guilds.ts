import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const guilds = pgTable("guilds", {
	id: varchar("id", { length: 255 }).primaryKey(), // Discord Guild ID
	prefix: varchar("prefix", { length: 10 }).notNull().default("!"),
	updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

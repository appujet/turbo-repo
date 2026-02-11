import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: varchar("id", { length: 255 }).primaryKey(), // Discord ID
	username: text("username").notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
});

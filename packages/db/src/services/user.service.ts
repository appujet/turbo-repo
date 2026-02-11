import { eq } from "drizzle-orm";
import { singleton } from "tsyringe";
import { db } from "../client.js";
import * as schema from "../schema/index.js";

@singleton()
export class UserService {
	private db = db;

	public async getUser(userId: string) {
		const [user] = await this.db.select().from(schema.users).where(eq(schema.users.id, userId)).limit(1);
		return user;
	}

	public async ensureUser(userId: string, username: string) {
		const user = await this.getUser(userId);
		if (user) return user;

		const [newUser] = await this.db
			.insert(schema.users)
			.values({
				id: userId,
				username,
			})
			.returning();
		return newUser;
	}
}

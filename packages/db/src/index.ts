import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@repo/env";
import * as schema from "./schema.js";

export * from "./schema.js";
export * from "drizzle-orm";

const client = postgres(env.DATABASE_URL);
export const db = drizzle(client, { schema });

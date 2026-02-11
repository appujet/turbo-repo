CREATE TABLE "guilds" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"prefix" varchar(10) DEFAULT '!' NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

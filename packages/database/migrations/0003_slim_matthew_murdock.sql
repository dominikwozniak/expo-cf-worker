CREATE TABLE `acme_post` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(40) NOT NULL,
	`content` text(256) NOT NULL,
	`timestamp` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
DROP TABLE `posts`;
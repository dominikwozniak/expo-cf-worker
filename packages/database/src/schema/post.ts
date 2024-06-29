import type { InferSelectModel } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { sqliteTable } from "./_table-creator";

export const post = sqliteTable("post", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title", { length: 40 }).notNull(),
  content: text("content", { length: 256 }).notNull(),
  timestamp: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const insertPostSchema = createInsertSchema(post);
export const selectPostSchema = createSelectSchema(post);

export type Post = InferSelectModel<typeof post>;

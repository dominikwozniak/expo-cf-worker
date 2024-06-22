import { sql } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";

import { sqliteTable } from "./_table-creator";

export const post = sqliteTable("post", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title", { length: 40 }).notNull(),
  content: text("content", { length: 256 }).notNull(),
  timestamp: text("timestamp")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

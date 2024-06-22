import { sqliteTableCreator } from "drizzle-orm/sqlite-core";

export const sqliteTable = sqliteTableCreator((name) => `acme_${name}`);

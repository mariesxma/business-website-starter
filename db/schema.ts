import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const resources = sqliteTable("resources", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
});

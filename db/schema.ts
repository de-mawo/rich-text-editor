import { text, pgTable, varchar, timestamp, serial } from "drizzle-orm/pg-core";

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 250 }).notNull(),
  description: text("description").notNull(),
  slug: varchar("slug", { length: 250 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});


export type InsertPostType = typeof postsTable.$inferInsert;
export type SelectPostType = typeof postsTable.$inferSelect;

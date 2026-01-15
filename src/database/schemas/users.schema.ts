import { relations, sql } from 'drizzle-orm';
import { pgTable, varchar, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { posts } from './posts.schema';

export const users = pgTable('users', {
	id: uuid().primaryKey().defaultRandom(),
	email: varchar({ length: 255 }).unique().notNull(),
	password: text().notNull(),
	createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true })
		.$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
		.notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
	posts: many(posts)
}));

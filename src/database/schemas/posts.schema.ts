import { pgTable, uuid, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { users } from './users.schema';
import { relations } from 'drizzle-orm';
import { files } from './files.schema';

export const posts = pgTable('posts', {
	id: uuid().primaryKey().defaultRandom(),
	title: varchar({ length: 64 }).notNull(),
	description: text().notNull(),
	imageFileId: uuid()
		.references(() => files.id)
		.notNull(),
	authorId: uuid()
		.references(() => users.id)
		.notNull(),
	createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
	updatedAt: timestamp({ withTimezone: true })
		.$onUpdateFn(() => sql`CURRENT_TIMESTAMP`)
		.notNull()
});

export const postsRelations = relations(posts, ({ one }) => ({
	author: one(users, {
		fields: [posts.authorId],
		references: [users.id]
	}),
	image: one(files, {
		fields: [posts.imageFileId],
		references: [files.id]
	})
}));

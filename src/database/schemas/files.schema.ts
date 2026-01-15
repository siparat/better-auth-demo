import { pgTable, pgEnum, uuid, text, bigint, timestamp, index, uniqueIndex, boolean } from 'drizzle-orm/pg-core';

export const fileStatusEnum = pgEnum('file_status', ['UPLOADING', 'READY', 'FAILED', 'DELETED']);

export const files = pgTable(
	'files',
	{
		id: uuid().primaryKey().defaultRandom(),
		key: text().notNull(),
		size: bigint({ mode: 'number' }).notNull(),
		mimeType: text().notNull(),
		status: fileStatusEnum().notNull(),
		isPublic: boolean().notNull().default(false),
		createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
		deletedAt: timestamp({ withTimezone: true })
	},
	(table) => [
		uniqueIndex('files_key_unique').on(table.key),
		index('files_status_idx').on(table.status),
		index('files_is_public_idx').on(table.isPublic),
		index('files_created_at_idx').on(table.createdAt)
	]
);

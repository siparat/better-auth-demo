import { relations } from "drizzle-orm/relations";
import { files, posts, users } from "./schema";

export const postsRelations = relations(posts, ({one}) => ({
	file: one(files, {
		fields: [posts.imageFileId],
		references: [files.id]
	}),
	user: one(users, {
		fields: [posts.authorId],
		references: [users.id]
	}),
}));

export const filesRelations = relations(files, ({many}) => ({
	posts: many(posts),
}));

export const usersRelations = relations(users, ({many}) => ({
	posts: many(posts),
}));
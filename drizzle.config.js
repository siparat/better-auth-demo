import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	out: './drizzle',
	schema: './src/database/schemas/*.ts',
	casing: 'snake_case',
	dialect: 'postgresql',
	strict: true,
	dbCredentials: {
		url: process.env.DATABASE_URL
	}
});

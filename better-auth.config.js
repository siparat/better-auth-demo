import 'dotenv/config';
import { betterAuth } from 'better-auth';
import { drizzle } from 'drizzle-orm/node-postgres';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

const db = drizzle(process.env.DATABASE_URL);

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: 'pg', usePlural: true })
});

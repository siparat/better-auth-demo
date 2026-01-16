import { BetterAuthOptions } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { AuthModuleAsyncOptions } from 'src/auth/interface/better-auth.interface';
import { DRIZZLE_PROVIDE_KEY } from 'src/database/constants/drizzle-providers.constants';
import { DatabaseModule } from 'src/database/database.module';

export const getAuthOptions = (): AuthModuleAsyncOptions => ({
	imports: [DatabaseModule],
	inject: [DRIZZLE_PROVIDE_KEY],
	useFactory: (database: NodePgDatabase): BetterAuthOptions => {
		return {
			database: drizzleAdapter(database, { camelCase: false, provider: 'pg', usePlural: true })
		};
	}
});

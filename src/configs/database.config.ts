import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModuleAsyncOptions } from 'src/database/interfaces/drizzle.interface';

export const getDatabaseConfig = (): DatabaseModuleAsyncOptions => {
	return {
		imports: [ConfigModule],
		inject: [ConfigService],
		useFactory: (config: ConfigService) => ({
			url: config.getOrThrow('DATABASE_URL')
		})
	};
};

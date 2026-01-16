import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DRIZZLE_PROVIDE_KEY } from './constants/drizzle-providers.constants';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DatabaseModuleAsyncOptions, DatabaseModuleOptions } from './interfaces/drizzle.interface';

@Module({})
export class DatabaseModule {
	static forRoot({ url }: DatabaseModuleOptions): DynamicModule {
		const db = drizzle(url);

		return {
			global: true,
			module: DatabaseModule,
			providers: [DatabaseService, { provide: DRIZZLE_PROVIDE_KEY, useValue: db }],
			exports: [DatabaseService, DRIZZLE_PROVIDE_KEY]
		};
	}

	static forRootAsync(options: DatabaseModuleAsyncOptions): DynamicModule {
		const asyncProvider = DatabaseModule.createAsyncOptionsProvider(options);

		return {
			global: true,
			module: DatabaseModule,
			imports: options.imports,
			providers: [DatabaseService, asyncProvider],
			exports: [DatabaseService, DRIZZLE_PROVIDE_KEY]
		};
	}

	private static createAsyncOptionsProvider(options: DatabaseModuleAsyncOptions): Provider {
		return {
			provide: DRIZZLE_PROVIDE_KEY,
			inject: options.inject,
			useFactory: async (...args: any[]): Promise<ReturnType<typeof drizzle>> => {
				const { url } = await options.useFactory(...args);
				return drizzle(url);
			}
		};
	}
}

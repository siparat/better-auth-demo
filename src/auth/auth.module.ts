import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Auth, betterAuth, BetterAuthOptions } from 'better-auth';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { BETTER_AUTH_PROVIDE_KEY } from './constants/better-auth-providers.constants';
import { AuthModuleAsyncOptions, AuthModuleOptions } from './interface/better-auth.interface';

@Module({})
export class AuthModule {
	static forRoot(options: AuthModuleOptions): DynamicModule {
		const auth = betterAuth(options);
		return {
			global: true,
			module: AuthModule,
			imports: [BetterAuthModule],
			providers: [
				{
					provide: BETTER_AUTH_PROVIDE_KEY,
					useValue: auth
				}
			],
			exports: [BETTER_AUTH_PROVIDE_KEY]
		};
	}

	static forRootAsync(options: AuthModuleAsyncOptions): DynamicModule {
		const authProvider = AuthModule.createAsyncOptionsProvider(options);

		return {
			global: true,
			module: AuthModule,
			imports: [BetterAuthModule, ...(options.imports || [])],
			providers: [authProvider],
			exports: [BETTER_AUTH_PROVIDE_KEY]
		};
	}

	private static createAsyncOptionsProvider(options: AuthModuleAsyncOptions): Provider {
		return {
			provide: BETTER_AUTH_PROVIDE_KEY,
			inject: options.inject,
			useFactory: async (...args: any[]): Promise<Auth<BetterAuthOptions>> => {
				const betterAuthOptions = options.useFactory(...args);
				return betterAuth(betterAuthOptions);
			}
		};
	}
}

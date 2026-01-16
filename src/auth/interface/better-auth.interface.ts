import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { BetterAuthOptions } from 'better-auth';

export type AuthModuleOptions = BetterAuthOptions;

export type AuthModuleAsyncOptions = Pick<FactoryProvider<AuthModuleOptions>, 'inject' | 'useFactory'> &
	Pick<ModuleMetadata, 'imports'>;

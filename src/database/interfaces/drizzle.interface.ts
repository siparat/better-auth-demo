import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export interface DatabaseModuleOptions {
	url: string;
}

export interface DatabaseModuleAsyncOptions
	extends Pick<FactoryProvider<DatabaseModuleOptions>, 'inject' | 'useFactory'>, Pick<ModuleMetadata, 'imports'> {}

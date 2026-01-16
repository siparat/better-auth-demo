import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { getDatabaseConfig } from './configs/database.config';
import { AuthModule } from './auth/auth.module';
import { getAuthOptions } from './configs/auth.config';

@Module({
	imports: [
		ConfigModule.forRoot(),
		DatabaseModule.forRootAsync(getDatabaseConfig()),
		AuthModule.forRootAsync(getAuthOptions())
	]
})
export class AppModule {}

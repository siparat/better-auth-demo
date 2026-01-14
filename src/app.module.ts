import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { getDatabaseConfig } from './configs/database.config';

@Module({
	imports: [ConfigModule.forRoot(), DatabaseModule.forRootAsync(getDatabaseConfig())]
})
export class AppModule {}

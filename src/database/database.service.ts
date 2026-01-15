import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_PROVIDE_KEY } from './constants/drizzle-providers.constants';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schemas';

@Injectable()
export class DatabaseService {
	constructor(@Inject(DRIZZLE_PROVIDE_KEY) public client: NodePgDatabase<typeof schema>) {}
}

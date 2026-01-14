import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_PROVIDE_KEY } from './constants/drizzle-providers.constants';
import { drizzle } from 'drizzle-orm/node-postgres';

@Injectable()
export class DatabaseService {
	constructor(@Inject(DRIZZLE_PROVIDE_KEY) public client: ReturnType<typeof drizzle>) {}
}

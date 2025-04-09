import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import { subscriptions } from './schema/subscriptions';

export const pg = postgres(process.env.POSTGRESQL_URL as string)
export const db = drizzle(pg, {
    schema: {
        subscriptions
    }
})
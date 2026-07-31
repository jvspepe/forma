import { drizzle } from 'drizzle-orm/node-postgres';

import { serverEnv } from '@/configs/server-env.ts';

export const database = drizzle(serverEnv.DATABASE_URL);

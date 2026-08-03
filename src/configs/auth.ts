import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { betterAuth } from 'better-auth/minimal';
import { admin } from 'better-auth/plugins';
import { tanstackStartCookies } from 'better-auth/tanstack-start';
import { v7 as uuidv7 } from 'uuid';

import { database } from '@/configs/database';

export const auth = betterAuth({
  advanced: {
    database: {
      generateId: () => uuidv7(),
    },
  },
  database: drizzleAdapter(database, {
    provider: 'pg',
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin(), tanstackStartCookies()],
  trustedOrigins: ['http://localhost:3000'],
});

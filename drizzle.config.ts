import { defineConfig } from 'drizzle-kit';

import { serverEnv } from '@/configs/server-env';

export default defineConfig({
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
  },
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/features/**/*.schema.ts',
});

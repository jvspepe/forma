import '@tanstack/react-start/server-only';
import 'dotenv/config';
import { nonEmpty, object, pipe, safeParse, string, trim, url } from 'valibot';

const ServerEnvSchema = object({
  BETTER_AUTH_SECRET: pipe(string(), trim(), nonEmpty()),
  BETTER_AUTH_URL: pipe(string(), trim(), nonEmpty(), url()),
  DATABASE_URL: pipe(string(), trim(), nonEmpty(), url()),
});

const tryParseServerEnv = safeParse(ServerEnvSchema, process.env);

if (!tryParseServerEnv.success) {
  throw new Error(
    tryParseServerEnv.issues.map((issue) => issue.message).join(', ')
  );
}

export const serverEnv = tryParseServerEnv.output;

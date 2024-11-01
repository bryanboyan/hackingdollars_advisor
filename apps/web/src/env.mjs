// @ts-check
import { z } from 'zod';

/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */

export const formatErrors = (
  /** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
  errors,
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && '_errors' in value)
        return `${name}: ${value._errors.join(', ')}\n`;
      return null;
    })
    .filter(Boolean);

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  OPENAI_API_KEY: z.string(),
});

const serverEnv = serverSchema.safeParse(process.env);

if (!serverEnv.success) {
  console.error(
    '❌ Invalid environment variables:\n',
    ...formatErrors(serverEnv.error.format()),
  );
  throw new Error('Invalid environment variables');
}

Object.keys(serverEnv.data).forEach((key) => {
  if (key.startsWith('NEXT_PUBLIC_')) {
    console.warn('❌ You are exposing a server-side env-variable:', key);

    throw new Error('You are exposing a server-side env-variable');
  }
});

export const env = { ...serverEnv.data };

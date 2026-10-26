import * as z from 'zod';

export const envValidationSchema = z.object({
  DATABASE_URL: z.string(),
  DB_HOST: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_PORT: z.string(),
  DB_NAME: z.string(),
  LOG_LEVEL: z.enum(['log', 'debug']),
  PAGINATION_DEFAULT_PAGE_SIZE: z.string(),
  TEST_URL: z.string(),
  SESSION_TOKEN_EXPIRES_IN_DAYS: z.string(),
  LIMIT_LOGIN_ATTEMPTS: z.string(),
});

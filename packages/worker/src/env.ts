/*
 * Define the environment variables that your application will use.
 * Hono disallows the use interface for defining environment variables.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type Env = {
  DB: D1Database;
  CLERK_SECRET_KEY: string;
};

import type { Config } from 'drizzle-kit';

/*
  Env variables required only for drizzle studio
  Consider using env validation library
  https://env.t3.gg/docs/core
 */
const localDbPath = process.env.LOCAL_DB_PATH
const databaseId = process.env.USE_PROD_DB
  ? process.env.DATABASE_ID_PROD
  : process.env.DATABASE_ID;
const accountId = process.env.ACCOUNT_ID
const accountToken = process.env.ACCOUNT_TOKEN

const sharedConfig = {
  schema: './src/db/schema.ts',
  out: './migrations',
  verbose: false,
  strict: true,
  dialect: 'sqlite',
} as const

const localConfig = {
  ...sharedConfig,
  dbCredentials: {
    url: localDbPath as string,
  }
} satisfies Config

const remoteConfig = {
  ...sharedConfig,
  driver: 'd1-http',
  dbCredentials: {
    databaseId: databaseId as string,
    accountId: accountId as string,
    token: accountToken as string,
  }
} satisfies Config

export default localDbPath ? localConfig : remoteConfig

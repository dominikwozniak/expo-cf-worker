import type { Config } from "drizzle-kit";

import { drizzleEnv } from "./src/drizzle-env.mjs";

const localDbPath = drizzleEnv.LOCAL_DB_PATH;
const databaseId = drizzleEnv.USE_PROD_DB
  ? drizzleEnv.DATABASE_ID_PROD
  : drizzleEnv.DATABASE_ID;
const accountId = drizzleEnv.ACCOUNT_ID;
const accountToken = drizzleEnv.ACCOUNT_TOKEN;

const sharedConfig = {
  schema: "./src/schema",
  tablesFilter: ["acme_*"],
  out: "./migrations",
  verbose: false,
  strict: true,
  dialect: "sqlite",
} satisfies Config;

const localConfig = {
  ...sharedConfig,
  dbCredentials: {
    url: localDbPath as string,
  },
} satisfies Config;

const remoteConfig = {
  ...sharedConfig,
  driver: "d1-http",
  dbCredentials: {
    databaseId,
    accountId,
    token: accountToken,
  },
} satisfies Config;

export default localDbPath ? localConfig : remoteConfig;

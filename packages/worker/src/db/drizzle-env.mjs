import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const drizzleEnv = createEnv({
  server: {
    LOCAL_DB_PATH: z.string().optional(),
    DATABASE_ID: z.string().min(1),
    DATABASE_ID_PROD: z.string().min(1),
    ACCOUNT_ID: z.string().min(1),
    ACCOUNT_TOKEN: z.string().min(1),
    USE_PROD_DB: z
      .string()
      .optional()
      .default("false")
      .refine((s) => s === "true" || s === "false")
      .transform((s) => s === "true"),
  },

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: process.env,

  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,
});

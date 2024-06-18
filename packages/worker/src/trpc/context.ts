import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import type { Env } from "../env";
import { dbClient } from "../db/db-client";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const createContext = async (
  env: Env,
  opts: FetchCreateContextFnOptions,
) => {
  const d1 = env.DB;
  const db = dbClient(d1);
  const language = opts.req.headers.get("content-language") ?? "en";

  // TODO: use in monitoring and logging
  const source = opts.req.headers.get("x-trpc-source") ?? "unknown";
  console.log(">>> tRPC Request from", source);

  // TODO: authenticate user
  const user = {};

  await wait(100);

  return {
    db,
    language,
    user,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

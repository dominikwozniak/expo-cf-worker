import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { createClerkClient } from "@clerk/backend";

import type { Env } from "../env";
import { dbClient } from "../db";

export const createContext = async (
  env: Env,
  { req }: FetchCreateContextFnOptions,
) => {
  const d1 = env.DB;
  const db = dbClient(d1);

  const language = req.headers.get("content-language") ?? "en";
  // TODO: use in monitoring and logging
  const source = req.headers.get("x-trpc-source") ?? "unknown";
  console.log(">>> tRPC Request from", source);

  const clerk = createClerkClient({
    secretKey: env.CLERK_SECRET_KEY,
  });
  const userId = req.headers.get("authorization");

  return {
    db,
    language,
    user: userId ? await clerk.users.getUser(userId) : null,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

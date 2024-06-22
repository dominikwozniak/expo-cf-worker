import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { createClerkClient } from "@clerk/backend";

import { dbClient } from "@acme/database";

import type { Env } from "../env";

export const createContext = async (
  env: Env,
  { req }: FetchCreateContextFnOptions,
) => {
  const d1 = env.DB;
  const db = dbClient(d1);

  const clerk = createClerkClient({
    secretKey: env.CLERK_SECRET_KEY,
  });

  const language = req.headers.get("content-language") ?? "en";
  // TODO: use in monitoring and logging
  const source = req.headers.get("x-trpc-source") ?? "unknown";
  console.log(">>> tRPC Request from", source);

  const authToken = req.headers.get("x-clerk-auth-token");
  const sessionId = req.headers.get("x-clerk-auth-session-id");

  return {
    db,
    language,
    userId:
      sessionId && authToken
        ? await clerk.sessions.verifySession(sessionId, authToken)
        : null,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
